import React from "react";
import { ShieldCheck, Lock, EyeOff, Server } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-10 w-full max-w-4xl mx-auto py-8 text-left">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-800/40 text-purple-400 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-extrabold text-white">Privacy Policy & Security Standards</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Learn how Backlink Hunter AI collects data, executes headless web crawling, and handles disavow export processing.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            1. Web Crawling & Scraping Disclosure
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Our Playwright and BeautifulSoup engines fetch publicly available HTML DOM structures, title tags, meta tags, and internal/external hyperlink nodes solely to compile requested SEO audit metrics. No user authorization credentials or private cookies are stored or requested.
          </p>
        </div>

        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-indigo-400" />
            2. Local Database & SQLite Isolation
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Audit history and discovered backlink opportunities are saved locally to an isolated SQLite database (`backend.db`). We do not sell or share domain audit reports with third-party data brokers.
          </p>
        </div>

        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            3. AI Pitch Generation & LLM Safety
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Prompt inputs sent to Google Gemini 1.5 Flash or Groq LLMs consist strictly of public webpage titles and meta descriptions to draft relevant outreach pitch emails.
          </p>
        </div>
      </div>
    </div>
  );
}
