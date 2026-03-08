import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/useAuth";
import { MOCK_CASES } from "../../data/mockCases";
import { GoldenDivider } from "../common/Shared";
import CaseCard from "./CaseCard";
import NewCaseModal from "./NewCaseModal";
import { PlusIcon } from "../../assets/icons/Icons";


export default function PoliceDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNewCase, setShowNewCase] = useState(false);

  useEffect(() => {
    if (!user) navigate("/role");
  }, [user, navigate]);

  if (!user) return null;

  const openCount        = MOCK_CASES.filter((c) => c.status === "Open").length;
  const investigateCount = MOCK_CASES.filter((c) => c.status === "Under Investigation").length;
  const closedCount      = MOCK_CASES.filter((c) => c.status === "Closed").length;

  return (
    <main className="dashboard-page">
      <div className="dashboard-header" style={{ position: "relative" }}>
        <p className="dashboard-dept">⊙ Police Department · Evidence Management Unit</p>
        <h1 className="dashboard-title">Case Repository</h1>
        <p className="dashboard-meta">
          Welcome back, <span style={{ color: "var(--gold)" }}>{user.username}</span>
          &nbsp;·&nbsp; {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
        <button
          className="btn-gold add-case-btn"
          onClick={() => setShowNewCase(true)}
          style={{ position: "absolute", top: 16, right: 16 }}
        >
          <span className="btn-icon"><PlusIcon /></span> New Case
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-chip">
          <span className="stat-value">{MOCK_CASES.length}</span>
          <span className="stat-label">Total Cases</span>
        </div>
        <div className="stat-chip">
          <span className="stat-value" style={{ color: "#f0d060" }}>{openCount}</span>
          <span className="stat-label">Open</span>
        </div>
        <div className="stat-chip">
          <span className="stat-value" style={{ color: "#ffb74d" }}>{investigateCount}</span>
          <span className="stat-label">Under Investigation</span>
        </div>
        <div className="stat-chip">
          <span className="stat-value" style={{ color: "var(--success)" }}>{closedCount}</span>
          <span className="stat-label">Closed</span>
        </div>
      </div>

      <GoldenDivider />
      <div style={{ marginBottom: 28 }} />

      <div className="cases-grid">
        {MOCK_CASES.map((c, i) => (
          <CaseCard key={c.id} caseData={c} delay={i * 0.07} />
        ))}
      </div>
      {showNewCase && (
        <NewCaseModal
          onClose={() => setShowNewCase(false)}
          onCreate={(nc) => {
            MOCK_CASES.unshift(nc);
            setShowNewCase(false);
          }}
        />
      )}
    </main>
  );
}
