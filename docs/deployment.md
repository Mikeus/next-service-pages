# Deployment

Deploy next-service-pages to Vercel (recommended) or any Node.js host that supports Next.js 14.

## Vercel (recommended)

### One-click flow

1. Push your fork to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Set environment variables (see below)
4. Deploy

### `vercel.json`

The repo includes a minimal [`vercel.json`](../vercel.json):

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "regions": ["iad1"]
}
```

Adjust `regions` for your primary audience.

### Required environment variables

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable                    | Environment | Required      | Description                                        |
| --------------------------- | ----------- | ------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Production  | Yes           | Canonical site URL (e.g. `https://yourdomain.com`) |
| `AI_PROVIDER`               | Production  | If AI enabled | `openai` or `anthropic`                            |
| `OPENAI_API_KEY`            | Production  | If OpenAI     | OpenAI API key                                     |
| `ANTHROPIC_API_KEY`         | Production  | If Anthropic  | Anthropic API key                                  |
| `OPENAI_MODEL`              | All         | No            | Override default OpenAI model                      |
| `ANTHROPIC_MODEL`           | All         | No            | Override default Anthropic model                   |
| `NEXT_PUBLIC_CONTACT_PHONE` | All         | No            | Optional contact override                          |
| `NEXT_PUBLIC_CONTACT_EMAIL` | All         | No            | Optional contact override                          |

> **Important:** `NEXT_PUBLIC_*` variables are embedded in the client bundle. Never prefix secrets with `NEXT_PUBLIC_`.

### Build settings

Vercel auto-detects Next.js. Verify:

- **Framework Preset:** Next.js
- **Node.js Version:** 18.x or 20.x
- **Build Command:** `npm run build`
- **Install Command:** `npm ci`

### Custom domain

Add your domain in Vercel → Domains, then update:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Redeploy after changing public env vars.

## Self-hosted (Node.js)

### Build

```bash
npm ci
npm run build
```

### Start

```bash
npm run start
```

Runs on port 3000 by default. Use a process manager (PM2, systemd) and reverse proxy (nginx, Caddy) with TLS.

### Docker (manual)

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Pass environment variables at runtime via `-e` flags or an env file.

## Pre-deploy checklist

- [ ] Update `lib/config/site.config.ts` for your client/business
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Add real `ogImage` to `public/`
- [ ] Configure AI keys if using blog generation
- [ ] Run `npm run typecheck && npm run lint && npm run test && npm run build` locally
- [ ] Wire booking API to Calendly, Acuity, or CRM (stub is not production-ready)

## CI

Every push to `main` runs typecheck, lint, test, and build on Node 18 and 20 via GitHub Actions. Ensure CI passes before deploying.
