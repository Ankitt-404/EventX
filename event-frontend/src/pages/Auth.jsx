import { useState } from "react";
import "./Auth.css";


import axios from "axios";

const API = "http://localhost:5000/api/v1/users";
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [loading, setLoading] = useState(false);
const [otpSent, setOtpSent] = useState(false);

const sendOTP = async () => {

    if (!email) {
        alert("Please enter your email first.");
        return;
    }
    try {

        setLoading(true);

        const res = await axios.post(`${API}/send-otp`, {
            email
        });

        alert(res.data.message);

        setOtpSent(true);

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Failed to send OTP"
        );

    } finally {

        setLoading(false);

    }

};
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>EventX</h1>
        <p>{isLogin ? "Welcome back" : "Create your account"}</p>

        <div className="toggle-box">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form>
          {!isLogin && (
            <>
              <input type="text" placeholder="Full name" />
              <input type="text" placeholder="Username" />
            </>
          )}

         <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
/>
          <input type="password" placeholder="Password" />

          <form>
 

  {!isLogin && (
    <>
      <select defaultValue="">
        <option value="" disabled>
          Select Role
        </option>
        <option value="user">User</option>
        <option value="organiser">Organiser</option>
        <option value="admin">Admin</option>
      </select>

      <button
        className="otp-button"
        type="button"
        onClick={sendOTP}
        disabled={loading}
      >
        {loading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
      </button>

      {otpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}
    </>
  )}

  <button className="submit-btn" type="submit">
    {isLogin ? "Login" : "Register"}
  </button>

</form>
</form>
      </div>
    </div>
  );
}

export default Auth;