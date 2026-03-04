// ─── POLICE EVIDENCE ──────────────────────────────────────────────────────────

export const MOCK_EVIDENCE = {
  "EC-2024-001": [
    {
      id: "EV-001-V1",
      title: "Bank Lobby CCTV Footage",
      description: "HD CCTV recording from the bank lobby showing all three suspects during the incident.",
      format: "Video",
      uploadedBy: "Det. Marcus Reyes",
      uploadDate: "2024-11-12",
      fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      isNew: false,
    },
    {
      id: "EV-001-V2",
      title: "ATM Vestibule Camera",
      description: "Side-angle recording of suspect exit route through ATM vestibule.",
      format: "Video",
      uploadedBy: "Tech. Okon Williams",
      uploadDate: "2024-11-13",
      fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      isNew: false,
    },
    {
      id: "EV-001-P1",
      title: "Crime Scene Photography",
      description: "Wide-angle and close-up shots of the teller stations post-robbery.",
      format: "Photo",
      uploadedBy: "CSI Unit 4",
      uploadDate: "2024-11-12",
      fileUrl: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=900",
      isNew: false,
    },
    {
      id: "EV-001-P2",
      title: "Suspect Composite Sketch",
      description: "Digital composite based on eyewitness descriptions of all three perpetrators.",
      format: "Photo",
      uploadedBy: "Det. Marcus Reyes",
      uploadDate: "2024-11-14",
      fileUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900",
      isNew: false,
    },
    {
      id: "EV-001-T1",
      title: "Witness Statement — Bank Teller",
      description: "Transcribed sworn statement from head teller present during the robbery.",
      format: "Text Document",
      uploadedBy: "Sgt. Oluwaseun Adeyemi",
      uploadDate: "2024-11-13",
      fileUrl: null,
      textContent: `WITNESS STATEMENT
Case ID: EC-2024-001
Date: November 13, 2024
Witness: [Name Redacted], Head Bank Teller

Statement:

At approximately 10:47 AM, three individuals entered through the main entrance. 
All three were wearing dark clothing and face coverings. The lead individual 
approached my station and produced a firearm — a black semi-automatic pistol. 

He demanded all cash from my drawer and the reserve vault. I complied to avoid 
escalation. The second individual maintained watch at the entrance while the 
third proceeded to the branch manager's office.

They exited in under four minutes. No shots were fired. I immediately activated 
the silent alarm as they left.

I confirm this statement is accurate to the best of my recollection.

[Signature on file — Digital ID: WS-44921]`,
      isNew: false,
    },
    {
      id: "EV-001-A1",
      title: "Detective Field Recording",
      description: "Audio notes recorded by Det. Reyes at the crime scene during initial walkthrough.",
      format: "Voice Note",
      uploadedBy: "Det. Marcus Reyes",
      uploadDate: "2024-11-12",
      fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      isNew: false,
    },
  ],
  "EC-2024-002": [
    {
      id: "EV-002-V1",
      title: "Server Room Access Log Video",
      description: "Footage from the restricted server room showing unauthorized after-hours access.",
      format: "Video",
      uploadedBy: "Sgt. Priya Nair",
      uploadDate: "2024-12-02",
      fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      isNew: false,
    },
    {
      id: "EV-002-P1",
      title: "Network Intrusion Heatmap",
      description: "Visual representation of the attack vectors used during the breach.",
      format: "Photo",
      uploadedBy: "Digital Forensics Lab",
      uploadDate: "2024-12-03",
      fileUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900",
      isNew: false,
    },
    {
      id: "EV-002-T1",
      title: "Forensic Analysis Report",
      description: "Full digital forensics report detailing malware signatures and data exfiltration paths.",
      format: "Text Document",
      uploadedBy: "Digital Forensics Lab",
      uploadDate: "2024-12-05",
      fileUrl: null,
      textContent: `DIGITAL FORENSICS REPORT
Case ID: EC-2024-002
Classification: CONFIDENTIAL
Date: December 5, 2024

Executive Summary:
Analysis of the Nexus Technologies server infrastructure reveals a sophisticated, 
multi-stage intrusion event beginning November 28, 2024 at 02:13 AM UTC.

Attack Vector:
The attacker leveraged a zero-day exploit in the company's VPN authentication 
layer, bypassing multi-factor authentication through session token hijacking.

Data Exfiltrated:
- Customer PII records: ~47,000 entries
- Internal R&D documentation: 3.2 TB
- Executive communications: 60-day email archive

Malware Identified:
Signature matches known toolkit "PHANTOM-9", associated with state-sponsored 
actors. Further attribution analysis pending intelligence cross-reference.

Recommendations:
Immediate system isolation, credential rotation, and third-party audit required.

Report compiled by: Digital Forensics Unit, Badge #DFU-0091`,
      isNew: false,
    },
  ],
  "EC-2024-003": [
    {
      id: "EV-003-P1",
      title: "Vehicle Damage Documentation",
      description: "Photographic record of the recovered vehicle and impact damage profile.",
      format: "Photo",
      uploadedBy: "CSI Unit 2",
      uploadDate: "2024-09-21",
      fileUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900",
      isNew: false,
    },
    {
      id: "EV-003-A1",
      title: "Witness 911 Call",
      description: "Original emergency call recording from civilian witness at the scene.",
      format: "Voice Note",
      uploadedBy: "Dispatch Unit",
      uploadDate: "2024-09-20",
      fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      isNew: false,
    },
  ],
  "EC-2024-004": [
    {
      id: "EV-004-V1",
      title: "Surveillance Operation Footage",
      description: "72-hour covert surveillance recording of suspected distribution site.",
      format: "Video",
      uploadedBy: "Det. Amara Diallo",
      uploadDate: "2024-10-10",
      fileUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      isNew: false,
    },
  ],
  "EC-2024-005": [
    {
      id: "EV-005-P1",
      title: "Empty Display Cases",
      description: "Crime scene photos of the three empty display cases from which artifacts were taken.",
      format: "Photo",
      uploadedBy: "CSI Unit 1",
      uploadDate: "2024-12-18",
      fileUrl: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=900",
      isNew: false,
    },
    {
      id: "EV-005-T1",
      title: "Insurance Valuation Report",
      description: "Certified appraisal documents for all three stolen artifacts.",
      format: "Text Document",
      uploadedBy: "Det. Victor Holt",
      uploadDate: "2024-12-19",
      fileUrl: null,
      textContent: `INSURANCE VALUATION REPORT
Case ID: EC-2024-005
Date: December 19, 2024

Stolen Artifacts — Certified Valuation:

1. "The Odalesque" — 19th Century Oil on Canvas
   Estimated Market Value: $4,200,000 USD
   Last Insured: November 2024

2. Macedonian Bronze Helmet — 4th Century BCE
   Estimated Market Value: $2,800,000 USD
   Last Insured: June 2024

3. Ming Dynasty Ceremonial Jade Vessel
   Estimated Market Value: $3,600,000 USD
   Last Insured: November 2024

TOTAL ESTIMATED LOSS: $10,600,000 USD

Report prepared for law enforcement use.
Certified Appraiser: [On File]`,
      isNew: false,
    },
  ],
  "EC-2024-006": [
    {
      id: "EV-006-T1",
      title: "Financial Transaction Ledger",
      description: "Compiled record of all fraudulent transactions traced across 14 shell accounts.",
      format: "Text Document",
      uploadedBy: "Insp. Farah Malik",
      uploadDate: "2024-08-16",
      fileUrl: null,
      textContent: `FINANCIAL TRANSACTION LEDGER
Case ID: EC-2024-006
Classification: SEALED — Court Evidence

Total Fraudulent Transactions Identified: 247
Gross Amount Defrauded: $8,340,000 USD
Victims Affected: 47
Jurisdictions Involved: 3 (domestic), 2 (international)

Shell Accounts Identified:
  - Apex Property Holdings LLC
  - Meridian Real Estate Trust
  - Goldleaf Investments Ltd (Offshore)
  - ... [12 additional entities on file]

Status: Evidence admitted. Conviction secured November 2024.`,
      isNew: false,
    },
  ],
};

// ─── LAWYER EVIDENCE ──────────────────────────────────────────────────────────

export const LAWYER_EVIDENCE = {
  "LGL-2026-001": [
    { id: 1, title: "CCTV Footage – Lobby", description: "Captured at 10:45 PM on Jan 12, 2026. Shows accused entering the building.", format: "video", uploadedBy: "Officer Sharma", uploadDate: "2026-01-14", fileUrl: null },
    { id: 2, title: "Crime Scene Photograph", description: "Taken at 11:30 PM by forensics team. Shows primary location.", format: "photo", uploadedBy: "Forensics Team", uploadDate: "2026-01-13", fileUrl: "https://picsum.photos/800/500?random=10" },
    { id: 3, title: "Witness Statement – Ramesh Kumar", description: "Written eyewitness testimony, filed under oath.", format: "text", uploadedBy: "Constable Verma", uploadDate: "2026-01-15", fileUrl: null, textContent: "I was present at the scene on the night of January 12th. I saw the accused enter through the lobby at approximately 10:45 PM. He appeared agitated and was carrying a black bag." },
    { id: 4, title: "Victim Impact Statement", description: "Audio recording of victim's personal account.", format: "voice", uploadedBy: "Victim Counsel", uploadDate: "2026-01-19", fileUrl: null },
    { id: 5, title: "Accused Alibi Recording", description: "Voice note submitted by accused's attorney as alibi evidence.", format: "voice", uploadedBy: "Defense Team", uploadDate: "2026-01-18", fileUrl: null },
    { id: 6, title: "Character Reference Letter", description: "Letter from accused's employer confirming character.", format: "text", uploadedBy: "Advocate Rao", uploadDate: "2026-01-20", fileUrl: null, textContent: "This is to certify that Mr. Aryan Mehta has been employed with our firm for the past 5 years. He is of exemplary character." },
    { id: 7, title: "Accused at Public Event", description: "Photograph placing accused at a public event on the same date.", format: "photo", uploadedBy: "Defense Team", uploadDate: "2026-01-21", fileUrl: "https://picsum.photos/800/500?random=20" },
  ],
  "LGL-2026-002": [
    { id: 8, title: "Bank Transaction Records", description: "Documented fraudulent transactions over a 6-month period.", format: "text", uploadedBy: "Bank Investigator", uploadDate: "2026-02-01", fileUrl: null, textContent: "Transaction Log:\nJan 5 — ₹2,45,000 transferred.\nJan 12 — ₹1,80,000 withdrawal.\nFeb 3 — ₹3,10,000 wire transfer.\nTotal suspected fraud: ₹7,35,000." },
    { id: 9, title: "Call Recording – Evidence A", description: "Phone call recording from accused discussing the scheme.", format: "voice", uploadedBy: "Cyber Cell", uploadDate: "2026-02-05", fileUrl: null },
    { id: 10, title: "Suspect Profile Photo", description: "Official identification photograph of the accused.", format: "photo", uploadedBy: "Investigating Officer", uploadDate: "2026-02-03", fileUrl: "https://picsum.photos/800/500?random=30" },
  ],
  "LGL-2026-003": [],
  "LGL-2026-004": [
    { id: 11, title: "Constitutional Brief", description: "Legal brief filed by petitioner outlining constitutional violations.", format: "text", uploadedBy: "Sr. Advocate Pillai", uploadDate: "2026-03-01", fileUrl: null, textContent: "Constitutional Petition Brief\nCase: Republic vs. Devika Rao\n\nViolations of Articles 14, 19, and 21 of the Constitution of India." },
    { id: 12, title: "Counter Affidavit", description: "Respondent's counter affidavit challenging petitioner claims.", format: "text", uploadedBy: "Respondent Counsel", uploadDate: "2026-03-05", fileUrl: null, textContent: "The respondent categorically denies all allegations. Actions taken were within statutory authority under Section 12." },
  ],
};

// ─── JUDGE EVIDENCE ───────────────────────────────────────────────────────────

export const JUDGE_EVIDENCE = {
  "CRT-2026-001": [
    { id: 1, title: "CCTV Footage – Lobby", description: "Captured at 10:45 PM on Jan 12, 2026.", format: "video", uploadedBy: "Officer Sharma", uploadDate: "2026-01-14", fileUrl: null },
    { id: 2, title: "Crime Scene Photograph", description: "Taken at 11:30 PM by forensics. Shows primary location.", format: "photo", uploadedBy: "Forensics Team", uploadDate: "2026-01-13", fileUrl: "https://picsum.photos/800/500?random=11" },
    { id: 3, title: "Forensic Lab Report", description: "DNA match confirmation from forensic laboratory.", format: "text", uploadedBy: "Forensic Dept.", uploadDate: "2026-01-16", fileUrl: null, textContent: "Forensic Analysis Report — Case CRT-2026-001\n\nDNA Profiling Result: Positive match (99.97% confidence)\nAnalyst: Dr. P. Kapoor" },
    { id: 4, title: "Victim Impact Statement", description: "Recorded audio testimony from the victim's family.", format: "voice", uploadedBy: "Victim Counsel", uploadDate: "2026-01-19", fileUrl: null },
    { id: 5, title: "Accused Alibi Recording", description: "Audio submission from defense counsel as alibi claim.", format: "voice", uploadedBy: "Defense Team", uploadDate: "2026-01-18", fileUrl: null },
    { id: 6, title: "Character Reference Letter", description: "Written character testimony from accused's employer.", format: "text", uploadedBy: "Advocate Rao", uploadDate: "2026-01-20", fileUrl: null, textContent: "To The Honourable Court,\n\nMr. Aryan Mehta has served our organisation with distinction for 5 years.\n\nSigned, Mr. K. Bose, Director, Apex Industries" },
    { id: 7, title: "Accused — Event Photograph", description: "Photographic evidence placing accused at a public event.", format: "photo", uploadedBy: "Defense Team", uploadDate: "2026-01-21", fileUrl: "https://picsum.photos/800/500?random=21" },
  ],
  "CRT-2026-002": [
    { id: 8, title: "Bank Transaction Records", description: "Documented fraudulent transactions over a 6-month period.", format: "text", uploadedBy: "Bank Investigator", uploadDate: "2026-02-01", fileUrl: null, textContent: "Transaction Log — Case CRT-2026-002\n\nTotal suspected fraud: ₹7,35,000" },
    { id: 9, title: "Surveillance Photo — ATM", description: "ATM camera photograph of accused during withdrawal.", format: "photo", uploadedBy: "Cyber Cell", uploadDate: "2026-02-04", fileUrl: "https://picsum.photos/800/500?random=31" },
    { id: 10, title: "Call Recording — Evidence A", description: "Phone call recording of accused discussing fraud.", format: "voice", uploadedBy: "Cyber Cell", uploadDate: "2026-02-05", fileUrl: null },
    { id: 11, title: "Defense Statement", description: "Written statement by accused denying involvement.", format: "text", uploadedBy: "Defense Counsel", uploadDate: "2026-02-08", fileUrl: null, textContent: "I, Nisha Verma, hereby state under oath that I had no knowledge of any fraudulent transactions." },
  ],
  "CRT-2026-003": [],
  "CRT-2026-004": [
    { id: 12, title: "Constitutional Brief", description: "Legal brief outlining constitutional violations.", format: "text", uploadedBy: "Sr. Advocate Pillai", uploadDate: "2026-03-01", fileUrl: null, textContent: "Constitutional Petition Brief\nCase: Republic vs. Devika Rao\n\nViolations of Articles 14, 19, and 21." },
    { id: 13, title: "Counter Affidavit", description: "Respondent's counter affidavit challenging petitioner claims.", format: "text", uploadedBy: "Respondent Counsel", uploadDate: "2026-03-05", fileUrl: null, textContent: "Counter Affidavit — Devika Rao\n\nAll allegations are denied. Actions were within statutory authority." },
  ],
  "CRT-2026-005": [
    { id: 14, title: "Arrest Report", description: "Official arrest report filed by the investigating officer.", format: "text", uploadedBy: "Officer Menon", uploadDate: "2026-03-20", fileUrl: null, textContent: "Arrest Report — Case CRT-2026-005\nAccused: Priya Nair\nCharges: Section 302 IPC\nArresting Officer: SI Menon" },
  ],
  "CRT-2026-006": [],
};
