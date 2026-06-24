import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import UserHeader from './UserHeader';
import Footer from '../common/Footer';

function UserChangePassword() {
  const email = localStorage.getItem("userEmail");
  const APIURL = `http://localhost:8080/user/updateUserPassword/${email}`;

  const [passwordData, setPasswordData] = useState({
    oldpass: "",
    newpass: "",
    confirmpass: ""
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const [validate, setValidate] = useState(false);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const togglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidate(true);
      return;
    }

    if (passwordData.newpass !== passwordData.confirmpass) {
      Swal.fire({
        title: "New Password and Confirm Password do not match",
        icon: "error"
      });
      return;
    }

    try {
      const res = await axios.patch(APIURL, passwordData);
      if (res.data === "success") {
        Swal.fire({
          title: "Password Changed Successfully",
          icon: "success"
        });
        setPasswordData({ oldpass: "", newpass: "", confirmpass: "" });
        setValidate(false);
      } else {
        Swal.fire({
          title: "Incorrect Password",
          icon: "error"
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Something went wrong",
        text: "Please try again later",
        icon: "error"
      });
    }
  };

  // ===== Styles =====
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "100px 20px",
    background: "#f9f9f9",
    minHeight: "100vh"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "450px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s"
  };

  const headerStyle = {
    padding: "30px 20px",
    textAlign: "center"
  };

  const titleStyle = {
    fontWeight: "700",
    fontSize: "24px",
    marginBottom: "5px",
    color: "#333"
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#666"
  };

  const formSection = {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  };

  const inputWrapper = {
    position: "relative"
  };

  const inputStyle = {
    width: "100%",
    height: "45px",
    padding: "0 45px 0 15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const inputInvalidStyle = {
    borderColor: "#d63384"
  };

  const eyeIconStyle = {
    position: "absolute",
    right: "12px",
    top: "70%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#888",
    fontSize: "18px",
    transition: "color 0.2s"
  };

  const buttonStyle = {
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    fontWeight: "600",
    color: "white",
    letterSpacing: "0.5px",
    cursor: "pointer",
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s"
  };

  return (
    <>
      <UserHeader />

      <div style={wrapperStyle}>
        <div style={cardStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <h3 style={titleStyle}>Change Password</h3>
            <p style={subtitleStyle}>Update your account password below</p>
          </div>

          {/* Form Section */}
          <form
            style={formSection}
            className={`needs-validation ${validate ? "was-validated" : ""}`}
            onSubmit={handleSubmit}
            noValidate
          >
            {["old", "new", "confirm"].map((field) => {
              const fieldName = field === "old" ? "oldpass" : field === "new" ? "newpass" : "confirmpass";
              return (
                <div key={field} style={inputWrapper}>
                  <label style={{ marginBottom: "5px", display: "block", fontSize: "14px", color: "#555" }}>
                    {field === "old" ? "Old Password" : field === "new" ? "New Password" : "Confirm Password"}
                  </label>
                  <input
                    type={showPassword[field] ? "text" : "password"}
                    name={fieldName}
                    value={passwordData[fieldName]}
                    onChange={handleChange}
                    style={{ ...inputStyle, ...(validate && !passwordData[fieldName] ? inputInvalidStyle : {}) }}
                    required
                  />
                  <i
                    className={`fa ${showPassword[field] ? "fa-eye-slash" : "fa-eye"}`}
                    style={eyeIconStyle}
                    onClick={() => togglePassword(field)}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#6a11cb")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
                  ></i>
                  {validate && !passwordData[fieldName] && (
                    <div style={{ color: "#d63384", fontSize: "12px", marginTop: "3px" }}>
                      {field === "old" ? "Old password is required." : field === "new" ? "New password is required." : "Confirm password is required."}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UserChangePassword;