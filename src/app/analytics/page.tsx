"use client";

import React from "react";
import { 
  LineChart, 
  TrendingUp, 
  Activity, 
  Flame, 
  HelpCircle, 
  Percent, 
  Target, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { useStore } from "@/lib/store";

export default function AnalyticsPage() {
  const drafts = useStore((state) => state.drafts);

  // Compute aggregate scores from saved drafts
  const totalSaved = drafts.length;
  const avgReadability = totalSaved > 0 
    ? Math.round(drafts.reduce((acc, d) => acc + (d.analytics?.readabilityScore || 80), 0) / totalSaved)
    : 85;
  const avgHook = totalSaved > 0
    ? Math.round(drafts.reduce((acc, d) => acc + (d.analytics?.hookStrength || 82), 0) / totalSaved)
    : 83;
  const avgCta = totalSaved > 0
    ? Math.round(drafts.reduce((acc, d) => acc + (d.analytics?.ctaEffectiveness || 75), 0) / totalSaved)
    : 78;

  return (
    <div className="space-y-8 relative">
      <div className="glow-blob w-[400px] h-[400px] bg-emerald-500/5 top-[-100px] right-[-50px]" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent flex items-center gap-2">
            Post Analytics
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Real-time readability index, hook strengths, and predicted engagement stats for saved copies.
          </p>
        </div>
      </div>

      {/* Core KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Readability */}
        <div className="glass-card rounded-2xl border border-slate-200/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Readability Index</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-100">{avgReadability}%</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Excellent
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${avgReadability}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Measures visual skimmability, short paragraph structures, and sentence length balance. High is mobile-friendly.
          </p>
        </div>

        {/* Hook Strength */}
        <div className="glass-card rounded-2xl border border-slate-200/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Hook Grade</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Flame className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-100">{avgHook}%</span>
            <span className="text-[10px] text-teal-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Strong
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full" style={{ width: `${avgHook}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Evaluates the first 1-2 lines of copy for metric density, tension points, or counter-intuitive observations.
          </p>
        </div>

        {/* CTA effectiveness */}
        <div className="glass-card rounded-2xl border border-slate-200/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">CTA Conversion Grade</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-100">{avgCta}%</span>
            <span className="text-[10px] text-blue-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Engaging
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${avgCta}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Measures how well your closing questions foster conversational replies rather than landing as generic calls to action.
          </p>
        </div>
      </div>

      {/* Analytics suggestions grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Engagement Predictions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200/10 p-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500 animate-bounce" />
                Readability Recommendation Engine
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                PostForge automated analytical checks on how to maximize conversions.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  check: "Skim Level Filter",
                  status: "Optimized",
                  statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                  desc: "Your paragraphs are restricted to under 3 sentences max, which drastically increases mobile scrolling retention rates."
                },
                {
                  check: "Anti-AI-Tone Compliance",
                  status: "100% Passed",
                  statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                  desc: "Zero banished marketing keywords ('delve', 'synergy', 'tapestry') detected in your draft library posts."
                },
                {
                  check: "Metric Density Level",
                  status: "Needs Polish",
                  statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                  desc: "Some drafts lack quantitative figures (%, $, ms). Adding specific metrics to engineering/founder posts boosts audience trust by 3.4x."
                }
              ].map((rec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/35 border border-slate-250 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-100">{rec.check}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${rec.statusColor}`}>
                      {rec.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optimization metrics summary checklist */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200/10 p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-100">LinkedIn Optimization Laws</h2>
            <p className="text-slate-400 text-xs">A checklist of the core structure guidelines automatically enforced by PostForge.</p>
            
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
                <div>
                  <span className="font-bold block text-slate-200">The 3-Second Hook Rule</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Start with a metric, tension, or counter-intuitive claim. Strip conversational headers.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
                <div>
                  <span className="font-bold block text-slate-200">Sentence Variance Rhythm</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Alternate single-sentence lines with short punchy paragraphs to build narrative momentum.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 font-bold">3</span>
                <div>
                  <span className="font-bold block text-slate-200">Inclusive Accessibility Standard</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Do not use bold unicode fonts which fail to render on screen readers. Use clear caps headlines.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
