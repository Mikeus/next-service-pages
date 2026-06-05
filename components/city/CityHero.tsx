import Link from 'next/link';
import { Container } from '@/components/ui/Container';

interface CityHeroProps {
  headline: string;
  subheadline: string;
  phone: string;
  pricingLabel?: string;
}

export function CityHero({ headline, subheadline, phone, pricingLabel }: CityHeroProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{headline}</h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">{subheadline}</p>
          {pricingLabel ? (
            <p className="mt-4 inline-block rounded-full bg-blue-600/20 px-4 py-1.5 text-sm font-medium text-blue-200">
              {pricingLabel}
            </p>
          ) : null}
          <Link
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-500"
          >
            Call {phone}
          </Link>
        </div>
      </Container>
    </section>
  );
}
