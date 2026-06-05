import type { AIProvider } from './provider';
import { createAIProvider } from './provider';
import { slugify } from '@/lib/utils';
import {
  BlogGenerateInputSchema,
  BlogGeneratorConfigSchema,
  GeneratedPostSchema,
  type BlogGenerateInput,
  type BlogGeneratorConfig,
  type GeneratedPost,
} from '@/lib/schemas';

export type {
  BlogGenerateInput,
  BlogGeneratorConfig,
  BlogTone,
  GeneratedPost,
} from '@/lib/schemas';

export const DEFAULT_SYSTEM_PROMPT = `You are an expert local SEO content writer for home service businesses.
Write blog posts that rank for local search queries and convert readers into leads.

Guidelines:
- Target homeowners and property managers in the specified service area
- Include practical, actionable advice — not generic filler
- Naturally incorporate the target keyword and city name where provided
- Use clear H2/H3 headings in Markdown
- Write for humans first, search engines second
- Avoid making specific legal, medical, or licensed trade claims unless generic
- Do not invent business names, phone numbers, or addresses
- Return ONLY valid JSON matching the requested schema — no markdown fences or commentary`;

export const DEFAULT_USER_PROMPT_TEMPLATE = `Write a local SEO blog post with these parameters:

Topic: {{topic}}
Service type: {{serviceType}}
{{cityLine}}
{{keywordLine}}
Target word count: ~{{wordCount}} words
Tone: {{tone}}

Return a JSON object with exactly these fields:
{
  "title": "SEO-optimized post title (50-60 chars ideal)",
  "slug": "url-friendly-slug",
  "content": "Full post body in Markdown with H2/H3 headings",
  "excerpt": "2-3 sentence summary for blog listing (max 160 chars)",
  "metaDescription": "Meta description for search results (max 155 chars)",
  "tags": ["tag1", "tag2", "tag3"]
}`;

export function buildBlogSystemPrompt(config: BlogGeneratorConfig = {}): string {
  const parsed = BlogGeneratorConfigSchema.parse(config);
  return parsed.systemPromptTemplate ?? DEFAULT_SYSTEM_PROMPT;
}

export function buildBlogUserPrompt(
  input: BlogGenerateInput,
  config: BlogGeneratorConfig = {},
): string {
  const parsedInput = BlogGenerateInputSchema.parse(input);
  const parsedConfig = BlogGeneratorConfigSchema.parse(config);
  const template = parsedConfig.userPromptTemplate ?? DEFAULT_USER_PROMPT_TEMPLATE;
  const wordCount = parsedInput.wordCount ?? parsedConfig.defaultWordCount ?? 800;
  const tone = parsedInput.tone ?? parsedConfig.defaultTone ?? 'professional';

  const cityLine = parsedInput.city
    ? `City/area: ${parsedInput.city}`
    : 'City/area: general (not city-specific)';
  const keywordLine = parsedInput.targetKeyword
    ? `Target keyword: ${parsedInput.targetKeyword}`
    : 'Target keyword: derive from topic and service type';

  return template
    .replace('{{topic}}', parsedInput.topic)
    .replace('{{serviceType}}', parsedInput.serviceType)
    .replace('{{cityLine}}', cityLine)
    .replace('{{keywordLine}}', keywordLine)
    .replace('{{wordCount}}', String(wordCount))
    .replace('{{tone}}', tone);
}

export function parseGeneratedPostResponse(raw: string): GeneratedPost {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error('AI response is not valid JSON');
  }

  const validated = GeneratedPostSchema.parse(parsed);

  return {
    ...validated,
    slug: slugify(validated.slug || validated.title),
    generatedAt: validated.generatedAt ?? new Date().toISOString(),
  };
}

export async function generateBlogPost(
  input: BlogGenerateInput,
  options: {
    provider?: AIProvider;
    config?: BlogGeneratorConfig;
  } = {},
): Promise<GeneratedPost> {
  const parsedInput = BlogGenerateInputSchema.parse(input);
  const parsedConfig = BlogGeneratorConfigSchema.parse(options.config ?? {});
  const provider = options.provider ?? createAIProvider();

  const systemPrompt = buildBlogSystemPrompt(parsedConfig);
  const userPrompt = buildBlogUserPrompt(parsedInput, parsedConfig);

  const raw = await provider.generateText(userPrompt, {
    systemPrompt,
    maxTokens: parsedConfig.maxTokens ?? 4096,
    temperature: parsedConfig.temperature ?? 0.7,
  });

  return parseGeneratedPostResponse(raw);
}
