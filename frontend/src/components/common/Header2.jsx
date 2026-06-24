import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header2 = () => {
  return (
    <>
      <nav style={styles.navbar} className="navbar navbar-expand-lg">
        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center logo" to="/" style={styles.logo}>
            <i className="fa-solid fa-book me-2"></i>
            <span>Notesy</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            style={{ border: "none" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* Left Side */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink style={styles.link} className="nav-link" to="/">
                  <i className="fa-solid fa-house me-1"></i> Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink style={styles.link} className="nav-link" to="/about">
                  <i className="fa-solid fa-circle-info me-1"></i> About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink style={styles.link} className="nav-link" to="/contact">
                  <i className="fa-solid fa-envelope me-1"></i> Contact
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink style={styles.link} className="nav-link" to="/fetchfeedback">
                  <i className="fa-solid fa-comments me-1"></i> Feedback
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink style={styles.link} className="nav-link" to="/help">
                  <i className="fa fa-question-circle me-1"></i> Help
                </NavLink>
              </li>

            </ul>

            {/* Right Side */}
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <NavLink style={styles.link} className="nav-link" to="/register/user">
                  <i className="fa-solid fa-user-plus me-1"></i> Register
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={styles.link}
                >
                  <i className="fa-solid fa-right-to-bracket me-1"></i> Login
                </a>

                <ul className="dropdown-menu dropdown-menu-end" style={styles.dropdown}>
                  <li>
                    <Link className="dropdown-item" to="/login/user">
                      <i className="fa-solid fa-user-graduate me-2"></i> User
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login/admin">
                      <i className="fa-solid fa-user-check me-2"></i> Admin
                    </Link>
                  </li>
                </ul>
              </li>

            </ul>

          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: "80px" }}></div>

      {/* 🔥 HOVER CSS */}
      <style>{`

        /* NAV LINKS */
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          left: 0;
          bottom: -5px;
          background: #ffffff;
          transition: 0.3s ease;
        }

        .nav-link:hover {
          color: #f3e8ff !important;
          transform: translateY(-2px);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          font-weight: 600;
        }

        .nav-link.active::after {
          width: 100%;
        }

        /* LOGO */
        .logo {
          transition: all 0.3s ease;
        }

        .logo:hover {
          transform: translateY(-2px);
        }

        .logo span {
          transition: 0.3s;
        }

        .logo:hover span {
          color: #ffffff;
          transform: scale(1.05);
        }

        /* DROPDOWN */
        .dropdown-item {
          transition: all 0.3s ease;
        }

        .dropdown-item:hover {
          background: #f3e8ff;
          padding-left: 18px;
        }

        /* TOGGLER FIX */
        .navbar-toggler:focus {
          box-shadow: none;
        }

      `}</style>
    </>
  );
};

export default Header2;


/* ================= STYLES ================= */

const styles = {

  navbar: {
    background: "linear-gradient(135deg, #4b0082, #7b2cbf)",
    padding: "14px 25px",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
  },

  logo: {
    color: "white",
    fontWeight: "700",
    fontSize: "22px",
    letterSpacing: "1px",
    textDecoration: "none"
  },

  link: {
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    marginRight: "18px",
    position: "relative",
    transition: "all 0.3s ease"
  },

  dropdown: {
    borderRadius: "12px",
    border: "none",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  }

};