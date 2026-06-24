import React from "react";
import Header2 from "./Header2";

function FetchFeedBackDetails({ feedbackArray, name }) {
  const wrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
    padding: "20px",
    margin: "40px auto",
    maxWidth: "1200px",
  };

  const headerStyle = {
    textAlign: "center",
    marginTop: "40px",
    color: "#4B0082", // deep purple
  };

  const cardStyle = {
    width: "340px",
    borderRadius: "15px",
    padding: "25px",
    background: "linear-gradient(145deg, #E6E6FA, #D8BFD8)", // light purple gradient
    boxShadow: "0 10px 30px rgba(75, 0, 130, 0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "#2E0854", // dark purple for text
  };

  const titleStyle = {
    fontWeight: "700",
    fontSize: "18px",
    marginBottom: "12px",
    textAlign: "center",
    color: "#4B0082",
  };

  const textStyle = {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#2E0854",
  };

  const renderStars = (rating) => {
    // use purple stars for ratings
    return (
      <span style={{ color: "#800080" }}>
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </span>
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#F5F0FF", minHeight: "100vh" }}>
      <Header2 />

      {/* HEADER CONTENT */}
      <div style={headerStyle}>
        <h2 style={{ fontSize: "28px" }}>💜 User Feedback</h2>
        <p style={{ fontSize: "16px" }}>
          See what users are saying about <strong>{name}</strong>
        </p>
        <p style={{ fontSize: "14px", color: "#9b59b6" }}>
          Total Feedback: {feedbackArray.length}
        </p>
      </div>

      {/* EMPTY STATE */}
      {feedbackArray.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "50px", color: "#9b59b6", fontSize: "16px" }}>
          No feedback available yet.
        </p>
      )}

      {/* FEEDBACK CARDS */}
      <div style={wrapperStyle}>
        {feedbackArray.map((feedback, index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(75,0,130,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(75,0,130,0.1)";
            }}
          >
            <h5 style={titleStyle}>👤 Feedback</h5>

            <p style={textStyle}>
              ⭐ <strong>Rating:</strong> {renderStars(feedback.rating)}
            </p>

            <p style={textStyle}>
              💬 <strong>Review:</strong> {feedback.review}
            </p>

            <p style={textStyle}>
              <strong>Posted By:</strong> {feedback.user?.name || "Anonymous"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchFeedBackDetails;