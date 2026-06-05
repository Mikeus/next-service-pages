import { parseServiceConfig, type ServiceConfig } from '../../lib/schemas';

/**
 * Example config: Denver pet grooming business.
 * Copy into lib/config/site.config.ts or merge with createServiceConfig().
 */
export const petGroomingConfig: ServiceConfig = parseServiceConfig({
  businessName: 'Paws & Polish Grooming',
  serviceType: 'pet grooming',
  serviceVerb: 'dog groomer',
  phone: '(720) 555-0173',
  email: 'book@pawsandpolish.example',
  serviceArea: {
    primaryCity: 'Denver',
    state: 'CO',
    cities: [
      { slug: 'denver', name: 'Denver', county: 'Denver', lat: 39.7392, lng: -104.9903 },
      { slug: 'aurora', name: 'Aurora', county: 'Arapahoe', lat: 39.7294, lng: -104.8319 },
      { slug: 'lakewood', name: 'Lakewood', county: 'Jefferson', lat: 39.7047, lng: -105.0814 },
      { slug: 'boulder', name: 'Boulder', county: 'Boulder', lat: 40.015, lng: -105.2705 },
    ],
  },
  pricing: {
    startingAt: 55,
    currency: 'USD',
    unit: 'per groom',
  },
  seo: {
    titleTemplate: '%s | Paws & Polish Grooming',
    defaultDescription:
      'Professional dog and cat grooming in Denver metro. Baths, haircuts, nail trims, and spa packages by appointment.',
    ogImage: '/og-pet-grooming.jpg',
  },
  features: {
    aiBlog: true,
    onlineBooking: true,
    cityPages: true,
  },
  services: [
    {
      title: 'Full Grooming Package',
      description: 'Bath, blow-dry, breed-specific haircut, ear cleaning, and nail trim.',
    },
    {
      title: 'Bath & Brush',
      description: 'Deep clean and de-shed treatment for dogs between full grooms.',
    },
    {
      title: 'Puppy Introduction',
      description: 'Gentle first groom for puppies under 6 months to build positive associations.',
    },
    {
      title: 'Mobile Grooming',
      description: 'Fully equipped van service at your home in select Denver metro areas.',
    },
  ],
  whyUs: [
    {
      title: 'Certified Pet Stylists',
      description: 'Groomers trained in breed standards, safety handling, and skin care.',
    },
    {
      title: 'Stress-Free Environment',
      description: 'Quiet scheduling blocks and one-on-one attention — no cage drying.',
    },
    {
      title: 'Premium Products',
      description:
        'Hypoallergenic shampoos and conditioners suited to coat type and skin sensitivity.',
    },
    {
      title: 'Photo Updates',
      description:
        'Before-and-after photos sent to your phone so you can check in during the appointment.',
    },
  ],
  faqs: [
    {
      question: 'Do you groom pets in {{cityName}}, {{state}}?',
      answer:
        'Yes — Paws & Polish serves {{cityName}} and nearby areas in {{county}} County at our salon and via mobile van.',
    },
    {
      question: 'How often should I book a {{serviceVerb}} in {{cityName}}?',
      answer:
        'Most dogs benefit from grooming every 4–8 weeks depending on breed and coat. We recommend a schedule during your first visit.',
    },
    {
      question: 'Do you groom cats in {{cityName}}?',
      answer:
        'Yes — we offer cat grooming by appointment in {{cityName}} for baths, mat removal, and nail trims.',
    },
    {
      question: 'How do I schedule with a {{serviceVerb}} near {{cityName}}?',
      answer:
        'Call {{phone}} or use our online booking form. Same-week appointments are often available in {{cityName}}.',
    },
  ],
});

export default petGroomingConfig;
