import type { ServiceOffering } from '@/lib/config';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface ServicesListProps {
  services: ServiceOffering[];
  cityName: string;
  serviceType: string;
}

export function ServicesList({ services, cityName, serviceType }: ServicesListProps) {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={`Our ${serviceType} in ${cityName}`}
          description={`From routine maintenance to urgent repairs, our team covers everything you need in ${cityName}.`}
        />
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <li
              key={service.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-slate-600">{service.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
