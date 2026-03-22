import { useState } from "react";
import { uploadForensicReport } from "../../services/api.js";
import { CloseIcon, PlusIcon } from "../../assets/icons/Icons.jsx";

const REPORT_TYPES = [
  "DNA Analysis",
  "Fingerprint Analysis",
  "Digital Forensics",
  "Chemical Analysis",
  "Toxicology",
  "Other",
];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function ForensicReportUploadModal({ caseId, onClose, onUpload }) {
  const [form, setForm] = useState({
    title: "",
    reportType: "DNA Analysis",
    description: "",
    findings: "",
    conclusion: "",
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
      setError("Report title is required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!form.findings.trim()) {
      setError("Findings are required.");
      return;
    }
    if (!form.conclusion.trim()) {
      setError("Conclusion is required.");
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
      formData.append("reportType", form.reportType);
      formData.append("findings", form.findings.trim());
      formData.append("conclusion", form.conclusion.trim());
      formData.append("format", "Text Document");

      if (form.file) {
        formData.append("file", form.file);
      }

      const response = await uploadForensicReport(caseId, formData);

      onUpload(response);
      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload report");
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

        <div className="modal-icon welcome-gold">
          <PlusIcon />
        </div>
        <h2 className="modal-title">Upload Forensic Report</h2>
        <p className="modal-subtitle">Case: {caseId}</p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Report Title</label>
            <input
              type="text"
              placeholder="e.g. DNA Analysis Report"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Report Type</label>
            <select
              value={form.reportType}
              onChange={(e) => setForm((f) => ({ ...f, reportType: e.target.value }))}
              disabled={loading}
            >
              {REPORT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Describe the analysis methodology and scope..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Findings</label>
            <textarea
              placeholder="Detail your forensic findings..."
              value={form.findings}
              onChange={(e) => setForm((f) => ({ ...f, findings: e.target.value }))}
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Conclusion</label>
            <textarea
              placeholder="Provide your expert conclusion and recommendations..."
              value={form.conclusion}
              onChange={(e) => setForm((f) => ({ ...f, conclusion: e.target.value }))}
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>File Upload (optional)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={handleFile}
                accept=".pdf,.txt,.doc,.docx"
                disabled={loading}
              />
              <div className="file-input-display">
                <div className="file-input-icon">📄</div>
                <div className="file-input-text">
                  Click or drag to upload supporting document
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

          <div className="modal-btn-row">
            <button
              type="button"
              className="btn-outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-gold${loading ? " loading" : ""}`}
              disabled={loading}
            >
              {loading ? <span className="loader" /> : "Submit Report"}
            </button>
          </div>
        </form>

        <p className="modal-notice">
          🔒 Report is timestamped, digitally signed, and logged for chain of custody
        </p>
      </div>
    </div>
  );
}
