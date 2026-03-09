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

// ─── FORENSIC PROFILES ──────────────────────────────────────────────────────────
// Key = username entered at login

export const FORENSIC_PROFILES = {
  dr_patel:    { id: 301, name: "Dr. M. Patel",       department: "Forensic Analysis Lab", specialization: "DNA Analysis" },
  dr_kumar:    { id: 302, name: "Dr. R. Kumar",       department: "Forensic Analysis Lab", specialization: "Digital Forensics" },
  analyst_joshi: { id: 303, name: "Analyst A. Joshi", department: "Forensic Analysis Lab", specialization: "Evidence Processing" },
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
//
// Role → Forensic Department
//   dr_patel     →  FRN-2026-001, FRN-2026-002
//   dr_kumar     →  FRN-2026-002, FRN-2026-003
//   analyst_joshi → FRN-2026-001, FRN-2026-004

// ─── PROFILE MANAGEMENT HELPERS ──────────────────────────────────────────────────────────
// Simple in-memory helpers to support signup flows during development.

let nextLawyerId = Math.max(...Object.values(LAWYER_PROFILES).map(p => p.id)) + 1;
let nextJudgeId  = Math.max(...Object.values(JUDGE_PROFILES ).map(p => p.id)) + 1;
let nextForensicId = Math.max(...Object.values(FORENSIC_PROFILES).map(p => p.id)) + 1;
// even though police currently accept any credentials, we keep a simple
// registry so that sign-ups can record a department for later inspection.
export const POLICE_PROFILES = {};
let nextPoliceId = 1000; // arbitrary starting point

/**
 * Add a new profile for a given role. Returns the created profile object.
 *
 * This mutates the underlying LAWYER_PROFILES, JUDGE_PROFILES, or FORENSIC_PROFILES map and
 * increments the internal ID counter. For police we just return a stub since
 * police authentication is open-ended.
 */
export function addProfile(role, username, details = {}) {
  if (!username || !username.trim()) {
    throw new Error("Username is required to create a profile");
  }
  username = username.trim();

  switch (role) {
    case "Legal Counsel": {
      const profile = {
        id: nextLawyerId++,
        name: details.name || username,
        firm: details.firm || "",
      };
      LAWYER_PROFILES[username] = profile;
      return profile;
    }
    case "Judiciary": {
      const profile = {
        id: nextJudgeId++,
        name: details.name || username,
        court: details.court || "",
      };
      JUDGE_PROFILES[username] = profile;
      return profile;
    }
    case "Forensic Department": {
      const profile = {
        id: nextForensicId++,
        name: details.name || username,
        department: details.department || "",
        specialization: details.specialization || "",
      };
      FORENSIC_PROFILES[username] = profile;
      return profile;
    }
    case "Police Department": {
      const profile = {
        id: nextPoliceId++,
        name: username,
        department: details.department || "",
      };
      POLICE_PROFILES[username] = profile;
      return profile;
    }
    default:
      throw new Error(`Unknown role '${role}'`);
  }
}
