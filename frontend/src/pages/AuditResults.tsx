import React, { useState } from "react";
import { Download, AlertTriangle, CheckCircle2, ShieldAlert, Copy, ExternalLink, RefreshCw, Mail, Check } from "lucide-react";

interface AuditResultsProps {
  auditData: any;
  opportunities: any[];
  onNewAudit: () => void;
}

export default function AuditResults({ auditData, opportunities, onNewAudit }: AuditResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedDraftDomain, setCopiedDraftDomain] = useState<string | null>(null);

  const metrics = auditData?.metrics || {
    title: "N/A",
    meta_description: "N/A",
    word_count: 0,
    internal_links: 0,
    external_links: 0
  };

  const issues = auditData?.issues || [];

  // Filter toxic sites or generate disavow list from issues / opportunities
  const toxicDomains: string[] = [];
  issues.forEach((iss: any) => {
    if (iss.toxic_sites && Array.isArray(iss.toxic_sites)) {
      toxicDomains.push(...iss.toxic_sites);
    }
  });

  const handleDownloadDisavow = () => {
    const listToExport = toxicDomains.length > 0 ? toxicDomains : ["# Google Search Console Disavow File", "domain:spam-backlink-example.com", "domain:toxic-directory-sample.org"];
    const content = listToExport.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "disavow.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyFixRecommendation = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyOutreach = (text: string, domain: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraftDomain(domain);
    setTimeout(() => setCopiedDraftDomain(null), 2000);
  };

  return (
    <div className="space-y-10 w-full max-w-5xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-900/90 border border-purple-900/30 rounded-2xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Audit Complete</span>
          <h2 className="text-2xl font-extrabold text-white">Domain SEO Analysis Report</h2>
          <p className="text-xs text-gray-400 truncate max-w-md">{metrics.title || "Target Webpage Audit"}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadDisavow}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-purple-200 font-bold text-xs rounded-xl border border-purple-800/40 flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-purple-400" />
            Download disavow.txt
          </button>

          <button
            onClick={onNewAudit}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            New Audit
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-xs text-gray-400 font-semibold">Title Status</div>
          <div className="text-sm font-bold text-white truncate mt-1">{metrics.title ? "Present" : "Missing"}</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-xs text-gray-400 font-semibold">Word Count</div>
          <div className="text-lg font-extrabold text-purple-400 mt-1">{metrics.word_count} words</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-xs text-gray-400 font-semibold">Internal Links</div>
          <div className="text-lg font-extrabold text-indigo-400 mt-1">{metrics.internal_links}</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-xs text-gray-400 font-semibold">External Links</div>
          <div className="text-lg font-extrabold text-pink-400 mt-1">{metrics.external_links}</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-xs text-gray-400 font-semibold">Issues Detected</div>
          <div className="text-lg font-extrabold text-amber-400 mt-1">{issues.length}</div>
        </div>
      </div>

      {/* Actionable Issues List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Technical & On-Page SEO Issues
        </h3>

        {issues.length === 0 ? (
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-gray-400 text-sm text-center">
            No critical SEO errors found on this page!
          </div>
        ) : (
          <div className="space-y-3">
            {issues.map((issue: any, idx: number) => (
              <div
                key={idx}
                className="p-5 bg-slate-900/80 border border-slate-800 hover:border-purple-900/50 rounded-2xl space-y-3 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      issue.severity === "high"
                        ? "bg-red-950 text-red-300 border-red-800/40"
                        : issue.severity === "medium"
                        ? "bg-amber-950 text-amber-300 border-amber-800/40"
                        : "bg-blue-950 text-blue-300 border-blue-800/40"
                    }`}>
                      {issue.severity || "Warning"}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">{issue.issue}</h4>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{issue.explanation}</p>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center gap-3">
                  <div className="text-xs text-emerald-400 font-medium flex-1">
                    <span className="font-bold text-white">Recommended Fix: </span>
                    {issue.fix_recommendation}
                  </div>
                  <button
                    onClick={() => copyFixRecommendation(issue.fix_recommendation, idx)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-gray-200 rounded-lg flex items-center gap-1.5 transition shrink-0"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Fix
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discovered Backlink Opportunities */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
          Verified Backlink & Guest Post Opportunities ({opportunities.length})
        </h3>

        {opportunities.length === 0 ? (
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-gray-400 text-sm text-center">
            No backlink opportunities fetched yet. Check the Backlinks tab or rerun audit.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp: any, idx: number) => (
              <div key={idx} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {opp.domain}
                      <a href={opp.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </h4>
                    <span className="text-[10px] text-gray-500 truncate block max-w-xs">{opp.url}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-purple-400">{opp.score}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider">Score</div>
                  </div>
                </div>

                {opp.outreach_draft && (
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
                        <Mail className="w-3 h-3 text-purple-400" /> AI Outreach Pitch
                      </span>
                      <button
                        onClick={() => copyOutreach(opp.outreach_draft, opp.domain)}
                        className="text-[10px] text-purple-300 hover:text-white font-bold flex items-center gap-1"
                      >
                        {copiedDraftDomain === opp.domain ? "Copied!" : "Copy Email"}
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-300 italic line-clamp-3">"{opp.outreach_draft}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
