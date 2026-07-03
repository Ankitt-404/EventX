import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import { sendEmail } from "../utils/sendMail.js";
import { otpTemplate } from "../templates/otp.template.js";



const generateRefreshAndAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken , refreshToken}
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens")
        
    }
}


const registerUser = asyncHandler(async(req,res)=>{
    const {username,
        email,
        fullname,
        password,
        role = "user"} = req.body



     const fields = {
        fullname,
        username,
        email,
        password
    };

    const missingFields = Object.entries(fields)
        .filter(([_, value]) => !value?.trim())
        .map(([key]) => key);

    if (missingFields.length > 0) {
        throw new ApiError(
            400,
            `Missing fields: ${missingFields.join(", ")}`
        );
    }

    const existedUser =  await User.findOne({
            $or : [
                {email : email.toLowerCase()},
                {username : username.toLowerCase()}
            
            ]
        })

        if(existedUser){
            throw new ApiError(409,"This user already exists")
        }

        const user = await User.create({
            fullname,
            username : username.toLowerCase(),
            email : email.toLowerCase(),
            password,
            role
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser){
            throw new ApiError(500,"Something went wrong while registering user")
        }

        return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully"))
    

})

const loginUser = asyncHandler(async(req,res)=>{
    const {username, email,password} = req.body || {};

    if(!username && !email){
        throw new ApiError(400,"Email or Username is required")
    }

    const user = await User.findOne({
        $or : [{email}, {username}]
    })
    if(!user){
        throw new ApiError(404,"User does not exists")
    }


    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")
    }
    const {accessToken, refreshToken} = await generateRefreshAndAccessToken(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly : true,
        secure : true
}
    return res.status(200).
    cookie("accessToken" , accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json(
        new ApiResponse(
            200,
            {       
                user : loggedInUser, accessToken, refreshToken

            },"User logged in successfully")
        )

    })

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }

        if(incomingRefreshToken!==user?.refreshToken){
            throw new ApiError(401,"Refresh token expired")
        }

        const options = {
            httpOnly : true,
            secure : true
        }

        const {accessToken, refreshToken} = await generateRefreshAndAccessToken(user._id)

        return res.status(200).
        cookie("refreshToken" , refreshToken, options).
        cookie("accessToken", accessToken, options).
        json(new ApiResponse(200,
            {refreshToken , accessToken : newRefreshToken},
            "Acess Token refreshed" 
        ))
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")  
        
    }
})





const sendOTP = asyncHandler(async(req,res)=>{


const {email}=req.body;


const otp =Math.floor(100000 + Math.random()*900000).toString();

await OTP.create({
    email,
    otp,
    expiresAt:
    new Date(Date.now()+10*60*1000)
});

await sendEmail({
    to:email,
    subject:"Your EventX OTP",
    html:otpTemplate(otp)

});


return res.status(200).json({

    message:"OTP sent successfully"

});
});


const verifyOTP = asyncHandler(async(req,res)=>{
const {email,otp}=req.body;


const storedOTP = await OTP.findOne({
    email,
    otp
});


if(!storedOTP){
    throw new ApiError(
        400,
        "Invalid OTP"
    );

}

if(storedOTP.expiresAt < new Date()){
    throw new ApiError(
        400,
        "OTP expired"
    );

}

await OTP.deleteOne({
    _id:storedOTP._id
});


return res.status(200).json({

    message:"OTP verified"

});

});
const getProfile = asyncHandler(async (req, res) => {

    return res.status(200).json(

        new ApiResponse(
            200,
            req.user,
            "Profile fetched successfully"
        )

    );

});

export {registerUser,loginUser,verifyOTP,sendOTP,getProfile}