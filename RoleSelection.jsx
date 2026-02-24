import { useState } from "react";
import { ShieldIcon, GavelIcon, CourthouseIcon } from "./Icons";
import { GoldenDivider } from "./Shared";
import LoginModal from "./LoginModal";

const addCardRipple = (e, cb) => {
  const card = e.currentTarget;
  const ripple = document.createElement("span");
  const rect = card.getBoundingClientRect();
  ripple.className = "card-ripple";
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  card.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
  cb && cb();
};

const RoleCard = ({ role, icon, description, onClick }) => (
  <div className="role-card" onClick={(e) => addCardRipple(e, onClick)}>
    <div className="card-glow" />
    <div className="rc-icon">{icon}</div>
    <h3 className="rc-title">{role}</h3>
    <p className="rc-desc">{description}</p>
    <div className="rc-footer">
      <span className="rc-cta">Authenticate →</span>
    </div>
  </div>
);

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <>
      <GoldenDivider />
      <section className="role-section">
        <div className="section-header">
          <p className="section-label">SECURE ACCESS PORTAL</p>
          <h2 className="section-title">Select Your Role</h2>
          <p className="section-sub">All sessions are encrypted, logged, and tamper-proof</p>
        </div>

        <div className="roles-grid">
          <RoleCard
            role="Police Department"
            icon={<ShieldIcon />}
            description="Submit, manage and track physical and digital evidence from the field to the evidence room."
            onClick={() => setSelectedRole("Police Department")}
          />
          <RoleCard
            role="Legal Counsel"
            icon={<GavelIcon />}
            description="Review evidence chains, request disclosures, and prepare case documentation for court."
            onClick={() => setSelectedRole("Legal Counsel")}
          />
          <RoleCard
            role="Judiciary"
            icon={<CourthouseIcon />}
            description="Oversee evidence integrity, approve access requests, and issue rulings on admissibility."
            onClick={() => setSelectedRole("Judiciary")}
          />
        </div>
      </section>

      {selectedRole && (
        <LoginModal role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </>
  );
}
