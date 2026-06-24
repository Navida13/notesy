import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from "../common/Header2";
import Footer from "../common/Footer";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const APIURL = "http://localhost:8080/user/login";

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Handle input changes
  const fetchUserData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!data.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email format is invalid";
      valid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Submit form
  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const serverResponse = await axios.post(APIURL, data);
      const serverMessage = serverResponse.data;

      if (serverMessage === "success") {
        localStorage.setItem("userEmail", data.email);
        navigate("/userdashboard");
      } else {
        Swal.fire({text:serverMessage,icon:"error"});
        // alert(serverMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✨ STYLES
  const wrapperStyle = {
    minHeight: "100vh",
    padding: "120px 20px 60px",
    background: "#f4f0ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    width: "400px",
    padding: "45px",
    borderRadius: "24px",
    background: "#ffffff",
    boxShadow: "0 20px 60px rgba(106,17,203,0.15)",
    border: "1px solid #f1e9ff",
    transition: "0.3s",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "700",
    fontSize: "28px",
    color: "#6a11cb",
  };

  const inputStyle = {
    borderRadius: "12px",
    padding: "12px",
    border: "1px solid #ddd",
    marginBottom: "5px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #6a11cb, #a78bfa)",
    color: "white",
    border: "none",
    padding: "13px",
    borderRadius: "30px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    width: "100%",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const linkStyle = { textDecoration: "none", fontSize: "14px", color: "#555" };
  const registerStyle = { color: "#6a11cb", cursor: "pointer", marginLeft: "5px" };

  return (
    <>
      <div style={wrapperStyle}>
        <Header2 />
        <div style={cardStyle}>
          <h2 style={headingStyle}>🔑 Login to Notesy</h2>
          <p style={{ textAlign: "center", color: "#777", marginBottom: "30px" }}>
            Access your dashboard and manage your notes easily 💜
          </p>

          <form onSubmit={submitForm} noValidate>
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              style={inputStyle}
              value={data.email}
              onChange={fetchUserData}
            />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}

            {/* PASSWORD */}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="🔒 Password"
              style={inputStyle}
              value={data.password}
              onChange={fetchUserData}
            />
            {errors.password && <div style={errorStyle}>{errors.password}</div>}

            {/* SHOW PASSWORD */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label">Show Password</label>
            </div>

            {/* BUTTON */}
            <button type="submit" style={buttonStyle}>
              Sign In 🚀
            </button>

            {/* LINKS */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a href="#" style={linkStyle} onClick={() => navigate("/forgotpassword")}>
                Forgot Password?
              </a>
              <p style={{ marginTop: "10px", fontSize: "14px" }}>
                Don't have an account?
                <span style={registerStyle} onClick={() => navigate("/register")}>
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;