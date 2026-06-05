import { NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/ai';
import { siteConfig } from '@/lib/config';
import {
  BlogGenerateInputSchema,
  parseRequestBody,
  type ApiErrorBody,
  type GeneratedPost,
} from '@/lib/schemas';

export interface BlogGenerateSuccessResponse {
  post: GeneratedPost;
}

// TODO: Replace this in-memory stub with a production rate limiter (e.g. Upstash Redis)
// keyed by API key or IP. Current stub resets on server restart and does not scale
// across serverless instances.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(clientId);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!siteConfig.features.aiBlog) {
    return NextResponse.json<ApiErrorBody>(
      { error: 'AI blog generation is disabled in site config' },
      { status: 403 },
    );
  }

  const clientIp = getClientIp(request);

  if (!checkRateLimit(clientIp)) {
    return NextResponse.json<ApiErrorBody>(
      { error: 'Rate limit exceeded. Try again in a minute.' },
      { status: 429 },
    );
  }

  const parsed = await parseRequestBody(request, BlogGenerateInputSchema);

  if (!parsed.success) {
    return NextResponse.json<ApiErrorBody>(parsed.error, { status: parsed.status });
  }

  try {
    const post = await generateBlogPost(parsed.data);

    return NextResponse.json<BlogGenerateSuccessResponse>({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Blog generation failed';

    return NextResponse.json<ApiErrorBody>({ error: message }, { status: 500 });
  }
}
