import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../common/useAuth.jsx";
import { getCaseById, getEvidence, getForensicReports } from "../../services/api.js";
import EvidenceCard from "../common/EvidenceCard.jsx";
import EvidenceModal from "../common/EvidenceModal.jsx";
import UploadEvidenceModal from "./UploadEvidenceModal.jsx";
import { GoldenDivider } from "../common/Shared.jsx";
import {
  ArrowLeftIcon,
  PlusIcon,
  VideoIcon,
  PhotoIcon,
  DocumentIcon,
  MicIcon,
  FolderIcon,
} from "../../assets/icons/Icons.jsx";

const STATUS_CLASS = {
  Open: "status-open",
  Closed: "status-closed",
  "Under Investigation": "status-investigating",
};

const EVIDENCE_SECTIONS = [
  { format: "Video", label: "Video Evidence", Icon: VideoIcon },
  { format: "Photo", label: "Photo Evidence", Icon: PhotoIcon },
  { format: "Text Document", label: "Text Documents", Icon: DocumentIcon },
  { format: "Voice Note", label: "Voice Notes", Icon: MicIcon },
  { format: "Other", label: "Other Files", Icon: FolderIcon },
];

export default function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [caseData, setCaseData] = useState(null);
  const [evidenceList, setEvidenceList] = useState([]);
  const [forensicReports, setForensicReports] = useState([]);
  const [viewingEvidence, setViewingEvidence] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/role");
      return;
    }

    fetchCaseData();
  }, [id, user, navigate]);

  const fetchCaseData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch case details
      const caseResponse = await getCaseById(decodeURIComponent(id));
      setCaseData(caseResponse.case || caseResponse);

      // Fetch evidence for this case
      const evidenceResponse = await getEvidence(decodeURIComponent(id));
      setEvidenceList(
        Array.isArray(evidenceResponse.evidence)
          ? evidenceResponse.evidence
          : evidenceResponse || []
      );

      // Fetch forensic reports
      try {
        const forensicResponse = await getForensicReports(decodeURIComponent(id));
        setForensicReports(
          Array.isArray(forensicResponse.reports)
            ? forensicResponse.reports
            : forensicResponse || []
        );
      } catch (err) {
        // Forensic reports might not exist, that's okay
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

  const handleUpload = async (newEvidence) => {
    // Add new evidence to the list
    setEvidenceList((prev) => [newEvidence, ...prev]);

    // Remove "new" flag after animation
    setTimeout(() => {
      setEvidenceList((prev) =>
        prev.map((e) =>
          e.id === newEvidence.id ? { ...e, isNew: false } : e
        )
      );
    }, 2000);
  };

  const getEvidenceByFormat = (format) =>
    evidenceList.filter((e) => e.format === format);

  if (!user) return null;

  if (loading) {
    return (
      <main className="case-details-page">
        <button className="back-btn" onClick={() => navigate("/dashboard/police")}>
          <ArrowLeftIcon /> Back to Dashboard
        </button>
        <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>
          Loading case details...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="case-details-page">
        <button className="back-btn" onClick={() => navigate("/dashboard/police")}>
          <ArrowLeftIcon /> Back to Dashboard
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
      </main>
    );
  }

  if (!caseData) {
    return (
      <main className="case-details-page">
        <button className="back-btn" onClick={() => navigate("/dashboard/police")}>
          <ArrowLeftIcon /> Back to Dashboard
        </button>
        <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>
          Case not found.
        </p>
      </main>
    );
  }

  return (
    <>
      <main className="case-details-page">
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard/police")}
        >
          <ArrowLeftIcon /> Back to Dashboard
        </button>

        {/* Case Header */}
        <div className="mb-32">
          <p className="section-eyebrow">⊙ Case File · {caseData.id}</p>
          <h1 className="section-title">{caseData.title}</h1>
          <span
            className={`cc-status ${STATUS_CLASS[caseData.status] || "status-open"}`}
          >
            {caseData.status}
          </span>
        </div>

        {/* Meta grid */}
        <div className="case-meta-block">
          <div className="meta-item">
            <span className="meta-label">Case ID</span>
            <span className="meta-value gold-text">{caseData.id}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Assigned Officer</span>
            <span className="meta-value">{caseData.officer || "N/A"}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Badge Number</span>
            <span className="meta-value">{caseData.badge || "N/A"}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Department</span>
            <span className="meta-value">{caseData.department || "N/A"}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date Filed</span>
            <span className="meta-value">{caseData.date || "N/A"}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Evidence Items</span>
            <span className="meta-value gold-text">{evidenceList.length}</span>
          </div>
        </div>

        {/* Description */}
        {caseData.description && (
          <div className="case-desc-block">
            <p>{caseData.description}</p>
          </div>
        )}

        <GoldenDivider />
        <div className="mb-40" />

        {/* Evidence heading */}
        <div className="mb-36">
          <p className="section-eyebrow">DIGITAL EVIDENCE VAULT</p>
          <h2 className="section-title-lg">Evidence Repository</h2>
        </div>

        {/* Evidence Sections */}
        <div className="evidence-sections">
          {EVIDENCE_SECTIONS.map(({ format, label, Icon }) => {
            const items = getEvidenceByFormat(format);
            return (
              <div key={format}>
                <div className="evidence-section-title">
                  <span className="ev-section-icon">
                    <Icon />
                  </span>
                  <h3 className="ev-section-heading">{label}</h3>
                  <span className="ev-section-count">
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {items.length === 0 ? (
                  <div className="no-evidence">
                    No evidence uploaded in this category
                  </div>
                ) : (
                  <div className="evidence-grid">
                    {items.map((ev, i) => (
                      <EvidenceCard
                        key={ev.id}
                        evidence={ev}
                        onView={setViewingEvidence}
                        delay={i * 0.06}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Forensic Reports Section */}
        {forensicReports.length > 0 && (
          <>
            <GoldenDivider />
            <div className="mb-36">
              <p className="section-eyebrow">FORENSIC ANALYSIS</p>
              <h2 className="section-title-lg">Forensic Reports</h2>
            </div>
            <div className="evidence-section-title">
              <span className="ev-section-icon">
                <DocumentIcon />
              </span>
              <h3 className="ev-section-heading">Forensic Reports</h3>
              <span className="ev-section-count">
                {forensicReports.length} report
                {forensicReports.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="evidence-grid">
              {forensicReports.map((ev, i) => (
                <EvidenceCard
                  key={ev.id}
                  evidence={ev}
                  onView={setViewingEvidence}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Floating upload button */}
      <button
        className="fab-upload"
        onClick={() => setShowUpload(true)}
        title="Upload Evidence"
      >
        <span className="fab-tooltip">Upload Evidence</span>
        <PlusIcon />
      </button>

      {/* Evidence view modal */}
      {viewingEvidence && (
        <EvidenceModal
          ev={viewingEvidence}
          caseId={caseData.id}
          onClose={() => setViewingEvidence(null)}
        />
      )}

      {/* Upload modal */}
      {showUpload && (
        <UploadEvidenceModal
          caseId={id}
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
}
