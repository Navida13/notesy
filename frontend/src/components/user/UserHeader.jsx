import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      localStorage.removeItem("userEmail");
      navigate("/login/user");
    }
  };

  const gradientStyle = {
  background: "linear-gradient(135deg, #4b0082, #7b2cbf)", // darker purple gradient
  boxShadow: "none",
};

  return (
    <>
      {/* ===== Navbar ===== */}
      <nav
        className="navbar navbar-dark fixed-top px-3"
        style={{ ...gradientStyle, height: "60px" }}
      >
        <div className="container-fluid d-flex justify-content-between">
          <span className="navbar-brand mb-0 h5 text-white fw-bold">
            User Dashboard
          </span>

          <button
            className="btn btn-outline-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* ===== Sidebar ===== */}
      <div
        className="user-sidebar text-white"
        style={{
          right: isOpen ? "0" : "-250px",
          ...gradientStyle,
        }}
      >
        <div className="text-center mb-4">
          <i className="fa-solid fa-user-circle fs-1 mb-2"></i>
          <h6>Hello User</h6>
        </div>

        <ul className="nav flex-column px-3">
          <li className="nav-item mb-2">
            <Link
              to="/userdashboard"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-house me-2"></i> Home
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/login/uploadNotes"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-file-pdf me-2"></i> Upload Notes
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/feedback"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-comment-dots me-2"></i> Feedback
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/usereditprofile"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-user-pen me-2"></i> Edit Profile
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/userchangepassword"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-key me-2"></i> Change Password
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/useruploadprofile"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-file me-2"></i> Upload Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/fetchhistory"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-file me-2"></i> Notes History
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/sharenotes"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-user-pen me-2"></i> Share Notes
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/viewnotes"
              className="nav-link menu-item text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-file me-2"></i> View Notes
            </Link>
          </li>

          {/* ===== Logout link with text-only highlight ===== */}
          <li className="nav-item mt-3">
            <span
              className="nav-link d-flex align-items-center"
              onClick={logout}
              style={{ cursor: "pointer", padding: "10px 0" }}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              <span className="logout-text text-white">Logout</span>
            </span>
          </li>
        </ul>
      </div>

      {/* ===== Overlay ===== */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: 998,
          }}
        />
      )}

      {/* ===== Styles ===== */}
      <style>{`
        .user-sidebar {
          position: fixed;
          top: 0;
          width: 250px;
          height: 100vh;
          transition: right 0.3s ease;
          padding-top: 70px;
          z-index: 999;
        }

        .menu-item {
          border-radius: 6px;
          padding: 10px;
          transition: all 0.3s ease;
        }

        .menu-item:hover {
          background-color: rgba(255,255,255,0.15);
          padding-left: 12px;
          color: white !important;
        }

        /* Only the text "Logout" is highlighted */
        .logout-text {
          font-weight: 600;
          color: red; /* bright highlight color */
          transition: all 0.3s ease;
        }

        .logout-text:hover {
          color: #ffffff; /* changes to white on hover */
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

export default UserHeader;