import { useState, useEffect } from "react";
import { useAuth } from "../common/useAuth.jsx";
import { getCaseById, getEvidence, getForensicReports, uploadForensicReport } from "../../services/api.js";
import { GoldenDivider } from "../common/Shared.jsx";
import EvidenceSection from "../common/EvidenceSection.jsx";
import EvidenceModal from "../common/EvidenceModal.jsx";
import ForensicReportUploadModal from "./ForensicReportUploadModal.jsx";
import { ArrowLeftIcon, PlusIcon } from "../../assets/icons/Icons.jsx";

export default function ForensicCaseDetails({ caseId, onBack }) {
  const { user } = useAuth();
  const [caseData, setCaseData] = useState(null);
  const [caseEvidence, setCaseEvidence] = useState([]);
  const [forensicReports, setForensicReports] = useState([]);
  const [viewingEvidence, setViewingEvidence] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusColors = {
    "In Progress": "#ffb74d",
    Pending: "#f0d060",
    Completed: "#4ade80",
  };

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

      // Fetch case evidence
      try {
        const evidenceResponse = await getEvidence(decodeURIComponent(caseId));
        setCaseEvidence(
          Array.isArray(evidenceResponse.evidence)
            ? evidenceResponse.evidence
            : evidenceResponse || []
        );
      } catch (err) {
        console.log("No evidence:", err.message);
        setCaseEvidence([]);
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

  const handleReportUpload = async (newReport) => {
    setForensicReports((prev) => [newReport, ...prev]);
    
    // Remove "new" flag after animation
    setTimeout(() => {
      setForensicReports((prev) =>
        prev.map((r) => (r.id === newReport.id ? { ...r, isNew: false } : r))
      );
    }, 2000);
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

      <div className="fade-up">
        <p className="dash-eyebrow">Forensic Case Record</p>
        <h1 className="dash-title">{caseData.title}</h1>
        <div className="meta-grid">
          {[
            ["Case ID", caseData.id],
            ["Related Police Case", caseData.relatedCaseId || "N/A"],
            ["Evidence Type", caseData.evidenceType || "N/A"],
            ["Assignment Date", caseData.assignedDate || "N/A"],
            ["Analyst", user?.username || "Unknown"],
          ].map(([l, v]) => (
            <div className="meta-item" key={l}>
              <span className="meta-label">{l}</span>
              <span className="meta-value">{v}</span>
            </div>
          ))}
          <div className="meta-item">
            <span className="meta-label">Status</span>
            <span
              className="badge"
              style={{
                marginTop: "0.2rem",
                display: "inline-block",
                backgroundColor: `${statusColors[caseData.status] || "#f0d060"}20`,
                color: statusColors[caseData.status] || "#f0d060",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              {caseData.status}
            </span>
          </div>
        </div>
      </div>

      <div className="gold-divider" />

      {/* Original Evidence Section */}
      <div className="mb-36">
        <p className="section-eyebrow">SUBMITTED EVIDENCE</p>
        <h2 className="section-title-lg">Case Evidence Inventory</h2>
      </div>

      {caseEvidence.length === 0 ? (
        <p className="no-evidence-text">
          No evidence inventory documentation available for this case.
        </p>
      ) : (
        <EvidenceSection evidence={caseEvidence} caseId={caseId} />
      )}

      <GoldenDivider />

      {/* Forensic Reports Section */}
      <div className="mb-36">
        <p className="section-eyebrow">FORENSIC ANALYSIS</p>
        <h2 className="section-title-lg">Forensic Reports</h2>
      </div>

      {forensicReports.length === 0 ? (
        <p className="no-evidence-text">
          No forensic reports uploaded for this case yet.
        </p>
      ) : (
        <EvidenceSection evidence={forensicReports} caseId={caseId} />
      )}

      {/* Floating upload button */}
      <button
        className="fab-upload"
        onClick={() => setShowUpload(true)}
        title="Upload Forensic Report"
      >
        <span className="fab-tooltip">Upload Forensic Report</span>
        <PlusIcon />
      </button>

      {/* Evidence view modal */}
      {viewingEvidence && (
        <EvidenceModal
          ev={viewingEvidence}
          onClose={() => setViewingEvidence(null)}
        />
      )}

      {/* Upload modal */}
      {showUpload && (
        <ForensicReportUploadModal
          caseId={caseId}
          onClose={() => setShowUpload(false)}
          onUpload={handleReportUpload}
        />
      )}
    </div>
  );
}
