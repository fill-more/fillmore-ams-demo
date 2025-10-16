import { GPTService } from './gptService';

export const createGPTService = (apiKey: string) => {
  try {
    return new GPTService(apiKey);
  } catch (error) {
    throw new Error(
      `Failed to create GPTService: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
