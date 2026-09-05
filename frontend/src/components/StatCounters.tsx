import React from "react";
import { TrendingUp, Link2, FileCheck2, ShieldAlert } from "lucide-react";

export default function StatCounters() {
  const stats = [
    {
      label: "Domains Audited",
      value: "14,820+",
      subtext: "Live crawling & Playwright checks",
      icon: <FileCheck2 className="w-4 h-4 text-purple-400" />
    },
    {
      label: "Backlinks Discovered",
      value: "94.2%",
      subtext: "High-DA guest contribution targets",
      icon: <Link2 className="w-4 h-4 text-indigo-400" />
    },
    {
      label: "Disavow Files Exported",
      value: "3,410",
      subtext: "Protecting domain authority & rankings",
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />
    },
    {
      label: "Avg. Audit Speed",
      value: "1.8s",
      subtext: "Fast parallel BeautifulSoup & LLM analysis",
      icon: <TrendingUp className="w-4 h-4 text-pink-400" />
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-4">
      {stats.map((stat, idx) => (
        <div 
          key={idx}
          className="p-5 bg-slate-900/80 border border-purple-900/30 rounded-2xl space-y-1 hover:border-purple-500/40 transition shadow-lg text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-white">{stat.value}</span>
            {stat.icon}
          </div>
          <div className="text-xs font-bold text-gray-300">{stat.label}</div>
          <div className="text-[10px] text-gray-500">{stat.subtext}</div>
        </div>
      ))}
    </div>
  );
}
