import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserHeader from "./UserHeader";
import Footer from "../common/Footer";

function ShareNotes() {
  const email = localStorage.getItem("userEmail");
  const APIURL = "http://localhost:8080/user/uploadFile";

  const [data, setData] = useState({
    senderEmail: email,
    receiverEmail: "",
    subject: "",
    notes: ""
  });

  const [file, setFile] = useState(null);

  const fetchData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const checkEmail = async (emailId) => {
    try {
      const CHECKEMAILURL = `http://localhost:8080/user/checkEmail/${emailId}`;
      const res = await axios.get(CHECKEMAILURL);
      if (res.data === "error") {
        Swal.fire("Error", "Receiver Not Found", "error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire("Error", "Please select a file", "error");
      return;
    }
    try {
      const formData = new FormData();
      formData.append(
        "notessummarizefile",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      formData.append("pdfFile", file);

      await axios.post(APIURL, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      Swal.fire("Success", "Notes Shared Successfully", "success");

      setData({
        senderEmail: email,
        receiverEmail: "",
        subject: "",
        notes: ""
      });
      setFile(null);
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Upload Failed", "error");
    }
  };

  // ===== Styles =====
  const wrapperStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#e3f2fd,#ffffff)",
    padding: "80px 20px"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    transition: "transform 0.3s"
  };

  const titleStyle = {
    textAlign: "center",
    color: "#0f2027", // Darker main color from your gradient
    fontWeight: "600",
    fontSize: "24px",
    marginBottom: "30px"
  };

  const inputStyle = {
    borderRadius: "12px",
    padding: "12px 15px",
    border: "1px solid #ced4da",
    width: "100%",
    marginBottom: "15px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.3s"
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
    background: "linear-gradient(135deg, #6a11cb, #a78bfa)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s"
  };

  const fileLabelStyle = {
    fontSize: "13px",
    color: "#203a43", // secondary color from gradient
    marginBottom: "5px",
    display: "block"
  };

  return (
    <>
      <UserHeader />

      <div style={wrapperStyle}>
        <div
          className="share-card"
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h2 style={titleStyle}>Share Notes</h2>

          <form onSubmit={submitData} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              name="senderEmail"
              value={data.senderEmail}
              readOnly
              style={inputStyle}
            />

            <input
              type="email"
              name="receiverEmail"
              placeholder="Receiver Email"
              value={data.receiverEmail}
              onChange={fetchData}
              onBlur={() => checkEmail(data.receiverEmail)}
              style={inputStyle}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={data.subject}
              onChange={fetchData}
              style={inputStyle}
              required
            />

            <label style={fileLabelStyle}>Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              style={inputStyle}
              required
            />

            <button type="submit" style={buttonStyle}>
              Share Notes
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ShareNotes;