import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";
import Footer from "../common/Footer";

function ViewNotes() {
  const email = localStorage.getItem("userEmail");
  const APIURL = `http://localhost:8080/user/receivenotes/${email}`;

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(APIURL)
      .then((res) => setNotes(Array.isArray(res.data) ? res.data : []))
      .finally(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        setNotes([]);
        setLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <UserHeader />

      <div className="page-container">
        <style>{`
          .page-container {
            min-height: 100vh;
            padding: 100px 20px 40px;
            background: linear-gradient(135deg,#f0f4ff,#ffffff);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .title {
            text-align: center;
            font-weight: 700;
            font-size: 30px;
            color: #6a11cb;
            margin-bottom: 40px;
          }

          .table-container {
            max-width: 1000px;
            margin: auto;
            background: #ffffff;
            border-radius: 25px;
            padding: 30px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.08);
            transition: transform 0.3s ease;
          }

          .table-container:hover {
            transform: translateY(-3px);
          }

          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 8px;
          }

          th {
            background: #6a11cb;
            color: white;
            padding: 14px;
            border-radius: 12px;
            text-align: left;
          }

          td {
            background: #f9f9f9;
            padding: 12px;
            border-radius: 12px;
            border-bottom: none;
          }

          tr td:first-child {
            border-radius: 12px 0 0 12px;
          }
          tr td:last-child {
            border-radius: 0 12px 12px 0;
          }

          tr:hover td {
            background: #e6e6ff;
          }

          .file-box {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .file-name {
            font-size: 14px;
            color: #333;
          }

          .download-btn {
            text-decoration: none;
            background: linear-gradient(90deg,#6a11cb,#a78bfa);
            color: white;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            transition: 0.3s;
          }

          .download-btn:hover {
            transform: scale(1.05);
            background: linear-gradient(90deg,#a78bfa,#6a11cb);
          }

          .empty-box {
            text-align: center;
            margin-top: 80px;
            color: #555;
          }

          .empty-box img {
            width: 140px;
            opacity: 0.7;
            margin-bottom: 25px;
          }

          .empty-box h3 {
            font-size: 24px;
            color: #6a11cb;
            margin-bottom: 10px;
          }

          .empty-box p {
            color: #777;
            font-size: 16px;
          }

          .loader {
            text-align: center;
            margin-top: 100px;
          }
        `}</style>

        <h2 className="title">📥 Received Notes</h2>

        {loading && (
          <div className="loader">
            <img src="/loading.gif" width="80" alt="Loading..." />
          </div>
        )}

        {!loading && notes.length === 0 && (
          <div className="empty-box">
            <img src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png" alt="no notes" />
            <h3>No Notes Found</h3>
            <p>You haven't received any notes yet. Start collaborating today! 🌟</p>
          </div>
        )}

        {!loading && notes.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Sender</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, i) => (
                  <tr key={i}>
                    <td>{formatDate(note.date)}</td>
                    <td>{note.subject}</td>
                    <td>{note.senderEmail}</td>
                    <td>
                      <div className="file-box">
                        <span className="file-name">{note.fileName}</span>
                        <a
                          className="download-btn"
                          href={`http://localhost:8080/uploads/notessummarizefile/${note.fileName}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default ViewNotes;