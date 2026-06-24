import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import UserHeader from "./UserHeader";

export default function TextSummarizerPage() {
  const APIURL = "http://localhost:8080/user/summarize";
  const location = useLocation();
  const notesData = location.state?.notesData || {};
  const text = notesData?.notes || "";
  const email = notesData?.email || "";
  const title = notesData?.title || "";

  const [data, setData] = useState({
    inputText: text,
    summary: "",
    loading: false
  });

  const saveSummary = async (result) => {
    try {
      const payload = { email, title, summarizeNotes: result };
      await axios.post(APIURL, payload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!data.inputText) {
      setData((prev) => ({ ...prev, summary: "⚠️ Please provide some text to summarize." }));
      return;
    }

    setData((prev) => ({ ...prev, loading: true, summary: "" }));

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/chat",
        {
          model: "command-a-03-2025",
          message: `Summarize the following text in a short paragraph. Highlight important keywords using double asterisks:\n\n${data.inputText}`
        },
        { headers: { Authorization: "Bearer Z1Id7I8HOA2QFmUElfL9p4VC7OfT3hoJMLz915Bs", "Content-Type": "application/json" } }
      );

      const result = response.data.text || response.data.message?.content?.[0]?.text || "No summary generated.";

      setData((prev) => ({ ...prev, summary: result, loading: false }));
      saveSummary(result);
    } catch (err) {
      setData((prev) => ({ ...prev, summary: "❌ Error: " + (err.response?.data?.message || err.message), loading: false }));
    }
  };

  const formatBoldText = (text) => text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  const handlePlay = () => { if (!data.summary) return; const utterance = new SpeechSynthesisUtterance(data.summary.replace(/\*\*/g, "")); utterance.lang = "en-US"; window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance); };
  const handlePause = () => window.speechSynthesis.pause();
  const handleResume = () => window.speechSynthesis.resume();
  const handleStop = () => window.speechSynthesis.cancel();

  const downloadPDF = () => {
    Swal.fire("Success", "Summary PDF Downloaded Successfully", "success");
    const doc = new jsPDF();
    const margin = 10;
    const width = doc.internal.pageSize.getWidth();
    doc.setFont("Times", "normal");
    doc.setFontSize(16);
    doc.text("Summary", width / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(data.summary, width - margin * 2), margin, 30);
    doc.save("NotesSummary.pdf");
  };

  const downloadFullPDF = () => {
    Swal.fire("Success", "Full Report Downloaded Successfully", "success");
    const doc = new jsPDF();
    const margin = 10;
    const width = doc.internal.pageSize.getWidth();

    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text("Full Report", width / 2, 20, { align: "center" });

    doc.setFont("Times", "Bold");
    doc.setFontSize(14);
    doc.text("Original Text:", margin, 30);

    doc.setFont("Times", "normal");
    doc.setFontSize(12);
    const original = doc.splitTextToSize(data.inputText, width - margin * 2);
    doc.text(original, margin, 40);

    let y = 40 + original.length * 7;
    if (y > 270) { doc.addPage(); y = 20; }

    doc.setFont("Times", "Bold");
    doc.setFontSize(14);
    doc.text("Summary:", margin, y);

    const summaryText = doc.splitTextToSize(data.summary.replace(/\*\*/g, ""), width - margin * 2);
    doc.setFont("Times", "normal");
    doc.setFontSize(12);
    doc.text(summaryText, margin, y + 10);
    doc.save("full-report.pdf");
  };

  return (
    <>
      <UserHeader />

      <div style={{
        marginTop:"30px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        background: "linear-gradient(135deg,#dfe9f3,#ffffff)"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "750px",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          transition: "transform 0.3s ease"
        }}>
          <h2 style={{ textAlign: "center", color: "#6a11cb", fontWeight: "700" }}>AI Text Summarizer</h2>

          <form onSubmit={handleSummarize} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <textarea
              rows="6"
              value={data.inputText}
              onChange={(e) => setData(prev => ({ ...prev, inputText: e.target.value }))}
              style={{ borderRadius: "12px", padding: "12px", border: "1px solid #ddd", width: "100%" }}
            />
            <button type="submit" style={{
              width: "100%",
              padding: "14px",
              borderRadius: "30px",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
              cursor: "pointer",
              transition: "0.3s"
            }}>
              {data.loading ? "Summarizing..." : "Summarize"}
            </button>
          </form>

          {data.summary && (
            <div style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f5f7fa",
              borderLeft: "5px solid #6a11cb",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <h5>Summary:</h5>
              <p dangerouslySetInnerHTML={{ __html: formatBoldText(data.summary) }}></p>

              <button onClick={downloadPDF} style={{ ...btnStyle, background: "linear-gradient(90deg,#6a11cb,#a78bfa)" }}>Download Summary PDF</button>
              <button onClick={downloadFullPDF} style={{ ...btnStyle, background: "linear-gradient(90deg,#203a43,#2c5364)" }}>Download Full Report</button>
              <button onClick={handlePlay} style={{ ...btnStyle, background: "#4caf50" }}>▶ Play</button>
              <button onClick={handlePause} style={{ ...btnStyle, background: "#ff9800" }}>⏸ Pause</button>
              <button onClick={handleResume} style={{ ...btnStyle, background: "#03a9f4" }}>▶ Resume</button>
              <button onClick={handleStop} style={{ ...btnStyle, background: "#f44336" }}>⏹ Stop</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const btnStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "30px",
  border: "none",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s",
  marginTop: "5px"
};