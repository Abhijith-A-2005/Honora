// pages/judge/JudgeCaseDetailsPage.jsx
// Router wrapper — bridges React Router with JudgeCaseDetails.

import { useNavigate, useParams } from "react-router-dom";
import JudgeCaseDetails from "./JudgeCaseDetails";

export default function JudgeCaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <JudgeCaseDetails
      caseId={decodeURIComponent(id)}
      onBack={() => navigate("/dashboard/judge")}
    />
  );
}
