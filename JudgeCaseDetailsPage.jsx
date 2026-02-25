import { useNavigate, useParams } from "react-router-dom";
import { JudgeCaseDetails, JudgeStyleTag } from "./Judgedash";

export default function JudgeCaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <JudgeStyleTag />
      <JudgeCaseDetails
        caseId={id}
        onBack={() => navigate("/dashboard/judge")}
      />
    </>
  );
}
