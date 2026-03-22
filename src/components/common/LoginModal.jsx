import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { CloseIcon, ShieldIcon, GavelIcon, CourthouseIcon, ForensicIcon } from "../../assets/icons/Icons";

const ROLE_ICONS = {
  "Police Department": ShieldIcon,
  "Legal Counsel": GavelIcon,
  "Judiciary": CourthouseIcon,
  "Forensic Department": ForensicIcon,
};

const ROLE_ROUTES = {
  "Police Department": "/dashboard/police",
  "Legal Counsel": "/dashboard/lawyer",
  "Judiciary": "/dashboard/judge",
  "Forensic Department": "/dashboard/forensic",
};

export default function LoginModal({ role, onClose, initialSignup = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSignup, setIsSignup] = useState(initialSignup);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const Icon = ROLE_ICONS[role] || ShieldIcon;

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (isSignup) {
      if (!name.trim()) {
        setError("Full name is required.");
        return;
      }
      if (!walletAddress.trim()) {
        setError("Wallet address is required.");
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      let result;

      if (isSignup) {
        // Signup
        result = await signup(name.trim(), email.trim(), password.trim(), role, walletAddress.trim());
      } else {
        // Login
        result = await login(email.trim(), password.trim());
      }

      if (result.success) {
        // Success - redirect to dashboard
        onClose();
        navigate(ROLE_ROUTES[role] || "/dashboard/police");
      } else {
        // Error from auth hook
        setError(result.error || "Authentication failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal-glass">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className="modal-icon">
          <Icon />
        </div>
        <h2 className="modal-title">{role}</h2>
        <p className="modal-subtitle">Secure Authentication Required</p>

        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="input-group">
            <label>{isSignup ? "Email Address" : "Email"}</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {/* Name Field (Signup Only) */}
          {isSignup && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your full legal name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Wallet Address Field (Signup Only) */}
          {isSignup && (
            <div className="input-group">
              <label>Wallet Address</label>
              <input
                type="text"
                placeholder="Your wallet address (e.g., 0x...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                required
              />
            </div>
          )}

          {/* Password Field */}
          <div className="input-group">
            <label>{isSignup ? "Create Password" : "Password"}</label>
            <input
              type="password"
              placeholder={isSignup ? "Choose a secure password" : "Enter your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="modal-error">{error}</p>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`btn-gold modal-btn${loading ? " loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="loader" />
            ) : (
              <>
                <span className="btn-text">{isSignup ? "Create Account" : "Login"}</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {/* Switch Between Login/Signup */}
        <p className="modal-switch">
          {isSignup ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setIsSignup(false);
                  setError("");
                }}
              >
                Log in
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setIsSignup(true);
                  setError("");
                }}
              >
                Sign up
              </button>
            </span>
          )}
        </p>

        <p className="modal-notice">
          🔒 256-bit encrypted · Session logged · Tamper-proof audit trail
        </p>
      </div>
    </div>
  );
}
