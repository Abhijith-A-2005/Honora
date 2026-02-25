import { useNavigate } from "react-router-dom";
import { LawyerDashboard, StyleTag} from "./Lawyerdash";

export default function LawyerDashboardPage() {
  const navigate = useNavigate();
  const handleViewCase = (id) => {
    console.log("Navigating to case:", id);  // ← check this in console
    navigate(`/dashboard/lawyer/case/${id}`);
  };
  return (
    <>
      <StyleTag />
      <LawyerDashboard
        onViewCase={(id) => navigate(`/dashboard/lawyer/case/${encodeURIComponent(id)}`)}
        onLogout={() => navigate("/")}
      />
    </>
  );
}