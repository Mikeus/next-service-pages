import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { formatPageTitle, siteConfig } from '@/lib/config';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: formatPageTitle('Blog'),
  description: `Tips, guides, and local advice from ${siteConfig.businessName}.`,
};

export default function BlogPage(): React.JSX.Element {
  const posts = getAllPosts();

  return (
    <main>
      <Section className="bg-slate-50">
        <Container>
          <SectionHeading
            title="Blog"
            description={`Expert ${siteConfig.serviceType} tips and local guides for homeowners in ${siteConfig.serviceArea.primaryCity} and beyond.`}
          />
          {posts.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <BlogPostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-600">No posts yet. Check back soon.</p>
          )}
        </Container>
      </Section>
    </main>
  );
}
