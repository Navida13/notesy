import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import { FaCamera } from 'react-icons/fa';
import Footer from '../common/Footer';
import Swal from 'sweetalert2';

function UserProfileUpload() {
  const navigate = useNavigate();
  const UPLOADURL = "http://localhost:8080/user/uploadUserPic";
  const email = localStorage.getItem("userEmail");

  const [profilePic, setProfilePic] = useState(null);
  const [profileData, setProfileData] = useState({
    email: email,
    description: ""
  });

  const [validate, setValidate] = useState(false);

  const fetchData = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") setProfilePic(files[0]);
    else setProfileData({ ...profileData, [name]: value });
  }

  const submitForm = async (e) => {
    e.preventDefault();

    if (!profilePic) {
      setValidate(true);
      Swal.fire("Validation Error", "Please select a profile picture", "error");
      return;
    }

    const formData = new FormData();
    formData.append(
      "userProfileImageDetail",
      new Blob([JSON.stringify(profileData)], { type: 'application/json' })
    );
    formData.append("imageFile", profilePic);

    try {
      const serverResponse = await axios.post(UPLOADURL, formData);
      Swal.fire("Success", "Profile uploaded successfully!", "success");
      navigate("/userdashboard", {
        state: { imageURL: serverResponse.data.imageURL }
      });
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "❌ Error uploading profile image. Please try again.", "error");
    }
  }

  // ===== Styles =====
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "120px 20px 40px 20px",
    background: "linear-gradient(135deg, #f0f4ff, #ffffff)"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "40px",
    borderRadius: "25px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    transition: "transform 0.3s ease"
  };

  const inputStyle = {
    borderRadius: "12px",
    padding: "12px",
    border: "1px solid #ddd",
    width: "100%",
    marginBottom: "15px"
  };

  const inputInvalidStyle = {
    borderColor: "#d63384"
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
    boxShadow: "0 6px 20px rgba(106,17,203,0.4)",
    transition: "all 0.3s ease"
  };

  return (
    <>
      <UserHeader />

      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <FaCamera style={{ fontSize: "40px", color: "#6a11cb", marginBottom: "10px" }} />
            <h3 style={{ fontWeight: "700", color: "#6a11cb" }}>Upload Your Profile</h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              Personalize your account by adding a profile picture and a short description about yourself. 🌟
            </p>
          </div>

          <form onSubmit={submitForm}>
            <input
              type="file"
              accept="image/*"
              name="profilePic"
              onChange={fetchData}
              style={{ ...inputStyle, ...(validate && !profilePic ? inputInvalidStyle : {}) }}
              required
            />
            {validate && !profilePic && (
              <div style={{ color: "#d63384", fontSize: "12px", marginBottom: "10px" }}>
                Profile picture is required.
              </div>
            )}

            <textarea
              name="description"
              rows="4"
              placeholder="Write something about yourself..."
              onChange={fetchData}
              value={profileData.description}
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>Upload Profile</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UserProfileUpload;