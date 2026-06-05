import { z } from 'zod';

export const CityConfigSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  county: z.string().min(1).optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
});

export const ServiceOfferingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const WhyUsPointSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const FAQEntrySchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const ServiceConfigSchema = z.object({
  businessName: z.string().min(1),
  serviceType: z.string().min(1),
  serviceVerb: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
  serviceArea: z.object({
    primaryCity: z.string().min(1),
    state: z.string().min(2).max(2),
    cities: z.array(CityConfigSchema).min(1),
  }),
  pricing: z
    .object({
      startingAt: z.number().positive(),
      currency: z.string().length(3),
      unit: z.string().min(1),
    })
    .optional(),
  seo: z.object({
    titleTemplate: z.string().min(1),
    defaultDescription: z.string().min(1),
    ogImage: z.string().min(1),
  }),
  features: z.object({
    aiBlog: z.boolean(),
    onlineBooking: z.boolean(),
    cityPages: z.boolean(),
  }),
  services: z.array(ServiceOfferingSchema).min(1),
  whyUs: z.array(WhyUsPointSchema).min(1),
  faqs: z.array(FAQEntrySchema).min(1),
});

export type CityConfig = z.infer<typeof CityConfigSchema>;
export type ServiceOffering = z.infer<typeof ServiceOfferingSchema>;
export type WhyUsPoint = z.infer<typeof WhyUsPointSchema>;
export type FAQEntry = z.infer<typeof FAQEntrySchema>;
export type ServiceConfig = z.infer<typeof ServiceConfigSchema>;

export const ServiceConfigOverridesSchema = ServiceConfigSchema.partial().extend({
  serviceArea: ServiceConfigSchema.shape.serviceArea.partial().optional(),
  seo: ServiceConfigSchema.shape.seo.partial().optional(),
  features: ServiceConfigSchema.shape.features.partial().optional(),
});

export type ServiceConfigOverrides = z.infer<typeof ServiceConfigOverridesSchema>;

export function parseServiceConfig(config: unknown): ServiceConfig {
  return ServiceConfigSchema.parse(config);
}

export function mergeServiceConfig(
  base: ServiceConfig,
  overrides: ServiceConfigOverrides = {},
): ServiceConfig {
  const parsedOverrides = ServiceConfigOverridesSchema.parse(overrides);

  return ServiceConfigSchema.parse({
    ...base,
    ...parsedOverrides,
    serviceArea: {
      ...base.serviceArea,
      ...parsedOverrides.serviceArea,
      cities: parsedOverrides.serviceArea?.cities ?? base.serviceArea.cities,
    },
    seo: {
      ...base.seo,
      ...parsedOverrides.seo,
    },
    features: {
      ...base.features,
      ...parsedOverrides.features,
    },
  });
}
