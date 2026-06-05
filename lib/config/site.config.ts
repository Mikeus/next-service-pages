export interface CityConfig {
  slug: string;
  name: string;
  county?: string;
  lat?: number;
  lng?: number;
}

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface WhyUsPoint {
  title: string;
  description: string;
}

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface ServiceConfig {
  businessName: string;
  serviceType: string;
  serviceVerb: string;
  phone: string;
  email: string;
  serviceArea: {
    primaryCity: string;
    state: string;
    cities: CityConfig[];
  };
  pricing?: {
    startingAt: number;
    currency: string;
    unit: string;
  };
  seo: {
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
  };
  features: {
    aiBlog: boolean;
    onlineBooking: boolean;
    cityPages: boolean;
  };
  services: ServiceOffering[];
  whyUs: WhyUsPoint[];
  faqs: FAQEntry[];
}

export const defaultConfig: ServiceConfig = {
  businessName: 'Summit Local Services',
  serviceType: 'home services',
  serviceVerb: 'service professional',
  phone: '(555) 123-4567',
  email: 'hello@summitlocalservices.example',
  serviceArea: {
    primaryCity: 'Austin',
    state: 'TX',
    cities: [
      { slug: 'austin', name: 'Austin', county: 'Travis', lat: 30.2672, lng: -97.7431 },
      { slug: 'round-rock', name: 'Round Rock', county: 'Williamson', lat: 30.5083, lng: -97.6789 },
      { slug: 'cedar-park', name: 'Cedar Park', county: 'Williamson', lat: 30.5052, lng: -97.8203 },
      { slug: 'georgetown', name: 'Georgetown', county: 'Williamson', lat: 30.6333, lng: -97.677 },
    ],
  },
  pricing: {
    startingAt: 89,
    currency: 'USD',
    unit: 'per visit',
  },
  seo: {
    titleTemplate: '%s | Summit Local Services',
    defaultDescription:
      'Trusted local home services across Central Texas. Licensed, insured, and ready to help.',
    ogImage: '/og-default.jpg',
  },
  features: {
    aiBlog: false,
    onlineBooking: true,
    cityPages: true,
  },
  services: [
    {
      title: 'Emergency Repairs',
      description: 'Fast response for urgent issues when you need help right away.',
    },
    {
      title: 'Scheduled Maintenance',
      description: 'Prevent costly problems with routine service from experienced pros.',
    },
    {
      title: 'Installations & Upgrades',
      description: 'Quality installs done right the first time, with clear upfront pricing.',
    },
    {
      title: 'Inspections & Diagnostics',
      description: 'Thorough assessments so you know exactly what needs attention.',
    },
  ],
  whyUs: [
    {
      title: 'Licensed & Insured',
      description:
        'Every technician is fully licensed, bonded, and insured for your peace of mind.',
    },
    {
      title: 'Transparent Pricing',
      description: 'Upfront quotes with no hidden fees — you approve before any work begins.',
    },
    {
      title: 'Local Team',
      description: 'We live and work in your community, so we know the area and respond quickly.',
    },
    {
      title: 'Satisfaction Guaranteed',
      description: 'We stand behind our work with a 100% satisfaction guarantee on every job.',
    },
  ],
  faqs: [
    {
      question: 'Do you serve {{cityName}}, {{state}}?',
      answer:
        'Yes — {{businessName}} proudly serves {{cityName}} and surrounding areas in {{county}} County.',
    },
    {
      question: 'How quickly can a {{serviceVerb}} reach me in {{cityName}}?',
      answer:
        'For emergencies we aim to arrive within 60 minutes in {{cityName}}. Standard appointments are typically available within 24–48 hours.',
    },
    {
      question: 'Are your {{serviceType}} professionals licensed?',
      answer:
        'Absolutely. Every {{serviceVerb}} on our team is licensed, insured, and background-checked.',
    },
    {
      question: 'What areas near {{cityName}} do you cover?',
      answer:
        'We cover {{cityName}} and all nearby communities in {{county}} County. Call {{phone}} to confirm service at your address.',
    },
  ],
};

type ServiceConfigOverrides = Partial<Omit<ServiceConfig, 'serviceArea' | 'seo' | 'features'>> & {
  serviceArea?: Partial<ServiceConfig['serviceArea']>;
  seo?: Partial<ServiceConfig['seo']>;
  features?: Partial<ServiceConfig['features']>;
};

export function createServiceConfig(overrides: ServiceConfigOverrides = {}): ServiceConfig {
  return {
    ...defaultConfig,
    ...overrides,
    serviceArea: {
      ...defaultConfig.serviceArea,
      ...overrides.serviceArea,
      cities: overrides.serviceArea?.cities ?? defaultConfig.serviceArea.cities,
    },
    seo: {
      ...defaultConfig.seo,
      ...overrides.seo,
    },
    features: {
      ...defaultConfig.features,
      ...overrides.features,
    },
    pricing: overrides.pricing ?? defaultConfig.pricing,
    services: overrides.services ?? defaultConfig.services,
    whyUs: overrides.whyUs ?? defaultConfig.whyUs,
    faqs: overrides.faqs ?? defaultConfig.faqs,
  };
}

/** Active site configuration — override via createServiceConfig() for client projects. */
export const siteConfig = defaultConfig;
