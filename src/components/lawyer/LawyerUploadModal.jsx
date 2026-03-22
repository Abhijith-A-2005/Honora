import { useState } from "react";
import { uploadLawyerDocument } from "../../services/api.js";
import { CloseIcon, PlusIcon } from "../../assets/icons/Icons.jsx";

const FORMATS = ["Legal Brief", "Affidavit", "Motion", "Petition", "Evidence Document", "Other"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function LawyerUploadModal({ caseId, onClose, onUpload, lawyerName }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    format: "Legal Brief",
    file: null,
    fileName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError(
        `File too large. Max: 50MB (yours: ${(file.size / 1024 / 1024).toFixed(2)}MB)`
      );
      return;
    }

    setError("");
    setForm((f) => ({ ...f, file, fileName: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (form.file && form.file.size > MAX_FILE_SIZE) {
      setError("File exceeds 50MB limit");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("format", form.format.toLowerCase().replace(/ /g, "_"));

      if (form.file) {
        formData.append("file", form.file);
      }

      const response = await uploadLawyerDocument(caseId, formData);

      onUpload(response);
      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload document");
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal-glass upload-modal">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
          disabled={loading}
        >
          <CloseIcon />
        </button>

        <div className="modal-icon" style={{ color: "var(--gold)" }}>
          <PlusIcon />
        </div>
        <h2 className="modal-title">Upload Supporting Document</h2>
        <p className="modal-subtitle">Case: {caseId}</p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Document Title</label>
            <input
              type="text"
              placeholder="e.g. Defense Brief — Alibi Evidence"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Describe this supporting document..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Document Type</label>
            <select
              value={form.format}
              onChange={(e) => setForm((f) => ({ ...f, format: e.target.value }))}
              disabled={loading}
            >
              {FORMATS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>File Upload (optional)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={handleFile}
                accept=".pdf,.doc,.docx,.txt,.rtf"
                disabled={loading}
              />
              <div className="file-input-display">
                <div className="file-input-icon">📄</div>
                <div className="file-input-text">
                  Click or drag to upload document
                </div>
                {form.fileName && (
                  <div className="file-input-name">{form.fileName}</div>
                )}
              </div>
            </div>
            {form.file && (
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px" }}>
                Size: {(form.file.size / 1024 / 1024).toFixed(2)}MB
              </p>
            )}
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              className="btn-outline"
              style={{ flex: 1 }}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-gold${loading ? " loading" : ""}`}
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? <span className="loader" /> : "Submit Document"}
            </button>
          </div>
        </form>

        <p className="modal-notice">
          ⚖️ Documents are digitally signed and timestamped for court admissibility
        </p>
      </div>
    </div>
  );
}
