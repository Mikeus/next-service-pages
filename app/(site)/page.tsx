import type { Metadata } from 'next';
import { CitiesGrid } from '@/components/home/CitiesGrid';
import { HomeHero } from '@/components/home/HomeHero';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.seo.defaultDescription,
};

export default function HomePage(): React.JSX.Element {
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
