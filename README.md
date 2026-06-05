# next-service-pages

[![CI](https://github.com/Mikeus/next-service-pages/actions/workflows/ci.yml/badge.svg)](https://github.com/Mikeus/next-service-pages/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](./tsconfig.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mikeus/next-service-pages)

**Production-ready Next.js starter for multi-city local service websites with AI content automation.**

Built for agencies and freelancers who ship plumber, tutor, groomer, and contractor sites repeatedly — with typed config, city-level SEO pages, provider-agnostic AI blog generation, and booking API stubs out of the box.

---

## ✨ Features

- **Multi-city SEO pages** — Static `[city]` routes with metadata, FAQ interpolation, and conversion CTAs
- **AI blog automation** — Generate local SEO posts via OpenAI or Anthropic (`POST /api/blog/generate`)
- **Single-file config** — One typed `ServiceConfig` drives the entire site; swap per client in minutes
- **Booking API stub** — Zod-validated `POST /api/booking` ready for Calendly, Acuity, or CRM wiring
- **Markdown blog** — Frontmatter-powered `/blog` with `react-markdown` and Article JSON-LD
- **Strict TypeScript + Zod** — Every external input validated; types derived from schemas
- **OSS-ready** — Changesets releases, Dependabot, dependency review, CI on Node 18/20

## 🚀 Quick Start

**1. Clone and install**

```bash
git clone https://github.com/Mikeus/next-service-pages.git
cd next-service-pages
npm install
```

**2. Configure your business**

Edit `lib/config/site.config.ts` — or copy an example from [`examples/`](./examples/):

```typescript
import { createServiceConfig } from '@/lib/config';
import plumbingConfig from '../examples/plumbing/service.config';

export const siteConfig = createServiceConfig(plumbingConfig);
```

**3. Set environment variables**

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_SITE_URL and AI keys if using blog generation
```

**4. Run locally**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — homepage, city pages (`/austin`), and blog (`/blog`).

**5. Deploy**

Push to GitHub and import to [Vercel](https://vercel.com/new), or follow [docs/deployment.md](./docs/deployment.md). Set `NEXT_PUBLIC_SITE_URL` to your production domain.

## ⚙️ Configuration

The site is controlled by `ServiceConfig` in `lib/config/site.config.ts`. All fields are Zod-validated at startup.

| Field                            | Purpose                                           |
| -------------------------------- | ------------------------------------------------- |
| `businessName`, `phone`, `email` | Identity and contact                              |
| `serviceType`, `serviceVerb`     | Copy patterns (`plumbing` / `plumber`)            |
| `serviceArea.cities[]`           | City pages to generate (`slug`, `name`, `county`) |
| `services`, `whyUs`, `faqs`      | City page content sections                        |
| `seo.titleTemplate`              | Page titles — `%s` = page title                   |
| `features.aiBlog`                | Enable AI blog generation API                     |
| `features.onlineBooking`         | Enable booking API                                |
| `features.cityPages`             | Enable `/[city]` static pages                     |

Full reference: **[docs/configuration.md](./docs/configuration.md)**

Example configs:

| Example                   | Path                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------- |
| Plumbing (Austin, TX)     | [`examples/plumbing/service.config.ts`](./examples/plumbing/service.config.ts)         |
| Tutoring (Chicago, IL)    | [`examples/tutoring/service.config.ts`](./examples/tutoring/service.config.ts)         |
| Pet grooming (Denver, CO) | [`examples/pet-grooming/service.config.ts`](./examples/pet-grooming/service.config.ts) |

## 🤖 AI Content Automation

Provider-agnostic blog generation for local SEO content.

```bash
# .env.local
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
```

```bash
curl -X POST http://localhost:3000/api/blog/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Signs you need a plumber",
    "serviceType": "plumbing",
    "city": "Austin",
    "targetKeyword": "emergency plumber Austin"
  }'
```

Returns structured JSON: title, slug, markdown content, excerpt, meta description, tags.

Setup guide: **[docs/ai-setup.md](./docs/ai-setup.md)**

## 🏙️ City SEO Pages

Add cities to config → get static landing pages at build time:

```
/austin       → "Plumbing in Austin"
/round-rock   → "Plumbing in Round Rock"
```

Each page includes hero, services, why us, city-aware FAQ, and phone CTA. FAQ templates support `{{cityName}}`, `{{phone}}`, `{{serviceVerb}}`, and more.

How it works: **[docs/city-pages.md](./docs/city-pages.md)**

## 📁 Project Structure

```
next-service-pages/
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # Homepage
│   │   ├── [city]/page.tsx       # City SEO landing pages (SSG)
│   │   └── blog/                 # Blog index + posts
│   └── api/
│       ├── booking/route.ts      # Booking requests (Zod validated)
│       └── blog/
│           ├── route.ts          # List posts
│           └── generate/route.ts # AI blog generation
├── components/
│   ├── city/                     # City page sections
│   ├── home/                     # Homepage sections
│   ├── blog/                     # Markdown rendering
│   ├── seo/                      # JSON-LD structured data
│   └── ui/                       # Layout primitives
├── content/blog/                 # Markdown posts (gray-matter frontmatter)
├── docs/                         # Configuration, AI, deployment guides
├── examples/                     # Ready-made ServiceConfig examples
├── lib/
│   ├── ai/                       # Provider abstraction + blog generator
│   ├── blog/                     # Post loading utilities
│   ├── config/                   # Site config + city helpers
│   └── schemas/                  # Zod schemas (single source of truth)
├── scripts/update-contributors.ts
├── .github/workflows/            # CI, release, dependency review, stale
└── vercel.json
```

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Development server                       |
| `npm run build`        | Production build                         |
| `npm run typecheck`    | TypeScript strict check                  |
| `npm run lint`         | ESLint                                   |
| `npm run test`         | Vitest unit tests                        |
| `npm run contributors` | Sync `contributors.json` from GitHub API |

## 🗺️ Roadmap

- [ ] Stripe payment integration
- [ ] Scheduling API integration (generic webhook interface)
- [ ] Google Business Profile auto-posting via API
- [ ] i18n support for multi-language city pages
- [ ] Built-in A/B testing for CTA variants
- [ ] Vercel one-click deploy button
- [ ] AI-powered FAQ generation per city/service
- [ ] Automated PR review workflow using Codex
- [ ] Schema.org LocalBusiness structured data generator
- [ ] Performance audit CI step (Lighthouse)

## 🤝 Contributing

Contributions welcome from developers building real client sites. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, PR guidelines, and issue labels.

## 📄 License

[MIT](./LICENSE) — use freely in client projects.

---

**Why this exists:** Agencies and freelancers rebuild the same local service site patterns on every project — city pages, service config, blog SEO, booking hooks. next-service-pages encodes those patterns once, with strict types and production CI, so you ship faster.
