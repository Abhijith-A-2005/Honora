// pages/lawyer/LawyerCaseDetails.jsx

import { useAuth } from "../common/useAuth";
import { LAWYER_CASES }    from "../../data/mockCases";
import { LAWYER_EVIDENCE } from "../../data/mockEvidence";
import { LAWYER_PROFILES } from "../../data/mockUsers";
import { isLawyerAuthorized } from "../../utils/filters";
import { getStatusBadgeClass, getTypeBadgeClass } from "../../utils/helpers";
import EvidenceSection from "../common/EvidenceSection";

export default function LawyerCaseDetails({ caseId, onBack }) {
  const { user } = useAuth();
  const profile  = LAWYER_PROFILES[user?.username];
  const caseData = LAWYER_CASES.find(c => c.id === caseId);
  const evidence = LAWYER_EVIDENCE[caseId] || [];

  if (!caseData) return (
    <div className="dashboard view">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <p style={{ color:"var(--text-muted)", marginTop:"2rem" }}>Case not found.</p>
    </div>
  );

  if (!isLawyerAuthorized(caseData, profile)) return (
    <div className="dashboard view">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div style={{ marginTop:"3rem", textAlign:"center" }}>
        <p style={{ fontSize:"2rem", marginBottom:"1rem" }}>⚠️</p>
        <p style={{ color:"#fb923c", fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:700, marginBottom:"0.5rem" }}>
          Unauthorized Access
        </p>
        <p style={{ color:"var(--text-muted)", fontSize:"12px", letterSpacing:"0.1em" }}>
          This case is not assigned to you.
        </p>
      </div>
    </div>
  );

  return (
    <div className="dashboard view">
      <button className="back-btn" onClick={onBack}>← Back to Cases</button>

      <div style={{ animation:"fadeUp 0.45s ease both" }}>
        <p className="dash-eyebrow">Case Record</p>
        <h1 className="dash-title">{caseData.title}</h1>
        <div className="meta-grid">
          {[
            ["Case ID",    caseData.id],
            ["Client",     caseData.clientName],
            ["Court",      caseData.assignedCourt],
            ["Court Date", caseData.courtDate],
            ["Counsel",    profile?.name],
          ].map(([l, v]) => (
            <div className="meta-item" key={l}>
              <span className="meta-label">{l}</span>
              <span className="meta-value">{v}</span>
            </div>
          ))}
          <div className="meta-item">
            <span className="meta-label">Representation</span>
            <span className={`badge ${getTypeBadgeClass(caseData.clientType)}`} style={{ marginTop:"0.2rem", display:"inline-block" }}>
              {caseData.clientType}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Status</span>
            <span className={`badge ${getStatusBadgeClass(caseData.status)}`} style={{ marginTop:"0.2rem", display:"inline-block" }}>
              {caseData.status}
            </span>
          </div>
        </div>
      </div>

      <div className="gold-divider" />

      {evidence.length === 0 ? (
        <p style={{ color:"var(--text-muted)", fontStyle:"italic", fontSize:"13px", marginTop:"1rem" }}>
          No evidence has been filed for this case yet.
        </p>
      ) : (
        <EvidenceSection evidence={evidence} caseId={caseId} />
      )}
    </div>
  );
}
