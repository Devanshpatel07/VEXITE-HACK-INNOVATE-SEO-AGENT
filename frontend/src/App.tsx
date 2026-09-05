import React, { useState } from "react";
import Header from "./components/Header";
import LinkGraphBackground from "./components/LinkGraphBackground";
import HomePage from "./pages/HomePage";
import SeoAuditPage from "./pages/SeoAuditPage";
import BacklinksPage from "./pages/BacklinksPage";
import PrivacyPage from "./pages/PrivacyPage";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "audit" | "backlinks" | "privacy">("home");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Dynamic Animated Canvas Link Graph Background */}
      <LinkGraphBackground />

      {/* Glassmorphic Sticky Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {activeTab === "home" && (
          <HomePage
            onStartAudit={() => setActiveTab("audit")}
            onExploreBacklinks={() => setActiveTab("backlinks")}
          />
        )}
        {activeTab === "audit" && <SeoAuditPage />}
        {activeTab === "backlinks" && <BacklinksPage />}
        {activeTab === "privacy" && <PrivacyPage />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-900/20 py-8 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Backlink Hunter AI — Autonomous Python FastAPI + Playwright + LangGraph Agent
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab("home")} className="hover:text-gray-300">Home</button>
            <button onClick={() => setActiveTab("audit")} className="hover:text-gray-300">SEO Audit</button>
            <button onClick={() => setActiveTab("backlinks")} className="hover:text-gray-300">Backlinks</button>
            <button onClick={() => setActiveTab("privacy")} className="hover:text-gray-300">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
