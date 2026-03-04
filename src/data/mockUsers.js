// ─── LAWYER PROFILES ──────────────────────────────────────────────────────────
// Key = username entered at login

export const LAWYER_PROFILES = {
  advocate_sharma: { id: 201, name: "Adv. R. Sharma", firm: "Sharma & Associates" },
  advocate_rao:    { id: 202, name: "Adv. K. Rao",    firm: "Rao Legal Partners"  },
  advocate_menon:  { id: 203, name: "Adv. S. Menon",  firm: "Menon Law Chambers"  },
};

// ─── JUDGE PROFILES ───────────────────────────────────────────────────────────
// Key = username entered at login

export const JUDGE_PROFILES = {
  krishnan: { id: 101, name: "Hon. Justice R. Krishnan",     court: "District Court, Mumbai"   },
  mehta:    { id: 102, name: "Hon. Justice S. Mehta",        court: "High Court, Delhi"         },
  nair:     { id: 103, name: "Hon. Justice A. Nair",         court: "Sessions Court, Kochi"     },
  sharma:   { id: 104, name: "Hon. Chief Justice P. Sharma", court: "Supreme Court, New Delhi"  },
};

// ─── DEMO CREDENTIALS (for reference) ────────────────────────────────────────
//
// Role → Legal Counsel
//   advocate_sharma  →  LGL-2026-001, LGL-2026-003
//   advocate_rao     →  LGL-2026-002
//   advocate_menon   →  LGL-2026-004
//
// Role → Judiciary
//   krishnan  →  CRT-2026-001, CRT-2026-005
//   mehta     →  CRT-2026-002  (NOT CRT-2026-006, wrong judge)
//   nair      →  CRT-2026-003
//   sharma    →  CRT-2026-004
//
// Role → Police Department
//   Any username / any password → full access
