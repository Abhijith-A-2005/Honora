import { useState } from "react";
import { useAuth } from "./useAuth";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const lawyerProfiles = {
  advocate_sharma: { id: 201, name: "Adv. R. Sharma", firm: "Sharma & Associates" },
  advocate_rao:    { id: 202, name: "Adv. K. Rao",    firm: "Rao Legal Partners" },
  advocate_menon:  { id: 203, name: "Adv. S. Menon",  firm: "Menon Law Chambers" },
};

const lawyerCases = [
  {
    id: "LGL-2026-001",
    assignedLawyerId: 201,
    title: "State vs. Aryan Mehta",
    clientName: "Aryan Mehta",
    clientType: "Defense",
    status: "Trial",
    assignedCourt: "District Court, Mumbai",
    courtDate: "2026-03-15",
  },
  {
    id: "LGL-2026-002",
    assignedLawyerId: 202,
    title: "People vs. Nisha Verma",
    clientName: "Nisha Verma",
    clientType: "Prosecution",
    status: "Open",
    assignedCourt: "High Court, Delhi",
    courtDate: "2026-04-02",
  },
  {
    id: "LGL-2026-003",
    assignedLawyerId: 201,
    title: "State vs. Rajan Pillai",
    clientName: "Rajan Pillai",
    clientType: "Defense",
    status: "Closed",
    assignedCourt: "Sessions Court, Kochi",
    courtDate: "2025-12-10",
  },
  {
    id: "LGL-2026-004",
    assignedLawyerId: 203,
    title: "Republic vs. Devika Rao",
    clientName: "Devika Rao",
    clientType: "Prosecution",
    status: "Open",
    assignedCourt: "Supreme Court, Delhi",
    courtDate: "2026-04-20",
  },
];

const evidenceByCase = {
  "LGL-2026-001": [
    {
      id: 1,
      title: "CCTV Footage – Lobby",
      description: "Captured at 10:45 PM on Jan 12, 2026. Shows accused entering the building.",
      format: "video",
      party: "victim",
      uploadedBy: "Officer Sharma",
      uploadDate: "2026-01-14",
      fileUrl: null,
    },
    {
      id: 2,
      title: "Crime Scene Photograph",
      description: "Taken at 11:30 PM by forensics team. Shows primary location.",
      format: "photo",
      party: "victim",
      uploadedBy: "Forensics Team",
      uploadDate: "2026-01-13",
      fileUrl: "https://picsum.photos/800/500?random=10",
    },
    {
      id: 3,
      title: "Witness Statement – Ramesh Kumar",
      description: "Written eyewitness testimony, filed under oath.",
      format: "text",
      party: "victim",
      uploadedBy: "Constable Verma",
      uploadDate: "2026-01-15",
      fileUrl: null,
      textContent:
        "I was present at the scene on the night of January 12th. I saw the accused enter through the lobby at approximately 10:45 PM. He appeared agitated and was carrying a black bag. I reported this to the security guard immediately.",
    },
    {
      id: 4,
      title: "Victim Impact Statement",
      description: "Audio recording of victim's personal account.",
      format: "voice",
      party: "victim",
      uploadedBy: "Victim Counsel",
      uploadDate: "2026-01-19",
      fileUrl: null,
    },
    {
      id: 5,
      title: "Accused Alibi Recording",
      description: "Voice note submitted by accused's attorney as alibi evidence.",
      format: "voice",
      party: "accused",
      uploadedBy: "Defense Team",
      uploadDate: "2026-01-18",
      fileUrl: null,
    },
    {
      id: 6,
      title: "Character Reference Letter",
      description: "Letter from accused's employer confirming character.",
      format: "text",
      party: "accused",
      uploadedBy: "Advocate Rao",
      uploadDate: "2026-01-20",
      fileUrl: null,
      textContent:
        "To Whom It May Concern, This is to certify that Mr. Aryan Mehta has been employed with our firm for the past 5 years. He is of exemplary character and has never been involved in any misconduct. We vouch for his integrity.",
    },
    {
      id: 7,
      title: "Accused at Public Event",
      description: "Photograph placing accused at a public event on the same date.",
      format: "photo",
      party: "accused",
      uploadedBy: "Defense Team",
      uploadDate: "2026-01-21",
      fileUrl: "https://picsum.photos/800/500?random=20",
    },
  ],
  "LGL-2026-002": [
    {
      id: 8,
      title: "Bank Transaction Records",
      description: "Documented fraudulent transactions over a 6-month period.",
      format: "text",
      party: "victim",
      uploadedBy: "Bank Investigator",
      uploadDate: "2026-02-01",
      fileUrl: null,
      textContent:
        "Transaction Log:\nJan 5  — ₹2,45,000 transferred to unknown account.\nJan 12 — ₹1,80,000 suspicious withdrawal.\nFeb 3  — ₹3,10,000 wire transfer flagged by system.\nTotal suspected fraud: ₹7,35,000.",
    },
    {
      id: 9,
      title: "Call Recording – Evidence A",
      description: "Phone call recording from accused discussing the scheme.",
      format: "voice",
      party: "victim",
      uploadedBy: "Cyber Cell",
      uploadDate: "2026-02-05",
      fileUrl: null,
    },
    {
      id: 10,
      title: "Suspect Profile Photo",
      description: "Official identification photograph of the accused.",
      format: "photo",
      party: "accused",
      uploadedBy: "Investigating Officer",
      uploadDate: "2026-02-03",
      fileUrl: "https://picsum.photos/800/500?random=30",
    },
  ],
  "LGL-2026-003": [],
  "LGL-2026-004": [
    {
      id: 11,
      title: "Constitutional Brief",
      description: "Legal brief filed by petitioner outlining constitutional violations.",
      format: "text",
      party: "victim",
      uploadedBy: "Sr. Advocate Pillai",
      uploadDate: "2026-03-01",
      fileUrl: null,
      textContent:
        "Constitutional Petition Brief\nCase: Republic vs. Devika Rao\n\nThe petitioner submits violations of Articles 14, 19, and 21 of the Constitution of India.",
    },
    {
      id: 12,
      title: "Counter Affidavit",
      description: "Respondent's counter affidavit challenging petitioner claims.",
      format: "text",
      party: "accused",
      uploadedBy: "Respondent Counsel",
      uploadDate: "2026-03-05",
      fileUrl: null,
      textContent:
        "Counter Affidavit — Devika Rao\n\nThe respondent categorically denies all allegations. The actions taken were within the purview of statutory authority as defined under Section 12 of the relevant Act.",
    },
  ],
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const FORMAT_ORDER = ["video", "photo", "text", "voice"];
const FORMAT_LABELS = {
  video: "Video Evidence",
  photo: "Photo Evidence",
  text: "Text Documents",
  voice: "Voice Notes",
};
const FORMAT_ICONS = { video: "▶", photo: "◉", text: "≡", voice: "♪" };

// ─── STYLES ───────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Josefin+Sans:wght@300;400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #D4AF37;
    --gold-dim: rgba(212,175,55,0.35);
    --gold-glow: rgba(212,175,55,0.18);
    --bg: #0c0b09;
    --surface: rgba(28,17,6,0.9);
    --surface2: rgba(20,12,3,0.95);
    --text: #f0ead8;
    --text-muted: rgba(240,234,216,0.45);
    --brown-border: rgba(120,75,30,0.3);
    --victim-bg: rgba(180,130,50,0.04);
    --accused-bg: rgba(60,40,100,0.07);
    --accused-gold: rgba(160,130,220,0.6);
    --radius: 12px;
    --radius-lg: 18px;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-ui: 'Josefin Sans', sans-serif;
  }

  html, body, #root { height: 100%; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-ui);
    font-size: 14px;
    letter-spacing: 0.02em;
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes shimmerLine {
    0%,100% { opacity: 0.4; background-position: 0% 50%; }
    50%      { opacity: 1;   background-position: 100% 50%; }
  }
  @keyframes goldPulse {
    0%,100% { text-shadow: 0 0 8px rgba(212,175,55,0.3); }
    50%      { text-shadow: 0 0 22px rgba(212,175,55,0.7), 0 0 40px rgba(212,175,55,0.2); }
  }
  @keyframes btnGlow {
    0%,100% { box-shadow: 0 0 12px rgba(212,175,55,0.3); }
    50%      { box-shadow: 0 0 26px rgba(212,175,55,0.6); }
  }
  @keyframes slideCard {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .view { animation: fadeIn 0.35s ease; }

  .overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.82);
    backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.25s ease;
  }

  .btn-gold {
    background: linear-gradient(135deg, #D4AF37 0%, #b8962a 50%, #D4AF37 100%);
    background-size: 200% 200%;
    color: #0f0f0f;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 1.8rem;
    font-family: var(--font-ui);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    animation: btnGlow 3s ease-in-out infinite;
  }
  .btn-gold:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 0 35px rgba(212,175,55,0.65), 0 8px 20px rgba(0,0,0,0.3);
  }

  .dashboard {
    min-height: 100vh;
    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(80,50,10,0.1) 0%, transparent 60%),
                var(--bg);
    padding: 2.5rem clamp(1.2rem, 5vw, 3.5rem) 5rem;
  }
  .dash-topbar {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.5s ease both;
  }
  .dash-eyebrow {
    font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--gold); opacity: 0.65; margin-bottom: 0.4rem;
  }
  .dash-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 600;
    background: linear-gradient(135deg, #f5d982, #D4AF37, #c4a030);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .dash-subtitle { font-size: 11px; color: var(--text-muted); letter-spacing: 0.1em; margin-top: 0.3rem; }
  .btn-logout {
    background: none;
    border: 1px solid var(--brown-border);
    color: var(--text-muted);
    font-family: var(--font-ui);
    font-size: 11px; letter-spacing: 0.12em;
    padding: 0.55rem 1.2rem;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .btn-logout:hover { border-color: var(--gold-dim); color: var(--gold); }

  .gold-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
    background-size: 200% 100%;
    margin: 1.4rem 0;
    opacity: 0.55;
    animation: shimmerLine 4s ease-in-out infinite;
  }

  .cases-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem; }
  .lawyer-case-card {
    background: linear-gradient(135deg, rgba(30,18,4,0.92) 0%, rgba(22,13,3,0.96) 100%);
    border: 1px solid var(--brown-border);
    border-radius: var(--radius);
    padding: 1.4rem 1.8rem;
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    align-items: center;
    gap: 1.2rem;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                border-color 0.3s, box-shadow 0.3s;
    animation: slideCard 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .lawyer-case-card:hover {
    transform: translateX(6px);
    border-color: var(--gold-dim);
    box-shadow: 0 0 25px rgba(212,175,55,0.1), 0 10px 30px rgba(0,0,0,0.35);
  }
  .case-card-main {}
  .case-id-tag { font-size: 10px; letter-spacing: 0.18em; color: rgba(212,175,55,0.55); margin-bottom: 0.3rem; }
  .case-card-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; color: var(--text); }
  .case-card-court { font-size: 11px; color: var(--text-muted); margin-top: 0.25rem; }
  .badge {
    padding: 0.28rem 0.75rem;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .badge-prosecution { background: rgba(212,175,55,0.12); color: var(--gold); border: 1px solid rgba(212,175,55,0.3); }
  .badge-defense { background: rgba(100,150,220,0.12); color: #7aaee8; border: 1px solid rgba(100,150,220,0.3); }
  .badge-open { background: rgba(52,211,153,0.12); color: #34d399; border: 1px solid rgba(52,211,153,0.3); }
  .badge-trial { background: rgba(251,146,60,0.12); color: #fb923c; border: 1px solid rgba(251,146,60,0.3); }
  .badge-closed { background: rgba(148,163,184,0.1); color: #94a3b8; border: 1px solid rgba(148,163,184,0.25); }
  .case-date { font-size: 11px; color: var(--text-muted); white-space: nowrap; }

  .case-details-header { animation: fadeUp 0.45s ease both; }
  .back-btn {
    background: none;
    border: 1px solid var(--brown-border);
    color: var(--text-muted);
    font-family: var(--font-ui);
    font-size: 11px; letter-spacing: 0.12em;
    padding: 0.5rem 1.1rem;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 1.5rem;
    display: inline-flex; align-items: center; gap: 0.4rem;
  }
  .back-btn:hover { border-color: var(--gold-dim); color: var(--gold); }
  .meta-grid {
    display: flex; flex-wrap: wrap; gap: 2rem;
    margin-top: 1.2rem;
  }
  .meta-item { display: flex; flex-direction: column; gap: 0.25rem; }
  .meta-label { font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(212,175,55,0.5); }
  .meta-value { font-size: 13px; color: var(--text); font-weight: 400; }

  .evidence-sections { display: flex; flex-direction: column; gap: 2.5rem; }
  .evidence-party {
    border-radius: var(--radius-lg);
    padding: 2rem;
    border: 1px solid transparent;
    animation: fadeUp 0.5s ease both;
  }
  .evidence-party.victim {
    background: linear-gradient(145deg, rgba(28,16,4,0.7), rgba(22,12,2,0.8));
    border-color: rgba(212,175,55,0.15);
  }
  .evidence-party.accused {
    background: linear-gradient(145deg, rgba(18,12,28,0.7), rgba(14,8,24,0.8));
    border-color: rgba(120,90,200,0.15);
  }
  .party-label {
    font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
    margin-bottom: 0.3rem;
  }
  .party-label.victim { color: rgba(212,175,55,0.6); }
  .party-label.accused { color: rgba(160,130,220,0.6); }
  .party-heading {
    font-family: var(--font-display);
    font-size: 1.8rem; font-weight: 700;
    margin-bottom: 0.6rem;
    animation: goldPulse 4s ease-in-out infinite;
  }
  .party-heading.victim { color: var(--gold); }
  .party-heading.accused { color: #c4a8f0; }
  .party-divider {
    height: 1px; margin: 0 0 1.8rem;
    border: none;
  }
  .party-divider.victim {
    background: linear-gradient(90deg, var(--gold), transparent);
    opacity: 0.45;
  }
  .party-divider.accused {
    background: linear-gradient(90deg, #9f7fe0, transparent);
    opacity: 0.35;
  }
  .format-group { margin-bottom: 1.8rem; }
  .format-heading {
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.8rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .format-heading-icon { color: var(--gold); opacity: 0.7; font-size: 12px; }
  .no-evidence-text {
    font-size: 11px; color: rgba(255,255,255,0.18);
    font-style: italic; padding: 0.6rem 0;
  }
  .evidence-list { display: flex; flex-direction: column; gap: 0.7rem; }

  .evidence-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 1rem 1.2rem;
    display: flex; align-items: center; gap: 1rem;
    transition: border-color 0.25s, transform 0.25s, background 0.25s;
    animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .evidence-card:hover {
    background: rgba(212,175,55,0.04);
    border-color: var(--gold-dim);
    transform: translateX(4px);
  }
  .ev-format-icon {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
    background: rgba(212,175,55,0.08);
    color: var(--gold);
    border: 1px solid rgba(212,175,55,0.15);
  }
  .ev-body { flex: 1; min-width: 0; }
  .ev-title { font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; color: var(--text); margin-bottom: 0.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ev-desc { font-size: 11px; color: var(--text-muted); margin-bottom: 0.35rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ev-meta { display: flex; gap: 1rem; font-size: 10px; color: rgba(255,255,255,0.25); }
  .ev-view-btn { padding: 0.42rem 1rem; font-size: 10px; letter-spacing: 0.12em; flex-shrink: 0; }

  .ev-modal {
    background: linear-gradient(145deg, rgba(18,10,2,0.98), rgba(22,12,3,0.99));
    border: 1px solid rgba(212,175,55,0.45);
    border-radius: var(--radius-lg);
    padding: 2.5rem;
    width: 90%; max-width: 700px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 0 80px rgba(212,175,55,0.15), 0 40px 80px rgba(0,0,0,0.65);
    animation: scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ev-modal-tag { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); opacity: 0.6; margin-bottom: 0.4rem; }
  .ev-modal-title { font-family: var(--font-display); font-size: 1.8rem; font-weight: 600; color: var(--text); margin-bottom: 1rem; }
  .ev-modal-meta-row { display: flex; flex-wrap: wrap; gap: 1.2rem; margin-bottom: 0.8rem; }
  .ev-modal-meta-item { display: flex; flex-direction: column; gap: 0.18rem; }
  .ev-modal-meta-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(212,175,55,0.5); }
  .ev-modal-meta-value { font-size: 12px; color: var(--text); }
  .ev-modal-desc { font-size: 12px; color: var(--text-muted); line-height: 1.7; margin-bottom: 1rem; }
  .ev-preview-area { margin-top: 1.2rem; }
  .ev-preview-video, .ev-preview-audio { width: 100%; border-radius: 10px; background: #000; }
  .ev-preview-img { width: 100%; max-height: 380px; object-fit: contain; border-radius: 10px; border: 1px solid rgba(212,175,55,0.15); }
  .ev-preview-text {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(212,175,55,0.18);
    border-radius: 10px;
    padding: 1.5rem;
    font-size: 13px; line-height: 1.8;
    color: rgba(240,234,216,0.65);
    max-height: 300px; overflow-y: auto;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
  }
  .ev-preview-placeholder {
    text-align: center; padding: 3rem;
    color: rgba(212,175,55,0.3); font-size: 13px;
    border: 1px dashed rgba(212,175,55,0.18);
    border-radius: 10px;
    line-height: 2;
  }

  .modal-close-btn {
    position: absolute; top: 1rem; right: 1rem;
    background: none;
    border: 1px solid var(--gold-dim);
    color: var(--gold);
    width: 30px; height: 30px;
    border-radius: 50%;
    cursor: pointer; font-size: 12px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .modal-close-btn:hover { background: var(--gold-glow); box-shadow: 0 0 10px var(--gold-dim); }

  @media (max-width: 700px) {
    .lawyer-case-card { grid-template-columns: 1fr; }
    .meta-grid { gap: 1.2rem; }
    .evidence-party { padding: 1.4rem; }
    .ev-modal { padding: 1.8rem; }
    .evidence-card { flex-wrap: wrap; }
    .ev-view-btn { width: 100%; }
  }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function StyleTag() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

function GoldDivider() {
  return <div className="gold-divider" />;
}

// ── Lawyer Case Card ──
function LawyerCaseCard({ c, onView, delay }) {
  const statusClass = c.status === "Open" ? "badge-open" : c.status === "Trial" ? "badge-trial" : "badge-closed";
  const typeClass = c.clientType === "Prosecution" ? "badge-prosecution" : "badge-defense";
  return (
    <div className="lawyer-case-card" style={{ animationDelay: `${delay}s` }} onClick={() => onView(c.id)}>
      <div className="case-card-main">
        <div className="case-id-tag">{c.id}</div>
        <div className="case-card-title">{c.title}</div>
        <div className="case-card-court">🏛 {c.assignedCourt}</div>
      </div>
      <span className={`badge ${typeClass}`}>{c.clientType}</span>
      <span className={`badge ${statusClass}`}>{c.status}</span>
      <div>
        <div className="case-date">📅 {c.courtDate}</div>
        <button className="btn-gold ev-view-btn" style={{ marginTop: "0.5rem" }} onClick={(e) => { e.stopPropagation(); onView(c.id); }}>
          View →
        </button>
      </div>
    </div>
  );
}

// ── Evidence Card ──
function EvidenceCard({ ev, onView, delay }) {
  return (
    <div className="evidence-card" style={{ animationDelay: `${delay}s` }}>
      <div className="ev-format-icon">{FORMAT_ICONS[ev.format]}</div>
      <div className="ev-body">
        <div className="ev-title">{ev.title}</div>
        <div className="ev-desc">{ev.description}</div>
        <div className="ev-meta">
          <span>By: {ev.uploadedBy}</span>
          <span>{ev.uploadDate}</span>
        </div>
      </div>
      <button className="btn-gold ev-view-btn" onClick={() => onView(ev)}>
        View
      </button>
    </div>
  );
}

// ── Evidence Section (all evidence, grouped by format) ──
function EvidenceSection({ evidence, onView }) {
  let itemIdx = 0;
  return (
    <div className="evidence-party victim">
      {FORMAT_ORDER.map((fmt) => {
        const items = evidence.filter((e) => e.format === fmt);
        const groupDelay = itemIdx;
        itemIdx += items.length;
        if (items.length === 0) return null;
        return (
          <div className="format-group" key={fmt}>
            <div className="format-heading">
              <span className="format-heading-icon">{FORMAT_ICONS[fmt]}</span>
              {FORMAT_LABELS[fmt]}
            </div>
            <div className="evidence-list">
              {items.map((ev, i) => (
                <EvidenceCard key={ev.id} ev={ev} onView={onView} delay={(groupDelay + i) * 0.07} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Evidence Modal ──
function EvidenceModal({ ev, onClose }) {
  if (!ev) return null;
  const partyLabel = ev.party === "victim" ? "Victim" : "Accused";

  const renderPreview = () => {
    if (ev.format === "photo")
      return ev.fileUrl
        ? <img src={ev.fileUrl} alt={ev.title} className="ev-preview-img" />
        : <div className="ev-preview-placeholder">◉ Image file not attached in demo mode</div>;
    if (ev.format === "video")
      return ev.fileUrl
        ? <video controls className="ev-preview-video"><source src={ev.fileUrl} /></video>
        : <div className="ev-preview-placeholder">▶ Video file not attached in demo mode</div>;
    if (ev.format === "voice")
      return ev.fileUrl
        ? <audio controls className="ev-preview-audio"><source src={ev.fileUrl} /></audio>
        : <div className="ev-preview-placeholder">♪ Audio file not attached in demo mode</div>;
    if (ev.format === "text")
      return <div className="ev-preview-text">{ev.textContent || "No text content."}</div>;
    return <div className="ev-preview-placeholder">Preview unavailable</div>;
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="ev-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <p className="ev-modal-tag">Evidence Record — {ev.format.toUpperCase()}</p>
        <h2 className="ev-modal-title">{ev.title}</h2>
        <div className="ev-modal-meta-row">
          {[
            ["Uploaded By", ev.uploadedBy],
            ["Upload Date", ev.uploadDate],
            ["Format", ev.format.charAt(0).toUpperCase() + ev.format.slice(1)],
          ].map(([l, v]) => (
            <div className="ev-modal-meta-item" key={l}>
              <span className="ev-modal-meta-label">{l}</span>
              <span className="ev-modal-meta-value">{v}</span>
            </div>
          ))}
        </div>
        <GoldDivider />
        <p className="ev-modal-desc">{ev.description}</p>
        <div className="ev-preview-area">{renderPreview()}</div>
      </div>
    </div>
  );
}

// ── Lawyer Dashboard ──
export function LawyerDashboard({ onViewCase, onLogout }) {
  const { user } = useAuth();
  const profile = lawyerProfiles[user?.username];
  const myCases = lawyerCases.filter(c => c.assignedLawyerId === profile?.id);

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
      <GoldDivider />
      <div className="cases-list">
        {myCases.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "13px" }}>
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

// ── Lawyer Case Details ──
export function LawyerCaseDetails({ caseId, onBack }) {
  const { user } = useAuth();
  const [selectedEv, setSelectedEv] = useState(null);

  const profile  = lawyerProfiles[user?.username];
  const caseData = lawyerCases.find((c) => c.id === caseId);
  const evidence = evidenceByCase[caseId] || [];

  const isAuthorized = caseData && caseData.assignedLawyerId === profile?.id;

  if (!caseData) return (
    <div className="dashboard view">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>Case not found.</p>
    </div>
  );

  if (!isAuthorized) return (
    <div className="dashboard view">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</p>
        <p style={{ color: "#fb923c", fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Unauthorized Access
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "12px", letterSpacing: "0.1em" }}>
          This case is not assigned to you.
        </p>
      </div>
    </div>
  );

  const typeClass   = caseData.clientType === "Prosecution" ? "badge-prosecution" : "badge-defense";
  const statusClass = caseData.status === "Open" ? "badge-open" : caseData.status === "Trial" ? "badge-trial" : "badge-closed";

  return (
    <div className="dashboard view">
      <button className="back-btn" onClick={onBack}>← Back to Cases</button>

      <div className="case-details-header">
        <p className="dash-eyebrow">Case Record</p>
        <h1 className="dash-title">{caseData.title}</h1>
        <div className="meta-grid" style={{ marginTop: "1rem" }}>
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
            <span className={`badge ${typeClass}`} style={{ marginTop: "0.2rem", display: "inline-block" }}>{caseData.clientType}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Status</span>
            <span className={`badge ${statusClass}`} style={{ marginTop: "0.2rem", display: "inline-block" }}>{caseData.status}</span>
          </div>
        </div>
      </div>

      <GoldDivider />

      {evidence.length === 0 ? (
        <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "13px", marginTop: "1rem" }}>
          No evidence has been filed for this case yet.
        </p>
      ) : (
        <div className="evidence-sections">
          <EvidenceSection evidence={evidence} onView={setSelectedEv} />
        </div>
      )}

      {selectedEv && <EvidenceModal ev={selectedEv} onClose={() => setSelectedEv(null)} />}
    </div>
  );
}

// ─── ROOT APP (standalone mode) ───────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [activeCaseId, setActiveCaseId] = useState(null);

  return (
    <>
      <StyleTag />
      {page === "dashboard" && (
        <LawyerDashboard
          onViewCase={(id) => { setActiveCaseId(id); setPage("case"); }}
          onLogout={() => setPage("dashboard")}
        />
      )}
      {page === "case" && activeCaseId && (
        <LawyerCaseDetails
          caseId={activeCaseId}
          onBack={() => setPage("dashboard")}
        />
      )}
    </>
  );
}

export { StyleTag };
