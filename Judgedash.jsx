import { useState } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const judgeCases = [
  {
    id: "CRT-2026-001",
    title: "State vs. Aryan Mehta",
    courtName: "District Court, Mumbai",
    presidingJudge: "Hon. Justice R. Krishnan",
    status: "Trial",
    nextHearing: "2026-03-15",
  },
  {
    id: "CRT-2026-002",
    title: "People vs. Nisha Verma",
    courtName: "High Court, Delhi",
    presidingJudge: "Hon. Justice S. Mehta",
    status: "Hearing",
    nextHearing: "2026-04-02",
  },
  {
    id: "CRT-2026-003",
    title: "State vs. Rajan Pillai",
    courtName: "Sessions Court, Kochi",
    presidingJudge: "Hon. Justice A. Nair",
    status: "Closed",
    nextHearing: "—",
  },
  {
    id: "CRT-2026-004",
    title: "Republic vs. Devika Rao",
    courtName: "Supreme Court, New Delhi",
    presidingJudge: "Hon. Chief Justice P. Sharma",
    status: "Hearing",
    nextHearing: "2026-03-28",
  },
];

const evidenceByCase = {
  "CRT-2026-001": [
    {
      id: 1,
      title: "CCTV Footage – Lobby",
      description: "Captured at 10:45 PM on Jan 12, 2026. Shows accused entering building.",
      format: "video",
      party: "victim",
      uploadedBy: "Officer Sharma",
      uploadDate: "2026-01-14",
      fileUrl: null,
    },
    {
      id: 2,
      title: "Crime Scene Photograph",
      description: "Taken at 11:30 PM by forensics. Shows primary location of incident.",
      format: "photo",
      party: "victim",
      uploadedBy: "Forensics Team",
      uploadDate: "2026-01-13",
      fileUrl: "https://picsum.photos/800/500?random=11",
    },
    {
      id: 3,
      title: "Forensic Lab Report",
      description: "DNA match confirmation from forensic laboratory analysis.",
      format: "text",
      party: "victim",
      uploadedBy: "Forensic Dept.",
      uploadDate: "2026-01-16",
      fileUrl: null,
      textContent:
        "Forensic Analysis Report — Case CRT-2026-001\n\nSample ID: FSL-9921\nAnalysis Type: DNA Profiling\nResult: Positive match with accused sample (99.97% confidence)\nChain of Custody: Verified and sealed\nAnalyst: Dr. P. Kapoor, Senior Forensic Scientist\nDate of Analysis: January 16, 2026",
    },
    {
      id: 4,
      title: "Victim Impact Statement",
      description: "Recorded audio testimony from the victim's family.",
      format: "voice",
      party: "victim",
      uploadedBy: "Victim Counsel",
      uploadDate: "2026-01-19",
      fileUrl: null,
    },
    {
      id: 5,
      title: "Accused Alibi Recording",
      description: "Audio submission from defense counsel as alibi claim.",
      format: "voice",
      party: "accused",
      uploadedBy: "Defense Team",
      uploadDate: "2026-01-18",
      fileUrl: null,
    },
    {
      id: 6,
      title: "Character Reference Letter",
      description: "Written character testimony from accused's employer.",
      format: "text",
      party: "accused",
      uploadedBy: "Advocate Rao",
      uploadDate: "2026-01-20",
      fileUrl: null,
      textContent:
        "To The Honourable Court,\n\nThis is to certify that Mr. Aryan Mehta has served our organisation with distinction for 5 years. He is of exemplary character and moral standing. We humbly request the court to consider this in its deliberations.\n\nSigned,\nMr. K. Bose\nDirector, Apex Industries",
    },
    {
      id: 7,
      title: "Accused — Event Photograph",
      description: "Photographic evidence placing accused at a public event on the same date.",
      format: "photo",
      party: "accused",
      uploadedBy: "Defense Team",
      uploadDate: "2026-01-21",
      fileUrl: "https://picsum.photos/800/500?random=21",
    },
  ],
  "CRT-2026-002": [
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
        "Transaction Log — Case CRT-2026-002\n\nJan 5  — ₹2,45,000 transferred to unknown account\nJan 12 — ₹1,80,000 suspicious withdrawal\nFeb 3  — ₹3,10,000 wire transfer flagged by system\n\nTotal suspected fraud: ₹7,35,000\nInvestigating Officer: Cyber Cell Unit 4",
    },
    {
      id: 9,
      title: "Surveillance Photo — ATM",
      description: "ATM camera photograph of accused during fraudulent withdrawal.",
      format: "photo",
      party: "victim",
      uploadedBy: "Cyber Cell",
      uploadDate: "2026-02-04",
      fileUrl: "https://picsum.photos/800/500?random=31",
    },
    {
      id: 10,
      title: "Call Recording — Evidence A",
      description: "Phone call recording of accused discussing the fraud scheme.",
      format: "voice",
      party: "victim",
      uploadedBy: "Cyber Cell",
      uploadDate: "2026-02-05",
      fileUrl: null,
    },
    {
      id: 11,
      title: "Defense Statement",
      description: "Written statement submitted by accused denying involvement.",
      format: "text",
      party: "accused",
      uploadedBy: "Defense Counsel",
      uploadDate: "2026-02-08",
      fileUrl: null,
      textContent:
        "I, Nisha Verma, hereby state under oath that I had no knowledge of or involvement in any fraudulent transactions. The account referenced was compromised without my consent. I request a full forensic audit of my devices to establish innocence.",
    },
  ],
  "CRT-2026-003": [],
  "CRT-2026-004": [
    {
      id: 12,
      title: "Constitutional Brief",
      description: "Legal brief filed by petitioner outlining constitutional violations.",
      format: "text",
      party: "victim",
      uploadedBy: "Sr. Advocate Pillai",
      uploadDate: "2026-03-01",
      fileUrl: null,
      textContent:
        "Constitutional Petition Brief\nCase: Republic vs. Devika Rao\n\nThe petitioner submits that the actions of the respondent constitute a direct violation of Articles 14, 19, and 21 of the Constitution of India. Supporting precedents: Maneka Gandhi v. Union of India (1978), K.S. Puttaswamy v. Union of India (2017).",
    },
    {
      id: 13,
      title: "Counter Affidavit",
      description: "Respondent's counter affidavit challenging petitioner claims.",
      format: "text",
      party: "accused",
      uploadedBy: "Respondent Counsel",
      uploadDate: "2026-03-05",
      fileUrl: null,
      textContent:
        "Counter Affidavit — Devika Rao\n\nThe respondent categorically denies all allegations. The actions taken were within the purview of statutory authority as defined under Section 12 of the relevant Act. The petition is frivolous and liable to be dismissed with costs.",
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

const judgeCss = `
  /* ── JUDGE DASHBOARD ── */
  .judge-dashboard {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 50% 35% at 50% 0%, rgba(60,45,10,0.12) 0%, transparent 60%),
      #0c0b09;
    padding: 2.5rem clamp(1.2rem, 5vw, 3.5rem) 5rem;
  }

  .judge-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    animation: jFadeUp 0.5s ease both;
  }

  .judge-eyebrow {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #D4AF37;
    opacity: 0.6;
    margin-bottom: 0.4rem;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    background: linear-gradient(135deg, #f5d982, #D4AF37, #b8962a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.02em;
  }

  .judge-subtitle {
    font-size: 11px;
    color: rgba(240,234,216,0.4);
    letter-spacing: 0.12em;
    margin-top: 0.3rem;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-logout-btn {
    background: none;
    border: 1px solid rgba(120,75,30,0.35);
    color: rgba(240,234,216,0.45);
    font-family: 'Josefin Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.12em;
    padding: 0.55rem 1.2rem;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .judge-logout-btn:hover {
    border-color: rgba(212,175,55,0.4);
    color: #D4AF37;
  }

  /* ── JUDGE DIVIDER ── */
  .judge-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    opacity: 0.45;
    margin: 1.4rem 0;
    animation: jShimmer 4s ease-in-out infinite;
  }

  @keyframes jShimmer {
    0%,100% { opacity: 0.3; }
    50%      { opacity: 0.7; }
  }

  /* ── JUDGE CASE LIST ── */
  .judge-cases-list {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin-top: 0.5rem;
  }

  .judge-case-card {
    background: linear-gradient(135deg, rgba(26,16,3,0.94), rgba(20,12,2,0.97));
    border: 1px solid rgba(120,75,30,0.28);
    border-radius: 12px;
    padding: 1.4rem 1.8rem;
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    align-items: center;
    gap: 1.4rem;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                border-color 0.25s,
                box-shadow 0.25s;
    animation: jSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  .judge-case-card:hover {
    transform: translateX(5px);
    border-color: rgba(212,175,55,0.35);
    box-shadow: 0 0 20px rgba(212,175,55,0.08), 0 8px 24px rgba(0,0,0,0.35);
  }

  .judge-case-id {
    font-size: 10px;
    letter-spacing: 0.18em;
    color: rgba(212,175,55,0.5);
    margin-bottom: 0.25rem;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-case-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #f0ead8;
    margin-bottom: 0.2rem;
  }

  .judge-case-court {
    font-size: 11px;
    color: rgba(240,234,216,0.38);
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-date-col {
    text-align: right;
  }

  .judge-date-label {
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.45);
    margin-bottom: 0.2rem;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-date-val {
    font-size: 12px;
    color: rgba(240,234,216,0.6);
    font-family: 'Josefin Sans', sans-serif;
  }

  /* ── STATUS BADGES ── */
  .judge-badge {
    padding: 0.25rem 0.7rem;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-badge-hearing {
    background: rgba(99,179,237,0.1);
    color: #63b3ed;
    border: 1px solid rgba(99,179,237,0.3);
  }

  .judge-badge-trial {
    background: rgba(251,146,60,0.1);
    color: #fb923c;
    border: 1px solid rgba(251,146,60,0.3);
  }

  .judge-badge-closed {
    background: rgba(148,163,184,0.08);
    color: #94a3b8;
    border: 1px solid rgba(148,163,184,0.2);
  }

  /* ── JUDGE VIEW BTN ── */
  .judge-view-btn {
    background: linear-gradient(135deg, #D4AF37, #b8962a, #D4AF37);
    background-size: 200% 200%;
    color: #0f0f0f;
    border: none;
    border-radius: 7px;
    padding: 0.45rem 1.1rem;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
    animation: jBtnGlow 3s ease-in-out infinite;
    white-space: nowrap;
  }

  .judge-view-btn:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 0 28px rgba(212,175,55,0.6), 0 6px 16px rgba(0,0,0,0.3);
  }

  /* ── JUDGE CASE DETAILS ── */
  .judge-back-btn {
    background: none;
    border: 1px solid rgba(120,75,30,0.35);
    color: rgba(240,234,216,0.4);
    font-family: 'Josefin Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.12em;
    padding: 0.5rem 1.1rem;
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .judge-back-btn:hover {
    border-color: rgba(212,175,55,0.4);
    color: #D4AF37;
  }

  .judge-meta-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1.2rem;
  }

  .judge-meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.22rem;
  }

  .judge-meta-label {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.45);
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-meta-value {
    font-size: 13px;
    color: #f0ead8;
    font-family: 'Josefin Sans', sans-serif;
  }

  /* ── EVIDENCE PARTY SECTIONS ── */
  .judge-evidence-sections {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 0.5rem;
  }

  .judge-evidence-party {
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid transparent;
    animation: jFadeUp 0.5s ease both;
  }

  .judge-evidence-party.victim {
    background: linear-gradient(145deg, rgba(26,15,3,0.75), rgba(20,11,2,0.85));
    border-color: rgba(212,175,55,0.12);
  }

  .judge-evidence-party.accused {
    background: linear-gradient(145deg, rgba(15,10,25,0.75), rgba(12,7,20,0.85));
    border-color: rgba(100,80,180,0.12);
  }

  .judge-party-sublabel {
    font-size: 9px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
    font-family: 'Josefin Sans', sans-serif;
  }
  .judge-party-sublabel.victim { color: rgba(212,175,55,0.5); }
  .judge-party-sublabel.accused { color: rgba(140,110,220,0.5); }

  .judge-party-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    animation: jGoldPulse 4s ease-in-out infinite;
  }
  .judge-party-heading.victim { color: #D4AF37; }
  .judge-party-heading.accused { color: #b8a0e8; }

  .judge-party-rule {
    height: 1px;
    border: none;
    margin: 0 0 1.8rem;
  }
  .judge-party-rule.victim {
    background: linear-gradient(90deg, #D4AF37, transparent);
    opacity: 0.4;
  }
  .judge-party-rule.accused {
    background: linear-gradient(90deg, #9f7fe0, transparent);
    opacity: 0.3;
  }

  /* ── FORMAT GROUPS ── */
  .judge-format-group { margin-bottom: 1.8rem; }

  .judge-format-heading {
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(240,234,216,0.35);
    margin-bottom: 0.8rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-format-icon {
    color: #D4AF37;
    opacity: 0.65;
    font-size: 11px;
  }

  .judge-no-evidence {
    font-size: 11px;
    color: rgba(255,255,255,0.15);
    font-style: italic;
    padding: 0.5rem 0;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-evidence-list {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  /* ── EVIDENCE CARD ── */
  .judge-ev-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 1rem 1.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: border-color 0.25s, transform 0.25s, background 0.25s;
    animation: jFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  .judge-ev-card:hover {
    background: rgba(212,175,55,0.03);
    border-color: rgba(212,175,55,0.3);
    transform: translateX(4px);
  }

  .judge-ev-icon {
    width: 34px;
    height: 34px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
    background: rgba(212,175,55,0.07);
    color: #D4AF37;
    border: 1px solid rgba(212,175,55,0.12);
  }

  .judge-ev-body { flex: 1; min-width: 0; }

  .judge-ev-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.92rem;
    font-weight: 600;
    color: #f0ead8;
    margin-bottom: 0.18rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .judge-ev-desc {
    font-size: 11px;
    color: rgba(240,234,216,0.38);
    margin-bottom: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-ev-meta {
    display: flex;
    gap: 1rem;
    font-size: 10px;
    color: rgba(255,255,255,0.22);
    font-family: 'Josefin Sans', sans-serif;
  }

  /* ── EVIDENCE MODAL ── */
  .judge-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: jFadeIn 0.25s ease;
  }

  .judge-ev-modal {
    background: linear-gradient(145deg, rgba(16,9,2,0.99), rgba(20,12,3,0.99));
    border: 1px solid rgba(212,175,55,0.4);
    border-radius: 18px;
    padding: 2.5rem;
    width: 90%;
    max-width: 700px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 0 80px rgba(212,175,55,0.12), 0 40px 80px rgba(0,0,0,0.7);
    animation: jScaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }

  .judge-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: 1px solid rgba(212,175,55,0.35);
    color: #D4AF37;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .judge-modal-close:hover {
    background: rgba(212,175,55,0.12);
    box-shadow: 0 0 10px rgba(212,175,55,0.3);
  }

  .judge-modal-tag {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #D4AF37;
    opacity: 0.6;
    margin-bottom: 0.4rem;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-modal-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: #f0ead8;
    margin-bottom: 1rem;
  }

  .judge-modal-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    margin-bottom: 0.8rem;
  }

  .judge-modal-meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
  }

  .judge-modal-meta-label {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.45);
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-modal-meta-value {
    font-size: 12px;
    color: #f0ead8;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-modal-desc {
    font-size: 12px;
    color: rgba(240,234,216,0.5);
    line-height: 1.7;
    margin-bottom: 1rem;
    font-family: 'Josefin Sans', sans-serif;
  }

  .judge-modal-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    opacity: 0.4;
    margin: 1rem 0;
  }

  .judge-preview-area { margin-top: 1rem; }

  .judge-preview-video,
  .judge-preview-audio {
    width: 100%;
    border-radius: 10px;
    background: #000;
  }

  .judge-preview-img {
    width: 100%;
    max-height: 380px;
    object-fit: contain;
    border-radius: 10px;
    border: 1px solid rgba(212,175,55,0.12);
  }

  .judge-preview-text {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(212,175,55,0.15);
    border-radius: 10px;
    padding: 1.5rem;
    font-size: 13px;
    line-height: 1.8;
    color: rgba(240,234,216,0.6);
    max-height: 300px;
    overflow-y: auto;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
  }

  .judge-preview-placeholder {
    text-align: center;
    padding: 3rem;
    color: rgba(212,175,55,0.25);
    font-size: 13px;
    border: 1px dashed rgba(212,175,55,0.15);
    border-radius: 10px;
    line-height: 2;
    font-family: 'Josefin Sans', sans-serif;
  }

  /* ── JUDGE ANIMATIONS ── */
  @keyframes jFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes jFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes jScaleIn {
    from { opacity: 0; transform: scale(0.93) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes jSlideIn {
    from { opacity: 0; transform: translateX(-18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes jGoldPulse {
    0%,100% { text-shadow: 0 0 8px rgba(212,175,55,0.25); }
    50%      { text-shadow: 0 0 20px rgba(212,175,55,0.6), 0 0 35px rgba(212,175,55,0.15); }
  }
  @keyframes jBtnGlow {
    0%,100% { box-shadow: 0 0 10px rgba(212,175,55,0.25); }
    50%      { box-shadow: 0 0 22px rgba(212,175,55,0.55); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 700px) {
    .judge-case-card { grid-template-columns: 1fr; }
    .judge-meta-grid { gap: 1.2rem; }
    .judge-evidence-party { padding: 1.4rem; }
    .judge-ev-modal { padding: 1.8rem; }
    .judge-ev-card { flex-wrap: wrap; }
    .judge-view-btn { width: 100%; }
  }
`;

// ─── STYLE TAG ────────────────────────────────────────────────────────────────

export function JudgeStyleTag() {
  return <style dangerouslySetInnerHTML={{ __html: judgeCss }} />;
}

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────

function JudgeDivider() {
  return <div className="judge-divider" />;
}

function statusBadgeClass(status) {
  if (status === "Hearing") return "judge-badge-hearing";
  if (status === "Trial")   return "judge-badge-trial";
  return "judge-badge-closed";
}

// ─── EVIDENCE MODAL ───────────────────────────────────────────────────────────

function JudgeEvidenceModal({ ev, caseId, onClose }) {
  if (!ev) return null;
  const partyLabel = ev.party === "victim" ? "Victim" : "Accused";

  const renderPreview = () => {
    if (ev.format === "photo")
      return ev.fileUrl
        ? <img src={ev.fileUrl} alt={ev.title} className="judge-preview-img" />
        : <div className="judge-preview-placeholder">◉ Image not attached in demo mode</div>;
    if (ev.format === "video")
      return ev.fileUrl
        ? <video controls className="judge-preview-video"><source src={ev.fileUrl} /></video>
        : <div className="judge-preview-placeholder">▶ Video not attached in demo mode</div>;
    if (ev.format === "voice")
      return ev.fileUrl
        ? <audio controls className="judge-preview-audio"><source src={ev.fileUrl} /></audio>
        : <div className="judge-preview-placeholder">♪ Audio not attached in demo mode</div>;
    if (ev.format === "text")
      return <div className="judge-preview-text">{ev.textContent || "No text content."}</div>;
    return <div className="judge-preview-placeholder">Preview unavailable</div>;
  };

  return (
    <div className="judge-modal-overlay" onClick={onClose}>
      <div className="judge-ev-modal" onClick={(e) => e.stopPropagation()}>
        <button className="judge-modal-close" onClick={onClose}>✕</button>
        <p className="judge-modal-tag">Court Evidence Record — {ev.format.toUpperCase()}</p>
        <h2 className="judge-modal-title">{ev.title}</h2>
        <div className="judge-modal-meta-row">
          {[
            ["Case ID",    caseId],
            ["Uploaded By", ev.uploadedBy],
            ["Date Filed",  ev.uploadDate],
            ["Format", ev.format.charAt(0).toUpperCase() + ev.format.slice(1)],
          ].map(([l, v]) => (
            <div className="judge-modal-meta-item" key={l}>
              <span className="judge-modal-meta-label">{l}</span>
              <span className="judge-modal-meta-value">{v}</span>
            </div>
          ))}
        </div>
        <div className="judge-modal-divider" />
        <p className="judge-modal-desc">{ev.description}</p>
        <div className="judge-preview-area">{renderPreview()}</div>
      </div>
    </div>
  );
}

// ─── EVIDENCE CARD ────────────────────────────────────────────────────────────

function JudgeEvidenceCard({ ev, onView, delay }) {
  return (
    <div className="judge-ev-card" style={{ animationDelay: `${delay}s` }}>
      <div className="judge-ev-icon">{FORMAT_ICONS[ev.format]}</div>
      <div className="judge-ev-body">
        <div className="judge-ev-title">{ev.title}</div>
        <div className="judge-ev-desc">{ev.description}</div>
        <div className="judge-ev-meta">
          <span>Filed by: {ev.uploadedBy}</span>
          <span>{ev.uploadDate}</span>
        </div>
      </div>
      <button className="judge-view-btn" onClick={() => onView(ev)}>
        View
      </button>
    </div>
  );
}

// ─── EVIDENCE SECTION (flat, grouped by format) ──────────────────────────────

function JudgeEvidenceSection({ evidence, onView }) {
  let idx = 0;
  return (
    <div className="judge-evidence-party victim">
      {FORMAT_ORDER.map((fmt) => {
        const items = evidence.filter((e) => e.format === fmt);
        const base  = idx;
        idx += items.length;
        if (items.length === 0) return null;
        return (
          <div className="judge-format-group" key={fmt}>
            <div className="judge-format-heading">
              <span className="judge-format-icon">{FORMAT_ICONS[fmt]}</span>
              {FORMAT_LABELS[fmt]}
            </div>
            <div className="judge-evidence-list">
              {items.map((ev, i) => (
                <JudgeEvidenceCard
                  key={ev.id}
                  ev={ev}
                  onView={onView}
                  delay={(base + i) * 0.07}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── JUDGE DASHBOARD ─────────────────────────────────────────────────────────

export function JudgeDashboard({ onViewCase, onLogout }) {
  return (
    <div className="judge-dashboard">
      <div className="judge-topbar">
        <div>
          <p className="judge-eyebrow">Judiciary Portal — EviChain</p>
          <h1 className="judge-title">Court Case Management</h1>
          <p className="judge-subtitle">Active docket — presiding cases</p>
        </div>
        <button className="judge-logout-btn" onClick={onLogout}>← Logout</button>
      </div>

      <JudgeDivider />

      <div className="judge-cases-list">
        {judgeCases.map((c, i) => (
          <div
            key={c.id}
            className="judge-case-card"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => onViewCase(c.id)}
          >
            <div>
              <div className="judge-case-id">{c.id}</div>
              <div className="judge-case-title">{c.title}</div>
              <div className="judge-case-court">🏛 {c.courtName}</div>
            </div>

            <span className={`judge-badge ${statusBadgeClass(c.status)}`}>
              {c.status}
            </span>

            <div className="judge-date-col">
              <div className="judge-date-label">Next Hearing</div>
              <div className="judge-date-val">{c.nextHearing}</div>
            </div>

            <button
              className="judge-view-btn"
              onClick={(e) => { e.stopPropagation(); onViewCase(c.id); }}
            >
              View →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── JUDGE CASE DETAILS ───────────────────────────────────────────────────────

export function JudgeCaseDetails({ caseId, onBack }) {
  const [selectedEv, setSelectedEv] = useState(null);

  const caseData = judgeCases.find((c) => c.id === caseId);
  const evidence = evidenceByCase[caseId] || [];

  if (!caseData) return (
    <div className="judge-dashboard">
      <button className="judge-back-btn" onClick={onBack}>← Back</button>
      <p style={{ color: "rgba(240,234,216,0.4)", marginTop: "2rem", fontFamily: "'Josefin Sans', sans-serif", fontSize: "13px" }}>
        Case record not found.
      </p>
    </div>
  );

  return (
    <div className="judge-dashboard">
      <button className="judge-back-btn" onClick={onBack}>← Back to Docket</button>

      <div style={{ animation: "jFadeUp 0.45s ease both" }}>
        <p className="judge-eyebrow">Case Record — {caseData.id}</p>
        <h1 className="judge-title">{caseData.title}</h1>

        <div className="judge-meta-grid">
          {[
            ["Case ID",          caseData.id],
            ["Court",            caseData.courtName],
            ["Presiding Judge",  caseData.presidingJudge],
            ["Next Hearing",     caseData.nextHearing],
          ].map(([l, v]) => (
            <div className="judge-meta-item" key={l}>
              <span className="judge-meta-label">{l}</span>
              <span className="judge-meta-value">{v}</span>
            </div>
          ))}
          <div className="judge-meta-item">
            <span className="judge-meta-label">Status</span>
            <span
              className={`judge-badge ${statusBadgeClass(caseData.status)}`}
              style={{ marginTop: "0.2rem", display: "inline-block" }}
            >
              {caseData.status}
            </span>
          </div>
        </div>
      </div>

      <JudgeDivider />

      {evidence.length === 0 ? (
        <p style={{ color: "rgba(240,234,216,0.3)", fontStyle: "italic", fontSize: "13px", marginTop: "1rem", fontFamily: "'Josefin Sans', sans-serif" }}>
          No evidence has been submitted for this case.
        </p>
      ) : (
        <div className="judge-evidence-sections">
          <JudgeEvidenceSection evidence={evidence} onView={setSelectedEv} />
        </div>
      )}

      {selectedEv && (
        <JudgeEvidenceModal
          ev={selectedEv}
          caseId={caseId}
          onClose={() => setSelectedEv(null)}
        />
      )}
    </div>
  );
}
