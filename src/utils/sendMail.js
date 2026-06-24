import transporter from "./mailer.js";



export const sendEmail = async({
    email,
    subject,
    html
})=>{


await transporter.sendMail({

    from:`EventX <${process.env.SMTP_EMAIL}>`,

    to:email,

    subject,

    html

});


};