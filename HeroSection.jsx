import { useNavigate } from "react-router-dom";

const addRipple = (e, cb) => {
  const el = e.currentTarget;
  const ripple = document.createElement("span");
  const rect = el.getBoundingClientRect();
  ripple.className = "ripple";
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
  cb && cb();
};

export default function HeroSection() {
  const navigate = useNavigate();

  const handleAccess = (e) => {
    addRipple(e, () => navigate("/role"));
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          GOVERNMENT-GRADE SECURITY
        </div>

        <h1 className="hero-title">
          <span className="title-ev">Evi</span>
          <span className="title-chain">Chain</span>
        </h1>

        <div className="hero-tagline-wrapper">
          <div className="tagline-line" />
          <p className="hero-tagline">
            Secure Digital Evidence Management<br />
            &amp; Chain of Custody Tracking System
          </p>
          <div className="tagline-line" />
        </div>

        <div className="hero-features">
          <span className="feature-chip">🔒 Encrypted</span>
          <span className="feature-chip">⛓️ Immutable Chain</span>
          <span className="feature-chip">⚖️ Court-Admissible</span>
        </div>

        <button className="btn-gold" onClick={handleAccess}>
          <span className="btn-text">Access System</span>
          <span className="btn-arrow">→</span>
        </button>

        <div className="scroll-indicator">
          <div className="scroll-dot" />
          <span>Select Role to Continue</span>
        </div>
      </div>

      <div className="hero-ring ring-1" />
      <div className="hero-ring ring-2" />
      <div className="hero-ring ring-3" />
    </section>
  );
}
