import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({

    host:"smtp.gmail.com",

    port:587,

    secure:false,
    family : 4,

    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
    }

});


export default transporter;