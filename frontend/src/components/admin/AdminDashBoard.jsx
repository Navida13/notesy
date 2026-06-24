import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import defaultProfilePic from "../../assets/pic3.jpg";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Footer from '../common/Footer';

function AdminDashBoard() {
  const email = localStorage.getItem("adminEmail");
  const location = useLocation();
  const APIURL = `http://localhost:8080/admin/adminProfile/${email}`;

  const [adminData, setAdminData] = useState({ name: "", phone: "" });
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL);
        setAdminData(response.data);

        let imageUrl = defaultProfilePic;

        // If image came from navigation (after upload)
        if (location.state?.imageURL) {
          imageUrl = location.state.imageURL;
        }
        // If image exists in database
        else if (response.data.profilePic) {
          imageUrl = `http://localhost:8080/uploads/profileimages/${response.data.profilePic}`;
        }

        setProfilePic(imageUrl);
      } catch (error) {
        console.log("Error fetching admin data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminHeader />

      <div style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingTop: "100px",
        paddingLeft: "120px",
        paddingRight: "40px",
        boxSizing: "border-box"
      }}>
        <div style={{
          maxWidth: "800px",
          backgroundColor: "#f9f9f9",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}>

          <img
            src={profilePic}
            alt="profile"
            width="120"
            height="120"
            style={{ borderRadius: "50%", objectFit: "cover", border: "3px solid #a78bfa" }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
              <i className='fas fa-user-circle me-2'></i> Hello {adminData.name}
            </span>
            <span style={{ fontSize: "16px", color: "#555" }}>
              <i className='fas fa-envelope me-2'></i> {email}
            </span>
            {adminData.phone && (
              <span style={{ fontSize: "16px", color: "#555" }}>
                <i className='fas fa-phone me-2'></i> {adminData.phone}
              </span>
            )}
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default AdminDashBoard;