import { useState } from "react";
import { analyzeLab } from "../services/api";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleLabUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setResult(null);
    setStatus("Uploading and analyzing lab report...");

    try {
      const response = await analyzeLab(file);

      if (response.error) {
        setStatus("❌ Analysis failed. Backend not responding.");
      } else {
        setResult(response);
        setStatus("✅ Report analyzed successfully.");
      }

    } catch (error) {
      console.error(error);
      setStatus("❌ Server / Azure connection issue.");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "40px", color: "#fff", maxWidth: "1000px" }}>
      <h1 style={{ fontSize: "40px" }}>
        NephroCare – CKD AI Assistant
      </h1>

      <p style={{ lineHeight: "1.6", marginTop: "10px" }}>
        AI-powered clinical support system for early detection, monitoring,
        and management of Chronic Kidney Disease through intelligent lab
        analysis and decision support.
      </p>

      <hr style={{ margin: "25px 0", opacity: 0.3 }} />

      <h2>Core Modules</h2>
      <ul style={{ fontSize: "17px", lineHeight: "1.8" }}>
        <li>🧪 AI Lab Report Interpretation</li>
        <li>📊 CKD Risk Prediction</li>
        <li>🍏 Smart Diet Recommendation</li>
        <li>💊 Medication Tracker</li>
        <li>🧠 Mental Wellness Companion</li>
      </ul>

      {/* ACTIONS */}
      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>

        <label style={buttonStyle}>
          Upload Lab Report
          <input type="file" hidden onChange={handleLabUpload} />
        </label>

        <button style={buttonStyle} onClick={() => alert("Profile under construction")}>
          Patient Profile
        </button>

        <button style={buttonStyle} onClick={() => alert("Risk module in progress")}>
          Risk Assessment
        </button>
      </div>

      {/* STATUS BAR */}
      {loading && (
        <div style={{ marginTop: "25px", fontSize: "18px" }}>
          ⏳ {status}
        </div>
      )}

      {!loading && status && (
        <div style={{ marginTop: "20px", fontSize: "16px" }}>
          {status}
        </div>
      )}

      {/* RESULT OUTPUT */}
      {result && (
        <div style={resultBoxStyle}>
          <h3>📝 Extracted Report Data</h3>
          <pre style={codeBox}>
            {result.extracted_text}
          </pre>

          <h3 style={{ marginTop: "20px" }}>
            🧠 AI Clinical Interpretation
          </h3>
          <div style={codeBox}>
            {result.analysis}
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "12px 22px",
  background: "#111",
  color: "#fff",
  borderRadius: "8px",
  border: "1px solid #444",
  cursor: "pointer",
  transition: "0.2s"
};

const resultBoxStyle = {
  marginTop: "35px",
  background: "#1a1a1a",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 0 15px rgba(0,0,0,0.4)"
};

const codeBox = {
  background: "#000",
  padding: "15px",
  borderRadius: "8px",
  whiteSpace: "pre-line",
  lineHeight: "1.6"
};
