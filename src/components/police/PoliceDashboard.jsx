import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/useAuth.jsx";
import { getCases, createCase } from "../../services/api.js";
import { GoldenDivider } from "../common/Shared.jsx";
import CaseCard from "./CaseCard.jsx";
import NewCaseModal from "./NewCaseModal.jsx";
import { PlusIcon } from "../../assets/icons/Icons.jsx";

export default function PoliceDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNewCase, setShowNewCase] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/role");
      return;
    }

    fetchCases();
  }, [user, navigate]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCases();
      setCases(Array.isArray(data.cases) ? data.cases : data.cases || []);
    } catch (err) {
      console.error("Error fetching cases:", err);
      setError(err.message || "Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCase = async (newCaseData) => {
    try {
      const createdCase = await createCase(newCaseData);
      setCases([createdCase, ...cases]);
      setShowNewCase(false);
    } catch (err) {
      console.error("Error creating case:", err);
      alert(err.message || "Failed to create case");
    }
  };

  if (!user) return null;

  // Calculate stats from backend data
  const openCount = cases.filter((c) => c.status === "Open").length;
  const investigateCount = cases.filter((c) => c.status === "Under Investigation").length;
  const closedCount = cases.filter((c) => c.status === "Closed").length;

  // Filter cases based on search
  const filteredCases = cases.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.officer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="dashboard-page">
      <div className="dashboard-header" style={{ position: "relative" }}>
        <p className="dashboard-dept">⊙ Police Department · Evidence Management Unit</p>
        <h1 className="dashboard-title">Case Repository</h1>
        <p className="dashboard-meta">
          Welcome back,{" "}
          <span style={{ color: "var(--gold)" }}>{user.username}</span>
          &nbsp;·&nbsp;{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <button
          className="btn-gold add-case-btn"
          onClick={() => setShowNewCase(true)}
          style={{ position: "absolute", top: 16, right: 16 }}
        >
          <span className="btn-icon">
            <PlusIcon />
          </span>{" "}
          New Case
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-chip">
          <span className="stat-value">{cases.length}</span>
          <span className="stat-label">Total Cases</span>
        </div>
        <div className="stat-chip">
          <span className="stat-value" style={{ color: "#f0d060" }}>{openCount}</span>
          <span className="stat-label">Open</span>
        </div>
        <div className="stat-chip">
          <span className="stat-value" style={{ color: "#ffb74d" }}>
            {investigateCount}
          </span>
          <span className="stat-label">Under Investigation</span>
        </div>
        <div className="stat-chip">
          <span className="stat-value" style={{ color: "var(--success)" }}>
            {closedCount}
          </span>
          <span className="stat-label">Closed</span>
        </div>
      </div>

      <GoldenDivider />
      <div style={{ marginBottom: 28 }} />

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            backgroundColor: "rgba(255,255,255,0.03)",
            color: "var(--text)",
            fontSize: "0.95rem",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition: "all 0.3s var(--ease)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--gold-dim)";
            e.target.style.backgroundColor = "rgba(212,175,55,0.04)";
            e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.backgroundColor = "rgba(255,255,255,0.03)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "20px",
            backgroundColor: "rgba(255,0,0,0.1)",
            border: "1px solid #ff6b6b",
            borderRadius: "6px",
            color: "#ff6b6b",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
          <p>Loading cases...</p>
        </div>
      ) : (
        <div className="cases-grid">
          {filteredCases.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "13px" }}>
              {searchQuery ? "No cases match your search." : "No cases available."}
            </p>
          ) : (
            filteredCases.map((c, i) => (
              <CaseCard key={c.id} caseData={c} delay={i * 0.07} />
            ))
          )}
        </div>
      )}

      {showNewCase && (
        <NewCaseModal
          onClose={() => setShowNewCase(false)}
          onCreate={handleCreateCase}
        />
      )}
    </main>
  );
}
