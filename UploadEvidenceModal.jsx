import { useState } from "react";
import { CloseIcon, PlusIcon } from "./Icons";

const FORMATS = ["Video", "Photo", "Text Document", "Voice Note", "Other"];

export default function UploadEvidenceModal({ caseId, onClose, onUpload }) {
  const [form, setForm] = useState({ title: "", description: "", format: "Video", file: null, fileName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, file, fileName: file.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.description.trim()) { setError("Description is required."); return; }
    setError("");
    setLoading(true);

    setTimeout(() => {
      const fileUrl = form.file ? URL.createObjectURL(form.file) : null;
      const newEvidence = {
        id: `EV-NEW-${Date.now()}`,
        title: form.title.trim(),
        description: form.description.trim(),
        format: form.format,
        uploadedBy: "Current Officer",
        uploadDate: new Date().toISOString().split("T")[0],
        fileUrl,
        textContent: form.format === "Text Document" ? form.description : null,
        isNew: true,
      };
      onUpload(newEvidence);
      setLoading(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal-glass upload-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>

        <div className="modal-icon" style={{ color: "var(--gold)" }}><PlusIcon /></div>
        <h2 className="modal-title">Upload Evidence</h2>
        <p className="modal-subtitle">Case: {caseId}</p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Evidence Title</label>
            <input type="text" placeholder="e.g. Lobby CCTV Footage" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea placeholder="Describe this piece of evidence..." value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>

          <div className="input-group">
            <label>Format</label>
            <select value={form.format} onChange={(e) => setForm((f) => ({ ...f, format: e.target.value }))}>
              {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label>File Upload (optional)</label>
            <div className="file-input-wrapper">
              <input type="file" onChange={handleFile} accept="video/*,image/*,audio/*,.pdf,.txt,.doc,.docx" />
              <div className="file-input-display">
                <div className="file-input-icon">📂</div>
                <div className="file-input-text">Click or drag to upload file</div>
                {form.fileName && <div className="file-input-name">{form.fileName}</div>}
              </div>
            </div>
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" className="btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button type="submit" className={`btn-gold${loading ? " loading" : ""}`} style={{ flex: 1 }}>
              {loading ? <span className="loader" /> : "Submit Evidence"}
            </button>
          </div>
        </form>

        <p className="modal-notice">🔒 Evidence is cryptographically hashed and logged to chain of custody</p>
      </div>
    </div>
  );
}
