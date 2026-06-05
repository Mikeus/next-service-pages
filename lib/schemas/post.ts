import { z } from 'zod';
import { SlugSchema } from './params';

const IsoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD');

export const PostFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: SlugSchema,
  excerpt: z.string().min(1).max(300),
  metaDescription: z.string().min(1).max(160),
  tags: z.array(z.string().min(1)).default([]),
  date: IsoDateSchema,
  generatedAt: z.string().datetime().optional(),
});

export const PostMetaSchema = PostFrontmatterSchema;

export const PostSchema = PostFrontmatterSchema.extend({
  content: z.string().min(1),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
export type PostMeta = z.infer<typeof PostMetaSchema>;
export type Post = z.infer<typeof PostSchema>;

export function parsePostFrontmatter(data: unknown, fallbackSlug: string): PostFrontmatter {
  const withSlug =
    typeof data === 'object' && data !== null && !('slug' in data)
      ? { ...data, slug: fallbackSlug }
      : data;

  return PostFrontmatterSchema.parse(withSlug);
}
