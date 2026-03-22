// pages/forensic/ForensicCaseDetailsPage.jsx
// Router wrapper — bridges React Router with ForensicCaseDetails.

import { useNavigate, useParams } from "react-router-dom";
import ForensicCaseDetails from "./ForensicCaseDetails.jsx";

export default function ForensicCaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <ForensicCaseDetails
      caseId={decodeURIComponent(id)}
      onBack={() => navigate("/dashboard/forensic")}
    />
  );
}
