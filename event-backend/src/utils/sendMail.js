import resend from "./mailer.js";




export const sendEmail = async ({ to, subject, html }) => {
  
await resend.emails.send({
  from: "onboarding@resend.dev",
 to,
    subject,
    html: html || `<p>${message}</p>`,
});
}