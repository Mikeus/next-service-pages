import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CallToAction } from '@/components/city/CallToAction';
import { CityHero } from '@/components/city/CityHero';
import { FAQSection } from '@/components/city/FAQSection';
import { ServicesList } from '@/components/city/ServicesList';
import { WhyUsSection } from '@/components/city/WhyUsSection';
import {
  buildCityContext,
  buildCityDescription,
  buildCityHeadline,
  formatPageTitle,
  formatPricingLabel,
  getAllCitySlugs,
  getCityBySlug,
  resolveCityFaqs,
  siteConfig,
} from '@/lib/config';

type CityPageProps = {
  params: { city: string };
};

export function generateStaticParams(): Array<{ city: string }> {
  if (!siteConfig.features.cityPages) {
    return [];
  }

  return getAllCitySlugs(siteConfig).map((city) => ({ city }));
}

export function generateMetadata({ params }: CityPageProps): Metadata {
  const city = getCityBySlug(params.city);

  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  const title = buildCityHeadline(city, siteConfig);

  return {
    title: formatPageTitle(title),
    description: buildCityDescription(city, siteConfig),
    openGraph: {
      title: formatPageTitle(title),
      description: buildCityDescription(city, siteConfig),
      images: [{ url: siteConfig.seo.ogImage }],
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  const context = buildCityContext(city, siteConfig);
  const faqs = resolveCityFaqs(siteConfig.faqs, context);
  const pricingLabel = formatPricingLabel(siteConfig);

  return (
    <main>
      <CityHero
        headline={buildCityHeadline(city, siteConfig)}
        subheadline={buildCityDescription(city, siteConfig)}
        phone={siteConfig.phone}
        pricingLabel={pricingLabel}
      />
      <ServicesList
        services={siteConfig.services}
        cityName={city.name}
        serviceType={siteConfig.serviceType}
      />
      <WhyUsSection
        points={siteConfig.whyUs}
        businessName={siteConfig.businessName}
        cityName={city.name}
      />
      <FAQSection faqs={faqs} cityName={city.name} />
      <CallToAction
        businessName={siteConfig.businessName}
        cityName={city.name}
        phone={siteConfig.phone}
        serviceVerb={siteConfig.serviceVerb}
      />
    </main>
  );
}
