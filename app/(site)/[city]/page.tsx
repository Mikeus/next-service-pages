import type { Metadata } from 'next';

type CityPageProps = {
  params: { city: string };
};

export function generateMetadata({ params }: CityPageProps): Metadata {
  const cityName = formatCitySlug(params.city);

  return {
    title: `${cityName} Services`,
    description: `Professional local services in ${cityName}.`,
  };
}

function formatCitySlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CityPage({ params }: CityPageProps) {
  const cityName = formatCitySlug(params.city);

  return (
    <main>
      <h1>Services in {cityName}</h1>
      <p>City SEO page placeholder — content and components coming in a future phase.</p>
    </main>
  );
}
