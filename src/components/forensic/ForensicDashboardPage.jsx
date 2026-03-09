// pages/forensic/ForensicDashboardPage.jsx
// Router wrapper — bridges React Router with ForensicDashboard.

import { useNavigate } from "react-router-dom";
import ForensicDashboard from "./ForensicDashboard";

export default function ForensicDashboardPage() {
  const navigate = useNavigate();
  return (
    <ForensicDashboard
      onViewCase={(id) => navigate(`/dashboard/forensic/case/${encodeURIComponent(id)}`)}
      onLogout={() => navigate("/")}
    />
  );
}
