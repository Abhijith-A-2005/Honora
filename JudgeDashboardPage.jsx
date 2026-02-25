import { useNavigate } from "react-router-dom";
import { JudgeDashboard, JudgeStyleTag } from "./Judgedash";

export default function JudgeDashboardPage() {
  const navigate = useNavigate();
  return (
    <>
      <JudgeStyleTag />
      <JudgeDashboard
        onViewCase={(id) => navigate(`/dashboard/judge/case/${id}`)}
        onLogout={() => navigate("/")}
      />
    </>
  );
}