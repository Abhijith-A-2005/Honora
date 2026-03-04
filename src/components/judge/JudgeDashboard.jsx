// pages/judge/JudgeDashboard.jsx
import "../../styles/judge.css";
import { useAuth } from "../common/useAuth";
import { JUDGE_CASES }    from "../../data/mockCases";
import { JUDGE_PROFILES } from "../../data/mockUsers";
import { filterJudgeCases } from "../../utils/filters";
import JudgeCaseCard from "./JudgeCaseCard";

export default function JudgeDashboard({ onViewCase, onLogout }) {
  const { user } = useAuth();
  const profile  = JUDGE_PROFILES[user?.username];
  const myCases  = filterJudgeCases(JUDGE_CASES, profile);

  return (
    <div className="judge-dashboard">
      <div className="judge-topbar">
        <div>
          <p className="judge-eyebrow">Judiciary Portal — EviChain</p>
          <h1 className="judge-title">Court Case Management</h1>
          <p className="judge-subtitle">
            {profile ? `${profile.court} · ${profile.name}` : "Active docket"}
          </p>
        </div>
        <button className="judge-logout-btn" onClick={onLogout}>← Logout</button>
      </div>

      <div className="judge-divider" />

      <div className="judge-cases-list">
        {myCases.length === 0 ? (
          <p style={{ color:"rgba(240,234,216,0.3)", fontStyle:"italic", fontSize:"13px", fontFamily:"'Josefin Sans', sans-serif" }}>
            No active cases assigned to you.
          </p>
        ) : (
          myCases.map((c, i) => (
            <JudgeCaseCard key={c.id} c={c} onView={onViewCase} delay={i * 0.08} />
          ))
        )}
      </div>
    </div>
  );
}
