# 🚀 Forge

Forge is a premium, modern AI-powered LinkedIn Personal Branding and Post Generation platform built specifically for deep technical minds: **engineers, founders, researchers, creators, consultants, and student leaders**.

Unlike typical marketing copiers, Forge eliminates the generic robotic AI tone ("AI slop") and focuses on:
- 💡 **Authentic Professional Storytelling:** Sharing real behind-the-scenes engineering and architectural challenges.
- 🏗️ **Technical Thought Leadership:** Metric-driven posts showcasing databases, scaling, latency drop counts, or components trade-offs.
- ✍️ **Human-Like Writing:** Flow variation, natural conversational hooks, and conciseSkim structures tailored for LinkedIn reading comfort.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- **State Management:** Zustand
- **Database:** Prisma ORM, PostgreSQL schemas configuration
- **AI Integrations:** OpenAI GPT SDK with robust keyword-matching mock fallback engine for immediate zero-config operations.

---

## 📂 Core Folder Structure

```bash
├── prisma/
│   └── schema.prisma         # PostgreSQL relational mappings (User, Profiles, Drafts, Analytics)
├── src/
│   ├── app/
│   │   ├── globals.css       # Custom scrollbars, glassmorphism design variable definitions
│   │   ├── layout.tsx        # Responsive Root Layout viewport shell
│   │   ├── page.tsx          # Premium interactive SaaS Landing Page
│   │   ├── dashboard/        # KPI dashboard showing suggested outlines and saved drafts
│   │   ├── generator/        # Main Post Generator workspace (GitHub repo syncer, PDF carousel outline panels)
│   │   ├── drafts/           # Filterable search library archive
│   │   ├── analytics/        # Copywriting metrics dashboards
│   │   └── settings/
│   │       └── brand-profile/ # Brand Profile context & key achievements loggers
│   ├── components/
│   │   └── shared/
│   │       ├── ThemeProvider.tsx # Client-side Light/Dark switcher
│   │       └── Sidebar.tsx       # responsive frosted navigation panels
│   └── lib/
│       ├── store.ts          # Zustand Store binding brand configurations and active draft models
│       ├── prompts.ts        # Advanced Modular prompts assembly & Anti-AI slop laws compiler
│       └── openai.ts         # OpenAI endpoint controller with high-fidelity local templates fallbacks
```

---

## ⚡ Quick Setup & Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add credentials (Optional):**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your-api-key-here
   DATABASE_URL=postgresql://user:password@localhost:5432/forge
   ```
   *Note: If no keys are specified, Forge automatically defaults to its advanced local keyword fallback mode so you can interact with all generator features instantly.*

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) inside your web browser.

4. **Compile production build:**
   ```bash
   npm run build
   ```

---

## 🛡️ Anti-AI-Tone Compliance Law

Forge automatically parses all generated content to explicitly eliminate banished marketing keywords:
- ❌ *Banished Terms:* `delve`, `tapestry`, `revolutionize`, `elevate`, `synergy`, `in today's digital age`, `humbled & thrilled`.
- ✔ *Enforced Rules:* Starts *in media res* (with active metrics or codebase conflicts), double margins whitespace skimming, no accessibility-breaking unicode bolding.