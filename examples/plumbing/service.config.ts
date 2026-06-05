import { parseServiceConfig, type ServiceConfig } from '../../lib/schemas';

/**
 * Example config: Austin-area plumbing company.
 * Copy into lib/config/site.config.ts or merge with createServiceConfig().
 */
export const plumbingConfig: ServiceConfig = parseServiceConfig({
  businessName: 'Austin Pro Plumbing',
  serviceType: 'plumbing',
  serviceVerb: 'plumber',
  phone: '(512) 555-0142',
  email: 'service@austinproplumbing.example',
  serviceArea: {
    primaryCity: 'Austin',
    state: 'TX',
    cities: [
      { slug: 'austin', name: 'Austin', county: 'Travis', lat: 30.2672, lng: -97.7431 },
      { slug: 'pflugerville', name: 'Pflugerville', county: 'Travis', lat: 30.4394, lng: -97.62 },
      { slug: 'lakeway', name: 'Lakeway', county: 'Travis', lat: 30.3638, lng: -97.9797 },
      { slug: 'buda', name: 'Buda', county: 'Hays', lat: 30.0819, lng: -97.8431 },
    ],
  },
  pricing: {
    startingAt: 129,
    currency: 'USD',
    unit: 'per service call',
  },
  seo: {
    titleTemplate: '%s | Austin Pro Plumbing',
    defaultDescription:
      'Licensed Austin plumbers for emergencies, repairs, and installations. Same-day service across Travis and Hays County.',
    ogImage: '/og-plumbing.jpg',
  },
  features: {
    aiBlog: true,
    onlineBooking: true,
    cityPages: true,
  },
  services: [
    {
      title: 'Emergency Pipe Repair',
      description:
        'Burst pipes, major leaks, and flooding — 24/7 dispatch across the Austin metro.',
    },
    {
      title: 'Drain Cleaning',
      description: 'Hydro-jetting and snaking for slow drains, sewer backups, and root intrusion.',
    },
    {
      title: 'Water Heater Service',
      description: 'Tank and tankless repair, replacement, and annual maintenance.',
    },
    {
      title: 'Fixture Installation',
      description: 'Faucets, toilets, garbage disposals, and whole-bathroom rough-in.',
    },
  ],
  whyUs: [
    {
      title: 'Licensed Master Plumbers',
      description: 'Texas-licensed technicians with code-compliant work on every job.',
    },
    {
      title: 'Upfront Pricing',
      description: 'Flat-rate quotes before work begins — no surprise hourly billing.',
    },
    {
      title: 'Fast Local Response',
      description: 'Trucks staged across Austin, Pflugerville, and Lakeway for quick arrival.',
    },
    {
      title: 'Satisfaction Guarantee',
      description: 'We return at no charge if the repair does not hold for 90 days.',
    },
  ],
  faqs: [
    {
      question: 'Do you offer emergency plumbing in {{cityName}}?',
      answer:
        'Yes — Austin Pro Plumbing provides 24/7 emergency service in {{cityName}} and {{county}} County. Call {{phone}} for immediate dispatch.',
    },
    {
      question: 'Are your {{serviceVerb}}s licensed in Texas?',
      answer:
        'Every {{serviceVerb}} on our team holds a valid Texas plumbing license and carries full liability insurance.',
    },
    {
      question: 'How much does a {{serviceType}} visit cost in {{cityName}}?',
      answer:
        'Service calls start at $129 in {{cityName}}. We provide a written quote before any repair work begins.',
    },
    {
      question: 'What neighborhoods in {{cityName}} do you serve?',
      answer:
        'We cover all of {{cityName}} and surrounding areas. Contact us to confirm availability at your address.',
    },
  ],
});

export default plumbingConfig;
