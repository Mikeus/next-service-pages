export type AIProvider = 'openai' | 'anthropic';

export interface AIClientConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

/**
 * Provider-agnostic AI client stub.
 * Wire up OpenAI or Anthropic SDK in a future phase.
 */
export function createAIClient(config: AIClientConfig) {
  return {
    provider: config.provider,
    model: config.model ?? getDefaultModel(config.provider),
    generate: async (_prompt: string): Promise<string> => {
      throw new Error(
        `AI client not configured. Set up ${config.provider} integration in lib/ai/`,
      );
    },
  };
}

function getDefaultModel(provider: AIProvider): string {
  switch (provider) {
    case 'openai':
      return 'gpt-4o';
    case 'anthropic':
      return 'claude-3-5-sonnet-latest';
    default:
      return 'unknown';
  }
}
