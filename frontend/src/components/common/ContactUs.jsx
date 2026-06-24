import React, { useState } from "react";
import Header2 from "./Header2";
import Footer from "./Footer";
import Swal from "sweetalert2";
import axios from "axios";

function ContactUs() {
  const APIURL = "http://localhost:8080/addContact";

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
  });

  const [validate, setValidate] = useState(false);
  const [hover, setHover] = useState(false);

  const fetchData = (e) => {
    const { name, value } = e.target;

    const alphaRegex = /^[A-Za-z\s]*$/;
    const numberRegex = /^[0-9]*$/;

    if (name === "name" && !alphaRegex.test(value)) {
      Swal.fire("Invalid Format", "Only alphabets allowed", "error");
      return;
    }

    if (name === "phone" && !numberRegex.test(value)) {
      Swal.fire("Invalid Format", "Only numbers allowed", "error");
      return;
    }

    setData({ ...data, [name]: value });
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
      const res = await axios.post(APIURL, data);
      Swal.fire("Success", res.data, "success");

      setData({
        name: "",
        email: "",
        phone: "",
        question: "",
      });
      setValidate(false);
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  //////////////////////////////////////
  // ✨ STYLES
  //////////////////////////////////////

  const wrapperStyle = {
    minHeight: "100vh",
    padding: "120px 20px 60px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    width: "480px",
    padding: "45px",
    borderRadius: "24px",
    background: "#ffffff",
    boxShadow: "0 20px 60px rgba(106,17,203,0.15)",
    border: "1px solid #f1e9ff",
    transition: "0.3s",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "8px",
    fontWeight: "700",
    fontSize: "28px",
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
    transition: "all 0.3s ease",
  };

  const invalidStyle = {
    borderColor: "#d63384",
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #6a11cb, #a78bfa)",
    color: "white",
    border: "none",
    padding: "13px",
    borderRadius: "30px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    transition: "all 0.3s ease",
  };

  return (
    <>
      <div style={wrapperStyle}>
        <Header2 />
        <div style={cardStyle}>
          <h2 style={headingStyle}>📬 Contact Us</h2>
          <p style={subText}>
            We'd love to hear from you. Send your queries anytime 💜
          </p>

          <form
            onSubmit={submitForm}
            className={`needs-validation ${validate ? "was-validated" : ""}`}
            noValidate
          >
            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="👤 Full Name"
              style={{ ...inputStyle, ...(validate && !data.name ? invalidStyle : {}) }}
              required
              value={data.name}
              onChange={fetchData}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b388ff")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            {validate && !data.name && (
              <div className="invalid-feedback" style={{ color: "#d63384" }}>
                Name is required.
              </div>
            )}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              style={{ ...inputStyle, ...(validate && !data.email ? invalidStyle : {}) }}
              required
              value={data.email}
              onChange={fetchData}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b388ff")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            {validate && !data.email && (
              <div className="invalid-feedback" style={{ color: "#d63384" }}>
                Valid email is required.
              </div>
            )}

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              placeholder="📱 Phone Number"
              style={{ ...inputStyle, ...(validate && !data.phone ? invalidStyle : {}) }}
              required
              value={data.phone}
              onChange={fetchData}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b388ff")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            {validate && !data.phone && (
              <div className="invalid-feedback" style={{ color: "#d63384" }}>
                Phone number is required.
              </div>
            )}

            {/* MESSAGE */}
            <textarea
              name="question"
              rows="4"
              placeholder="💬 Write your message..."
              style={{ ...inputStyle, ...(validate && !data.question ? invalidStyle : {}) }}
              required
              value={data.question}
              onChange={fetchData}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #b388ff")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            {validate && !data.question && (
              <div className="invalid-feedback" style={{ color: "#d63384" }}>
                Message is required.
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="btn w-100"
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
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactUs;