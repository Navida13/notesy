import React from "react";
import Header from "./Header2";
import Footer from "./Footer";

function AboutUs() {

  //////////////////////////////////////
  // ✨ STYLES
  //////////////////////////////////////

  const container = {
    minHeight: "100vh",
    paddingTop:"100px",
    paddingBottom:"60px",
    background: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const hero = {
    textAlign: "center",
    marginBottom: "60px",
  };

  const heading = {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#6a11cb",
  };

  const subText = {
    fontSize: "18px",
    color: "#555",
  };

  const section = {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const card = {
    width: "280px",
    padding: "25px",
    borderRadius: "18px",
    background: "#ffffff",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const icon = {
    fontSize: "32px",
    marginBottom: "12px",
    color: "#6a11cb",
    transition: "all 0.3s ease",
  };

  const aboutBox = {
    maxWidth: "900px",
    margin: "60px auto 0",
    background: "#f9f9ff",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    lineHeight: "1.7",
    color: "#333",
  };

  return (
    <>
      <div style={container}>
        <Header />

        {/* HERO */}
        <div style={hero}>
          <h1 style={heading}>About Notesy</h1>
          <p style={subText}>
            Smart way to learn, summarize and share notes using AI 🚀
          </p>
        </div>

        {/* FEATURES */}
        <div style={section}>
          {[
            { icon: "⚡", title: "Fast AI", desc: "Generate summaries instantly with powerful AI technology." },
            { icon: "📄", title: "Smart Notes", desc: "Organize and manage notes in a clean and efficient way." },
            { icon: "🔗", title: "Easy Sharing", desc: "Share notes securely with friends and classmates." },
          ].map((item, i) => (
            <div
              key={i}
              style={card}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 20px 35px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
              }}
            >
              <div style={icon}>{item.icon}</div>
              <h4 style={{ marginBottom: "10px", fontWeight: "600", fontSize: "20px" }}>{item.title}</h4>
              <p style={{ color: "#555" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ABOUT DETAILS */}
        <div style={aboutBox}>
          <h3 style={{ marginBottom: "15px", fontWeight: "600", color:"#6a11cb" }}>
            What is Notesy?
          </h3>

          <p>
            Notesy is an AI-powered platform designed to help students and professionals 
            simplify their study process. It allows users to upload notes, generate 
            summaries instantly, listen to audio explanations, and share notes securely.
          </p>

          <p>
            Our goal is to make learning faster, smarter, and more efficient by using 
            modern AI technology. Whether you're preparing for exams or managing daily 
            notes, Notesy helps you stay organized and productive.
          </p>

          <p>
            With features like summarization, file sharing, and audio playback, Notesy 
            ensures that your learning experience is smooth and engaging.
          </p>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default AboutUs;