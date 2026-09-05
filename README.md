# SEO Agent — Full-Stack Monorepo

A production-grade, fully decoupled **SEO Optimization AI Agent** monorepo. Built with a **Node.js/Express** intelligence backend and a **React/Vite** visual dashboard.

```
seo-agent/
├── backend/                  # Node.js + Express REST API (Port 3001)
│   ├── src/
│   │   ├── server.js         # Express setup & CORS configuration
│   │   ├── routes/           # REST endpoints (/api/audit, /api/keywords, /api/competitors)
│   │   ├── services/         # Page fetcher, Anthropic LLM wrapper, & SEO prompts
│   │   └── middleware/       # Error handling middleware
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                 # React + Vite UI Dashboard (Port 5173)
│   ├── src/
│   │   ├── main.jsx          # Entrypoint
│   │   ├── App.jsx           # Nav layout & view router
│   │   ├── pages/            # Dashboard, AuditResults, KeywordResearch, CompetitorComparison
│   │   ├── components/       # SearchBar, ScoreCard, IssueList, DataTable
│   │   ├── api/client.js     # Decoupled fetch wrapper targeting backend
│   │   └── styles/theme.css  # Dark charcoal-teal palette & brass accent (#C79A3F)
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── README.md
│
├── docker-compose.yml        # Multi-container startup config
└── README.md                 # Monorepo setup guide
```

---

## Key Architectural Principles

1. **Decoupled Monorepo Structure**: The `backend/` and `frontend/` directories possess independent `package.json` files, independent `node_modules`, and zero shared code imports.
2. **HTTP REST Communication**: The React frontend communicates strictly over HTTP with the backend (`http://localhost:3001`), configured via `VITE_API_BASE_URL`. No API keys or LLM logic exist in the client.
3. **Live Web Page Scraper**: The backend includes `pageFetcher.js` (`axios` + `cheerio`) to extract live HTML title tags, meta descriptions, headings, word counts, image alt text counts, and schema.org scripts.
4. **Resilient AI & Heuristic Fallback Engine**: If `ANTHROPIC_API_KEY` is provided, audits run via Claude 3.5 Sonnet. If omitted, the server seamlessly runs intelligent, rule-based audits on real extracted HTML metadata out-of-the-box.

---

## Quick Start (Local Setup)

### Option 1: Running Services Separately

1. **Start Backend Server:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
   *Runs Express server on `http://localhost:3001`.*

2. **Start Frontend Dev Server:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
   *Runs Vite dev server on `http://localhost:5173`.*

---

### Option 2: Running via Docker Compose

```bash
docker-compose up --build
```
- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:5173`

---

## API Endpoints Overview

- `POST /api/audit`: Accepts `{ url }`. Scrapes live page HTML and returns scores (Overall, Technical, On-Page, Content), metadata analysis, technical checklists, and a prioritized action roadmap.
- `POST /api/keywords`: Accepts `{ seed, domain }`. Returns keyword clusters grouped by Search Intent (Informational, Commercial, Transactional, Navigational), volume tiers, difficulty levels, and cannibalization flags.
- `POST /api/competitors`: Accepts `{ targetUrl, competitorUrls }`. Compares structural word count, heading depth, and schema coverage to identify winnable content gaps.
