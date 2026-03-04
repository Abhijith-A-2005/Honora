// components/common/EvidenceModal.jsx
// Shared evidence viewer modal used by Lawyer and Judge.

const FORMAT_ICONS = { video:"▶", photo:"◉", text:"≡", voice:"♪" };

export default function EvidenceModal({ ev, caseId, onClose }) {
  if (!ev) return null;

  const renderPreview = () => {
    if (ev.format === "photo")
      return ev.fileUrl
        ? <img src={ev.fileUrl} alt={ev.title} className="ev-preview-img" />
        : <div className="ev-preview-placeholder">◉ Image not attached in demo mode</div>;
    if (ev.format === "video")
      return ev.fileUrl
        ? <video controls className="ev-preview-video"><source src={ev.fileUrl} /></video>
        : <div className="ev-preview-placeholder">▶ Video not attached in demo mode</div>;
    if (ev.format === "voice")
      return ev.fileUrl
        ? <audio controls className="ev-preview-audio"><source src={ev.fileUrl} /></audio>
        : <div className="ev-preview-placeholder">♪ Audio not attached in demo mode</div>;
    if (ev.format === "text")
      return <div className="ev-preview-text">{ev.textContent || "No text content."}</div>;
    return <div className="ev-preview-placeholder">Preview unavailable</div>;
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="ev-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <p className="ev-modal-tag">Evidence Record — {ev.format?.toUpperCase()}</p>
        <h2 className="ev-modal-title">{ev.title}</h2>
        <div className="ev-modal-meta-row">
          {[
            ["Uploaded By", ev.uploadedBy],
            ["Date Filed",  ev.uploadDate],
            ["Format",      ev.format ? ev.format.charAt(0).toUpperCase() + ev.format.slice(1) : "—"],
            ...(caseId ? [["Case ID", caseId]] : []),
          ].map(([l, v]) => (
            <div className="ev-modal-meta-item" key={l}>
              <span className="ev-modal-meta-label">{l}</span>
              <span className="ev-modal-meta-value">{v}</span>
            </div>
          ))}
        </div>
        <div className="gold-divider" />
        <p className="ev-modal-desc">{ev.description}</p>
        <div className="ev-preview-area">{renderPreview()}</div>
      </div>
    </div>
  );
}
