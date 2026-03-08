import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { CloseIcon, ShieldIcon, GavelIcon, CourthouseIcon } from "../../assets/icons/Icons";
import { addProfile } from "../../data/mockUsers"; // helper for signup

const ROLE_ICONS = {
  "Police Department": ShieldIcon,
  "Legal Counsel": GavelIcon,
   "Judiciary": CourthouseIcon,
};

const ROLE_ROUTES = {
  "Police Department": "/dashboard/police",
  "Legal Counsel": "/dashboard/lawyer", // expand later
  "Judiciary": "/dashboard/judge",       // expand later
};

export default function LoginModal({ role, onClose, initialSignup = false }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [extraInfo, setExtraInfo] = useState(""); // firm, court, or department
  const [isSignup, setIsSignup] = useState(initialSignup);
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

    if (isSignup) {
      // additional details for sign up
      if (!fullName.trim()) {
        setError("Please provide your full name.");
        return;
      }
      if (role === "Police Department" && !extraInfo.trim()) {
        setError("Please provide your department name.");
        return;
      }
    }

    setError("");
    setLoading(true);

    const done = () => {
      login(role, username.trim());
      setLoading(false);
      onClose();
      navigate(ROLE_ROUTES[role] || "/dashboard/police");
    };

    if (isSignup) {
      // simulate async sign up
      setTimeout(() => {
        try {
          const details = { name: fullName.trim() };
          if (role === "Legal Counsel") details.firm = extraInfo.trim();
          if (role === "Judiciary") details.court = extraInfo.trim();
          if (role === "Police Department") details.department = extraInfo.trim();
          addProfile(role, username.trim(), details);
        } catch (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
        done();
      }, 1400);
    } else {
      setTimeout(done, 1400);
    }
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
            <label>{isSignup ? "Choose Credentials ID" : "Credentials ID"}</label>
            <input
              type="text"
              placeholder="Enter your credentials ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          {isSignup && (
            <>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your full legal name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              {(role === "Legal Counsel" || role === "Judiciary" || role === "Police Department") && (
                <div className="input-group">
                  <label>
                    {role === "Legal Counsel"
                      ? "Firm"
                      : role === "Judiciary"
                      ? "Court"
                      : "Department"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      role === "Legal Counsel"
                        ? "Name of your firm"
                        : role === "Judiciary"
                        ? "Name of your court"
                        : "Name of your department"
                    }
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                  />
                </div>
              )}
            </>
          )}

          <div className="input-group">
            <label>{isSignup ? "Create Passphrase" : "Passphrase"}</label>
            <input
              type="password"
              placeholder={isSignup ? "Choose a passphrase" : "Enter your passphrase"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="modal-error">{error}</p>}
          <button type="submit" className={`btn-gold modal-btn${loading ? " loading" : ""}`}>
            {loading ? (
              <span className="loader" />
            ) : (
              <>
                <span className="btn-text">{isSignup ? "Sign Up" : "Authenticate"}</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>
        <p className="modal-switch">
          {isSignup ? (
            <span>
              Already have an account?{' '}
              <button type="button" className="link-button" onClick={() => setIsSignup(false)}>
                Log in
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button type="button" className="link-button" onClick={() => setIsSignup(true)}>
                Sign up
              </button>
            </span>
          )}
        </p>

        <p className="modal-notice">🔒 256-bit encrypted · Session logged · Tamper-proof audit trail</p>
      </div>
    </div>
  );
}
