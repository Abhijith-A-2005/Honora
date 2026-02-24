# ⛓️ EviChain v2.0
**Secure Digital Evidence Management & Chain of Custody Tracking System**

---

## 📁 Folder Structure

```
EviChain/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                   ← Root with Router + AuthProvider
    ├── App.css                   ← All styles (design system)
    ├── main.jsx                  ← React DOM entry
    │
    ├── hooks/
    │   └── useAuth.jsx           ← Simulated auth context (useState)
    │
    ├── data/
    │   └── mockData.js           ← 6 mock cases + rich evidence per case
    │
    ├── components/
    │   ├── Icons.jsx             ← All inline SVG icons
    │   ├── Shared.jsx            ← ParticleField, GoldenDivider
    │   ├── Navbar.jsx            ← Fixed top nav with user state
    │   ├── HeroSection.jsx       ← Landing hero
    │   ├── LoginModal.jsx        ← Role-specific auth modal
    │   ├── CaseCard.jsx          ← Dashboard case row card
    │   ├── EvidenceCard.jsx      ← Evidence item card
    │   ├── EvidenceModal.jsx     ← Full-screen evidence viewer
    │   └── UploadEvidenceModal.jsx ← Evidence upload form modal
    │
    └── pages/
        ├── RoleSelection.jsx     ← /role
        ├── PoliceDashboard.jsx   ← /dashboard/police
        └── CaseDetails.jsx       ← /dashboard/police/case/:id
```

---

## 🚀 Quick Start

```bash
# 1. Navigate into the project
cd EviChain

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open → http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Routing

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | Landing Page | Hero + footer |
| `/role` | RoleSelection | 3 role cards → Login modal |
| `/dashboard/police` | PoliceDashboard | Protected (redirects if no user) |
| `/dashboard/police/case/:id` | CaseDetails | Evidence vault per case |

Auth is simulated entirely in React state via `useAuth` context.

---

## 🎭 Roles & Login

Any credentials work (no backend). Enter any username + passphrase.

| Role | Redirects To |
|------|-------------|
| Police Department | `/dashboard/police` |
| Legal Counsel | `/dashboard/police` |
| Judiciary | `/dashboard/police` |

---

## 📊 Mock Data

**6 cases** included:
- Downtown Bank Robbery
- Cybercrime — Corporate Data Breach  
- Vehicle Homicide — Highway 9
- Narcotics Distribution Ring
- Art Theft — Heritage Museum
- Fraud — Real Estate Scheme

Each case has rich evidence across multiple formats (Video, Photo, Text, Voice).

---

## 📂 Evidence System

### Evidence Types
- **Video** — HTML5 `<video>` player
- **Photo** — Full image preview
- **Text Document** — Scrollable monospace text container
- **Voice Note** — HTML5 `<audio>` player
- **Other** — File upload support

### Upload Flow
1. Click gold **+** FAB button (bottom-right)
2. Fill title, description, format, optional file
3. Submit → evidence appears with animated entrance
4. New evidence auto-categorized under correct section

File previews use `URL.createObjectURL()` — no backend required.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` |
| Brown Gradient | `#1c1008 → #2d1f0a` |
| Gold Primary | `#D4AF37` |
| Gold Glow | `rgba(212,175,55,0.35)` |
| Text | `#f5f5f5` |
| Display Font | Cinzel (Google Fonts) |
| Body Font | Rajdhani (Google Fonts) |

### Effects
- Canvas particle constellation background (fixed, all pages)
- Gold gradient buttons with shimmer animation
- Glassmorphism modals with `backdrop-filter: blur`
- Card hover: `translateY + scale + gold box-shadow`
- Evidence cards: staggered fade-up entrance
- New uploads: bounce-scale entrance + gold ring flash
- FAB button: glow pulse + rotate-on-hover
- Animated gold dividers throughout

---

*EviChain v2.0 — Frontend prototype only. No backend, no real authentication, no data persistence.*
