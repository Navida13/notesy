import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../common/Footer';

function UserEditProfile() {
  const email = localStorage.getItem("userEmail");
  const APIURL = `http://localhost:8080/user/userProfile/${email}`;
  const EDITAPIURL = `http://localhost:8080/user/userEditProfile/${email}`;

  const [userdata, setUserData] = useState({ name: "", phone: "", city: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(APIURL);
        setUserData({
          name: res.data.name,
          phone: res.data.phone,
          city: res.data.city
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [APIURL]);

  const handleChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(EDITAPIURL, userdata);
      Swal.fire({
        title: "Profile Updated",
        text: "Your profile has been updated successfully",
        icon: "success"
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Failed to update profile",
        icon: "error"
      });
    }
  };

  // ===== Styles =====
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "100px 20px",
    background: "linear-gradient(135deg,#dfe9f3,#ffffff)",
    minHeight: "100vh"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "transform 0.3s ease"
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    letterSpacing: "0.5px",
    marginTop: "10px",
    transition: "all 0.3s ease"
  };

  const inputStyle = {
    borderRadius: "12px",
    padding: "12px",
    border: "1px solid #ddd",
    width: "100%",
    marginBottom: "15px"
  };

  return (
    <>
      <UserHeader />

      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center", color: "#6a11cb", fontWeight: "700" }}>
            Edit Profile
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
            Update your profile information
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userdata.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={userdata.phone}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={userdata.city}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <button type="submit" style={buttonStyle}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
        <Footer/>
    </>
  );
}

export default UserEditProfile;