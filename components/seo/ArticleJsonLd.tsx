import type { PostMeta } from '@/lib/blog';
import { getSiteUrl, siteConfig } from '@/lib/config';

interface ArticleJsonLdProps {
  post: PostMeta;
  url: string;
}

export function ArticleJsonLd({ post, url }: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.generatedAt ?? post.date,
    author: {
      '@type': 'Organization',
      name: siteConfig.businessName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.businessName,
      url: getSiteUrl(),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
