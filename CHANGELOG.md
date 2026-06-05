# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-06-05

### Added

- Provider-agnostic AI abstraction (`OpenAIProvider`, `AnthropicProvider`, `createAIProvider`)
- AI blog generator with configurable local SEO prompts (`lib/ai/blog-generator.ts`)
- `POST /api/blog/generate` endpoint with Zod validation and rate-limit stub
- Blog list and post pages with `react-markdown`, frontmatter parsing, and Article JSON-LD
- Sample blog posts in `content/blog/`
- Centralized Zod schema layer (`lib/schemas/`) for API bodies, env vars, frontmatter, and route params
- Example service configs for plumbing, tutoring, and pet grooming
- Documentation in `docs/` (configuration, AI setup, deployment, city pages)
- OSS maintenance: Changesets releases, Dependabot, dependency review, stale bot, CODEOWNERS, SECURITY.md
- Contributors sync script and `contributors.json`

### Changed

- Booking API now validates requests with Zod and respects `features.onlineBooking`
- Site config validated at startup via `ServiceConfigSchema`
- CI runs Node 18 and 20 matrix with full production build check

## [0.1.0] - 2026-06-05

### Added

- Initial Next.js 14 App Router scaffold with TypeScript strict mode
- Tailwind CSS, ESLint, Prettier, Husky, and lint-staged
- Typed `ServiceConfig` system with `createServiceConfig()` helper
- Multi-city SEO pages at `/[city]` with static generation
- Homepage with hero and cities grid
- Reusable city page components (hero, services, why us, FAQ, CTA)
- Booking and blog API route stubs
- GitHub issue/PR templates and CI workflow
- MIT license and contributing guide

[Unreleased]: https://github.com/Mikeus/next-service-pages/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Mikeus/next-service-pages/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Mikeus/next-service-pages/releases/tag/v0.1.0
