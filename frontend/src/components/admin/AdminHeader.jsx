import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    const email = localStorage.getItem("adminEmail");
    if (email) {
      localStorage.removeItem("adminEmail");
      navigate("/login/admin");
    }
  };

  const gradientStyle = {
    background: "linear-gradient(135deg, #4b0082, #7b2cbf)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
  };

  return (
    <>
      {/* ===== Navbar ===== */}
      <nav
        className="navbar navbar-dark fixed-top px-3"
        style={{ ...gradientStyle, height: "60px", zIndex: 1000 }}
      >
        <div className="container-fluid d-flex justify-content-between">
          <button
            className="btn btn-outline-light"
            onClick={() => setIsOpen(!isOpen)}
            style={{ border: "none" }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <span className="navbar-brand mb-0 h5 text-white fw-bold">
            Admin Dashboard
          </span>
        </div>
      </nav>

      {/* ===== Sidebar ===== */}
      <div
        className="admin-sidebar text-white"
        style={{
          left: isOpen ? "0" : "-250px",
          ...gradientStyle,
          position: "fixed",
          top: 0,
          width: "250px",
          height: "100vh",
          transition: "left 0.3s ease",
          paddingTop: "70px",
          zIndex: 999,
        }}
      >
        {/* Admin Info */}
        <div className="text-center mb-4">
          <i className="fa-solid fa-user-shield fs-1 mb-2"></i>
          <h6>Hello Admin</h6>
        </div>

        {/* Menu Items */}
        <ul className="nav flex-column px-3">
          {[
            { to: "/admindashboard", icon: "fa-gauge", label: "Dashboard" },
            { to: "/allUsers", icon: "fa-user-circle", label: "Users" },
            { to: "/allContacts", icon: "fa-users", label: "Contacts" },
            { to: "/allFeedBack", icon: "fa-comment-dots", label: "Feedback" },
            { to: "/admineditprofile", icon: "fa-user-pen", label: "Edit Profile" },
            { to: "/uploadprofile", icon: "fa-image", label: "Upload Image" },
            { to: "/changepassword", icon: "fa-gear", label: "Settings" },
          ].map((item, idx) => (
            <li key={idx} className="nav-item mb-2">
              <Link
                to={item.to}
                className="nav-link menu-item text-white"
                onClick={() => setIsOpen(false)}
              >
                <i className={`fa-solid ${item.icon} me-2`}></i> {item.label}
              </Link>
            </li>
          ))}

          <li className="logout mt-2">
            <button
              className="btn btn-link text-white"
              style={{ textDecoration: "none" }}
              onClick={logout}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Logout
            </button>
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
        .admin-sidebar {
          position: fixed;
          top: 0;
          width: 250px;
          height: 100vh;
          transition: left 0.3s ease;
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
      `}</style>
    </>
  );
}

export default AdminHeader;