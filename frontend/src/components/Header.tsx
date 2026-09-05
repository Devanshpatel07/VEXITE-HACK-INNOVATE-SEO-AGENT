import React from "react";
import { Bot, Sparkles, Search, Shield, Zap } from "lucide-react";

interface HeaderProps {
  activeTab: "home" | "audit" | "backlinks" | "privacy";
  setActiveTab: (tab: "home" | "audit" | "backlinks" | "privacy") => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-purple-900/30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-base tracking-tight text-white flex items-center gap-1.5">
              Backlink Hunter <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/40">AI</span>
            </div>
            <div className="text-[10px] text-gray-400 font-medium tracking-wide">Autonomous SEO Agent</div>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "home"
                ? "bg-purple-950/80 border border-purple-700/50 text-purple-300 shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Home
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "audit"
                ? "bg-purple-950/80 border border-purple-700/50 text-purple-300 shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            SEO Audit
          </button>

          <button
            onClick={() => setActiveTab("backlinks")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "backlinks"
                ? "bg-purple-950/80 border border-purple-700/50 text-purple-300 shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Backlinks
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "privacy"
                ? "bg-purple-950/80 border border-purple-700/50 text-purple-300 shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Privacy
          </button>
        </nav>
      </div>
    </header>
  );
}
