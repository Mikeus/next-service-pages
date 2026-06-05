import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  cityName: string;
}

export function FAQSection({ faqs, cityName }: FAQSectionProps) {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={`Frequently asked questions — ${cityName}`}
          description="Common questions from homeowners and businesses in your area."
        />
        <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {faqs.map((faq) => (
            <div key={faq.question} className="px-6 py-5">
              <dt className="text-base font-semibold text-slate-900">{faq.question}</dt>
              <dd className="mt-2 text-slate-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
