import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./src/pages/Auth.css";

const API = "http://localhost:5000/api/v1/users";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState()

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("")

    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
      });

      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("role", res.data.data.user.role)
      localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data.data.user)
      );

      navigate("/");
      alert("login successfull")
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed"
      )
    }
  };

  const sendOTP = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/send-otp`, {
        email,
      });

      alert(res.data.message || "OTP sent successfully");
      setOtpSent(true);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("")

    if (!fullname || !username || !email || !password || !role) {
      alert("Please fill all required fields.");
      return;
    }

    if (!otp) {
      alert("Please enter OTP.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/verify-otp`, {
        email,
        otp,
      });

      const res = await axios.post(`${API}/register`, {
        fullname,
        username,
        email,
        password,
        role,
      });

      alert(res.data.message || "Registered successfully");

      setIsLogin(true);
      setPassword("");
      setOtp("");
      setOtpSent(false);

    } catch (error) {

     setErrorMessage(
      error.response?.data?.message || "Registration failed"
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
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {errorMessage && (
  <div className="errorBox">
    {errorMessage}
  </div>
)}

        <form
          className="auth-form"
          onSubmit={isLogin ? handleLogin : handleRegister}
        >
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full name"
                value={fullname}
                onChange={(e) => {setFullname(e.target.value)
                  setErrorMessage("")
                }}
              />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {setUsername(e.target.value)
                  setErrorMessage("")
                }}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {setEmail(e.target.value);
              setErrorMessage("")
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)
              setErrorMessage("")
            }}
          />

          {!isLogin && (
            <>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
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
                  onChange={(e) => {setOtp(e.target.value)
                    setErrorMessage("")
                  }}
                />
              )}
            </>
          )}

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;