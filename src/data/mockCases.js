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
  { id: "LGL-2026-001", assignedLawyerId: 201, title: "State vs. Aryan Mehta",   clientName: "Aryan Mehta",  clientType: "Defense",     status: "Trial",   assignedCourt: "District Court, Mumbai",   courtDate: "2026-03-15" },
  { id: "LGL-2026-002", assignedLawyerId: 202, title: "People vs. Nisha Verma",  clientName: "Nisha Verma",  clientType: "Prosecution", status: "Open",    assignedCourt: "High Court, Delhi",        courtDate: "2026-04-02" },
  { id: "LGL-2026-003", assignedLawyerId: 201, title: "State vs. Rajan Pillai",  clientName: "Rajan Pillai", clientType: "Defense",     status: "Closed",  assignedCourt: "Sessions Court, Kochi",    courtDate: "2025-12-10" },
  { id: "LGL-2026-004", assignedLawyerId: 203, title: "Republic vs. Devika Rao", clientName: "Devika Rao",   clientType: "Prosecution", status: "Open",    assignedCourt: "Supreme Court, Delhi",     courtDate: "2026-04-20" },
];

// ─── JUDGE CASES ──────────────────────────────────────────────────────────────

export const JUDGE_CASES = [
  { id: "CRT-2026-001", court: "District Court, Mumbai",   presidingJudgeId: 101, title: "State vs. Aryan Mehta",   status: "Trial",   nextHearing: "2026-03-15" },
  { id: "CRT-2026-002", court: "High Court, Delhi",        presidingJudgeId: 102, title: "People vs. Nisha Verma", status: "Hearing", nextHearing: "2026-04-02" },
  { id: "CRT-2026-003", court: "Sessions Court, Kochi",    presidingJudgeId: 103, title: "State vs. Rajan Pillai", status: "Closed",  nextHearing: "—" },
  { id: "CRT-2026-004", court: "Supreme Court, New Delhi", presidingJudgeId: 104, title: "Republic vs. Devika Rao",status: "Hearing", nextHearing: "2026-03-28" },
  { id: "CRT-2026-005", court: "District Court, Mumbai",   presidingJudgeId: 101, title: "State vs. Priya Nair",   status: "Hearing", nextHearing: "2026-04-10" },
  { id: "CRT-2026-006", court: "High Court, Delhi",        presidingJudgeId: 999, title: "People vs. Arjun Das",   status: "Trial",   nextHearing: "2026-04-15" },
];
