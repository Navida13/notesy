import React, { useState } from "react";
import {
  FaUserPlus,
  FaSignInAlt,
  FaUpload,
  FaShareAlt,
  FaDownload,
  FaPlay,
  FaUserShield,
} from "react-icons/fa";
import Header2 from "./Header2";

const Help2 = () => {
  const [active, setActive] = useState("guide");
  const [openFAQ, setOpenFAQ] = useState(null);

  const steps = [
    { icon: <FaUserPlus />, title: "Register Account", desc: "Sign up using your name, email, and password." },
    { icon: <FaSignInAlt />, title: "Login", desc: "Login using your credentials." },
    { icon: <FaUpload />, title: "Upload Notes", desc: "Upload or paste notes to summarize." },
    { icon: <FaPlay />, title: "Audio Playback", desc: "Listen to notes using TTS." },
    { icon: <FaShareAlt />, title: "Share Notes", desc: "Share notes via email." },
    { icon: <FaDownload />, title: "Download Notes", desc: "Download notes as PDF." },
    { icon: <FaUserShield />, title: "Admin Control", desc: "Admin manages platform." },
  ];

  const faqs = [
    { q: "How do I register?", a: "Click Register → Fill details → Submit." },
    { q: "How to upload notes?", a: "Go to dashboard → Upload file or paste text." },
    { q: "How AI works?", a: "AI generates summary automatically." },
    { q: "Can I listen?", a: "Yes, click Play button." },
    { q: "How to share?", a: "Enter email → Click Share." },
    { q: "Download notes?", a: "Click Download button." },
    { q: "Admin role?", a: "Admin manages users & system." },
  ];

  return (
    <>
      <Header2 />
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={{ marginBottom: "25px", fontSize: "24px", fontWeight: "700" }}>Help Center</h2>

          {["guide", "faq", "admin"].map((item) => (
            <div
              key={item}
              onClick={() => setActive(item)}
              style={{
                ...styles.menuItem,
                background: active === item ? "rgba(255,255,255,0.15)" : "transparent",
                color: active === item ? "#ffffff" : "#ddd",
                boxShadow: active === item ? "0 8px 20px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {item.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* GUIDE */}
          {active === "guide" && (
            <>
              <h1 style={styles.title}>How to Use Notesy</h1>
              <div style={styles.grid}>
                {steps.map((step, i) => (
                  <div
                    key={i}
                    style={styles.card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                      e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                    }}
                  >
                    <div style={styles.icon}>{step.icon}</div>
                    <h3 style={styles.cardTitle}>{step.title}</h3>
                    <p style={styles.cardDesc}>{step.desc}</p>
                  </div>
                ))}
              </div>

              <div style={styles.infoBox}>
                <h2>About Notesy</h2>
                <p>
                  Notesy helps you summarize, listen, and share notes easily using AI, with a smooth and beautiful interface.
                </p>
              </div>
            </>
          )}

          {/* FAQ */}
          {active === "faq" && (
            <>
              <h1 style={styles.title}>Frequently Asked Questions</h1>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={styles.faq}
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <h3 style={styles.faqQ}>{faq.q}</h3>
                  <p
                    style={{
                      maxHeight: openFAQ === i ? "120px" : "0px",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                      marginTop: openFAQ === i ? "10px" : "0px",
                      color: "#555",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </>
          )}

          {/* ADMIN */}
          {active === "admin" && (
            <>
              <h1 style={styles.title}>Admin Guide</h1>
              <div style={styles.adminBox}>
                <ul>
                  <li>View users</li>
                  <li>Monitor activity</li>
                  <li>Manage feedback</li>
                  <li>Ensure security</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

/* ================= STYLES ================= */
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f0ff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  sidebar: {
    width: "250px",
    background: "linear-gradient(180deg,#6a11cb,#8e2de2,#a044ff)",
    color: "#fff",
    padding: "25px 20px",
    boxShadow: "5px 0 20px rgba(0,0,0,0.1)",
    borderRadius: "0 25px 25px 0",
  },

  menuItem: {
    padding: "14px",
    margin: "12px 0",
    borderRadius: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    textAlign: "center",
    fontSize: "16px",
  },

  content: {
    flex: 1,
    padding: "50px 40px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#6a11cb",
    marginBottom: "25px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "all 0.25s ease",
  },

  icon: {
    fontSize: "32px",
    marginBottom: "12px",
    color: "#a044ff",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  cardDesc: {
    fontSize: "14px",
    color: "#555",
  },

  infoBox: {
    marginTop: "30px",
    padding: "22px",
    background: "#ffffff",
    borderLeft: "5px solid #8e2de2",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  faq: {
    background: "#fff",
    padding: "18px",
    marginBottom: "14px",
    borderRadius: "15px",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "all 0.25s ease",
  },

  faqQ: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#6a11cb",
  },

  adminBox: {
    background: "#fff",
    padding: "22px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
};

export default Help2;