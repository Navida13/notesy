import React, { useState } from "react";
import Header2 from "../common/Header2";
import Footer from "../common/Footer";
import Swal from "sweetalert2";
import axios from "axios";

function Registration() {
  const APIURL = "http://localhost:8080/user/registration";

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const [hover, setHover] = useState(false);

  const fetchUserData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await axios.post(APIURL, data);
      localStorage.setItem("userEmail", data.email);
      Swal.fire("Success", "Registration Successful!", "success");
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.log(error);
    }
  };

  // ===== STYLES =====
  const wrapperStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:"#ffff",
    // background: "linear-gradient(135deg, #6a11cb, #a78bfa)",
    padding: "120px 20px",
  };

  const cardStyle = {
    width: "480px",
    padding: "40px 35px",
    borderRadius: "25px",
    background: "#ffffff",
    boxShadow: "0 20px 60px rgba(106,17,203,0.15)",
    transition: "0.3s",
  };

  const headingStyle = {
    textAlign: "center",
    fontWeight: "700",
    fontSize: "28px",
    marginBottom: "10px",
    color: "#6a11cb",
  };

  const subText = {
    textAlign: "center",
    fontSize: "14px",
    color: "#777",
    marginBottom: "30px",
  };

  const inputStyle = {
    borderRadius: "12px",
    padding: "12px",
    border: "1px solid #ddd",
    marginBottom: "15px",
    outline: "none",
    width: "100%",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
    background: "linear-gradient(135deg, #6a11cb, #a78bfa)",
    boxShadow: hover
      ? "0 12px 30px rgba(106,17,203,0.4)"
      : "0 5px 15px rgba(106,17,203,0.2)",
    letterSpacing: "0.5px",
    marginTop: "10px",
    transition: "all 0.3s ease",
    transform: hover ? "translateY(-3px) scale(1.03)" : "scale(1)",
  };

  return (
    <>
      {/* <Header2 /> */}
      <div style={wrapperStyle}>
        <Header2/>
        <div style={cardStyle}>
          <h2 style={headingStyle}>🎉 Create Account</h2>
          <p style={subText}>Join Notesy and start organizing your notes effortlessly 💜</p>

          <form onSubmit={submitForm}>
            <input
              type="text"
              name="name"
              placeholder="👤 Full Name"
              style={inputStyle}
              value={data.name}
              onChange={fetchUserData}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              style={inputStyle}
              value={data.email}
              onChange={fetchUserData}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="🔒 Password"
              style={inputStyle}
              value={data.password}
              onChange={fetchUserData}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="📱 Phone Number"
              style={inputStyle}
              value={data.phone}
              onChange={fetchUserData}
              required
            />
            <select
              name="city"
              value={data.city}
              onChange={fetchUserData}
              style={inputStyle}
              required
            >
              <option value="">Select City</option>
              <option>Lucknow</option>
              <option>Allahabad</option>
              <option>Dehradun</option>
            </select>

            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Register 🚀
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Registration;