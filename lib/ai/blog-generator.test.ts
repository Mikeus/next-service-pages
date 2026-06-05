import { describe, expect, it } from 'vitest';
import { buildBlogUserPrompt, parseGeneratedPostResponse } from '@/lib/ai/blog-generator';

describe('buildBlogUserPrompt', () => {
  it('includes topic, service type, and tone in the prompt', () => {
    const prompt = buildBlogUserPrompt({
      topic: 'Winter pipe maintenance',
      serviceType: 'home services',
      city: 'Austin',
      targetKeyword: 'pipe maintenance Austin',
      wordCount: 900,
      tone: 'friendly',
    });

    expect(prompt).toContain('Winter pipe maintenance');
    expect(prompt).toContain('home services');
    expect(prompt).toContain('Austin');
    expect(prompt).toContain('pipe maintenance Austin');
    expect(prompt).toContain('900');
    expect(prompt).toContain('friendly');
  });
});

describe('parseGeneratedPostResponse', () => {
  it('parses valid JSON and adds generatedAt timestamp', () => {
    const raw = JSON.stringify({
      title: 'Test Post',
      slug: 'test-post',
      content: '## Hello\n\nBody content here.',
      excerpt: 'Short excerpt.',
      metaDescription: 'Meta description for SEO.',
      tags: ['local', 'tips'],
    });

    const post = parseGeneratedPostResponse(raw);

    expect(post.title).toBe('Test Post');
    expect(post.slug).toBe('test-post');
    expect(post.tags).toEqual(['local', 'tips']);
    expect(post.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('strips markdown code fences from AI output', () => {
    const raw = `\`\`\`json
{"title":"Fenced Post","slug":"fenced-post","content":"Body","excerpt":"Excerpt","metaDescription":"Meta","tags":[]}
\`\`\``;

    const post = parseGeneratedPostResponse(raw);

    expect(post.title).toBe('Fenced Post');
  });
});
