"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  BookOpen, 
  Sliders, 
  Flame, 
  Trash2, 
  Copy, 
  Edit3, 
  LineChart, 
  TrendingUp, 
  MessageSquare 
} from "lucide-react";
import { useStore, Draft } from "@/lib/store";

export default function DashboardPage() {
  const router = useRouter();
  const drafts = useStore((state) => state.drafts);
  const brandProfile = useStore((state) => state.brandProfile);
  const deleteDraft = useStore((state) => state.deleteDraft);
  const loadDraft = useStore((state) => state.loadDraft);

  const handleEditDraft = (id: string) => {
    loadDraft(id);
    router.push("/generator");
  };

  // Pre-seed content templates to trigger fast generation
  const suggestions = [
    {
      title: "Query Latency Win",
      description: "How you refactored SQL relations or caching logic to speed up API routes.",
      category: "Technical" as const,
      tone: "Engineering" as const,
      prompt: "just optimized query scaling on postgres. added local caching. latency dropped from 800ms to 90ms under 5k concurrent queries."
    },
    {
      title: "The Pivot Decision",
      description: "A transparent story about choosing startup speed over deep features polishing.",
      category: "Startup" as const,
      tone: "Founder" as const,
      prompt: "yesterday i had to choose between polishing custom analytical hook algorithms or launching the public beta immediately. i chose speed. launch early, gather data."
    },
    {
      title: "The Components Trap",
      description: "Why modular code structures can sometimes backfire and increase complexity.",
      category: "Technical" as const,
      tone: "Thought Leader" as const,
      prompt: "micro-frontends and multi-repo state engines are making small team dev velocities slower. keep the monolith active until team scale forces segmentation."
    }
  ];

  const handleApplySuggestion = (sug: typeof suggestions[0]) => {
    // Set workspace states in Zustand
    const store = useStore.getState();
    store.createNewDraft();
    store.setRawInput(sug.prompt);
    store.setCategory(sug.category);
    store.setTone(sug.tone);
    router.push("/generator");
  };

  return (
    <div className="space-y-8 relative">
      <div className="glow-blob w-[500px] h-[500px] bg-[#0A66C2]/5 top-[-100px] right-[-100px]" />

      {/* Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Welcome back, {brandProfile.name.split(" ")[0]}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
            Your Personal Brand Memory is loaded with <span className="text-[#0A66C2] dark:text-blue-400 font-semibold">{brandProfile.expertise.length} core sectors</span>.
          </p>
        </div>
        <Link 
          href="/generator" 
          className="px-5 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs shadow-md hover:scale-[1.02] active:scale-95 smooth-transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Create New Post
        </Link>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Brand Profiles", val: "1 Active", desc: "Alex Dev Persona", icon: Sliders, color: "text-blue-500 bg-blue-500/10" },
          { name: "Total Post Drafts", val: drafts.length.toString(), desc: "Local saved files", icon: BookOpen, color: "text-indigo-500 bg-indigo-500/10" },
          { name: "Average Readability", val: "84%", desc: "Grade A comfort", icon: LineChart, color: "text-sky-500 bg-sky-500/10" },
          { name: "Predicted Reach", val: "High", desc: "Top 15% bracket", icon: TrendingUp, color: "text-indigo-500 bg-indigo-500/10" }
        ].map((met, idx) => {
          const Icon = met.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{met.name}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${met.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900 dark:text-slate-100">{met.val}</span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{met.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workspace Grid Suggestions vs Drafts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Suggested posts outlines (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#0A66C2] animate-pulse" />
                Suggested Generation Outlines
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Select one of these pre-configured outlines matching your expertise to start editing immediately.
              </p>
            </div>

            <div className="space-y-3">
              {suggestions.map((sug, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/30 border border-slate-250 dark:border-slate-800 hover:border-blue-500/20 smooth-transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-150">{sug.title}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                        {sug.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{sug.description}</p>
                  </div>
                  <button
                    onClick={() => handleApplySuggestion(sug)}
                    className="py-2 px-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-[#0A66C2] dark:text-blue-400 text-xs font-bold border border-blue-500/15 smooth-transition"
                  >
                    Use Outline
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Drafts Quick List (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Saved Draft Library</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Quickly edit or copy your recent local drafts.</p>
            </div>

            {drafts.length > 0 ? (
              <div className="space-y-3 divide-y divide-slate-200/5">
                {drafts.slice(0, 3).map((draft) => (
                  <div key={draft.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 group">
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-[#0A66C2] dark:group-hover:text-blue-450 smooth-transition">
                        {draft.title}
                      </span>
                      <span className="block text-[9px] text-slate-500 mt-0.5">
                        {draft.category} • {draft.tone} Archetype
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition duration-150">
                      <button
                        onClick={() => handleEditDraft(draft.id)}
                        className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-650 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 shadow-sm"
                        title="Edit Post"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteDraft(draft.id)}
                        className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-500 hover:text-red-650 dark:hover:text-red-400 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-200 dark:hover:border-red-900/30"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-550 dark:text-slate-500">
                No saved drafts yet. Craft a post inside the Generator and bookmark it!
              </div>
            )}

            <div className="pt-2 border-t border-slate-200/5">
              <Link 
                href="/drafts" 
                className="block w-full py-2.5 text-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900/35 rounded-xl border border-slate-200 dark:border-slate-800 smooth-transition"
              >
                View Full Library ({drafts.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
