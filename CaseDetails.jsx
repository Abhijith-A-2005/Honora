import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { MOCK_CASES, MOCK_EVIDENCE } from "./mockData";
import EvidenceCard from "./EvidenceCard";
import EvidenceModal from "./EvidenceModal";
import UploadEvidenceModal from "./UploadEvidenceModal";
import { GoldenDivider } from "./Shared";
import {
  ArrowLeftIcon, PlusIcon,
  VideoIcon, PhotoIcon, DocumentIcon, MicIcon, FolderIcon
} from "./Icons";

const STATUS_CLASS = {
  "Open": "status-open",
  "Closed": "status-closed",
  "Under Investigation": "status-investigating",
};

const EVIDENCE_SECTIONS = [
  { format: "Video",         label: "Video Evidence",    Icon: VideoIcon },
  { format: "Photo",         label: "Photo Evidence",    Icon: PhotoIcon },
  { format: "Text Document", label: "Text Documents",    Icon: DocumentIcon },
  { format: "Voice Note",    label: "Voice Notes",       Icon: MicIcon },
  { format: "Other",         label: "Other Files",       Icon: FolderIcon },
];

export default function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const caseData = MOCK_CASES.find((c) => c.id === id);

  const [evidenceList, setEvidenceList] = useState(() => MOCK_EVIDENCE[id] || []);
  const [viewingEvidence, setViewingEvidence] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (!user) navigate("/role");
    if (!caseData) navigate("/dashboard/police");
  }, [user, caseData, navigate]);

  if (!user || !caseData) return null;

  const handleUpload = (newEvidence) => {
    setEvidenceList((prev) => [newEvidence, ...prev]);
    // Remove "new" flag after animation
    setTimeout(() => {
      setEvidenceList((prev) =>
        prev.map((e) => e.id === newEvidence.id ? { ...e, isNew: false } : e)
      );
    }, 2000);
  };

  const getEvidenceByFormat = (format) => evidenceList.filter((e) => e.format === format);

  return (
    <>
      <main className="case-details-page">
        {/* Back */}
        <button className="back-btn" onClick={() => navigate("/dashboard/police")}>
          <ArrowLeftIcon /> Back to Dashboard
        </button>

        {/* Case Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.3em", color: "var(--gold)", fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>
            ⊙ Case File · {caseData.id}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,4vw,2.8rem)", color: "var(--text)", fontWeight: 700, marginBottom: 12 }}>
            {caseData.title}
          </h1>
          <span className={`cc-status ${STATUS_CLASS[caseData.status] || "status-open"}`}>
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
            <span className="meta-value">{caseData.officer}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Badge Number</span>
            <span className="meta-value">{caseData.badge}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Department</span>
            <span className="meta-value">{caseData.department}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date Filed</span>
            <span className="meta-value">{caseData.date}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Evidence Items</span>
            <span className="meta-value gold-text">{evidenceList.length}</span>
          </div>
        </div>

        {/* Description */}
        <div className="case-desc-block">
          <p>{caseData.description}</p>
        </div>

        <GoldenDivider />
        <div style={{ marginBottom: 40 }} />

        {/* Evidence heading */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.3em", color: "var(--gold)", fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>
            DIGITAL EVIDENCE VAULT
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,3vw,2rem)", color: "var(--text)", fontWeight: 700 }}>
            Evidence Repository
          </h2>
        </div>

        {/* Evidence Sections */}
        <div className="evidence-sections">
          {EVIDENCE_SECTIONS.map(({ format, label, Icon }) => {
            const items = getEvidenceByFormat(format);
            return (
              <div key={format}>
                <div className="evidence-section-title">
                  <span className="ev-section-icon"><Icon /></span>
                  <h3 className="ev-section-heading">{label}</h3>
                  <span className="ev-section-count">{items.length} item{items.length !== 1 ? "s" : ""}</span>
                </div>
                {items.length === 0 ? (
                  <div className="no-evidence">No evidence uploaded in this category</div>
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
      </main>

      {/* Floating upload button */}
      <button className="fab-upload" onClick={() => setShowUpload(true)} title="Upload Evidence">
        <span className="fab-tooltip">Upload Evidence</span>
        <PlusIcon />
      </button>

      {/* Evidence view modal */}
      {viewingEvidence && (
        <EvidenceModal evidence={viewingEvidence} onClose={() => setViewingEvidence(null)} />
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
