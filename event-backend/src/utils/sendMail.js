import resend from "./mailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  
  try{
    console.log("to:", to)
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
    console.log("Successfull", response)
    return response
  }
  catch(error){
    console.error(error)
    throw error
  }
}