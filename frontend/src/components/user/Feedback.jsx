import React, { useState } from 'react';
import axios from 'axios';
import UserHeader from './UserHeader';
import { FaHeart } from 'react-icons/fa';
import Footer from '../common/Footer';

function Feedback() {
  const APIURL = "http://localhost:8080/feedback";
  const email = localStorage.getItem("userEmail");

  const [data, setData] = useState({ email: email, rating: "", review: "" });

  const fetchData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await axios.post(APIURL, data);
      console.log("Sent by Spring Boot: ", serverResponse);
      alert("💖 Thank you for your feedback! It helps us grow.");
      setData({ ...data, rating: "", review: "" });
    } catch (error) {
      console.log(error);
      alert("❌ Error submitting feedback. Please try again.");
    }
  }

  // ===== Styles =====
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "100px 20px",
    background: "linear-gradient(135deg,#f0f4ff,#ffffff)",
    minHeight: "100vh"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "#fff",
    padding: "50px 40px",
    borderRadius: "25px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    transition: "transform 0.3s ease",
    position: "relative"
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
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    boxShadow: "0 6px 20px rgba(106,17,203,0.4)",
    letterSpacing: "0.5px",
    marginTop: "10px",
    transition: "all 0.3s ease"
  };

  const inputStyle = {
    borderRadius: "12px",
    padding: "12px",
    border: "1px solid #ddd",
    width: "100%",
    marginBottom: "15px"
  };

  const heartStyle = {
    color: "#e63946",
    marginRight: "8px"
  };

  return (
    <>
      <UserHeader />

      <div style={wrapperStyle}>
        <div style={cardStyle}>
          {/* Heartwarming header */}
          <h2 style={{ textAlign: "center", color: "#6a11cb", fontWeight: "700" }}>
            <FaHeart style={heartStyle} /> Share Your Thoughts
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: "30px", lineHeight: "1.6" }}>
            Your voice matters to us 💜! By sharing your feedback, you're helping us make Notesy better for everyone. 
            Every suggestion, compliment, or concern is truly appreciated.
          </p>

          <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={data.email}
              onChange={fetchData}
              style={inputStyle}
              required
            />

            <select
              name="rating"
              value={data.rating}
              onChange={fetchData}
              style={inputStyle}
              required
            >
              <option value="">Select Rating</option>
              <option>⭐</option>
              <option>⭐⭐</option>
              <option>⭐⭐⭐</option>
              <option>⭐⭐⭐⭐</option>
              <option>⭐⭐⭐⭐⭐</option>
            </select>

            <textarea
              name="review"
              rows="5"
              placeholder="Write your feedback here..."
              value={data.review}
              onChange={fetchData}
              style={inputStyle}
              required
            />

            <button type="submit" style={buttonStyle}>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Feedback;