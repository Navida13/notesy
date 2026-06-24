import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import mammoth from "mammoth";
import Footer from "../common/Footer";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function UploadNotes() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [data, setData] = useState({
    email: email,
    title: "",
    notes: ""
  });

  const readFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return alert("Please select a file");

    try {
      if (file.type === "text/plain") {
        const text = await file.text();
        setData({ ...data, notes: text });
      } else if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ") + "\n";
        }
        setData({ ...data, notes: text });
      } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setData({ ...data, notes: result.value });
      } else {
        alert("Only TXT, PDF, and DOCX files are supported.");
      }
    } catch (error) {
      console.error(error);
      alert("Error reading file");
    }
  };

  const fetchData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const summariseData = (e) => {
    e.preventDefault();
    navigate("/textsummarizerpage", {
      state: { notesData: data }
    });
  };

  // Styles
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "100px 20px 40px 20px",
    background: "#f5f5f5"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    transition: "transform 0.3s ease"
  };

  const buttonStyle = {
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    border: "none",
    padding: "14px",
    borderRadius: "30px",
    fontWeight: "600",
    color: "white",
    letterSpacing: "0.5px",
    transition: "0.3s",
    cursor: "pointer"
  };

  return (
    <>
      <UserHeader />
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center", color: "#6a11cb", fontWeight: "700" }}>
            Upload Your Notes
          </h2>

          <form onSubmit={summariseData} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              name="email"
              value={data.email}
              readOnly
              className="form-control"
              style={{ borderRadius: "12px", padding: "12px" }}
            />
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={fetchData}
              placeholder="Enter notes title"
              required
              className="form-control"
              style={{ borderRadius: "12px", padding: "12px" }}
            />
            <textarea
              name="notes"
              value={data.notes}
              readOnly
              rows="6"
              className="form-control"
              style={{ borderRadius: "12px", padding: "12px", resize: "none" }}
            />
            <input
              type="file"
              accept=".txt,.pdf,.docx"
              onChange={readFile}
              required
              className="form-control"
              style={{ borderRadius: "12px", padding: "6px" }}
            />
            <button type="submit" style={buttonStyle}>
              Upload Notes
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UploadNotes;