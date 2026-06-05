import type { Metadata } from 'next';
import { CitiesGrid } from '@/components/home/CitiesGrid';
import { HomeHero } from '@/components/home/HomeHero';
import { formatPageTitle, siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: formatPageTitle('Home'),
  description: siteConfig.seo.defaultDescription,
};

export default function HomePage() {
  const { businessName, serviceType, phone, serviceArea, seo, features } = siteConfig;

  return (
    <>
      <HomeHero
        businessName={businessName}
        serviceType={serviceType}
        description={seo.defaultDescription}
        phone={phone}
        primaryCity={serviceArea.primaryCity}
        state={serviceArea.state}
      />
      {features.cityPages ? (
        <CitiesGrid
          cities={serviceArea.cities}
          serviceType={serviceType}
          state={serviceArea.state}
        />
      ) : null}
    </>
  );
}
