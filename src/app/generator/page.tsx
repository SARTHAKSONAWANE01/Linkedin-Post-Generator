"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Github, 
  FileText, 
  Flame, 
  Activity,
  Award,
  Layers,
  HelpCircle,
  Undo
} from "lucide-react";
import { useStore, CarouselSlide } from "@/lib/store";
import { generateLinkedInPost } from "@/lib/openai";

export default function GeneratorPage() {
  // Pull states from Zustand
  const {
    rawInput,
    selectedCategory,
    selectedTone,
    gitRepoUrl,
    researchPaperSummary,
    isGenerating,
    generatedContent,
    carouselOutline,
    alternateHooks,
    analytics,
    brandProfile,
    
    setRawInput,
    setCategory,
    setTone,
    setGitRepoUrl,
    setResearchSummary,
    setGenerating,
    setGenerationResults,
    saveCurrentDraft,
    updateActiveDraftContent
  } = useStore();

  const [copied, setCopied] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeCarouselSlide, setActiveCarouselSlide] = useState(0);

  const standardCategories = ["Technical", "Startup", "Career", "Launch", "Research", "Community"];
  const standardTones = ["Engineering", "Founder", "Thought Leader", "Concise", "Storyteller"];

  const [isCustomCategory, setIsCustomCategory] = useState(!standardCategories.includes(selectedCategory));
  const [customCategoryInput, setCustomCategoryInput] = useState(
    standardCategories.includes(selectedCategory) ? "" : selectedCategory
  );

  const [isCustomTone, setIsCustomTone] = useState(!standardTones.includes(selectedTone));
  const [customToneInput, setCustomToneInput] = useState(
    standardTones.includes(selectedTone) ? "" : selectedTone
  );

  const handleSelectCategory = (cat: string) => {
    setIsCustomCategory(false);
    setCategory(cat);
  };

  const handleSelectCustomCategory = () => {
    setIsCustomCategory(true);
    setCategory(customCategoryInput || "Custom");
  };

  const handleCustomCategoryInputChange = (val: string) => {
    setCustomCategoryInput(val);
    setCategory(val || "Custom");
  };

  const handleSelectTone = (t: string) => {
    setIsCustomTone(false);
    setTone(t);
  };

  const handleSelectCustomTone = () => {
    setIsCustomTone(true);
    setTone(customToneInput || "Custom Tone");
  };

  const handleCustomToneInputChange = (val: string) => {
    setCustomToneInput(val);
    setTone(val || "Custom Tone");
  };

  const handleGenerate = async () => {
    if (!rawInput.trim() && !gitRepoUrl && !researchPaperSummary) return;

    setGenerating(true);
    try {
      const result = await generateLinkedInPost({
        rawInput,
        brandProfile,
        tone: selectedTone,
        category: selectedCategory,
        gitRepoUrl: gitRepoUrl || undefined,
        researchPaperSummary: researchPaperSummary || undefined
      });

      setGenerationResults(
        result.postContent,
        result.analytics,
        result.alternateHooks,
        result.carouselOutline
      );
    } catch (error) {
      console.error("Failed to generate LinkedIn post:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDraft = () => {
    if (!generatedContent) return;
    const title = draftTitle.trim() || `LinkedIn Draft - ${selectedCategory} (${new Date().toLocaleDateString()})`;
    saveCurrentDraft(title);
    setSaveSuccess(true);
    setDraftTitle("");
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSaveDialog(false);
    }, 1500);
  };

  const handleSwapHook = (newHook: string) => {
    // Replace the first paragraph (hook) of the post content with the selected alternative hook
    const lines = generatedContent.split("\n\n");
    if (lines.length > 0) {
      lines[0] = newHook;
      updateActiveDraftContent(lines.join("\n\n"));
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="glow-blob w-[400px] h-[400px] bg-[#0A66C2]/5 top-[-100px] right-[-50px]" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Workspace Generator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
            Convert rough daily experiences into clean professional LinkedIn posts.
          </p>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration inputs (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            {/* Step 1: Mode Select */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                1. Select Category Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {standardCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`
                      py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all duration-150
                      ${!isCustomCategory && selectedCategory === cat
                        ? "bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold animate-pulse"
                        : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:border-[#0A66C2]/45 hover:text-slate-900 dark:hover:text-slate-200 hover-lift"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
                <button
                  onClick={handleSelectCustomCategory}
                  className={`
                    py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all duration-150
                    ${isCustomCategory
                      ? "bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold animate-pulse"
                      : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:border-[#0A66C2]/45 hover:text-slate-900 dark:hover:text-slate-200 hover-lift"
                    }
                  `}
                >
                  + Custom
                </button>
              </div>

              {/* Custom Category Input Box */}
              {isCustomCategory && (
                <div className="space-y-2 mt-2 duration-300 transition-all ease-in-out origin-top transform scale-y-100">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    Define Custom Category
                  </label>
                  <input
                    type="text"
                    value={customCategoryInput}
                    onChange={(e) => handleCustomCategoryInputChange(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 text-xs outline-none focus:border-[#0A66C2]/50 smooth-transition text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    placeholder="e.g. Developer Advocacy, Product Management, Deep Tech..."
                  />
                </div>
              )}
            </div>

            {/* Step 2: Tone Archetype */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                2. Select Voice Archetype
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {standardTones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleSelectTone(tone)}
                    className={`
                      py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all duration-150
                      ${!isCustomTone && selectedTone === tone
                        ? "bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold animate-pulse"
                        : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:border-[#0A66C2]/45 hover:text-slate-900 dark:hover:text-slate-200 hover-lift"
                      }
                    `}
                  >
                    {tone}
                  </button>
                ))}
                <button
                  onClick={handleSelectCustomTone}
                  className={`
                    py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all duration-150
                    ${isCustomTone
                      ? "bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold animate-pulse"
                      : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:border-[#0A66C2]/45 hover:text-slate-900 dark:hover:text-slate-200 hover-lift"
                    }
                  `}
                >
                  + Custom
                </button>
              </div>

              {/* Custom Tone Input Box */}
              {isCustomTone && (
                <div className="space-y-2 mt-2 duration-300 transition-all ease-in-out origin-top transform scale-y-100">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    Define Custom Voice Archetype
                  </label>
                  <input
                    type="text"
                    value={customToneInput}
                    onChange={(e) => handleCustomToneInputChange(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 text-xs outline-none focus:border-[#0A66C2]/50 smooth-transition text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    placeholder="e.g. Sarcastic & Witty, Inspiring Storyteller, Technical Rant..."
                  />
                </div>
              )}
            </div>

            {/* Step 3: Dynamic Integration Fields */}
            {selectedCategory === "Technical" && (
              <div className="space-y-2 animate-fade-in-up">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-slate-500" />
                  GitHub Repository URL (Optional)
                </label>
                <input
                  type="text"
                  value={gitRepoUrl}
                  onChange={(e) => setGitRepoUrl(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 text-xs outline-none focus:border-[#0A66C2]/50 smooth-transition text-slate-900 dark:text-slate-100 placeholder-slate-400"
                  placeholder="e.g. https://github.com/facebook/react"
                />
              </div>
            )}

            {selectedCategory === "Research" && (
              <div className="space-y-2 animate-fade-in-up">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Research Paper Summary (Optional)
                </label>
                <textarea
                  value={researchPaperSummary}
                  onChange={(e) => setResearchSummary(e.target.value)}
                  className="w-full h-24 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 text-xs outline-none focus:border-[#0A66C2]/50 smooth-transition resize-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
                  placeholder="Paste details of the research paper abstract, mathematical parameters, or summary tags..."
                />
              </div>
            )}

            {/* Step 4: Primary rough ideas text box */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                3. Describe Your Experience
              </label>
              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                className="w-full h-44 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 outline-none focus:border-[#0A66C2]/40 text-sm leading-relaxed text-slate-800 dark:text-slate-350 smooth-transition placeholder-slate-400"
                placeholder="Type your raw daily lessons here. Paste commit messages, dashboard screenshots annotations, architectural notes, or thoughts..."
              />
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || (!rawInput.trim() && !gitRepoUrl && !researchPaperSummary)}
              className="w-full py-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-extrabold text-sm shadow-md hover:shadow-blue-500/10 hover:scale-[1.01] active:scale-95 smooth-transition disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Humanizing Content Drafts...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 animate-bounce" />
                  Forge Authenticity
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live View & Editor Output (5 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main workspace result container */}
          {generatedContent ? (
            <div className="space-y-6 animate-fade-in-up">
              {/* Output Preview Panel */}
              <div className="glass-card rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/10 pb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#0A66C2] animate-pulse" />
                    Interactive LinkedIn Draft
                  </span>
                  
                  {/* Copy & Save Tools */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyToClipboard}
                      className="p-2 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-400 hover:text-[#0A66C2] dark:hover:text-blue-450 border border-slate-200 dark:border-slate-800 smooth-transition shadow-sm"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4 text-blue-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => setShowSaveDialog(true)}
                      className="p-2 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-400 hover:text-[#0A66C2] dark:hover:text-blue-450 border border-slate-200 dark:border-slate-800 smooth-transition shadow-sm"
                      title="Save as Draft"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Simulated Post Editor Frame */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                    {brandProfile.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-slate-200">
                      {brandProfile.name} <span className="text-[10px] text-slate-500 font-normal">• 1st</span>
                    </span>
                    <span className="block text-[9px] text-slate-550 dark:text-slate-400">{brandProfile.role}</span>
                  </div>
                </div>

                {/* Rich text live editor textarea */}
                <textarea
                  value={generatedContent}
                  onChange={(e) => updateActiveDraftContent(e.target.value)}
                  className="w-full h-64 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/5 focus:border-[#0A66C2]/30 outline-none text-xs leading-relaxed text-slate-800 dark:text-slate-350 font-sans resize-none smooth-transition"
                />
              </div>

              {/* Hook Customizer Panel */}
              {alternateHooks && alternateHooks.length > 0 && (
                <div className="glass-card rounded-2xl p-5 space-y-3.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    Alternate Hooks Generator
                  </label>
                  <div className="space-y-2">
                    {alternateHooks.slice(0, 3).map((hook, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500/25 smooth-transition text-xs text-slate-600 dark:text-slate-300"
                      >
                        <p className="flex-1 leading-relaxed">"{hook}"</p>
                        <button
                          onClick={() => handleSwapHook(hook)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/15 smooth-transition uppercase tracking-wider shrink-0"
                        >
                          Swap Hook
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Carousel Outlines Viewport */}
              {carouselOutline && carouselOutline.length > 0 && (
                <div className="glass-card rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                      Carousel PDF Blueprint Assistant
                    </label>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                      {carouselOutline.length} Slides
                    </span>
                  </div>

                  {/* Carousel outlines slide selectors */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 border-b border-slate-200/10">
                    {carouselOutline.map((slide, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCarouselSlide(idx)}
                        className={`
                          py-1 px-3 rounded-t-lg text-[10px] font-bold uppercase transition shrink-0
                          ${activeCarouselSlide === idx 
                            ? "bg-slate-105 dark:bg-slate-900 border border-b-0 border-slate-205 dark:border-slate-800 text-[#0A66C2] dark:text-blue-400" 
                            : "text-slate-550 hover:text-slate-900 dark:hover:text-slate-200"
                          }
                        `}
                      >
                        Slide {slide.slideNumber}
                      </button>
                    ))}
                  </div>

                  {/* Current active slide container */}
                  {carouselOutline[activeCarouselSlide] && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-505">Header Title</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{carouselOutline[activeCarouselSlide].title}</h4>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-555">Content / Points</span>
                        <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed mt-0.5 whitespace-pre-wrap">{carouselOutline[activeCarouselSlide].content}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200/10 flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span>Visual direction: <span className="italic text-slate-605 dark:text-slate-400">{carouselOutline[activeCarouselSlide].visualDirection}</span></span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Engagement Predictions */}
              {analytics && (
                <div className="glass-card rounded-2xl p-5 space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    Forge Copy Analytics
                  </label>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-200/5">
                      <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Readability</span>
                      <span className="block text-xl font-black text-[#0A66C2] dark:text-blue-400 mt-1">{analytics.readabilityScore}%</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-200/5">
                      <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Hook Grade</span>
                      <span className="block text-xl font-black text-sky-650 dark:text-sky-400 mt-1">{analytics.hookStrength}%</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-200/5">
                      <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Engagement</span>
                      <span className="block text-sm font-bold text-slate-805 dark:text-slate-200 mt-2.5">{analytics.predictedEngagement}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-slate-200/10 pt-3.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Copy Improvement Tips:</span>
                    {analytics.feedbackSuggestions.map((tip, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        {tip}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty state */
            <div className="h-[400px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-200">No Post Generated Yet</h3>
                <p className="text-xs text-slate-550 dark:text-slate-500 max-w-xs mt-1">
                  Fill in your developer thoughts on the left and click "Forge Authenticity" to generate your first technical thought leadership post.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Draft Dialog Overlay Modal */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-500" />
              Save Post to Draft Library
            </h3>
            
            {saveSuccess ? (
              <div className="py-4 text-center text-[#0A66C2] dark:text-blue-400 text-sm font-bold flex flex-col items-center gap-2">
                <Check className="w-8 h-8 rounded-full bg-blue-500/15 p-1.5 animate-bounce" />
                Draft saved successfully!
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Draft Title
                  </label>
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 outline-none text-xs focus:border-[#0A66C2]/50 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    placeholder={`e.g. Scaling ${selectedCategory} Architecture`}
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="py-2 px-4 rounded-xl text-xs font-semibold bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-205 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 smooth-transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    className="py-2 px-5 rounded-xl text-xs font-extrabold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-md smooth-transition"
                  >
                    Save Draft
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
