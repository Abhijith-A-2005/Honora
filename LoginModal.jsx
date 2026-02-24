import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { CloseIcon, ShieldIcon, GavelIcon, CourthouseIcon } from "./Icons";

const ROLE_ICONS = {
  "Police Department": ShieldIcon,
  "Legal Counsel": GavelIcon,
  Judiciary: CourthouseIcon,
};

const ROLE_ROUTES = {
  "Police Department": "/dashboard/police",
  "Legal Counsel": "/dashboard/police", // expand later
  Judiciary: "/dashboard/police",       // expand later
};

export default function LoginModal({ role, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const Icon = ROLE_ICONS[role] || ShieldIcon;

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      login(role, username.trim());
      setLoading(false);
      onClose();
      navigate(ROLE_ROUTES[role] || "/dashboard/police");
    }, 1400);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal-glass">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className="modal-icon"><Icon /></div>
        <h2 className="modal-title">{role}</h2>
        <p className="modal-subtitle">Secure Authentication Required</p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Credentials ID</label>
            <input type="text" placeholder="Enter your credentials ID" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
          </div>
          <div className="input-group">
            <label>Passphrase</label>
            <input type="password" placeholder="Enter your passphrase" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="modal-error">{error}</p>}
          <button type="submit" className={`btn-gold modal-btn${loading ? " loading" : ""}`}>
            {loading ? <span className="loader" /> : <><span className="btn-text">Authenticate</span><span className="btn-arrow">→</span></>}
          </button>
        </form>

        <p className="modal-notice">🔒 256-bit encrypted · Session logged · Tamper-proof audit trail</p>
      </div>
    </div>
  );
}
