import { describe, expect, it } from 'vitest';
import {
  buildCityContext,
  buildCityHeadline,
  formatPageTitle,
  interpolateTemplate,
  resolveCityFaqs,
  siteConfig,
} from '@/lib/config';

describe('interpolateTemplate', () => {
  it('replaces placeholders with context values', () => {
    const context = buildCityContext(siteConfig.serviceArea.cities[0]!, siteConfig);

    expect(interpolateTemplate('Hello {{cityName}} in {{state}}', context)).toBe(
      'Hello Austin in TX',
    );
  });
});

describe('resolveCityFaqs', () => {
  it('resolves city-aware FAQ entries', () => {
    const city = siteConfig.serviceArea.cities[0]!;
    const context = buildCityContext(city, siteConfig);
    const faqs = resolveCityFaqs(siteConfig.faqs.slice(0, 1), context);

    expect(faqs[0]?.question).toContain('Austin');
    expect(faqs[0]?.answer).toContain(siteConfig.businessName);
  });
});

describe('formatPageTitle', () => {
  it('applies the title template from config', () => {
    expect(formatPageTitle('Home services in Austin')).toBe(
      'Home services in Austin | Summit Local Services',
    );
  });
});

describe('buildCityHeadline', () => {
  it('follows the service-in-city pattern', () => {
    const city = siteConfig.serviceArea.cities[0]!;

    expect(buildCityHeadline(city, siteConfig)).toBe('Home services in Austin');
  });
});
