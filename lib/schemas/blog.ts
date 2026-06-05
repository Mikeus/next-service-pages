import { z } from 'zod';

export const BlogToneSchema = z.enum(['professional', 'friendly', 'conversational']);

export const BlogGenerateInputSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters').max(200),
  city: z.string().min(2).max(100).optional(),
  serviceType: z.string().min(2, 'Service type is required').max(100),
  targetKeyword: z.string().min(2).max(100).optional(),
  wordCount: z.number().int().min(300).max(3000).optional(),
  tone: BlogToneSchema.optional(),
});

export const GeneratedPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().min(1).max(300),
  metaDescription: z.string().min(1).max(160),
  tags: z.array(z.string().min(1)),
  generatedAt: z.string().datetime().optional(),
});

export const GeneratedPostOutputSchema = GeneratedPostSchema.extend({
  generatedAt: z.string().datetime(),
});

export type BlogTone = z.infer<typeof BlogToneSchema>;
export type BlogGenerateInput = z.infer<typeof BlogGenerateInputSchema>;
export type GeneratedPost = z.infer<typeof GeneratedPostOutputSchema>;

export const BlogGeneratorConfigSchema = z.object({
  systemPromptTemplate: z.string().min(1).optional(),
  userPromptTemplate: z.string().min(1).optional(),
  defaultWordCount: z.number().int().min(300).max(3000).optional(),
  defaultTone: BlogToneSchema.optional(),
  maxTokens: z.number().int().min(256).max(8192).optional(),
  temperature: z.number().min(0).max(2).optional(),
});

export type BlogGeneratorConfig = z.infer<typeof BlogGeneratorConfigSchema>;

export function parseGeneratedPost(raw: unknown): GeneratedPost {
  return GeneratedPostOutputSchema.parse(raw);
}
