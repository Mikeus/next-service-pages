import { describe, expect, it } from 'vitest';
import { defaultConfig } from '@/lib/config/site.config';
import {
  BlogGenerateInputSchema,
  BookingRequestSchema,
  CitySlugParamsSchema,
  PostFrontmatterSchema,
  ServiceConfigSchema,
  getClientEnv,
  resetEnvCache,
} from '@/lib/schemas';

describe('ServiceConfigSchema', () => {
  it('validates the default site config', () => {
    expect(() => ServiceConfigSchema.parse(defaultConfig)).not.toThrow();
  });

  it('rejects invalid email', () => {
    expect(() =>
      ServiceConfigSchema.parse({
        ...defaultConfig,
        email: 'not-an-email',
      }),
    ).toThrow();
  });
});

describe('BookingRequestSchema', () => {
  it('accepts valid booking payloads', () => {
    const result = BookingRequestSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '(512) 555-0100',
      preferredDate: '2026-03-15',
      message: 'Need help with a leak',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid phone characters', () => {
    const result = BookingRequestSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: 'call-me',
    });

    expect(result.success).toBe(false);
  });
});

describe('BlogGenerateInputSchema', () => {
  it('requires topic and serviceType', () => {
    const result = BlogGenerateInputSchema.safeParse({
      topic: 'Hi',
      serviceType: 'plumbing',
    });

    expect(result.success).toBe(false);
  });
});

describe('PostFrontmatterSchema', () => {
  it('validates blog frontmatter shape', () => {
    const result = PostFrontmatterSchema.safeParse({
      title: 'Test',
      slug: 'test-post',
      excerpt: 'Short excerpt for listing.',
      metaDescription: 'Meta description for SEO.',
      tags: ['tips'],
      date: '2026-01-01',
    });

    expect(result.success).toBe(true);
  });
});

describe('CitySlugParamsSchema', () => {
  it('rejects invalid city slugs', () => {
    expect(CitySlugParamsSchema.safeParse({ city: 'Austin' }).success).toBe(false);
    expect(CitySlugParamsSchema.safeParse({ city: 'austin' }).success).toBe(true);
  });
});

describe('ClientEnvSchema', () => {
  it('applies default site URL when unset', () => {
    resetEnvCache();
    const original = process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getClientEnv().NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');

    process.env.NEXT_PUBLIC_SITE_URL = original;
    resetEnvCache();
  });
});
