import { create } from 'zustand';
import { APIService } from '@/lib/services/ai/apiService';
import { fetchInstructionByType } from '@fillmore/db';

interface GenerationState {
  status: 'idle' | 'pending' | 'streaming' | 'completed' | 'error';
  fileName?: string;
  prompt?: string;
  uploadedFile?: File;
  preview?: string | null;
  result?: string;
  error?: string;
  streamingContent?: string;
}

interface GenerationActions {
  startGeneration: (
    file: File,
    prompt: string,
    fileName: string,
    preview?: string | null
  ) => Promise<void>;
  startStreamingGeneration: (
    file: File,
    prompt: string,
    fileName: string,
    preview?: string | null
  ) => Promise<void>;
  stopGeneration: () => void;
}

const initState: GenerationState = {
  status: 'idle',
  fileName: undefined,
  prompt: undefined,
  uploadedFile: undefined,
  preview: undefined,
  result: undefined,
  error: undefined,
  streamingContent: undefined,
};

export const useGenerationStore = create<GenerationState & GenerationActions>(
  (set) => ({
    // States
    ...initState,

    // Actions
    startGeneration: async (file, promptText, fileNameText, preview) => {
      try {
        // 1. Set pending start state
        set({
          status: 'pending',
          uploadedFile: file,
          preview: preview,
          fileName: fileNameText,
          prompt: promptText,
          error: undefined,
          result: undefined,
        });

        // 2. Fetch instruction from DB
        const instruction = await fetchInstructionByType('TASKCARD_GENERATION');
        if (!instruction) {
          throw new Error('TASKCARD_GENERATION instruction not found');
        }

        // 3. Create APIService instance and call API
        const apiService = new APIService();
        const streamGenerator = apiService.streamTaskCardGeneration(
          promptText,
          file,
          instruction.content
        );

        let result = '';
        for await (const chunk of streamGenerator) {
          result += chunk;
        }

        // 4. Update state on success (don't auto-open modal)
        set({
          result,
          status: 'completed',
        });
      } catch (error) {
        // 5. Error handling
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';

        set({
          error: errorMessage,
          status: 'error',
          result: undefined,
        });

        console.error('Task card generation failed:', errorMessage);
      }
    },

    startStreamingGeneration: async (
      file,
      promptText,
      fileNameText,
      preview
    ) => {
      try {
        // 1. Set pending start state
        set({
          status: 'pending',
          uploadedFile: file,
          preview: preview,
          fileName: fileNameText,
          prompt: promptText,
          error: undefined,
          result: undefined,
          streamingContent: '',
        });

        // 2. Fetch instruction from DB
        const instruction = await fetchInstructionByType('TASKCARD_GENERATION');
        if (!instruction) {
          throw new Error('TASKCARD_GENERATION instruction not found');
        }

        // 3. Create APIService instance and start streaming
        const apiService = new APIService();
        const streamGenerator = apiService.streamTaskCardGeneration(
          promptText,
          file,
          instruction.content
        );

        let accumulatedContent = '';
        let firstChunk = true;

        // 4. Process streaming chunks
        for await (const chunk of streamGenerator) {
          accumulatedContent += chunk;

          // Change to streaming status on first chunk
          if (firstChunk) {
            set({
              status: 'streaming',
              streamingContent: accumulatedContent,
            });
            firstChunk = false;
          } else {
            set({
              streamingContent: accumulatedContent,
            });
          }
        }

        // 5. Update state on completion
        set({
          result: accumulatedContent,
          status: 'completed',
          streamingContent: undefined,
        });
      } catch (error) {
        // 6. Error handling
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';

        set({
          error: errorMessage,
          status: 'error',
          result: undefined,
          streamingContent: undefined,
        });

        console.error('Task card streaming failed:', errorMessage);
      }
    },

    stopGeneration: () => {
      set({
        status: 'idle',
        streamingContent: undefined,
      });
    },
  })
);
