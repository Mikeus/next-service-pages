# next-service-pages

The fastest way for developers to build multi-city, AI-powered local service business websites. City SEO pages, AI content automation, and booking integrations — all in one Next.js starter.

Built for agencies and freelancers shipping production sites for plumbers, tutors, pet groomers, contractors, cleaners, and other local service businesses.

## Features

- **Multi-city SEO pages** — Dynamic `[city]` routes with metadata hooks for local landing pages at scale
- **AI blog automation** — Provider-agnostic AI client stub ready for OpenAI or Anthropic content pipelines
- **Booking API stubs** — REST endpoints to wire up Calendly, Acuity, or custom CRM integrations
- **TypeScript strict** — Full strict mode with `noUncheckedIndexedAccess` and production-grade compiler options
- **App Router** — Next.js 14+ file-based routing, layouts, and API routes
- **Provider-agnostic AI** — Swap between OpenAI and Anthropic without rewriting your content layer

## Example use cases

| Business type | What you get out of the box |
|---|---|
| Plumbing company | City pages like `/austin`, `/dallas` with SEO metadata |
| Tutoring service | Blog API stub for AI-generated study guides and local content |
| Pet grooming | Booking endpoint stub for appointment requests |
| Home services agency | Reusable starter to clone per client with shared patterns |

## Requirements

- Node.js 18.17 or later
- npm, yarn, or pnpm

## Installation

```bash
git clone https://github.com/your-org/next-service-pages.git
cd next-service-pages
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the scaffold.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler (no emit) |
| `npm run test` | Run Vitest unit tests |
| `npm run format` | Format code with Prettier |

## Project structure

```
next-service-pages/
├── app/
│   ├── (site)/          # Public marketing pages
│   │   ├── page.tsx     # Homepage
│   │   └── [city]/      # City SEO landing pages
│   └── api/
│       ├── booking/     # Booking request endpoint
│       └── blog/        # Blog & AI content endpoint
├── components/
│   ├── ui/              # Shared UI primitives
│   ├── booking/         # Booking form components
│   └── seo/             # SEO helpers & structured data
├── lib/
│   ├── ai/              # AI provider abstraction
│   ├── config/          # Site & business configuration
│   └── utils/           # Shared utilities
└── public/              # Static assets
```

## Configuration

> **Coming soon:** Full configuration guide covering environment variables, city lists, AI provider setup, and booking integrations.

Start by editing `lib/config/site.ts` with your business name, cities, and contact details:

```typescript
export const siteConfig = {
  name: 'Your Service Business',
  cities: ['austin', 'dallas', 'houston'],
  // ...
};
```

Environment variables (`.env.local`):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_CONTACT_EMAIL=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

## Roadmap

> **Coming soon:** Detailed roadmap with phased releases.

- [ ] UI component library (hero, services, testimonials, CTA)
- [ ] City page templates with JSON-LD structured data
- [ ] AI blog generation pipeline
- [ ] Booking form with provider adapters
- [ ] CMS integration options (Sanity, Contentful)
- [ ] Deployment guides (Vercel, Docker)

## Contributing

We welcome contributions from developers building real client sites. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, PR guidelines, and issue labels.

## License

[MIT](./LICENSE)
