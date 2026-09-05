import React, { useState, useEffect } from "react";
import { Sparkles, Globe, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import AuditResults from "./AuditResults";

export default function SeoAuditPage() {
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("queued");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<any>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;

    let formattedUrl = urlInput.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setLoading(true);
    setErrorMessage(null);
    setStatusText("Initializing Playwright Scraper & AI Agent...");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!res.ok) {
        throw new Error(`Failed to start audit (HTTP ${res.status})`);
      }

      const data = await res.json();
      setProjectId(data.project_id);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || "Failed to submit audit request.");
    }
  };

  useEffect(() => {
    if (!projectId || !loading) return;

    const interval = setInterval(async () => {
      try {
        const statusRes = await fetch(`/api/projects/${projectId}/status`);
        if (statusRes.ok) {
          const statusData = await statusRes.json();
          setStatusText(statusData.status);

          if (statusData.status === "error") {
            setLoading(false);
            setErrorMessage(statusData.error_message || "Audit execution failed");
            clearInterval(interval);
          } else if (statusData.status === "done") {
            // Fetch final audit metrics & opportunities
            const [auditRes, oppRes] = await Promise.all([
              fetch(`/api/projects/${projectId}/seo-audit`),
              fetch(`/api/projects/${projectId}/opportunities`),
            ]);

            if (auditRes.ok) {
              const aData = await auditRes.json();
              setAuditData(aData);
            }
            if (oppRes.ok) {
              const oData = await oppRes.json();
              setOpportunities(oData);
            }

            setLoading(false);
            clearInterval(interval);
          }
        }
      } catch {
        // Retry next interval tick
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [projectId, loading]);

  if (auditData) {
    return (
      <AuditResults
        auditData={auditData}
        opportunities={opportunities}
        onNewAudit={() => {
          setAuditData(null);
          setOpportunities([]);
          setProjectId(null);
          setUrlInput("");
        }}
      />
    );
  }

  return (
    <div className="space-y-10 w-full max-w-3xl mx-auto py-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Autonomous Web Audit Pipeline
        </div>
        <h1 className="text-4xl font-black text-white">Live Domain SEO Audit</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Enter any website URL to perform live DOM scraping, detect technical errors, calculate word count metrics, and discover verified backlink targets.
        </p>
      </div>

      {/* Audit Input Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-slate-900/90 border border-purple-900/40 rounded-3xl space-y-4 shadow-xl">
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
          <input
            type="text"
            disabled={loading}
            placeholder="e.g. https://example.com or techcrunch.com"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-sm font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !urlInput.trim()}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Auditing Domain ({statusText})...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Start Autonomous SEO Audit
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 bg-red-950/80 border border-red-800/40 rounded-2xl text-red-300 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>Error: {errorMessage}</span>
        </div>
      )}

      {/* Step Tracker when Loading */}
      {loading && (
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 animate-fadeIn text-left">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
            Pipeline Status: <span className="text-purple-300 uppercase tracking-wide">{statusText}</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-purple-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Step 1: Playwright Headless Browser Crawling & DOM Extraction
            </div>
            <div className={`flex items-center gap-2 ${statusText === "auditing" || statusText === "finding_backlinks" || statusText === "done" ? "text-purple-300 font-medium" : "text-gray-500"}`}>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              Step 2: BeautifulSoup & Gemini 1.5 Flash Technical Audit
            </div>
            <div className={`flex items-center gap-2 ${statusText === "finding_backlinks" || statusText === "done" ? "text-purple-300 font-medium" : "text-gray-500"}`}>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              Step 3: DuckDuckGo Search Footprints & Disavow Generator
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
