import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api/v1";

function App() {
  // CKD Chat
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");

  // Labs
  const [labFile, setLabFile] = useState(null);
  const [labText, setLabText] = useState("");
  const [labAnalysis, setLabAnalysis] = useState("");

  // Diet
  const [stage, setStage] = useState("Stage 3 CKD");
  const [restrictions, setRestrictions] = useState("low sodium, low potassium");
  const [notes, setNotes] = useState("");
  const [dietPlan, setDietPlan] = useState("");

  // Wellness
  const [wellnessMsg, setWellnessMsg] = useState("");
  const [wellnessReply, setWellnessReply] = useState("");

  // Risk
  const [creatinine, setCreatinine] = useState(1.9);
  const [egfr, setEgfr] = useState(60);
  const [hb, setHb] = useState(11.2);
  const [riskResult, setRiskResult] = useState(null);

  // Meds
  const [medName, setMedName] = useState("");
  const [medDose, setMedDose] = useState("");
  const [medTime, setMedTime] = useState("");
  const [medList, setMedList] = useState([]);

  // Progress
  const [progressData, setProgressData] = useState(null);

  const handleChatAsk = async () => {
    if (!chatInput.trim()) return;
    const res = await fetch(`${API_BASE}/azure-chat/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: chatInput }),
    });
    const data = await res.json();
    setChatReply(data.reply || JSON.stringify(data));
  };

  const handleLabAnalyze = async () => {
    if (!labFile) return;
    const formData = new FormData();
    formData.append("file", labFile);

    const res = await fetch(`${API_BASE}/labs/analyze`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setLabText(data.extracted_text || "");
    setLabAnalysis(data.analysis || "");
  };

  const handleGenerateDiet = async () => {
    const res = await fetch(`${API_BASE}/diet/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stage,
        restrictions,
        notes,
      }),
    });
    const data = await res.json();
    setDietPlan(data.meal_plan || JSON.stringify(data));
  };

  const handleWellnessChat = async () => {
    if (!wellnessMsg.trim()) return;
    const res = await fetch(`${API_BASE}/wellness/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: wellnessMsg }),
    });
    const data = await res.json();
    setWellnessReply(data.reply || JSON.stringify(data));
  };

  const handleRiskAssess = async () => {
    const res = await fetch(`${API_BASE}/risk/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatinine: Number(creatinine),
        egfr: Number(egfr),
        hb: Number(hb),
      }),
    });
    const data = await res.json();
    setRiskResult(data);
  };

  const handleAddMed = async () => {
    if (!medName.trim()) return;
    const res = await fetch(`${API_BASE}/meds/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: medName,
        dose: medDose,
        time: medTime,
      }),
    });
    const data = await res.json();
    console.log("Med add:", data);
    fetchMedList();
  };

  const fetchMedList = async () => {
    const res = await fetch(`${API_BASE}/meds/list`);
    const data = await res.json();
    setMedList(data.medications || []);
  };

  const fetchProgress = async () => {
    const res = await fetch(`${API_BASE}/progress/summary`);
    const data = await res.json();
    setProgressData(data);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px", maxWidth: 1200, margin: "0 auto" }}>
      <h1>NephroCare CKD Assistant (Frontend)</h1>

      {/* CKD Chat */}
      <section style={cardStyle}>
        <h2>🧠 CKD AI Chat</h2>
        <textarea
          rows={3}
          style={inputStyle}
          placeholder="Ask anything about CKD..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button onClick={handleChatAsk}>Ask</button>
        {chatReply && (
          <pre style={preStyle}>{chatReply}</pre>
        )}
      </section>

      {/* Labs Analyze */}
      <section style={cardStyle}>
        <h2>🧾 Lab Report Analyzer</h2>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setLabFile(e.target.files[0] || null)}
        />
        <button onClick={handleLabAnalyze}>Upload & Analyze</button>
        {labText && (
          <>
            <h4>Extracted Text</h4>
            <pre style={preStyle}>{labText}</pre>
          </>
        )}
        {labAnalysis && (
          <>
            <h4>AI Analysis</h4>
            <pre style={preStyle}>{labAnalysis}</pre>
          </>
        )}
      </section>

      {/* Diet Generator */}
      <section style={cardStyle}>
        <h2>🍽 CKD Diet Generator</h2>
        <div>
          <label>Stage: </label>
          <input
            style={smallInputStyle}
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          />
        </div>
        <div>
          <label>Restrictions: </label>
          <input
            style={smallInputStyle}
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
          />
        </div>
        <div>
          <label>Notes: </label>
          <input
            style={smallInputStyle}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button onClick={handleGenerateDiet}>Generate Diet Plan</button>
        {dietPlan && <pre style={preStyle}>{dietPlan}</pre>}
      </section>

      {/* Wellness Chat */}
      <section style={cardStyle}>
        <h2>💙 Mental Wellness Support</h2>
        <textarea
          rows={3}
          style={inputStyle}
          placeholder="Share how you're feeling..."
          value={wellnessMsg}
          onChange={(e) => setWellnessMsg(e.target.value)}
        />
        <button onClick={handleWellnessChat}>Send</button>
        {wellnessReply && <pre style={preStyle}>{wellnessReply}</pre>}
      </section>

      {/* Risk Assessment */}
      <section style={cardStyle}>
        <h2>⚠️ CKD Risk Assessment</h2>
        <div>
          <label>Creatinine: </label>
          <input
            style={smallInputStyle}
            type="number"
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
          />
        </div>
        <div>
          <label>eGFR: </label>
          <input
            style={smallInputStyle}
            type="number"
            value={egfr}
            onChange={(e) => setEgfr(e.target.value)}
          />
        </div>
        <div>
          <label>Hemoglobin (Hb): </label>
          <input
            style={smallInputStyle}
            type="number"
            value={hb}
            onChange={(e) => setHb(e.target.value)}
          />
        </div>
        <button onClick={handleRiskAssess}>Assess Risk</button>
        {riskResult && (
          <pre style={preStyle}>{JSON.stringify(riskResult, null, 2)}</pre>
        )}
      </section>

      {/* Meds & Progress */}
      <section style={cardStyle}>
        <h2>💊 Medications</h2>
        <div>
          <input
            style={smallInputStyle}
            placeholder="Name"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
          />
          <input
            style={smallInputStyle}
            placeholder="Dose"
            value={medDose}
            onChange={(e) => setMedDose(e.target.value)}
          />
          <input
            style={smallInputStyle}
            placeholder="Time"
            value={medTime}
            onChange={(e) => setMedTime(e.target.value)}
          />
          <button onClick={handleAddMed}>Add Med</button>
          <button onClick={fetchMedList}>Refresh List</button>
        </div>
        {medList && medList.length > 0 && (
          <ul>
            {medList.map((m, i) => (
              <li key={i}>
                <strong>{m.name}</strong> – {m.dose} – {m.time}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={cardStyle}>
        <h2>📈 Progress Summary</h2>
        <button onClick={fetchProgress}>Load Progress</button>
        {progressData && <pre style={preStyle}>{JSON.stringify(progressData, null, 2)}</pre>}
      </section>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
  background: "#fafafa",
};

const inputStyle = {
  width: "100%",
  marginBottom: 8,
};

const smallInputStyle = {
  margin: "4px 8px 8px 0",
};

const preStyle = {
  background: "#111",
  color: "#0f0",
  padding: 8,
  borderRadius: 4,
  whiteSpace: "pre-wrap",
};

export default App;
