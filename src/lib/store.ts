import { create } from "zustand";

export interface BrandProfile {
  name: string;
  role: string;
  expertise: string[];
  tone: string;
  styleNotes: string;
  achievements: string[];
  examples: string[];
}

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  content: string;
  visualDirection: string;
}

export interface PostAnalytics {
  readabilityScore: number; // 0-100
  hookStrength: number; // 0-100
  ctaEffectiveness: number; // 0-100
  predictedEngagement: "Low" | "Medium" | "High" | "Viral";
  feedbackSuggestions: string[];
}

export interface Draft {
  id: string;
  title: string;
  content: string;
  rawInput: string;
  category: "Technical" | "Startup" | "Career" | "Launch" | "Research" | "Community";
  tone: "Founder" | "Engineering" | "Thought Leader" | "Concise" | "Storyteller";
  createdAt: string;
  analytics?: PostAnalytics;
  carouselOutline?: CarouselSlide[];
  alternateHooks?: string[];
}

interface GeneratorState {
  // Brand Profile
  brandProfile: BrandProfile;
  updateBrandProfile: (profile: Partial<BrandProfile>) => void;

  // Active workspace state
  rawInput: string;
  selectedCategory: Draft["category"];
  selectedTone: Draft["tone"];
  gitRepoUrl: string;
  researchPaperSummary: string;
  isGenerating: boolean;
  
  // Generation Outputs
  generatedContent: string;
  carouselOutline: CarouselSlide[];
  alternateHooks: string[];
  analytics: PostAnalytics | null;

  // Drafts Library
  drafts: Draft[];
  activeDraftId: string | null;
  
  // Workspace Actions
  setRawInput: (input: string) => void;
  setCategory: (category: Draft["category"]) => void;
  setTone: (tone: Draft["tone"]) => void;
  setGitRepoUrl: (url: string) => void;
  setResearchSummary: (summary: string) => void;
  setGenerating: (isGenerating: boolean) => void;
  setGenerationResults: (
    content: string, 
    analytics: PostAnalytics, 
    hooks: string[], 
    carousel?: CarouselSlide[]
  ) => void;

  // Draft Library Actions
  saveCurrentDraft: (title: string) => void;
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  createNewDraft: () => void;
  updateActiveDraftContent: (content: string) => void;
}

const defaultBrandProfile: BrandProfile = {
  name: "Alex Dev",
  role: "Lead Software Architect & Tech Founder",
  expertise: ["Distributed Systems", "Next.js", "React Native", "AI Engineering", "SaaS Scaling"],
  tone: "Engineering",
  styleNotes: "Prefer metrics, technical trade-offs, clear spacing, and direct conclusions. Avoid generic marketing hype and exclamation marks.",
  achievements: [
    "Scaled a SaaS platform to 50k active users",
    "Open-sourced a micro-frontend state management library with 2k GitHub stars",
    "Optimized API query latency by 45% using edge caching mechanisms"
  ],
  examples: []
};

const initialDrafts: Draft[] = [
  {
    id: "draft-1",
    title: "Why Edge Computing is Overhyped for Small Startups",
    rawInput: "edge computing is great but small startups don't need it. it adds complexity. stay on simple node server on render first.",
    content: `A hard truth about scaling early-stage architectures:

You probably don’t need Edge Computing. Yet.

I see many early-stage founders spending weeks overcomplicating their infra. They deploy everything to Edge functions, configure global database replication, and try to manage state syncing across 20 edge regions.

The result?
→ Infinite cold-start debugging.
→ Massive latency from database lookups (because the DB isn’t edge-ready).
→ High cloud bills.

For 95% of pre-seed startups:
A single monolith on Render or a simple VPS will scale to your first 10,000 users.

Keep your stack simple, ship your features, and optimize infrastructure only when latency actually starts blocking conversion rates.

Do you agree, or are you running edge-first from day one?`,
    category: "Technical",
    tone: "Engineering",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    analytics: {
      readabilityScore: 88,
      hookStrength: 85,
      ctaEffectiveness: 90,
      predictedEngagement: "High",
      feedbackSuggestions: [
        "Strong call-to-action that encourages community responses.",
        "Simple, crisp formatting makes reading effortless on mobile devices."
      ]
    },
    alternateHooks: [
      "Stop overcomplicating your early-stage SaaS architecture.",
      "The massive mistake founders make when choosing cloud setups.",
      "Edge computing might be killing your product's speed to market."
    ],
    carouselOutline: [
      {
        slideNumber: 1,
        title: "The Edge Computing Trap",
        content: "Why early-stage startups are wasting weeks on complex edge setups that hurt performance.",
        visualDirection: "Minimal dark background, striking red border, big bold headline."
      },
      {
        slideNumber: 2,
        title: "The Cold-Start Reality",
        content: "Without a global replicated DB, edge instances still query a single region. Latency actually increases.",
        visualDirection: "Side-by-side comparison diagram showing Edge-to-DB database trips."
      },
      {
        slideNumber: 3,
        title: "The Pre-Seed Standard",
        content: "Use a simple monolith. Focus on product-market fit, not edge replication.",
        visualDirection: "Simple checkmark list layout on emerald accent frame."
      }
    ]
  }
];

export const useStore = create<GeneratorState>((set, get) => ({
  brandProfile: defaultBrandProfile,
  updateBrandProfile: (profile) => 
    set((state) => ({ brandProfile: { ...state.brandProfile, ...profile } })),

  rawInput: "",
  selectedCategory: "Technical",
  selectedTone: "Engineering",
  gitRepoUrl: "",
  researchPaperSummary: "",
  isGenerating: false,

  generatedContent: "",
  carouselOutline: [],
  alternateHooks: [],
  analytics: null,

  drafts: initialDrafts,
  activeDraftId: null,

  setRawInput: (input) => set({ rawInput: input }),
  setCategory: (category) => set({ selectedCategory: category }),
  setTone: (tone) => set({ selectedTone: tone }),
  setGitRepoUrl: (url) => set({ gitRepoUrl: url }),
  setResearchSummary: (summary) => set({ researchPaperSummary: summary }),
  setGenerating: (isGenerating) => set({ isGenerating }),
  setGenerationResults: (content, analytics, hooks, carousel = []) => 
    set({ 
      generatedContent: content, 
      analytics, 
      alternateHooks: hooks, 
      carouselOutline: carousel 
    }),

  saveCurrentDraft: (title) => {
    const { 
      activeDraftId, 
      generatedContent, 
      rawInput, 
      selectedCategory, 
      selectedTone, 
      analytics, 
      alternateHooks, 
      carouselOutline, 
      drafts 
    } = get();

    if (!generatedContent) return;

    if (activeDraftId) {
      // Edit existing draft
      set({
        drafts: drafts.map((d) => 
          d.id === activeDraftId 
            ? { 
                ...d, 
                title, 
                content: generatedContent, 
                rawInput, 
                category: selectedCategory, 
                tone: selectedTone,
                analytics: analytics || undefined,
                alternateHooks,
                carouselOutline
              } 
            : d
        )
      });
    } else {
      // Create new draft
      const newId = `draft-${Date.now()}`;
      const newDraft: Draft = {
        id: newId,
        title: title || `Draft ${drafts.length + 1}`,
        content: generatedContent,
        rawInput,
        category: selectedCategory,
        tone: selectedTone,
        createdAt: new Date().toISOString(),
        analytics: analytics || undefined,
        alternateHooks,
        carouselOutline
      };
      set({
        drafts: [newDraft, ...drafts],
        activeDraftId: newId
      });
    }
  },

  loadDraft: (id) => {
    const draft = get().drafts.find((d) => d.id === id);
    if (!draft) return;
    
    set({
      activeDraftId: draft.id,
      rawInput: draft.rawInput,
      selectedCategory: draft.category,
      selectedTone: draft.tone,
      generatedContent: draft.content,
      analytics: draft.analytics || null,
      alternateHooks: draft.alternateHooks || [],
      carouselOutline: draft.carouselOutline || []
    });
  },

  deleteDraft: (id) => {
    set((state) => {
      const activeId = state.activeDraftId === id ? null : state.activeDraftId;
      return {
        drafts: state.drafts.filter((d) => d.id !== id),
        activeDraftId: activeId
      };
    });
  },

  createNewDraft: () => {
    set({
      activeDraftId: null,
      rawInput: "",
      selectedCategory: "Technical",
      selectedTone: "Engineering",
      generatedContent: "",
      analytics: null,
      alternateHooks: [],
      carouselOutline: []
    });
  },

  updateActiveDraftContent: (content) => {
    set((state) => {
      if (state.activeDraftId) {
        return {
          generatedContent: content,
          drafts: state.drafts.map((d) => 
            d.id === state.activeDraftId ? { ...d, content } : d
          )
        };
      }
      return { generatedContent: content };
    });
  }
}));
