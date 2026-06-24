import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../common/Footer';

function ChangePassword() {
  const email = localStorage.getItem("adminEmail");
  const APIURL = `http://localhost:8080/admin/updatePassword/${email}`;
  const [passwordData, setPasswordData] = useState({ oldpass: "", newpass: "", confirmpass: "" });
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
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
        title: "New Password and Confirm Password don't match",
        icon: "error"
      });
      return;
    }

    try {
      const serverResponse = await axios.patch(APIURL, passwordData);
      const serverMessage = serverResponse.data;

      if (serverMessage === "success") {
        Swal.fire({
          title: "Password Changed Successfully",
          icon: "success"
        });
        setPasswordData({ oldpass: "", newpass: "", confirmpass: "" });
      } else {
        Swal.fire({
          title: "Incorrect Password",
          text: serverMessage,
          icon: "error"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error"
      });
    }
  };

  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f0f2f5",
    paddingTop: "90px",
  };

  const cardStyle = {
    width: "430px",
    borderRadius: "15px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
  };

  const headerStyle = {
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    color: "white",
    padding: "40px 20px 60px 20px",
    textAlign: "center",
    clipPath: "polygon(0 0,100% 0,100% 70%,0 100%)"
  };

  const iconStyle = {
    fontSize: "45px",
    marginBottom: "10px"
  };

  const titleStyle = {
    fontWeight: "600",
    marginTop: "10px"
  };

  const formSection = {
    padding: "30px"
  };

  const inputWrapper = {
    position: "relative",
    marginBottom: "15px"
  };

  const inputStyle = {
    borderRadius: "8px",
    padding: "10px 40px 10px 10px", // extra right padding for eye icon
    border: "1px solid #ced4da",
    width: "100%",
    boxSizing: "border-box"
  };

  const eyeStyle = {
    position: "absolute",
    right: "10px",
    top: "70%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#888"
  };

  const buttonStyle = {
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    border: "none",
    padding: "12px",
    borderRadius: "30px",
    fontWeight: "600",
    color: "white",
    letterSpacing: "0.5px",
    width: "100%",
    marginTop: "10px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  };

  return (
    <>
      <AdminHeader />

      <div style={wrapperStyle}>
        <div style={cardStyle}>

          {/* Header */}
          <div style={headerStyle}>
            <i className="fa-solid fa-key" style={iconStyle}></i>
            <h3 style={titleStyle}>Change Password</h3>
          </div>

          {/* Form */}
          <div style={formSection}>
            <form
              onSubmit={handleSubmit}
              className={`needs-validation ${validate ? "was-validated" : ""}`}
              noValidate
            >

              {/* Old Password */}
              <div style={inputWrapper}>
                <label className="form-label">Old Password</label>
                <input
                  type={showPassword.old ? "text" : "password"}
                  name="oldpass"
                  value={passwordData.oldpass}
                  required
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
                <i
                  className={`fa ${showPassword.old ? "fa-eye-slash" : "fa-eye"}`}
                  style={eyeStyle}
                  onClick={() => togglePassword("old")}
                />
              </div>

              {/* New Password */}
              <div style={inputWrapper}>
                <label className="form-label">New Password</label>
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="newpass"
                  value={passwordData.newpass}
                  required
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
                <i
                  className={`fa ${showPassword.new ? "fa-eye-slash" : "fa-eye"}`}
                  style={eyeStyle}
                  onClick={() => togglePassword("new")}
                />
              </div>

              {/* Confirm Password */}
              <div style={inputWrapper}>
                <label className="form-label">Confirm Password</label>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmpass"
                  value={passwordData.confirmpass}
                  required
                  className="form-control"
                  style={inputStyle}
                  onChange={handleChange}
                />
                <i
                  className={`fa ${showPassword.confirm ? "fa-eye-slash" : "fa-eye"}`}
                  style={eyeStyle}
                  onClick={() => togglePassword("confirm")}
                />
              </div>

              <button type="submit" style={buttonStyle}>Change Password</button>

            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ChangePassword;