export const MOCK_CASES = [
  {
    id: "EC-2024-001",
    title: "Downtown Bank Robbery",
    status: "Under Investigation",
    date: "2024-11-12",
    officer: "Det. Marcus Reyes",
    description:
      "Armed robbery at First National Bank, 4th Avenue. Three perpetrators, one detained. Evidence collection ongoing.",
    badge: "D-4471",
    department: "Major Crimes Unit",
  },
  {
    id: "EC-2024-002",
    title: "Cybercrime — Corporate Data Breach",
    status: "Open",
    date: "2024-12-01",
    officer: "Sgt. Priya Nair",
    description:
      "Intrusion into corporate servers of Nexus Technologies. Suspected insider threat. Digital forensic analysis initiated.",
    badge: "D-3892",
    department: "Cyber Crimes Division",
  },
  {
    id: "EC-2024-003",
    title: "Vehicle Homicide — Highway 9",
    status: "Closed",
    date: "2024-09-20",
    officer: "Lt. Samuel Chen",
    description:
      "Hit-and-run fatality on Highway 9. Vehicle recovered. Perpetrator charged. Case closed pending court proceedings.",
    badge: "D-2210",
    department: "Traffic Homicide Unit",
  },
  {
    id: "EC-2024-004",
    title: "Narcotics Distribution Ring",
    status: "Under Investigation",
    date: "2024-10-05",
    officer: "Det. Amara Diallo",
    description:
      "Suspected organized narcotics distribution operating across three districts. Surveillance evidence being compiled.",
    badge: "D-5517",
    department: "Narcotics Division",
  },
  {
    id: "EC-2024-005",
    title: "Art Theft — Heritage Museum",
    status: "Open",
    date: "2024-12-18",
    officer: "Det. Victor Holt",
    description:
      "Three priceless artifacts stolen from Heritage Museum after hours. Security systems partially disabled. Interpol notified.",
    badge: "D-6634",
    department: "Major Crimes Unit",
  },
  {
    id: "EC-2024-006",
    title: "Fraud — Real Estate Scheme",
    status: "Closed",
    date: "2024-08-14",
    officer: "Insp. Farah Malik",
    description:
      "Large-scale real estate fraud affecting 47 victims. Funds traced through offshore accounts. Conviction secured.",
    badge: "D-1109",
    department: "Financial Crimes Unit",
  },
];

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
