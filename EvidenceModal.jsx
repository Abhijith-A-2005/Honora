import { CloseIcon, VideoIcon, PhotoIcon, DocumentIcon, MicIcon, FolderIcon } from "./Icons";

const FORMAT_ICONS = {
  "Video":         VideoIcon,
  "Photo":         PhotoIcon,
  "Text Document": DocumentIcon,
  "Voice Note":    MicIcon,
};

const EvidencePreview = ({ evidence }) => {
  if (evidence.format === "Video" && evidence.fileUrl) {
    return (
      <div className="ev-preview">
        <video controls>
          <source src={evidence.fileUrl} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  if (evidence.format === "Photo" && evidence.fileUrl) {
    return (
      <div className="ev-preview">
        <img src={evidence.fileUrl} alt={evidence.title} />
      </div>
    );
  }
  if (evidence.format === "Voice Note" && evidence.fileUrl) {
    return (
      <div className="ev-preview" style={{ padding: "20px" }}>
        <audio controls style={{ width: "100%" }}>
          <source src={evidence.fileUrl} />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
  if (evidence.format === "Text Document" && evidence.textContent) {
    return (
      <div className="ev-preview">
        <div className="ev-text-preview">{evidence.textContent}</div>
      </div>
    );
  }
  // File uploaded by user (blob URL)
  if (evidence.fileUrl && evidence.fileUrl.startsWith("blob:")) {
    if (evidence.format === "Video") return <div className="ev-preview"><video controls><source src={evidence.fileUrl} /></video></div>;
    if (evidence.format === "Photo") return <div className="ev-preview"><img src={evidence.fileUrl} alt={evidence.title} /></div>;
    if (evidence.format === "Voice Note") return <div className="ev-preview" style={{padding:"20px"}}><audio controls style={{width:"100%"}}><source src={evidence.fileUrl} /></audio></div>;
  }
  return (
    <div className="ev-preview" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
      No preview available for this file type.
    </div>
  );
};

export default function EvidenceModal({ evidence, onClose }) {
  const Icon = FORMAT_ICONS[evidence.format] || FolderIcon;

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="evidence-modal-overlay" onClick={handleOverlay}>
      <div className="evidence-modal">
        <div className="ev-modal-header">
          <div className="ev-modal-info">
            <div className="ev-modal-format">
              <Icon /> &nbsp; {evidence.format}
            </div>
            <div className="ev-modal-title">{evidence.title}</div>
            <div className="ev-modal-meta">
              <span><strong>ID:</strong> {evidence.id}</span>
              <span><strong>Uploaded By:</strong> {evidence.uploadedBy}</span>
              <span><strong>Date:</strong> {evidence.uploadDate}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="ev-modal-body">
          <p className="ev-modal-desc">{evidence.description}</p>
          <EvidencePreview evidence={evidence} />
        </div>
      </div>
    </div>
  );
}
