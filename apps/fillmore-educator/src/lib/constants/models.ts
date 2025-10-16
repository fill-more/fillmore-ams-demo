/**
 * OpenAI GPT model constants
 */

export const GPT_MODELS = {
  gpt5: 'gpt-5',
  gpt5mini: 'gpt-5-mini',
  gpt5nano: 'gpt-5-nano',
} as const;

/**
 * Default configuration for GPT API calls
 */
export const GPT_CONFIG = {
  DEFAULT_MODEL: GPT_MODELS.gpt5mini,

  // File upload limits
  MAX_FILE_SIZE: 32 * 1024 * 1024, // 32MB
} as const;
