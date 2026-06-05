import type { WhyUsPoint } from '@/lib/config';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface WhyUsSectionProps {
  points: WhyUsPoint[];
  businessName: string;
  cityName: string;
}

export function WhyUsSection({ points, businessName, cityName }: WhyUsSectionProps) {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionHeading
          title={`Why choose ${businessName} in ${cityName}?`}
          description="Local expertise, transparent pricing, and a team that shows up when you need us."
        />
        <ul className="grid gap-6 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-1 text-slate-600">{point.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
