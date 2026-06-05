import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  parsePostFrontmatter,
  PostSchema,
  SlugSchema,
  type Post,
  type PostMeta,
} from '@/lib/schemas';

export type { Post, PostMeta } from '@/lib/schemas';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content/blog');

function readMarkdownFile(filename: string): Post | null {
  const filePath = path.join(BLOG_CONTENT_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fallbackSlug = filename.replace(/\.mdx?$/, '');

  const frontmatter = parsePostFrontmatter(data, fallbackSlug);

  return PostSchema.parse({
    ...frontmatter,
    content: content.trim(),
  });
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const post = readMarkdownFile(file);
      if (!post) {
        return null;
      }

      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const parsedSlug = SlugSchema.safeParse(slug);
  if (!parsedSlug.success) {
    return null;
  }

  const mdPath = `${parsedSlug.data}.md`;
  const mdxPath = `${parsedSlug.data}.mdx`;

  return readMarkdownFile(mdPath) ?? readMarkdownFile(mdxPath);
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
