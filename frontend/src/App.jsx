import Footer from "./components/common/Footer";
import { useNavigate } from "react-router-dom";
import Header2 from "./components/common/Header2";
import "./css/style.css";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Header2 />

      <div style={styles.container}>

        {/* HERO SECTION */}
        <div style={styles.heroBox} className="heroBox">
          <h1 style={styles.heading}>Welcome to Notesy</h1>

          <p style={styles.subText}>
            Transform your notes into smart summaries with AI.
            Learn faster, share easier, and stay ahead.
          </p>

          <div style={{ marginTop: "30px" }}>
            <button className="btn-primary-custom"
            onClick={() => navigate("/login/user")}>Get Started</button>
            <button className="btn-outline-custom"
            onClick={() => navigate("/about")}>Learn More</button>
          </div>
        </div>

        {/* FEATURES */}
        <div style={styles.features}>
          <div style={styles.card} className="feature-card">
            <div style={styles.icon}>⚡</div>
            <h3>Fast Summarization</h3>
            <p>Generate accurate summaries instantly using AI.</p>
          </div>

          <div style={styles.card} className="feature-card">
            <div style={styles.icon}>📄</div>
            <h3>Smart Notes</h3>
            <p>Organize and manage your notes efficiently.</p>
          </div>

          <div style={styles.card} className="feature-card">
            <div style={styles.icon}>🔗</div>
            <h3>Easy Sharing</h3>
            <p>Share notes securely with anyone in seconds.</p>
          </div>

          <div style={styles.card} className="feature-card">
            <div style={styles.icon}>🎧</div>
            <h3>Audio Support</h3>
            <p>Listen to your notes anytime with TTS.</p>
          </div>
        </div>

      </div>

      <Footer />

      

    </>
  );
}

export default App;


/* ================= BASE STYLES ================= */

const styles = {

  container: {
    minHeight: "100vh",
    paddingTop: "120px",
    background: "linear-gradient(135deg, #6a11cb, #a78bfa)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  heroBox: {
    width: "70%",
    padding: "60px",
    borderRadius: "25px",
    textAlign: "center",
    color: "white",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
    marginBottom: "40px",
    transition: "0.4s"
  },

  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px"
  },

  subText: {
    fontSize: "18px",
    opacity: "0.9"
  },

  features: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom:"20px"
  },

  card: {
    width: "250px",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
    background: "white",
    color: "#333",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },

  icon: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#6a11cb"
  }
};