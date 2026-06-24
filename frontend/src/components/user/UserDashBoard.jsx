import React, { useEffect, useState } from "react";
import defaultProfilePic from "../../assets/pic3.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";
import Footer from "../common/Footer";

function UserDashBoard() {
  const email = localStorage.getItem("userEmail");
  const location = useLocation();
  const APIURL = `http://localhost:8080/user/userProfile/${email}`;

  const [userData, setUserData] = useState({ name: "", phone: "", city: "" });
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL);
        setUserData(response.data);

        let imageUrl = defaultProfilePic;
        if (location.state?.imageURL) imageUrl = location.state.imageURL;
        else if (response.data.profilePic)
          imageUrl = `http://localhost:8080/uploads/userprofileimages/${response.data.profilePic}`;

        setProfilePic(imageUrl);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <UserHeader />

      <div
        className="dashboard-container"
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          background: "#f5f5f5",
          minHeight: "calc(100vh - 90px)",
          padding: "40px 20px",
        }}
      >
        <div
          className="profile-card"
          style={{
            background: "#fff", // white background
            borderRadius: "20px",
            padding: "40px 50px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "15px",
            color: "#333", // dark text for contrast
            maxWidth: "500px",
            width: "100%",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <img
            src={profilePic}
            alt="profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #6a11cb",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "600", color: "#6a11cb" }}>
            {userData.name || "User"}
          </h2>

          <p style={{ margin: "0", fontSize: "16px" }}>
            <i className="fas fa-envelope me-2" style={{ color: "#6a11cb" }}></i>
            {email}
          </p>
          <p style={{ margin: "0", fontSize: "16px" }}>
            <i className="fas fa-phone me-2" style={{ color: "#6a11cb" }}></i>
            {userData.phone || "N/A"}
          </p>
          <p style={{ margin: "0", fontSize: "16px" }}>
            <i className="fas fa-city me-2" style={{ color: "#6a11cb" }}></i>
            {userData.city || "N/A"}
          </p>
        </div>
      </div>

      <Footer />

      <style>{`
        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
        }
      `}</style>
    </>
  );
}

export default UserDashBoard;