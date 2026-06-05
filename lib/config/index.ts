export {
  createServiceConfig,
  defaultConfig,
  siteConfig,
  type CityConfig,
  type FAQEntry,
  type ServiceConfig,
  type ServiceOffering,
  type WhyUsPoint,
} from './site.config';

export {
  buildCityContext,
  buildCityDescription,
  buildCityHeadline,
  capitalizeServiceType,
  formatPageTitle,
  formatPricingLabel,
  getAllCitySlugs,
  getCityBySlug,
  getSiteUrl,
  interpolateTemplate,
  resolveCityFaqs,
  type CityTemplateContext,
} from './city-helpers';
