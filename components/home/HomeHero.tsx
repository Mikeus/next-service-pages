import Link from 'next/link';
import { Container } from '@/components/ui/Container';

interface HomeHeroProps {
  businessName: string;
  serviceType: string;
  description: string;
  phone: string;
  primaryCity: string;
  state: string;
}

export function HomeHero({
  businessName,
  serviceType,
  description,
  phone,
  primaryCity,
  state,
}: HomeHeroProps) {
  return (
    <section className="bg-slate-900 text-white">
      <Container className="py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-300">
            {primaryCity}, {state}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {businessName}
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            Professional {serviceType} you can trust across {primaryCity} and surrounding
            communities.
          </p>
          <p className="mt-4 text-base text-slate-400">{description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-500"
            >
              Call {phone}
            </Link>
            <Link
              href="#service-areas"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-base font-semibold text-white transition hover:border-slate-400"
            >
              View service areas
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
