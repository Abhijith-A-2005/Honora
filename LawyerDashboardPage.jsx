import { useNavigate } from "react-router-dom";
import { LawyerDashboard, StyleTag} from "./Lawyerdash";

export default function LawyerDashboardPage() {
  const navigate = useNavigate();
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