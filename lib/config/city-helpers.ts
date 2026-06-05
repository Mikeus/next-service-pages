import type { CityConfig, FAQEntry, ServiceConfig } from '@/lib/schemas';
import { getClientEnv } from '@/lib/schemas';
import { siteConfig } from './site.config';

export interface CityTemplateContext {
  cityName: string;
  citySlug: string;
  county: string;
  state: string;
  businessName: string;
  serviceType: string;
  serviceVerb: string;
  phone: string;
}

export function getCityBySlug(
  slug: string,
  config: ServiceConfig = siteConfig,
): CityConfig | undefined {
  return config.serviceArea.cities.find((city) => city.slug === slug);
}

export function getAllCitySlugs(config: ServiceConfig = siteConfig): string[] {
  return config.serviceArea.cities.map((city) => city.slug);
}

export function buildCityContext(
  city: CityConfig,
  config: ServiceConfig = siteConfig,
): CityTemplateContext {
  return {
    cityName: city.name,
    citySlug: city.slug,
    county: city.county ?? config.serviceArea.primaryCity,
    state: config.serviceArea.state,
    businessName: config.businessName,
    serviceType: config.serviceType,
    serviceVerb: config.serviceVerb,
    phone: config.phone,
  };
}

export function interpolateTemplate(template: string, context: CityTemplateContext): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    if (key in context) {
      return context[key as keyof CityTemplateContext];
    }
    return match;
  });
}

export function resolveCityFaqs(
  faqs: FAQEntry[],
  context: CityTemplateContext,
): Array<{ question: string; answer: string }> {
  return faqs.map((faq) => ({
    question: interpolateTemplate(faq.question, context),
    answer: interpolateTemplate(faq.answer, context),
  }));
}

export function formatPageTitle(pageTitle: string, config: ServiceConfig = siteConfig): string {
  return config.seo.titleTemplate.replace('%s', pageTitle);
}

export function capitalizeServiceType(serviceType: string): string {
  return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
}

export function getSiteUrl(): string {
  return getClientEnv().NEXT_PUBLIC_SITE_URL;
}

export function formatPricingLabel(config: ServiceConfig): string | undefined {
  if (!config.pricing) {
    return undefined;
  }

  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config.pricing.currency,
    maximumFractionDigits: 0,
  }).format(config.pricing.startingAt);

  return `Starting at ${amount} ${config.pricing.unit}`;
}

export function buildCityDescription(city: CityConfig, config: ServiceConfig = siteConfig): string {
  return `${config.businessName} provides trusted ${config.serviceType} in ${city.name}, ${config.serviceArea.state}. Call ${config.phone} for fast, local service.`;
}

export function buildCityHeadline(city: CityConfig, config: ServiceConfig = siteConfig): string {
  return `${capitalizeServiceType(config.serviceType)} in ${city.name}`;
}
