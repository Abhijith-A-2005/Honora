// pages/lawyer/LawyerCaseDetailsPage.jsx
// Router wrapper — bridges React Router with LawyerCaseDetails.

import { useNavigate, useParams } from "react-router-dom";
import LawyerCaseDetails from "./LawyerCaseDetails";

export default function LawyerCaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <LawyerCaseDetails
      caseId={decodeURIComponent(id)}
      onBack={() => navigate("/dashboard/lawyer")}
    />
  );
}
