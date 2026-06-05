import { z } from 'zod';

export const SlugSchema = z
  .string()
  .min(1, 'Slug is required')
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens');

export const CitySlugParamsSchema = z.object({
  city: SlugSchema,
});

export const BlogSlugParamsSchema = z.object({
  slug: SlugSchema,
});

export type CitySlugParams = z.infer<typeof CitySlugParamsSchema>;
export type BlogSlugParams = z.infer<typeof BlogSlugParamsSchema>;

export function parseRouteParams<T extends z.ZodType>(
  schema: T,
  params: unknown,
): z.infer<T> | null {
  const result = schema.safeParse(params);
  return result.success ? result.data : null;
}
