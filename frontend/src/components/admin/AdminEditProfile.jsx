import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from '../common/Footer';

function AdminEditProfile() {

  const email = localStorage.getItem("adminEmail");
  const APIURL = `http://localhost:8080/admin/adminProfile/${email}`;
  const EDITAPIURL = `http://localhost:8080/admin/editProfile/${email}`;

  const [admindata, setAdminData] = useState({
    name: "",
    phone: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL);
        setAdminData({
          name: response.data.name,
          phone: response.data.phone
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const fillData = (e) => {
    const { name, value } = e.target;
    const alphaRegex = /^[A-Za-z\s]*$/;
    const numberRegex = /^[0-9]*$/;

    if ((name === "name") && !alphaRegex.test(value)) {
      Swal.fire({
        title: "Invalid Format",
        text: "Only alphabetic characters are allowed in the name field.",
        icon: "error"
      });
      return;
    }

    if ((name === "phone") && !numberRegex.test(value)) {
      Swal.fire({
        title: "Invalid Format",
        text: "Only numeric digits are allowed in the phone number field.",
        icon: "error"
      });
      return;
    }

    setAdminData({ ...admindata, [name]: value });
  }

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(EDITAPIURL, admindata);
      toast.success("Profile Updated Successfully!");
      setTimeout(() => {
        navigate("/admindashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  }

  // ===== Styles =====
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f8f9fa",
    paddingTop: "10px"
  };

  const cardStyle = {
    width: "450px",
    borderRadius: "15px",
    overflow: "hidden",
    background: "#ffffff", // White card background
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)"
  };

  const headerStyle = {
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    color: "white",
    padding: "30px 20px",
    textAlign: "center",
    borderBottomLeftRadius: "50% 20%",
    borderBottomRightRadius: "50% 20%"
  };

  const iconStyle = {
    fontSize: "40px",
    marginBottom: "10px"
  };

  const titleStyle = {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "22px"
  };

  const formSection = {
    padding: "25px"
  };

  const inputStyle = {
    borderRadius: "10px",
    padding: "12px",
    border: "1px solid #ced4da"
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
    marginTop: "15px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease"
  };

  return (
    <>
      <AdminHeader />
      <ToastContainer position='top-center' autoClose={1500} />
      <div style={wrapperStyle}>
        <div style={cardStyle}>

          {/* Header */}
          <div style={headerStyle}>
            <i className="fa-solid fa-user-gear" style={iconStyle}></i>
            <h3 style={titleStyle}>Edit Profile</h3>
          </div>

          {/* Form */}
          <div style={formSection}>
            <form onSubmit={submitData}>
              <div className='mb-4'>
                <label className='form-label'>Name</label>
                <input
                  type="text"
                  name="name"
                  value={admindata.name}
                  required
                  className='form-control'
                  style={inputStyle}
                  onChange={fillData}
                />
              </div>

              <div className='mb-4'>
                <label className='form-label'>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={admindata.phone}
                  required
                  className='form-control'
                  style={inputStyle}
                  onChange={fillData}
                />
              </div>

              <button style={buttonStyle}>Update Profile</button>
            </form>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AdminEditProfile;