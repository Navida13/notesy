import React from "react";
import { Link } from "react-router-dom";
import "../../css/footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-section">
          <h2 className="logo">
            <span className="logo-icon">📘</span> Notesy
          </h2>
          <p className="tagline">
            Smarter studying with AI-powered notes and summaries.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">🏠 <span>Home</span></Link></li>
            <li><Link to="/about">ℹ️ <span>About</span></Link></li>
            <li><Link to="/contact">✉️ <span>Contact</span></Link></li>
            <li><Link to="/help">❓ <span>Help</span></Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h4 className="footer-title">Contact</h4>
          <p><span>📧</span> support@notesy.com</p>
          <p><span>📍</span> India</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© {year} Notesy • Made with ❤️</p>
      </div>
    </footer>
  );
}

export default Footer;