import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import {
  AIProviderConfigInputSchema,
  resolveAIProviderConfig,
  type AIProviderConfigInput,
} from '@/lib/schemas';

export interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface AIProvider {
  generateText(prompt: string, options?: GenerateOptions): Promise<string>;
}

export type AIProviderName = 'openai' | 'anthropic';

export interface AIProviderConfig {
  provider: AIProviderName;
  apiKey: string;
  model?: string;
}

const DEFAULT_MODELS: Record<AIProviderName, string> = {
  openai: 'gpt-4o',
  anthropic: 'claude-3-5-sonnet-latest',
};

export class OpenAIProvider implements AIProvider {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(config: AIProviderConfig) {
    this.client = new OpenAI({ apiKey: config.apiKey });
    this.model = config.model ?? DEFAULT_MODELS.openai;
  }

  async generateText(prompt: string, options: GenerateOptions = {}): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        ...(options.systemPrompt
          ? [{ role: 'system' as const, content: options.systemPrompt }]
          : []),
        { role: 'user' as const, content: prompt },
      ],
      max_tokens: options.maxTokens ?? 4096,
      temperature: options.temperature ?? 0.7,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error('OpenAI returned an empty response');
    }

    return content;
  }
}

export class AnthropicProvider implements AIProvider {
  private readonly client: Anthropic;
  private readonly model: string;

  constructor(config: AIProviderConfig) {
    this.client = new Anthropic({ apiKey: config.apiKey });
    this.model = config.model ?? DEFAULT_MODELS.anthropic;
  }

  async generateText(prompt: string, options: GenerateOptions = {}): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: options.maxTokens ?? 4096,
      temperature: options.temperature ?? 0.7,
      system: options.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find((block) => block.type === 'text');

    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('Anthropic returned an empty response');
    }

    return textBlock.text;
  }
}

export function createAIProvider(config: AIProviderConfigInput = {}): AIProvider {
  const parsedInput = AIProviderConfigInputSchema.parse(config);
  const resolved = resolveAIProviderConfig(parsedInput);
  const fullConfig: AIProviderConfig = resolved;

  switch (fullConfig.provider) {
    case 'openai':
      return new OpenAIProvider(fullConfig);
    case 'anthropic':
      return new AnthropicProvider(fullConfig);
    default: {
      const exhaustiveCheck: never = fullConfig.provider;
      throw new Error(`Unsupported AI provider: ${exhaustiveCheck}`);
    }
  }
}

export function getDefaultModel(provider: AIProviderName): string {
  return DEFAULT_MODELS[provider];
}
