import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MarkdownContent } from '@/components/blog/MarkdownContent';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import type { Post } from '@/lib/blog';
import { formatPageTitle, getSiteUrl } from '@/lib/config';
import { BlogSlugParamsSchema, parseRouteParams } from '@/lib/schemas';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

type BlogPostPageProps = {
  params: { slug: string };
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function resolvePostParam(params: { slug: string }): Post | null {
  const routeParams = parseRouteParams(BlogSlugParamsSchema, params);
  if (!routeParams) {
    return null;
  }
  return getPostBySlug(routeParams.slug);
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = resolvePostParam(params);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: formatPageTitle(post.title),
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps): React.JSX.Element {
  const post = resolvePostParam(params);

  if (!post) {
    notFound();
  }

  const postUrl = `${getSiteUrl()}/blog/${post.slug}`;

  return (
    <main>
      <ArticleJsonLd post={post} url={postUrl} />
      <Section>
        <Container>
          <Link href="/blog" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to blog
          </Link>
          <article className="mx-auto mt-8 max-w-3xl">
            <header className="border-b border-slate-200 pb-8">
              <time dateTime={post.date} className="text-sm font-medium text-slate-500">
                {formatDate(post.date)}
              </time>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
              {post.tags.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </header>
            <div className="mt-10">
              <MarkdownContent content={post.content} />
            </div>
          </article>
        </Container>
      </Section>
    </main>
  );
}
