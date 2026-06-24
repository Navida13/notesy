import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

export default function TextSummarize() {
  const [data, setData] = useState({
    inputText:
      "Artificial Intelligence is transforming the world by enabling machines to learn from data and make decisions.",
    summary: "",
    loading: false,
  });

  const [speechInstance, setSpeechInstance] = useState(null);

  // ================= SUMMARIZE =================
  const handleSummarize = async () => {
    if (!data.inputText) {
      setData((prev) => ({
        ...prev,
        summary: "Please provide some text",
      }));
      return;
    }

    setData((prev) => ({ ...prev, loading: true, summary: "" }));

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/chat",
        {
          model: "command-a-03-2025",
          message: `Summarized the following text in a short paragraph. Highlight important keywords using double asterisks only:\n\n${data.inputText}`,
        },
        {
          headers: {
            Authorization: "Bearer ${import.meta.env.VITE_API_KEY}",
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        response.data.text ||
        response.data.message?.content?.[0]?.text ||
        "No summary generated.";

      setData((prev) => ({
        ...prev,
        summary: result,
      }));
    } catch (err) {
      setData((prev) => ({
        ...prev,
        summary: "Error: " + err.message,
      }));
    }

    setData((prev) => ({ ...prev, loading: false }));
  };

  // ================= FORMAT BOLD =================
  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  };

  // ================= SPEECH =================
  const handlePlay = () => {
    if (!data.summary) return;

    const cleanText = data.summary.replace(/\*\*/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    //setSpeechInstance(utterance);
  };

  const handlePause = () => window.speechSynthesis.pause();
  const handleResume = () => window.speechSynthesis.resume();
  const handleStop = () => window.speechSynthesis.cancel();

  // ================= PDF SUMMARY =================
  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 10;
    const width = doc.internal.pageSize.getWidth();

    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text("Summary", width / 2, 20, { align: "center" });

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    const cleanText = data.summary.replace(/\*\*/g, "");
    const splitText = doc.splitTextToSize(cleanText, width - margin * 2);

    doc.text(splitText, margin, 30);
    doc.save("summary.pdf");
  };

  // ================= PDF FULL =================
  const downloadFullPDF = () => {
    const doc = new jsPDF();
    const margin = 10;
    const width = doc.internal.pageSize.getWidth();

    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text("Full Report", width / 2, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text("Original Text:", margin, 30);

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    const original = doc.splitTextToSize(
      data.inputText,
      width - margin * 2
    );
    doc.text(original, margin, 40);

    let y = 40 + original.length * 7;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("Times", "Bold");
    doc.setFontSize(14);
    doc.text("Summary:", margin, y);

    const cleanSummary = data.summary.replace(/\*\*/g, "");
    const summaryText = doc.splitTextToSize(
      cleanSummary,
      width - margin * 2
    );

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);
    doc.text(summaryText, margin, y + 10);

    doc.save("full-report.pdf");
  };

  // ================= UI =================
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
      <div className="card p-4" style={{ maxWidth: "700px", width: "100%", borderRadius: "15px" }}>
        <h2 className="text-center mb-3">AI Text Summarizer</h2>

        <textarea
          className="form-control mb-3"
          rows="5"
          value={data.inputText}
          onChange={(e) =>
            setData({ ...data, inputText: e.target.value })
          }
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleSummarize}
          disabled={data.loading}
        >
          {data.loading ? "Summarizing..." : "Summarize"}
        </button>

        {data.summary && (
          <div className="mt-3 p-3 bg-light rounded">
            <h5>Summary:</h5>

            <p
              dangerouslySetInnerHTML={{
                __html: formatBoldText(data.summary),
              }}
            ></p>

            {/* PDF Buttons */}
            <button onClick={downloadPDF} className="btn btn-success w-100 mt-2">
              Download Summary PDF
            </button>

            <button onClick={downloadFullPDF} className="btn btn-secondary w-100 mt-2">
              Download Full Report
            </button>

            {/* Speech Buttons */}
            <button onClick={handlePlay} className="btn btn-success w-100 mt-2">
              ▶ Play
            </button>

            <button onClick={handlePause} className="btn btn-warning w-100 mt-2">
              ⏸ Pause
            </button>

            <button onClick={handleResume} className="btn btn-info w-100 mt-2">
              ▶ Resume
            </button>

            <button onClick={handleStop} className="btn btn-danger w-100 mt-2">
              ⏹ Stop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
