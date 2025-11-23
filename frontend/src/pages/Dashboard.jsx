// Dashboard.jsx
import ChatPanel from "../components/ChatPanel";
import LabUpload from "../components/LabUpload";
import RiskCard from "../components/RiskCard";
import ProgressGraph from "../components/ProgressGraph";
import MedicationTracker from "../components/MedicationTracker";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        CKD AI Health Assistant
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChatPanel />
        <LabUpload />
        <RiskCard />
        <ProgressGraph />
        <MedicationTracker />
      </div>
    </div>
  );
}
