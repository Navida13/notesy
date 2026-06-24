import React, { useState } from "react";
import Header2 from "../common/Header2";
import Footer from "../common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminLogin() {
  const navigate = useNavigate();
  const APIURL = "http://localhost:8080/admin/login";

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [hover, setHover] = useState(false);
  const [validate, setValidate] = useState(false);

  const fetchUserData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidate(true);
      return;
    }

    try {
      const serverResponse = await axios.post(APIURL, data);
      const serverMessage = serverResponse.data;

      if (serverMessage === "success") {
        localStorage.setItem("adminEmail", data.email);
        navigate("/admindashboard");
      } else {
        Swal.fire({ text: serverMessage, icon: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////
  // ✨ STYLES
  //////////////////////////////////////

  const wrapperStyle = {
    minHeight: "100vh",
    padding: "120px 20px 60px",
    background: "#f4f0ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
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
    marginBottom: "15px",
    outline: "none",
    transition: "all 0.3s ease",
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

  const linkStyle = {
    textDecoration: "none",
    fontSize: "14px",
    color: "#555",
  };

  const backHomeStyle = {
    color: "#6a11cb",
    cursor: "pointer",
    marginLeft: "5px",
  };

  return (
    <>
      <div style={wrapperStyle}>
        <Header2 />
        <div style={cardStyle}>
          <h2 style={headingStyle}>🔑 Admin Login</h2>
          <p style={{ textAlign: "center", color: "#777", marginBottom: "30px" }}>
            Secure access for administrators 💼
          </p>

          <form
            onSubmit={submitForm}
            className={`needs-validation ${validate ? "was-validated" : ""}`}
            noValidate
          >
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              style={inputStyle}
              required
              value={data.email}
              onChange={fetchUserData}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b388ff")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <div className="invalid-feedback">Please enter a valid email.</div>

            {/* PASSWORD */}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="🔒 Password"
              style={inputStyle}
              required
              value={data.password}
              onChange={fetchUserData}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b388ff")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <div className="invalid-feedback">Password is required.</div>

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
            <button
              type="submit"
              style={{
                ...buttonStyle,
                transform: hover ? "translateY(-3px) scale(1.03)" : "scale(1)",
                boxShadow: hover
                  ? "0 12px 30px rgba(106,17,203,0.4)"
                  : "0 5px 15px rgba(106,17,203,0.2)",
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Sign In 🚀
            </button>

            {/* LINKS */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a
                href="#"
                style={linkStyle}
                onClick={() => navigate("/adminforgotpassword")}
              >
                Forgot Password?
              </a>
              <p style={{ marginTop: "10px", fontSize: "14px" }}>
                Back to
                <span style={backHomeStyle} onClick={() => navigate("/")}>
                  Home
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

export default AdminLogin;