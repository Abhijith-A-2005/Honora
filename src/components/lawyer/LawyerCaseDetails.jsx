import { useAuth } from "../common/useAuth.jsx";
import { getCaseById, getEvidence, getForensicReports, getLawyerDocuments, uploadLawyerDocument } from "../../services/api.js";
import EvidenceSection from "../common/EvidenceSection.jsx";
import LawyerUploadModal from "./LawyerUploadModal.jsx";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, PlusIcon } from "../../assets/icons/Icons.jsx";

export default function LawyerCaseDetails({ caseId, onBack }) {
  const { user } = useAuth();
  const [caseData, setCaseData] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [supportingDocuments, setSupportingDocuments] = useState([]);
  const [forensicReports, setForensicReports] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCaseData();
  }, [caseId]);

  const fetchCaseData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch case details
      const caseResponse = await getCaseById(decodeURIComponent(caseId));
      setCaseData(caseResponse.case || caseResponse);

      // Fetch evidence
      try {
        const evidenceResponse = await getEvidence(decodeURIComponent(caseId));
        setEvidence(
          Array.isArray(evidenceResponse.evidence)
            ? evidenceResponse.evidence
            : evidenceResponse || []
        );
      } catch (err) {
        console.log("No evidence:", err.message);
        setEvidence([]);
      }

      // Fetch supporting documents
      try {
        const docsResponse = await getLawyerDocuments(decodeURIComponent(caseId));
        setSupportingDocuments(
          Array.isArray(docsResponse.documents)
            ? docsResponse.documents
            : docsResponse || []
        );
      } catch (err) {
        console.log("No supporting documents:", err.message);
        setSupportingDocuments([]);
      }

      // Fetch forensic reports
      try {
        const forensicResponse = await getForensicReports(decodeURIComponent(caseId));
        setForensicReports(
          Array.isArray(forensicResponse.reports)
            ? forensicResponse.reports
            : forensicResponse || []
        );
      } catch (err) {
        console.log("No forensic reports:", err.message);
        setForensicReports([]);
      }
    } catch (err) {
      console.error("Error fetching case data:", err);
      setError(err.message || "Failed to load case details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (newDoc) => {
    setSupportingDocuments((prev) => [...prev, newDoc]);
  };

  if (loading) {
    return (
      <div className="dashboard view">
        <button className="back-btn" onClick={onBack}>
          ← Back to Cases
        </button>
        <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>
          Loading case details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard view">
        <button className="back-btn" onClick={onBack}>
          ← Back to Cases
        </button>
        <div
          style={{
            padding: "20px",
            marginTop: "2rem",
            backgroundColor: "rgba(255,0,0,0.1)",
            border: "1px solid #ff6b6b",
            borderRadius: "6px",
            color: "#ff6b6b",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="dashboard view">
        <button className="back-btn" onClick={onBack}>
          ← Back to Cases
        </button>
        <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>
          Case not found.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard view">
      <button className="back-btn" onClick={onBack}>
        ← Back to Cases
      </button>

      <div style={{ animation: "fadeUp 0.45s ease both" }}>
        <p className="dash-eyebrow">Case Record</p>
        <h1 className="dash-title">{caseData.title}</h1>
        <div className="meta-grid">
          {[
            ["Case ID", caseData.id],
            ["Client", caseData.clientName || "N/A"],
            ["Court", caseData.assignedCourt || "N/A"],
            ["Court Date", caseData.courtDate || "N/A"],
            ["Counsel", user?.username || "Unknown"],
          ].map(([l, v]) => (
            <div className="meta-item" key={l}>
              <span className="meta-label">{l}</span>
              <span className="meta-value">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-divider" />

      {evidence.length === 0 ? (
        <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "13px", marginTop: "1rem" }}>
          No evidence has been filed for this case yet.
        </p>
      ) : (
        <EvidenceSection evidence={evidence} caseId={caseId} />
      )}

      <div className="gold-divider" />

      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.3em",
                color: "var(--gold)",
                fontWeight: 600,
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              SUPPORTING DOCUMENTS
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem,3vw,2rem)",
                color: "var(--text)",
                fontWeight: 700,
              }}
            >
              Trial Preparation Materials
            </h2>
          </div>
          <button
            className="btn-gold"
            onClick={() => setShowUploadModal(true)}
            style={{ padding: "8px 16px", fontSize: "14px" }}
          >
            + Upload Document
          </button>
        </div>

        {supportingDocuments.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "13px" }}>
            No supporting documents uploaded yet.
          </p>
        ) : (
          <EvidenceSection evidence={supportingDocuments} caseId={caseId} />
        )}
      </div>

      {forensicReports.length > 0 && (
        <>
          <div className="gold-divider" />
          <div style={{ marginBottom: 36 }}>
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.3em",
                color: "var(--gold)",
                fontWeight: 600,
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              FORENSIC ANALYSIS
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem,3vw,2rem)",
                color: "var(--text)",
                fontWeight: 700,
              }}
            >
              Forensic Report
            </h2>
          </div>
          <EvidenceSection evidence={forensicReports} caseId={caseId} />
        </>
      )}

      {showUploadModal && (
        <LawyerUploadModal
          caseId={caseId}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          lawyerName={user?.username || "Unknown Lawyer"}
        />
      )}
    </div>
  );
}
