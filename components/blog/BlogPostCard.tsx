import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';

interface BlogPostCardProps {
  post: PostMeta;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
      <time dateTime={post.date} className="text-sm font-medium text-slate-500">
        {formatDate(post.date)}
      </time>
      <h2 className="mt-2 text-xl font-bold text-slate-900">
        <Link href={`/blog/${post.slug}`} className="hover:text-blue-700">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-slate-600">{post.excerpt}</p>
      {post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
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
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
      >
        Read more →
      </Link>
    </article>
  );
}
