export const otpTemplate = (otp)=>{

return `

<!DOCTYPE html>

<html>

<body style="font-family:Arial;background:#f5f5f5;padding:20px">


<div style="
max-width:500px;
margin:auto;
background:white;
padding:30px;
border-radius:10px;
">


<h2>
EventX Verification
</h2>


<p>
Use the OTP below to verify your account.
</p>


<h1 style="
letter-spacing:8px;
font-size:36px;
">

${otp}

</h1>


<p>
This OTP expires in 10 minutes.
</p>


<p>
If you did not request this, ignore this email.
</p>


</div>


</body>

</html>

`;

};