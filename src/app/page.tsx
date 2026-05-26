"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Flame, 
  ArrowRight, 
  Terminal, 
  UserCheck, 
  Github, 
  FileText, 
  LineChart, 
  Zap, 
  Layers, 
  Heart,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function LandingPage() {
  const [demoInput, setDemoInput] = useState("just optimized query scaling on postgres. added local caching. latency dropped from 800ms to 90ms under 5k concurrent queries.");
  const [demoTone, setDemoTone] = useState<"Engineering" | "Founder" | "Concise">("Engineering");
  const [isTransforming, setIsTransforming] = useState(false);
  const [demoOutput, setDemoOutput] = useState(`We spent the last 4 days refactoring our database caching. 

The exact metrics:
Our API queries were taking 800ms under load due to redundant PostgreSQL lookups.

By introducing local Redis caching and batching relation statements, average query latency dropped to 90ms.

Don't buy a larger DB instance until you do a relations query audit first. Custom queries solve 90% of scaling speed issues.

Are you query-auditing weekly, or only when things crawl?`);

  const handleDemoTransform = (tone: typeof demoTone) => {
    setIsTransforming(true);
    setDemoTone(tone);
    
    setTimeout(() => {
      setIsTransforming(false);
      if (tone === "Engineering") {
        setDemoOutput(`We spent the last 4 days refactoring our database caching. 

The exact metrics:
Our API queries were taking 800ms under load due to redundant PostgreSQL lookups.

By introducing local Redis caching and batching relation statements, average query latency dropped to 90ms.

Don't buy a larger DB instance until you do a relations query audit first. Custom queries solve 90% of scaling speed issues.

Are you query-auditing weekly, or only when things crawl?`);
      } else if (tone === "Founder") {
        setDemoOutput(`Yesterday, our database caching went live.

We had to make a tough founder call: keep polishing custom analytical hook algorithms, or launch immediately with the raw text generator.

I chose speed. If you are not slightly embarrassed by your first product release, you launched too late.

Within 4 hours:
→ 120 developers signed up.
→ 2 users identified a crucial caching leak.
→ We got feedback that saved us 2 weeks of redundant building.

Build in public, launch early, and iterate with real data.`);
      } else {
        setDemoOutput(`Stop overcomplicating cache servers.

We slashed query latency from 800ms to 90ms under 5k concurrent queries.

How?
1. Batch SQL relations.
2. Store hot reads locally in Redis.

Total lines changed: 42.
Total dollars saved: $380/mo.

Focus on queries before upgrading database nodes.`);
      }
    }, 700);
  };

  const problemComparison = {
    slop: {
      title: "Generic AI 'Slop'",
      badge: "Robotic & Ignored",
      bg: "border-red-500/30 bg-red-950/5",
      content: `🚀 I am absolutely THRILLED and humbled to announce that we are elevating the paradigm of query optimization! 🌟 

In today's fast-paced digital landscape, databases are the vital lifeblood of synergy. We delved deep into the tapestry of Postgres to seamlessly unlock next-generation performance. 

Behold the testament of our digital transformation:
• Empowering scalability ✨
• Elevating API queries globally 🌍
• Fostering developer-first ecosystems 💡

Huge congrats to our game-changing wizards! Join our journey as we revolutionize the future of databases. Let's make an impact! 📈💻`,
    },
    forge: {
      title: "Forge Authentic Engine",
      badge: "Thought Leader Grade",
      bg: "border-emerald-500/30 bg-emerald-950/5",
      content: `We spent the last 4 days refactoring our database caching. 

The exact metrics:
Our API queries were taking 800ms under load due to redundant PostgreSQL lookups.

By introducing local Redis caching and batching relation statements, average query latency dropped to 90ms.

Don't buy a larger DB instance until you do a relations query audit first. Custom queries solve 90% of scaling speed issues.

Are you query-auditing weekly, or only when things crawl?`,
    }
  };

  return (
    <div className="space-y-32 py-10 overflow-hidden relative">
      {/* Background glow animations */}
      <div className="glow-blob w-[500px] h-[500px] bg-emerald-500/10 top-[-100px] right-[-100px]" />
      <div className="glow-blob w-[600px] h-[600px] bg-teal-500/5 bottom-[200px] left-[-200px]" />

      {/* --- HERO SECTION --- */}
      <section className="relative text-center max-w-4xl mx-auto space-y-8 pt-10 md:pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:border-emerald-500/40 transition">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Forge 1.0 Release Beta is Live</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] md:leading-none">
          Turn Your Real Experiences Into <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Authentic LinkedIn Content
          </span>
        </h1>

        <p className="text-base md:text-xl text-slate-400 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Zero AI slop. Zero corporate cringe. We help engineers, founders, and researchers transform rough notes, code commits, and project specs into human-sounding thought leadership.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/generator" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-base shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
          >
            Start Crafting Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="#demo" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-300 font-semibold text-base border border-slate-200/10 hover:border-slate-500/30 transition flex items-center justify-center gap-2"
          >
            See Live Demo
          </a>
        </div>
      </section>

      {/* --- HERO INTERACTIVE MOCKUP DEMO --- */}
      <section id="demo" className="max-w-5xl mx-auto scroll-mt-24">
        <div className="glass-card rounded-3xl border border-slate-200/10 dark:border-slate-800/80 p-5 md:p-8 relative">
          <div className="absolute -top-3 left-10 px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-white">
            Interactive Playground
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* Left side: Inputs */}
            <div className="space-y-6">
              <div>
                <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">
                  1. Input Your Raw Activity
                </span>
                <textarea
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  className="w-full h-36 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 focus:border-emerald-500/50 outline-none text-sm leading-relaxed text-slate-800 dark:text-slate-300 smooth-transition resize-none"
                  placeholder="Paste rough bullet points, git commits, or launch features here..."
                />
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                  2. Choose Writing Archetype
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {(["Engineering", "Founder", "Concise"] as const).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => handleDemoTransform(tone)}
                      className={`
                        py-3 px-2 rounded-xl text-xs font-bold border transition-all duration-200
                        ${demoTone === tone
                          ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-sm"
                          : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-500/40 hover:text-slate-200"
                        }
                      `}
                    >
                      {tone} Mode
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Interactive LinkedIn Frame */}
            <div className="flex flex-col">
              <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">
                3. Generated Output Preview
              </span>
              
              {/* LinkedIn Post Mock Render */}
              <div className="flex-1 rounded-2xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 p-5 shadow-inner flex flex-col justify-between">
                {/* LinkedIn header */}
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/40">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-400 border border-emerald-500/20">
                    PF
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      Alex Dev <span className="text-[10px] text-slate-400">• 1st</span>
                    </span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                      Lead Software Architect & Founder
                    </span>
                    <span className="block text-[8px] text-slate-400">Just now • Edited</span>
                  </div>
                </div>

                {/* Content body */}
                <div className="py-4 flex-1">
                  {isTransforming ? (
                    <div className="space-y-3 py-2 animate-pulse">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-800 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                      {demoOutput}
                    </p>
                  )}
                </div>

                {/* LinkedIn Actions panel */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/40 pt-3 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  <button className="hover:text-emerald-400 smooth-transition">👍 Like</button>
                  <button className="hover:text-emerald-400 smooth-transition">💬 Comment</button>
                  <button className="hover:text-emerald-400 smooth-transition">🔁 Repost</button>
                  <button className="hover:text-emerald-400 smooth-transition">📤 Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE COMPARISON SHOWDOWN --- */}
      <section className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black">
            The Battle Against "AI Slop"
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Why current marketing templates are failing your professional branding, and how we write content that build true technical authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ChatGPT Slop */}
          <div className={`p-6 md:p-8 rounded-3xl border ${problemComparison.slop.bg} space-y-5 relative`}>
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-950 border border-red-500/30 text-red-400 text-[10px] font-bold rounded-full uppercase flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3" />
              {problemComparison.slop.badge}
            </div>
            <h3 className="text-xl font-bold text-red-400">{problemComparison.slop.title}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-mono whitespace-pre-wrap bg-slate-950/20 p-4 rounded-xl border border-slate-200/5">
              {problemComparison.slop.content}
            </p>
          </div>

          {/* PostForge Output */}
          <div className={`p-6 md:p-8 rounded-3xl border ${problemComparison.forge.bg} space-y-5 relative`}>
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 animate-bounce" />
              {problemComparison.forge.badge}
            </div>
            <h3 className="text-xl font-bold text-emerald-400">{problemComparison.forge.title}</h3>
            <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-wrap bg-slate-950/40 p-4 rounded-xl border border-emerald-500/10">
              {problemComparison.forge.content}
            </p>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            Core Utilities
          </span>
          <h2 className="text-3xl md:text-5xl font-black">
            Crafted Specifically for Deep Thinkers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Personal Brand Memory",
              desc: "Store your expert sectors, achievements, vocabulary limits, and style guidelines. The AI adapts entirely to your unique developer or founder background.",
              icon: UserCheck,
            },
            {
              title: "GitHub repo sync converter",
              desc: "Paste a GitHub commit hash or repository directory URL. Transform complex pull-requests or changelogs into engaging product launches.",
              icon: Github,
            },
            {
              title: "Research-to-Content parser",
              desc: "Provide academic abstracts, research briefs, or system notes. Simplify deep computational theorems into highly digestible visual carousels.",
              icon: FileText,
            },
            {
              title: "Hook Variation dashboard",
              desc: "Instantly create 5 custom alternate post openers (curiosity, stats-driven, conversational, high-conflict) to find your perfect hook.",
              icon: Zap,
            },
            {
              title: "Dynamic visual slide outline",
              desc: "Generate complete slide-by-slide templates for PDF carousels. Includes copy outlines, header triggers, and specific slide styling tips.",
              icon: Layers,
            },
            {
              title: "Content strength analytics",
              desc: "Predict engagement, inspect readability grades, gauge hooks efficiency, and view actual feedback to optimize readability levels.",
              icon: LineChart,
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="glass-card hover:border-emerald-500/20 rounded-2xl p-6 border border-slate-200/5 hover:scale-[1.02] smooth-transition space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- WORKFLOW VISUALIZATION --- */}
      <section className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black">How Forge Works</h2>
          <p className="text-slate-400 text-sm md:text-base">Three steps to elevate your LinkedIn presence from standard templates to thought leadership.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            {
              step: "01",
              title: "Brain Dump",
              desc: "Paste rough ideas, bullet summaries, GitHub release notes, or raw experiences into the generator.",
              color: "border-slate-800"
            },
            {
              step: "02",
              title: "Humanizer Processing",
              desc: "Our engine maps your tone settings, filters out AI cliches, and generates natural reading rhythms.",
              color: "border-slate-800"
            },
            {
              step: "03",
              title: "Refined Authority",
              desc: "Review your readability analytics, choose from 3 alternate hooks, export drafts, and dominate your niche.",
              color: "border-emerald-500/40 bg-emerald-950/5"
            }
          ].map((item, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border ${item.color} space-y-4 relative`}>
              <div className="text-4xl font-extrabold text-emerald-500/20">{item.step}</div>
              <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black">Trusted by Technical Minds</h2>
          <p className="text-slate-400 text-sm md:text-base">Here is what developers, founders, and consultants are saying about our authentic engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Forge completely solved my writing block. I paste my raw markdown notes, and it writes posts that sound exactly like an expert architect. Zero buzzwords.",
              author: "Sarah Jenkins",
              role: "Principal Infrastructure Architect",
              avatar: "SJ"
            },
            {
              quote: "As a bootstrap founder, building in public takes time. This tool converts my raw GitHub updates and logs into clean storytelling posts in 30 seconds.",
              author: "Daniel K.",
              role: "Founder, SyncDev Systems",
              avatar: "DK"
            },
            {
              quote: "Finally, an AI that doesn't say 'elevate' or 'delve'. The readability scoring is amazingly accurate. Our team's organic impressions rose by 240%.",
              author: "Marcus Vance",
              role: "Data Science Consultant",
              avatar: "MV"
            }
          ].map((test, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-200/5 space-y-4 flex flex-col justify-between">
              <p className="text-xs italic text-slate-300 leading-relaxed">"{test.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">
                  {test.avatar}
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-200">{test.author}</span>
                  <span className="block text-[9px] text-slate-500">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black">Simple, Premium Pricing</h2>
          <p className="text-slate-400 text-sm md:text-base">No credit card required. Upgrade when you need massive volume.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl border border-slate-200/5 bg-slate-900/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hobby</span>
              <h3 className="text-2xl font-bold">Developer Free</h3>
              <p className="text-slate-400 text-xs">For side-projects, indie developers, and student leaders.</p>
              <div className="text-3xl font-extrabold pt-2">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-200/5 pt-4">
              <li className="flex items-center gap-2">✔ 15 LinkedIn Generations / mo</li>
              <li className="flex items-center gap-2">✔ 1 Active Brand Profile Memory</li>
              <li className="flex items-center gap-2">✔ 3 Custom Tone Settings</li>
              <li className="flex items-center gap-2">✔ Local Draft library archive</li>
            </ul>

            <Link 
              href="/generator" 
              className="block w-full py-3 text-center rounded-xl bg-white/5 border border-slate-200/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/5 space-y-6 relative flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full">
              Popular
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Professional</span>
              <h3 className="text-2xl font-bold">Forge Pro</h3>
              <p className="text-slate-400 text-xs">For founders, research heads, and full-time technical creators.</p>
              <div className="text-3xl font-extrabold pt-2">$29 <span className="text-sm font-normal text-slate-500">/ month</span></div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 border-t border-emerald-500/15 pt-4">
              <li className="flex items-center gap-2">✔ Unlimited Custom Post Generations</li>
              <li className="flex items-center gap-2">✔ Infinite Custom Brand Profiles</li>
              <li className="flex items-center gap-2">✔ Full GitHub Repository Import</li>
              <li className="flex items-center gap-2">✔ Full Research Paper Summarizer</li>
              <li className="flex items-center gap-2">✔ Hook Variation & Carousel Blueprints</li>
            </ul>

            <Link 
              href="/generator" 
              className="block w-full py-3 text-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-3xl font-black text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            {
              q: "How does the engine eliminate standard AI slop?",
              a: "We implement advanced anti-slop system filters and modular role configurations. This strictly forbids terms like 'delve', 'tapestry', and 'revolutionary', forces direct active verbs, structures layouts organically, and focuses strictly on metrics and trade-offs."
            },
            {
              q: "Can I use it without database and Clerk key setups?",
              a: "Absolutely! We built Forge with a premium Client-Side Mock Fallback. The workspace, dashboard, draft saving, alternate hook engines, and carousel blueprints are 100% operational right out of the box."
            },
            {
              q: "How does the Brand Profile Memory function?",
              a: "You save your background parameters (achievements, code constraints, vocabulary bounds, favorite topics). During generation, we build structural prompts combining your notes with your saved memory context, ensuring your final post sound exactly like you."
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/10 border border-slate-200/5 space-y-2">
              <h3 className="font-bold text-slate-200 text-sm md:text-base">{faq.q}</h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORPORATE FOOTER --- */}
      <footer className="pt-16 pb-8 border-t border-slate-200 dark:border-slate-850 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                Forge
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Genuine professional thought leadership for founders, engineers, and researchers.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Product</h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li><Link href="/generator" className="hover:text-emerald-400 transition">Workspace Generator</Link></li>
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition">SaaS Dashboard</Link></li>
              <li><Link href="/drafts" className="hover:text-emerald-400 transition">Draft Library</Link></li>
              <li><Link href="/analytics" className="hover:text-emerald-400 transition">Copy Analytics</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Resources</h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li><Link href="/settings/brand-profile" className="hover:text-emerald-400 transition">Brand Profile Memory</Link></li>
              <li><span className="cursor-not-allowed opacity-60">API Reference</span></li>
              <li><span className="cursor-not-allowed opacity-60">System Status</span></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal</h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li><span className="hover:text-emerald-400 cursor-pointer transition">Privacy Policy</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer transition">Terms of Service</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer transition">Security Compliance</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-200/5 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} Forge Technologies, Inc. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Designed for technical thought leaders.
          </span>
        </div>
      </footer>
    </div>
  );
}
