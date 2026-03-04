// pages/lawyer/LawyerDashboard.jsx
import "../../styles/lawyer.css";
import { useAuth } from "../common/useAuth";
import { LAWYER_CASES }    from "../../data/mockCases";
import { LAWYER_PROFILES } from "../../data/mockUsers";
import { filterLawyerCases } from "../../utils/filters";
import LawyerCaseCard from "./LawyerCaseCard";

export default function LawyerDashboard({ onViewCase, onLogout }) {
  const { user } = useAuth();
  const profile  = LAWYER_PROFILES[user?.username];
  const myCases  = filterLawyerCases(LAWYER_CASES, profile);

  return (
    <div className="dashboard view">
      <div className="dash-topbar">
        <div>
          <p className="dash-eyebrow">Lawyer Portal — EviChain</p>
          <h1 className="dash-title">Case Overview</h1>
          <p className="dash-subtitle">
            {profile ? `${profile.firm} · ${profile.name}` : "Your active legal portfolio"}
          </p>
        </div>
        <button className="btn-logout" onClick={onLogout}>← Logout</button>
      </div>

      <div className="gold-divider" />

      <div className="cases-list">
        {myCases.length === 0 ? (
          <p style={{ color:"var(--text-muted)", fontStyle:"italic", fontSize:"13px" }}>
            No cases currently assigned to you.
          </p>
        ) : (
          myCases.map((c, i) => (
            <LawyerCaseCard key={c.id} c={c} onView={onViewCase} delay={i * 0.1} />
          ))
        )}
      </div>
    </div>
  );
}
