import { useCallback, useState, useEffect } from 'react';
import { useGenerationStore } from '@/stores/generationStore';
import type { Task } from '@/types/task.types';

export interface GenerationRequest {
  file: File;
  prompt: string;
  fileName: string;
  preview?: string | null;
}

interface TaskGenerationResult {
  count: number;
  tasks: Task[];
}

export const useContentGeneration = () => {
  const {
    status,
    fileName,
    prompt,
    uploadedFile,
    preview,
    result,
    error,
    startGeneration,
    startStreamingGeneration,
  } = useGenerationStore();

  // State for parsed tasks - allows for task manipulation
  const [parsedTasks, setParsedTasks] = useState<Task[]>([]);

  // Parse and update tasks when result changes
  useEffect(() => {
    if (!result) {
      setParsedTasks([]);
      return;
    }

    try {
      const parsed: TaskGenerationResult = JSON.parse(result);
      setParsedTasks(parsed.tasks || []);
    } catch (error) {
      console.error('Failed to parse generated tasks:', error);
      setParsedTasks([]);
    }
  }, [result]);

  const generateContent = useCallback(
    async ({ file, prompt, fileName, preview }: GenerationRequest) => {
      await startGeneration(file, prompt, fileName, preview);
    },
    [startGeneration]
  );

  const generateContentWithStreaming = useCallback(
    async ({ file, prompt, fileName, preview }: GenerationRequest) => {
      await startStreamingGeneration(file, prompt, fileName, preview);
    },
    [startStreamingGeneration]
  );

  return {
    // State
    status,
    fileName,
    prompt: prompt,
    uploadedFile,
    preview,
    result,
    error,
    parsedTasks,

    // Actions
    generateContent,
    generateContentWithStreaming,
  };
};
