import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";

function FetchSummarizedHistory() {
  const email = localStorage.getItem("userEmail");
  const APIURL = `http://localhost:8080/user/summarizedhistory/${email}`;

  const [summaries, setSummaries] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const res = await axios.get(APIURL);
      setSummaries(res.data);
      setOriginalData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UserHeader />

      <div className="history-page">
        <style>{`
          .history-page {
            min-height: 100vh;
            padding: 100px 20px 40px;
            background: linear-gradient(135deg,#f0f4ff,#ffffff);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .history-title {
            text-align: center;
            font-weight: 700;
            font-size: 32px;
            color: #6a11cb;
            margin-bottom: 40px;
          }

          .stats-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 40px;
            flex-wrap: wrap;
          }

          .stat-card {
            background: #fff;
            padding: 25px 35px;
            border-radius: 18px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.08);
            text-align: center;
            min-width: 150px;
            flex: 1;
          }

          .stat-card h4 {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
          }

          .stat-card p {
            font-size: 22px;
            font-weight: 600;
            color: #6a11cb;
            margin: 0;
          }

          .search-box {
            max-width: 400px;
            margin: 0 auto 30px auto;
          }

          .search-box input {
            width: 100%;
            padding: 12px 15px;
            border-radius: 12px;
            border: 1px solid #ddd;
            font-size: 15px;
            outline: none;
            transition: all 0.3s;
          }

          .search-box input:focus {
            border-color: #6a11cb;
            box-shadow: 0 0 10px rgba(106,17,203,0.2);
          }

          .history-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
          }

          .history-card {
            background: #fff;
            border-radius: 20px;
            padding: 20px 25px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.08);
            transition: transform 0.3s;
            cursor: pointer;
          }

          .history-card:hover {
            transform: translateY(-5px);
          }

          .history-card-title {
            font-size: 20px;
            color: #6a11cb;
            margin-bottom: 10px;
          }

          .history-email {
            font-size: 13px;
            color: #555;
            margin-bottom: 12px;
          }

          .history-text {
            font-size: 14px;
            color: #333;
            line-height: 1.5;
          }

          .no-data {
            text-align: center;
            font-size: 18px;
            color: #555;
            margin-top: 50px;
          }

          /* Modal */
          .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }

          .modal-box {
            background: #fff;
            padding: 30px 35px;
            border-radius: 18px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          }

          .modal-box h2 {
            color: #6a11cb;
            margin-bottom: 15px;
          }

          .modal-text {
            color: #333;
            line-height: 1.6;
            margin-bottom: 20px;
          }

          .modal-box button {
            padding: 10px 18px;
            background: #6a11cb;
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }

          .modal-box button:hover {
            background: #a78bfa;
          }

          .search-item {
            background: #fff;
            padding: 12px 15px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.06);
            cursor: pointer;
            transition: transform 0.3s;
          }

          .search-item:hover {
            transform: translateY(-3px);
            background: #f0f4ff;
          }
        `}</style>

        <div className="stats-container">
          <div className="stat-card">
            <h4>Total Notes</h4>
            <p>{originalData.length}</p>
          </div>
          <div className="stat-card">
            <h4>Latest Title</h4>
            <p>{originalData[0]?.title || "N/A"}</p>
          </div>
        </div>

        <h2 className="history-title">📄 Your Summarized Notes</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="history-grid">
          {originalData.length === 0 ? (
            <p className="no-data">No notes found 😢</p>
          ) : searchText ? (
            originalData
              .filter((item) =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, index) => (
                <div
                  key={index}
                  className="search-item"
                  onClick={() => setSelectedNote(item)}
                >
                  📌 {item.title}
                </div>
              ))
          ) : (
            summaries.map((item, index) => (
              <div
                key={index}
                className="history-card"
                onClick={() => setSelectedNote(item)}
              >
                <h3 className="history-card-title">{item.title}</h3>
                <p className="history-email">
                  <b>Email:</b> {item.email}
                </p>
                <p className="history-text">{item.summarizeNotes}</p>
              </div>
            ))
          )}
        </div>

        {selectedNote && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedNote(null)}
          >
            <div
              className="modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedNote.title}</h2>
              <p><b>Email:</b> {selectedNote.email}</p>
              <p className="modal-text">{selectedNote.summarizeNotes}</p>
              <button onClick={() => setSelectedNote(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FetchSummarizedHistory;