// pages/judge/JudgeDashboardPage.jsx
// Router wrapper — bridges React Router with JudgeDashboard.

import { useNavigate } from "react-router-dom";
import JudgeDashboard from "./JudgeDashboard";

export default function JudgeDashboardPage() {
  const navigate = useNavigate();
  return (
    <JudgeDashboard
      onViewCase={(id) => navigate(`/dashboard/judge/case/${encodeURIComponent(id)}`)}
      onLogout={() => navigate("/")}
    />
  );
}
