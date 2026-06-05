export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  defaultCity: string;
  cities: string[];
  contact: {
    phone?: string;
    email?: string;
  };
  ai: {
    provider: 'openai' | 'anthropic';
    enabled: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Your Service Business',
  description: 'Professional local services you can trust.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  defaultCity: 'austin',
  cities: ['austin', 'dallas', 'houston'],
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },
  ai: {
    provider: 'openai',
    enabled: false,
  },
};
