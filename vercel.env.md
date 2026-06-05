# Vercel environment variables

Set these in **Vercel → Project → Settings → Environment Variables**.
See [docs/deployment.md](./docs/deployment.md) for full deployment guide.

| Variable               | Production               | Preview     | Development             |
| ---------------------- | ------------------------ | ----------- | ----------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Preview URL | `http://localhost:3000` |
| `AI_PROVIDER`          | `openai` or `anthropic`  | Same        | Same                    |
| `OPENAI_API_KEY`       | Required if OpenAI       | Optional    | `.env.local`            |
| `ANTHROPIC_API_KEY`    | Required if Anthropic    | Optional    | `.env.local`            |
| `OPENAI_MODEL`         | Optional                 | Optional    | Optional                |
| `ANTHROPIC_MODEL`      | Optional                 | Optional    | Optional                |

Never prefix API keys with `NEXT_PUBLIC_`.
