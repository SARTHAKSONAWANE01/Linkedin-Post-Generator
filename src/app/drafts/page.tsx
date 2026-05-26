"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FolderHeart, 
  Search, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  Plus, 
  Layers 
} from "lucide-react";
import { useStore, Draft } from "@/lib/store";

export default function DraftsPage() {
  const router = useRouter();
  const drafts = useStore((state) => state.drafts);
  const deleteDraft = useStore((state) => state.deleteDraft);
  const loadDraft = useStore((state) => state.loadDraft);
  const createNewDraft = useStore((state) => state.createNewDraft);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleEditDraft = (id: string) => {
    loadDraft(id);
    router.push("/generator");
  };

  const handleCreateNew = () => {
    createNewDraft();
    router.push("/generator");
  };

  const handleCopyToClipboard = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter drafts based on search and category tab
  const filteredDrafts = drafts.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Technical", "Startup", "Career", "Launch", "Research", "Community"];

  return (
    <div className="space-y-8 relative">
      <div className="glow-blob w-[400px] h-[400px] bg-[#0A66C2]/5 top-[-100px] right-[-50px]" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Drafts Library
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
            Browse, manage, search, and export all your saved authentic LinkedIn posts.
          </p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="px-5 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs shadow-md hover:scale-[1.02] active:scale-95 smooth-transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Draft
        </button>
      </div>

      {/* Search and Filters panel */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 outline-none text-xs focus:border-[#0A66C2]/50 text-slate-900 dark:text-slate-100 smooth-transition placeholder-slate-400"
            placeholder="Search drafts title or content..."
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                py-2.5 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap
                ${activeCategory === cat
                  ? "bg-slate-100 dark:bg-slate-900 text-[#0A66C2] dark:text-blue-400 border border-slate-205 dark:border-slate-800"
                  : "text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Draft Grid cards */}
      {filteredDrafts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrafts.map((draft) => (
            <div 
              key={draft.id} 
              className="glass-card rounded-2xl p-6 hover:border-blue-500/25 smooth-transition flex flex-col justify-between h-[360px]"
            >
              {/* Draft Info */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                    {draft.category}
                  </span>
                  <span className="text-[9px] text-slate-500 font-semibold">
                    {new Date(draft.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                  {draft.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-5 leading-relaxed font-sans">
                  {draft.content}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200/5 mt-4 flex items-center justify-between">
                <div className="text-[10px] text-slate-500 font-medium">
                  Tone: <span className="text-slate-800 dark:text-slate-300 font-bold">{draft.tone}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyToClipboard(draft.id, draft.content)}
                    className="p-2 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-500 hover:text-[#0A66C2] dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 smooth-transition shadow-sm"
                    title="Copy Post to Clipboard"
                  >
                    {copiedId === draft.id ? <Check className="w-3.5 h-3.5 text-blue-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleEditDraft(draft.id)}
                    className="p-2 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-500 hover:text-[#0A66C2] dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 smooth-transition shadow-sm"
                    title="Edit in Workspace"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    className="p-2 rounded-lg bg-white hover:bg-red-50 dark:bg-slate-900 dark:hover:bg-red-950/20 text-slate-500 hover:text-red-500 dark:hover:text-red-400 border border-slate-200 dark:border-slate-800 hover:border-red-200 dark:hover:border-red-900/30 smooth-transition shadow-sm"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="h-[300px] rounded-2xl border-2 border-dashed border-slate-250 dark:border-slate-800/80 flex flex-col items-center justify-center text-center p-6 space-y-3">
          <FolderHeart className="w-10 h-10 text-slate-500 animate-pulse" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-200">No Drafts Match Search Filters</h3>
            <p className="text-xs text-slate-550 dark:text-slate-500 max-w-xs mt-1">
              Try adjusting your spelling or selecting an alternative category tab.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
