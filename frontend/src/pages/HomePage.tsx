import React from "react";
import { Sparkles, ArrowRight, ShieldAlert, FileText, Search, Database, Cpu, CheckCircle2 } from "lucide-react";
import StatCounters from "../components/StatCounters";

interface HomePageProps {
  onStartAudit: () => void;
  onExploreBacklinks: () => void;
}

export default function HomePage({ onStartAudit, onExploreBacklinks }: HomePageProps) {
  return (
    <div className="space-y-16 py-8 text-center flex flex-col items-center">
      {/* Hero Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Autonomous Multi-Agent Web Scraper & SEO Auditor
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Supercharge Your Search Rankings with <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">AI Precision</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Deep-crawl any web domain using high-speed Playwright & BeautifulSoup scrapers. Uncover broken meta tags, audit technical SEO, discover verified high-DA guest post backlinks, and generate one-click disavow files.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartAudit}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 transition transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5 text-purple-200" />
            Run Free Domain Audit
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreBacklinks}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-purple-900/40 text-purple-200 font-bold rounded-2xl flex items-center justify-center gap-2 transition"
          >
            <Search className="w-5 h-5 text-indigo-400" />
            Browse Verified Backlinks
          </button>
        </div>
      </div>

      {/* Live Stats Row */}
      <StatCounters />

      {/* Core Feature Grid */}
      <div className="w-full max-w-5xl space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Engineered for Modern SEO Technical Excellence
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Powered by Python FastAPI, Playwright Headless Crawling, LangGraph Multi-Agent Orchestration & Google Gemini 1.5 Flash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Card 1 */}
          <div className="p-6 bg-slate-900/80 border border-purple-900/30 rounded-2xl space-y-4 hover:border-purple-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800/40 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Playwright & BeautifulSoup Scraper</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Extracts full DOM content, title tags, meta descriptions, word counts, and link structures using headless browser emulation and fast HTTP fallback.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-slate-900/80 border border-purple-900/30 rounded-2xl space-y-4 hover:border-purple-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">DuckDuckGo Backlink Discovery</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Discovers authentic guest contribution opportunities, editorial footprints, and industry blogs related to your specific niche keywords.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-slate-900/80 border border-purple-900/30 rounded-2xl space-y-4 hover:border-purple-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-pink-950 border border-pink-800/40 flex items-center justify-center text-pink-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Disavow & Spam Risk Protection</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Automatically flags toxic backlink URLs, calculates spam risk ratings, and generates standard `disavow.txt` files for Google Search Console.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
