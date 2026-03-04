// pages/lawyer/LawyerDashboardPage.jsx
// Router wrapper — bridges React Router with LawyerDashboard.

import { useNavigate } from "react-router-dom";
import LawyerDashboard from "./LawyerDashboard";

export default function LawyerDashboardPage() {
  const navigate = useNavigate();
  return (
    <LawyerDashboard
      onViewCase={(id) => navigate(`/dashboard/lawyer/case/${encodeURIComponent(id)}`)}
      onLogout={() => navigate("/")}
    />
  );
}