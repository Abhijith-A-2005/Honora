// ─── POLICE CASES ─────────────────────────────────────────────────────────────

export const MOCK_CASES = [
  {
    id: "EC-2024-001",
    title: "Downtown Bank Robbery",
    status: "Under Investigation",
    date: "2024-11-12",
    officer: "Det. Marcus Reyes",
    description: "Armed robbery at First National Bank, 4th Avenue. Three perpetrators, one detained. Evidence collection ongoing.",
    badge: "D-4471",
    department: "Major Crimes Unit",
  },
  {
    id: "EC-2024-002",
    title: "Cybercrime — Corporate Data Breach",
    status: "Open",
    date: "2024-12-01",
    officer: "Sgt. Priya Nair",
    description: "Intrusion into corporate servers of Nexus Technologies. Suspected insider threat. Digital forensic analysis initiated.",
    badge: "D-3892",
    department: "Cyber Crimes Division",
  },
  {
    id: "EC-2024-003",
    title: "Vehicle Homicide — Highway 9",
    status: "Closed",
    date: "2024-09-20",
    officer: "Lt. Samuel Chen",
    description: "Hit-and-run fatality on Highway 9. Vehicle recovered. Perpetrator charged. Case closed pending court proceedings.",
    badge: "D-2210",
    department: "Traffic Homicide Unit",
  },
  {
    id: "EC-2024-004",
    title: "Narcotics Distribution Ring",
    status: "Under Investigation",
    date: "2024-10-05",
    officer: "Det. Amara Diallo",
    description: "Suspected organized narcotics distribution operating across three districts. Surveillance evidence being compiled.",
    badge: "D-5517",
    department: "Narcotics Division",
  },
  {
    id: "EC-2024-005",
    title: "Art Theft — Heritage Museum",
    status: "Open",
    date: "2024-12-18",
    officer: "Det. Victor Holt",
    description: "Three priceless artifacts stolen from Heritage Museum after hours. Security systems partially disabled. Interpol notified.",
    badge: "D-6634",
    department: "Major Crimes Unit",
  },
  {
    id: "EC-2024-006",
    title: "Fraud — Real Estate Scheme",
    status: "Closed",
    date: "2024-08-14",
    officer: "Insp. Farah Malik",
    description: "Large-scale real estate fraud affecting 47 victims. Funds traced through offshore accounts. Conviction secured.",
    badge: "D-1109",
    department: "Financial Crimes Unit",
  },
];

// ─── LAWYER CASES ─────────────────────────────────────────────────────────────

export const LAWYER_CASES = [
  { id: "LGL-2026-001", assignedLawyerId: 201, title: "State vs. Aryan Mehta",   clientName: "Aryan Mehta",  clientType: "Defense",     status: "Trial",   assignedCourt: "District Court, Mumbai",   courtDate: "2026-03-15", relatedPoliceCaseId: "EC-2024-001" },
  { id: "LGL-2026-002", assignedLawyerId: 202, title: "People vs. Nisha Verma",  clientName: "Nisha Verma",  clientType: "Prosecution", status: "Open",    assignedCourt: "High Court, Delhi",        courtDate: "2026-04-02", relatedPoliceCaseId: "EC-2024-002" },
  { id: "LGL-2026-003", assignedLawyerId: 201, title: "State vs. Rajan Pillai",  clientName: "Rajan Pillai", clientType: "Defense",     status: "Closed",  assignedCourt: "Sessions Court, Kochi",    courtDate: "2025-12-10", relatedPoliceCaseId: "EC-2024-003" },
  { id: "LGL-2026-004", assignedLawyerId: 203, title: "Republic vs. Devika Rao", clientName: "Devika Rao",   clientType: "Prosecution", status: "Open",    assignedCourt: "Supreme Court, Delhi",     courtDate: "2026-04-20", relatedPoliceCaseId: "EC-2024-004" },
];

// ─── JUDGE CASES ──────────────────────────────────────────────────────────────

export const JUDGE_CASES = [
  { id: "CRT-2026-001", court: "District Court, Mumbai",   presidingJudgeId: 101, title: "State vs. Aryan Mehta",   status: "Trial",   nextHearing: "2026-03-15", relatedPoliceCaseId: "EC-2024-001" },
  { id: "CRT-2026-002", court: "High Court, Delhi",        presidingJudgeId: 102, title: "People vs. Nisha Verma", status: "Hearing", nextHearing: "2026-04-02", relatedPoliceCaseId: "EC-2024-002" },
  { id: "CRT-2026-003", court: "Sessions Court, Kochi",    presidingJudgeId: 103, title: "State vs. Rajan Pillai", status: "Closed",  nextHearing: "—", relatedPoliceCaseId: "EC-2024-003" },
  { id: "CRT-2026-004", court: "Supreme Court, New Delhi", presidingJudgeId: 104, title: "Republic vs. Devika Rao",status: "Hearing", nextHearing: "2026-03-28", relatedPoliceCaseId: "EC-2024-004" },
  { id: "CRT-2026-005", court: "District Court, Mumbai",   presidingJudgeId: 101, title: "State vs. Priya Nair",   status: "Hearing", nextHearing: "2026-04-10" },
  { id: "CRT-2026-006", court: "High Court, Delhi",        presidingJudgeId: 999, title: "People vs. Arjun Das",   status: "Trial",   nextHearing: "2026-04-15" },
];

// ─── FORENSIC CASES ───────────────────────────────────────────────────────────

export const FORENSIC_CASES = [
  { 
    id: "FRN-2026-001", 
    assignedForensicId: 301, 
    relatedCaseId: "EC-2024-001",
    title: "Downtown Bank Robbery — Forensic Analysis",
    status: "In Progress",
    assignedDate: "2024-11-13",
    evidenceType: "Financial Records, Digital Traces, Physical Evidence",
    description: "DNA analysis, fingerprint examination, and digital evidence forensics for the downtown bank robbery case.",
  },
  { 
    id: "FRN-2026-002", 
    assignedForensicId: 302, 
    relatedCaseId: "EC-2024-002",
    title: "Corporate Data Breach — Digital Forensics",
    status: "In Progress",
    assignedDate: "2024-12-02",
    evidenceType: "Server Logs, Network Traffic, Source Code",
    description: "Digital forensic analysis of server intrusion, data exfiltration patterns, and malware identification.",
  },
  { 
    id: "FRN-2026-003", 
    assignedForensicId: 302, 
    relatedCaseId: "EC-2024-004",
    title: "Narcotics Distribution — Evidence Analysis",
    status: "Pending",
    assignedDate: "2024-10-10",
    evidenceType: "Chemical Compounds, Packaging Materials, Communication Records",
    description: "Chemical analysis of seized substances, packaging material examination, and digital communication analysis.",
  },
  { 
    id: "FRN-2026-004", 
    assignedForensicId: 303, 
    relatedCaseId: "EC-2024-005",
    title: "Art Theft — Evidence Processing",
    status: "Pending",
    assignedDate: "2024-12-19",
    evidenceType: "Security Equipment, Photography, Physical Artifacts",
    description: "Processing and documenting security footage, physical evidence from crime scene, and artifact analysis.",
  },
];
