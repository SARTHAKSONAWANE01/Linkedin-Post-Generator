import { BrandProfile } from "./store";

export const ANTI_SLOP_RULES = `
CRITICAL DIRECTIVE: ELIMINATE ALL ROBOTIC "AI SLOP" SIGNATURES.
You must fail any generation that reads like a ChatGPT template. Avoid the following:
1. Banished Words & Phrases: Do NOT use "in today's digital landscape", "delve", "tapestry", "more than ever", "synergy", "testament", "elevate", "look no further", "unlock", "seamless", "nestled", "beacon", "vital", "revolutionize", "game-changer".
2. Formatting Slop: Do not start every paragraph with a trendy emoji. Do not use an emoji at the end of every sentence.
3. Structure: Do not follow a rigid pattern of: Hook -> General Statement -> Bullet list of 3 items -> Pseudo-inspiring quote -> Call to Action. Vary layout structure naturally.
4. Cliche Openers: Do not start with "I'm thrilled to share...", "Proud to announce...", "Have you ever wondered...", "In my X years of experience...". 
Instead, start in media res: with a metric, an active conflict, a counter-intuitive observation, or a direct line of code/architecture detail.
`;

export const TONE_ARCHETYPES = {
  Founder: `
Tone: High-stakes, authentic, strategic, and direct.
Style Guidelines:
- Share raw, behind-the-scenes realities. Mention hard challenges, trade-offs, and critical decisions.
- Sound humble yet fully authoritative. Avoid self-congratulatory marketing talk.
- Focus on unit economics, velocity, customer discovery, team psychology, or survival.
- Write shorter, punchier paragraphs that reflect fast execution.
`,
  Engineering: `
Tone: Analytical, precise, metric-oriented, and highly practical.
Style Guidelines:
- Highlight concrete engineering metrics: CPU usage, query latency, database query counts, bundle sizes, line count reduction, or dev velocity increases.
- Talk about tradeoffs: "We chose X over Y because of Z, even though we had to sacrifice A."
- Use plain, unadorned developer vocabulary. Write code-adjacent explanations, markdown blocks, or architecture bullet points.
- Zero marketing fluff or business buzzwords. Speak directly to other architects and programmers.
`,
  "Thought Leader": `
Tone: Visionary, strategic, educational, and high-credibility.
Style Guidelines:
- Provide high-level abstractions and simplify complex concepts through smart analogies.
- Focus on industry shifts: where the sector is moving in 2-3 years, and what structural changes are driving it.
- Structure content logically like a brief editorial column or research brief.
- Provide highly actionable, structured takeaways.
`,
  Concise: `
Tone: Punchy, minimal, high-impact, and speed-optimized.
Style Guidelines:
- Say the maximum amount in the absolute minimum number of words.
- Maximize whitespace. Single-sentence lines, bullet charts, and summary checklists are preferred.
- Strip all adjectives and passive voice. Focus strictly on verbs and nouns.
`,
  Storyteller: `
Tone: Immersive, high-empathy, narrative-driven, and personal.
Style Guidelines:
- Start directly in the middle of a conflict (e.g., "At 3:00 AM, our main database locked up...").
- Keep readers hooked through emotional arc: Conflict -> Complication -> Resolution -> Reflection.
- Use sensory, human details. Make the post feel like a short, engaging memoir snippet.
`
};

export const FORMATTING_RULES = `
FORMATTING & POST-PROCESSING:
- Keep posts to 150 - 300 words.
- Avoid big, unbroken walls of text. Use double returns between points to create breathability.
- Avoid using bold/italic unicode characters (like 𝘁𝗵𝗶𝘀) as they are illegible for accessibility screen readers. Use standard text and capital headers if emphasis is needed.
- Use lists selectively. Never let lists feel like a filler directory.
- End with a simple, intriguing question or conversational thought rather than a salesy call-to-action.
`;

export function assembleGenerationPrompt(params: {
  rawInput: string;
  brandProfile: BrandProfile;
  tone: string;
  category: string;
  gitRepoUrl?: string;
  researchPaperSummary?: string;
}) {
  const { rawInput, brandProfile, tone, category, gitRepoUrl, researchPaperSummary } = params;

  const toneConstraint = TONE_ARCHETYPES[tone as keyof typeof TONE_ARCHETYPES] || `
Tone: ${tone}
Style Guidelines:
- Adopt the personality, pacing, and vocabulary associated with the user's custom style direction: "${tone}".
- Inject authentic, professional vocabulary tailored to this voice.
- Avoid generic corporate tropes and overly artificial enthusiasm.
`;

  return `
You are the professional writing co-pilot for ${brandProfile.name}, a ${brandProfile.role}.
Your task is to transform their raw input/learnings into an incredibly compelling, high-engagement, authentic LinkedIn post.

---
USER PROFILE MEMORY (Use these parameters for context, style matching, and expertise reference):
- Core Expertise Areas: ${brandProfile.expertise.join(", ")}
- General Style & Terminology Notes: ${brandProfile.styleNotes}
- Key Achievements (Inject these naturally ONLY if highly relevant):
${brandProfile.achievements.map((a) => `  * ${a}`).join("\n")}
---

CONTEXT INPUT:
- Primary Category: ${category}
- Raw User Notes / Thoughts:
"""
${rawInput}
"""
${gitRepoUrl ? `- Source GitHub Repository Reference: ${gitRepoUrl}\n` : ""}
${researchPaperSummary ? `- Source Research Details / PDF notes:\n"""\n${researchPaperSummary}\n"""\n` : ""}

---
STYLE & TONE CONSTRAINTS:
${toneConstraint}

---
ANTI-AI TONE LAWS:
${ANTI_SLOP_RULES}

---
FORMATTING SPECIFICATIONS:
${FORMATTING_RULES}

Please output the generated content. Return a JSON structure matching the following shape, ensuring it is valid JSON with no markdown wrapping in the raw response:
{
  "postContent": "The main LinkedIn post text...",
  "alternateHooks": [
    "Alternative hook 1...",
    "Alternative hook 2...",
    "Alternative hook 3..."
  ],
  "carouselOutline": [
    {
      "slideNumber": 1,
      "title": "Slide 1 Title",
      "content": "Slide 1 body bullet points...",
      "visualDirection": "Visual instruction (e.g. Clean dark frame, center text)"
    }
  ],
  "readabilityScore": 85,
  "hookStrength": 90,
  "ctaEffectiveness": 80,
  "predictedEngagement": "High",
  "feedbackSuggestions": [
    "Analysis tip 1...",
    "Analysis tip 2..."
  ]
}
`;
}
