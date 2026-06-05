import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface CallToActionProps {
  businessName: string;
  cityName: string;
  phone: string;
  serviceVerb: string;
}

export function CallToAction({ businessName, cityName, phone, serviceVerb }: CallToActionProps) {
  return (
    <Section className="bg-blue-600">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to hire a {serviceVerb} in {cityName}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
            Contact {businessName} today for a free estimate. We serve {cityName} and nearby
            communities.
          </p>
          <Link
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Call {phone}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
