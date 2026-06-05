import { z } from 'zod';

export const ClientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_CONTACT_PHONE: z.string().optional(),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().optional(),
});

export const ServerEnvSchema = ClientEnvSchema.extend({
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  AI_PROVIDER: z.enum(['openai', 'anthropic']).default('openai'),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL: z.string().min(1).optional(),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  ANTHROPIC_MODEL: z.string().min(1).optional(),
});

export type ClientEnv = z.infer<typeof ClientEnvSchema>;
export type ServerEnv = z.infer<typeof ServerEnvSchema>;

let cachedServerEnv: ServerEnv | undefined;
let cachedClientEnv: ClientEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (!cachedServerEnv) {
    cachedServerEnv = ServerEnvSchema.parse(process.env);
  }
  return cachedServerEnv;
}

export function getClientEnv(): ClientEnv {
  if (!cachedClientEnv) {
    cachedClientEnv = ClientEnvSchema.parse(process.env);
  }
  return cachedClientEnv;
}

export function resetEnvCache(): void {
  cachedServerEnv = undefined;
  cachedClientEnv = undefined;
}

export const AIProviderConfigInputSchema = z.object({
  provider: z.enum(['openai', 'anthropic']).optional(),
  apiKey: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
});

export type AIProviderConfigInput = z.infer<typeof AIProviderConfigInputSchema>;

export function resolveAIProviderConfig(input: AIProviderConfigInput = {}): {
  provider: 'openai' | 'anthropic';
  apiKey: string;
  model?: string;
} {
  const env = getServerEnv();
  const parsed = AIProviderConfigInputSchema.parse(input);
  const provider = parsed.provider ?? env.AI_PROVIDER;

  if (provider === 'openai') {
    const apiKey = parsed.apiKey ?? env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    return {
      provider,
      apiKey,
      model: parsed.model ?? env.OPENAI_MODEL,
    };
  }

  const apiKey = parsed.apiKey ?? env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }

  return {
    provider,
    apiKey,
    model: parsed.model ?? env.ANTHROPIC_MODEL,
  };
}
