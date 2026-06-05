# AI Setup

next-service-pages includes a provider-agnostic AI layer for automated local SEO blog content. Swap between OpenAI and Anthropic without changing application code.

## Architecture

```
lib/ai/
├── provider.ts       # OpenAIProvider, AnthropicProvider, createAIProvider()
└── blog-generator.ts # Prompt templates, generateBlogPost()
```

All external inputs (API request bodies, env vars, AI JSON output) are validated with Zod.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Provider selection

```bash
# "openai" or "anthropic"
AI_PROVIDER=openai
```

### OpenAI

Required when `AI_PROVIDER=openai`:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o          # optional, defaults to gpt-4o
```

Get an API key at [platform.openai.com](https://platform.openai.com/api-keys).

### Anthropic

Required when `AI_PROVIDER=anthropic`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest   # optional
```

Get an API key at [console.anthropic.com](https://console.anthropic.com/).

## Enable AI blog generation

Set in `lib/config/site.config.ts`:

```typescript
features: {
  aiBlog: true,
  // ...
}
```

## Generate a blog post via API

```bash
curl -X POST http://localhost:3000/api/blog/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "How to winterize your home plumbing",
    "serviceType": "plumbing",
    "city": "Austin",
    "targetKeyword": "winterize plumbing Austin",
    "wordCount": 900,
    "tone": "professional"
  }'
```

### Request fields

| Field           | Required | Description                                     |
| --------------- | -------- | ----------------------------------------------- |
| `topic`         | Yes      | Blog post topic (3–200 chars)                   |
| `serviceType`   | Yes      | From site config                                |
| `city`          | No       | Target city for local SEO                       |
| `targetKeyword` | No       | Primary keyword to optimize for                 |
| `wordCount`     | No       | Target length (300–3000, default ~800)          |
| `tone`          | No       | `professional`, `friendly`, or `conversational` |

### Response

Returns a `GeneratedPost` object:

```json
{
  "post": {
    "title": "...",
    "slug": "...",
    "content": "## Markdown body...",
    "excerpt": "...",
    "metaDescription": "...",
    "tags": ["..."],
    "generatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

Save generated content to `content/blog/{slug}.md` with frontmatter to publish on `/blog`.

## Customizing prompts

Override prompt templates via `BlogGeneratorConfig`:

```typescript
import { generateBlogPost } from '@/lib/ai';

await generateBlogPost(input, {
  config: {
    systemPromptTemplate: 'Your custom system prompt...',
    userPromptTemplate: 'Your custom user template with {{topic}}...',
    defaultWordCount: 1000,
    defaultTone: 'friendly',
  },
});
```

## Rate limiting

The generate endpoint includes an in-memory rate limit stub (5 requests/minute per IP). Replace with Redis/Upstash in production — see the TODO in `app/api/blog/generate/route.ts`.

## Production checklist

- [ ] Set `AI_PROVIDER` and API key in hosting provider env vars (never commit keys)
- [ ] Confirm `features.aiBlog` is intentional for production
- [ ] Replace in-memory rate limiter
- [ ] Monitor API usage and set billing alerts with your provider
- [ ] Review generated content before publishing (human-in-the-loop)
