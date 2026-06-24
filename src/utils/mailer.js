import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
console.log("EMAIL:", process.env.SMTP_EMAIL);
console.log("PASSWORD:", process.env.SMTP_PASSWORD);
const transporter = nodemailer.createTransport({

    host:"smtp.gmail.com",

    port:587,

    secure:false,

    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
    }

});


export default transporter;