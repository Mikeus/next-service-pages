import { describe, expect, it } from 'vitest';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

describe('blog posts', () => {
  it('loads all markdown posts sorted by date descending', () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThanOrEqual(2);

    if (!posts[0] || !posts[1]) {
      throw new Error('Expected at least two posts');
    }

    expect(posts[0].date >= posts[1].date).toBe(true);
  });

  it('loads a single post by slug with content', () => {
    const post = getPostBySlug('home-maintenance-signs-this-season');

    expect(post).not.toBeNull();
    expect(post?.title).toContain('Professional Maintenance');
    expect(post?.content).toContain('## 1.');
    expect(post?.tags).toContain('home maintenance');
  });
});
