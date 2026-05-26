"use client";

import React, { useState } from "react";
import { 
  Sliders, 
  Sparkles, 
  Save, 
  Plus, 
  Trash2, 
  Check, 
  Flame, 
  SlidersHorizontal 
} from "lucide-react";
import { useStore } from "@/lib/store";

export default function BrandProfilePage() {
  const brandProfile = useStore((state) => state.brandProfile);
  const updateBrandProfile = useStore((state) => state.updateBrandProfile);

  // Local form states initialized from Zustand store
  const [name, setName] = useState(brandProfile.name);
  const [role, setRole] = useState(brandProfile.role);
  const [tone, setTone] = useState(brandProfile.tone);
  const [styleNotes, setStyleNotes] = useState(brandProfile.styleNotes);
  const [newExpertise, setNewExpertise] = useState("");
  const [expertise, setExpertise] = useState<string[]>(brandProfile.expertise);
  const [newAchievement, setNewAchievement] = useState("");
  const [achievements, setAchievements] = useState<string[]>(brandProfile.achievements);

  const [isSaving, setIsSaving] = useState(false);
  const [saveCompleted, setSaveCompleted] = useState(false);

  const handleAddExpertise = () => {
    if (newExpertise.trim() && !expertise.includes(newExpertise.trim())) {
      setExpertise([...expertise, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (tag: string) => {
    setExpertise(expertise.filter((e) => e !== tag));
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim() && !achievements.includes(newAchievement.trim())) {
      setAchievements([...achievements, newAchievement.trim()]);
      setNewAchievement("");
    }
  };

  const handleRemoveAchievement = (ach: string) => {
    setAchievements(achievements.filter((a) => a !== ach));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateBrandProfile({
        name,
        role,
        tone,
        styleNotes,
        expertise,
        achievements
      });
      setIsSaving(false);
      setSaveCompleted(true);
      setTimeout(() => setSaveCompleted(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-8 relative">
      <div className="glow-blob w-[400px] h-[400px] bg-emerald-500/5 top-[-100px] right-[-50px]" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent flex items-center gap-2">
            Brand Profile Memory
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Build your personal AI writing context. The generator references this profile to craft matching tone scripts.
          </p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-md hover:scale-[1.02] active:scale-95 smooth-transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving Context...
            </>
          ) : saveCompleted ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              Memory Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Memory Configuration
            </>
          )}
        </button>
      </div>

      {/* Configuration Form Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: General Profile Setup (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200/10 p-6 space-y-5">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
              Core Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                  Full Name / Alias
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-emerald-500/50 text-slate-200 smooth-transition"
                  placeholder="e.g. Alex Dev"
                />
              </div>

              {/* Default Tone Archetype */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                  Default Archetype Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-emerald-500/50 text-slate-400 dark:text-slate-300 smooth-transition"
                >
                  <option value="Engineering">Engineering Mode</option>
                  <option value="Founder">Founder Mode</option>
                  <option value="Thought Leader">Thought Leader Mode</option>
                  <option value="Concise">Concise Mode</option>
                  <option value="Storyteller">Storyteller Mode</option>
                </select>
              </div>
            </div>

            {/* Headline / Bio */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Professional Role Headline
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-emerald-500/50 text-slate-200 smooth-transition"
                placeholder="e.g. Lead Software Architect & Tech Founder"
              />
            </div>

            {/* Custom style instructions */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Writing Style Notes & Custom Rules
              </label>
              <textarea
                value={styleNotes}
                onChange={(e) => setStyleNotes(e.target.value)}
                className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-emerald-500/50 text-xs leading-relaxed text-slate-350 dark:text-slate-300 resize-none smooth-transition"
                placeholder="Instruct the AI: e.g. Prefer short punchy bullets, avoid corporate adjectives, use plain developers wording..."
              />
            </div>
          </div>
        </div>

        {/* Right Side: Tags and Achievements (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Expertise tag builder */}
          <div className="glass-card rounded-2xl border border-slate-200/10 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-100">Expertise Areas</h2>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Add technical domains or business topics you speak about. The generator relies on these contexts.
            </p>

            {/* Tags input box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddExpertise()}
                className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-emerald-500/50 text-slate-200"
                placeholder="e.g. Redis Caching"
              />
              <button
                onClick={handleAddExpertise}
                className="p-2.5 rounded-xl bg-slate-150 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-200 dark:border-slate-800 smooth-transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Active tag list bubble */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {expertise.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-[10px] font-bold"
                >
                  {tag}
                  <button 
                    onClick={() => handleRemoveExpertise(tag)}
                    className="hover:text-red-400 text-slate-500 font-bold ml-1 transition"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Key Achievements Bullet list builder */}
          <div className="glass-card rounded-2xl border border-slate-200/10 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-100">Key Achievements</h2>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Log metrics-driven outcomes (e.g. Scaling numbers, funding rounds, revenue wins) that can be seamlessly injected.
            </p>

            {/* Achievements input list */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddAchievement()}
                className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-emerald-500/50 text-slate-200"
                placeholder="e.g. Slashing API queries cost by 40%"
              />
              <button
                onClick={handleAddAchievement}
                className="p-2.5 rounded-xl bg-slate-150 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-200 dark:border-slate-800 smooth-transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Active achievements items */}
            {achievements.length > 0 ? (
              <div className="space-y-2 pt-2">
                {achievements.map((ach) => (
                  <div 
                    key={ach}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50/40 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-350 dark:text-slate-300 leading-relaxed"
                  >
                    <span>{ach}</span>
                    <button
                      onClick={() => handleRemoveAchievement(ach)}
                      className="text-slate-500 hover:text-red-400 transition"
                      title="Delete Achievement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-[10px] text-slate-500">
                No achievements recorded yet. Add metrics accomplishments!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
