import { useNavigate, useParams } from "react-router-dom";
import { LawyerCaseDetails, StyleTag } from "./Lawyerdash";

export default function LawyerCaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <StyleTag />   {/* ← add this */}
      <LawyerCaseDetails
        caseId={decodeURIComponent(id)}
        onBack={() => navigate("/dashboard/lawyer")}
      />
    </>
  );
}