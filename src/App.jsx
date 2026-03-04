import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/common/useAuth";
import { ParticleField } from "./components/common/Shared";

import Navbar          from "./components/common/Navbar";
import HomeSection     from "./components/common/HomeSection";
import RoleSelection   from "./components/common/RoleSelection";
import PoliceDashboard from "./components/police/PoliceDashboard";
import CaseDetails     from "./components/police/CaseDetails";

import LawyerDashboardPage   from "./components/lawyer/LawyerDashboardPage";
import LawyerCaseDetailsPage from "./components/lawyer/LawyerCaseDetailsPage";

import JudgeDashboardPage   from "./components/judge/JudgeDashboardPage";
import JudgeCaseDetailsPage from "./components/judge/JudgeCaseDetailsPage";

import "./App.css";

const LandingPage = () => (
  <>
    <HomeSection />
    <footer className="footer">
      <p>© 2025 Honora · Federal Evidence Management System · All Rights Reserved</p>
      <p className="footer-sub">Authorized Personnel Only · Unauthorized Access is a Federal Offense</p>
    </footer>
  </>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ParticleField />
        <Navbar />
        <Routes>
          <Route path="/"                          element={<LandingPage />} />
          <Route path="/role"                      element={<RoleSelection />} />
          <Route path="/dashboard/police"          element={<PoliceDashboard />} />
          <Route path="/dashboard/police/case/:id" element={<CaseDetails />} />

          <Route path="/dashboard/lawyer"          element={<LawyerDashboardPage />} />
          <Route path="/dashboard/lawyer/case/:id" element={<LawyerCaseDetailsPage />} />

          <Route path="/dashboard/judge"           element={<JudgeDashboardPage />} />
          <Route path="/dashboard/judge/case/:id"  element={<JudgeCaseDetailsPage />} />

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}