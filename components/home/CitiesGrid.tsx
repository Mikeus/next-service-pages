import Link from 'next/link';
import type { CityConfig } from '@/lib/config';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface CitiesGridProps {
  cities: CityConfig[];
  serviceType: string;
  state: string;
}

export function CitiesGrid({ cities, serviceType, state }: CitiesGridProps) {
  return (
    <Section id="service-areas" className="bg-slate-50">
      <Container>
        <SectionHeading
          title="Service Areas"
          description={`We provide ${serviceType} across ${state}. Select your city for local details, pricing, and availability.`}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/${city.slug}`}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                  {city.name}
                </h3>
                {city.county ? (
                  <p className="mt-1 text-sm text-slate-500">{city.county} County</p>
                ) : null}
                <span className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  View local page →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
