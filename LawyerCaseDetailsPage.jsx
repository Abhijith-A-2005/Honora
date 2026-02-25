import { useNavigate, useParams } from "react-router-dom";
import { LawyerCaseDetails, StyleTag} from "./Lawyerdash";

export default function LawyerCaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Case ID from URL:", id);

  return (
    <>
      <StyleTag />  
      <LawyerCaseDetails
        caseId={decodeURIComponent(id)}
        onBack={() => navigate("/dashboard/lawyer")}
      />
    </>
  );
}