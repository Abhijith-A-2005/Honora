import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./useAuth";
import { ParticleField } from "./Shared";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import RoleSelection from "./RoleSelection";
import PoliceDashboard from "./PoliceDashboard";
import CaseDetails from "./CaseDetails";
import "./App.css";

// Landing page (Hero + footer)
const LandingPage = () => (
  <>
    <HeroSection />
    <footer className="footer">
      <p>© 2025 EviChain · Federal Evidence Management System · All Rights Reserved</p>
      <p className="footer-sub">Authorized Personnel Only · Unauthorized Access is a Federal Offense</p>
    </footer>
  </>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ParticleField />
        <Navbar />
        <Routes>
          <Route path="/"                          element={<LandingPage />} />
          <Route path="/role"                      element={<RoleSelection />} />
          <Route path="/dashboard/police"          element={<PoliceDashboard />} />
          <Route path="/dashboard/police/case/:id" element={<CaseDetails />} />
          {/* Catch-all → landing */}
          <Route path="*"                          element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
