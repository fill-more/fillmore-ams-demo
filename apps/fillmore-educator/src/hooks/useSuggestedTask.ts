import { create } from 'zustand';
import type { TaskType, Task } from '@/types/task.types';

interface SuggestedTaskState {
  // States
  isVisible: boolean;
  isLoading: boolean;
  promptText: string;
  suggestedTask: Task | null;
  onTaskAccepted?: (task: Task) => void;

  // Actions
  generateTask: (prompt: string) => Promise<void>;
  acceptTask: () => void;
  rejectTask: () => void;
  setOnTaskAccepted: (callback: (task: Task) => void) => void;
}

export const useSuggestedTask = create<SuggestedTaskState>((set, get) => ({
  // Initial states
  isVisible: false,
  isLoading: false,
  promptText: '',
  suggestedTask: null,
  onTaskAccepted: undefined,

  // Actions
  generateTask: async (prompt: string) => {
    // Immediately show UI with prompt and loading
    set({
      promptText: prompt,
      isVisible: true,
      isLoading: true,
      suggestedTask: null,
    });

    // Wait for the unified API response (same duration as message sending)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock API response - in real implementation, this would come from the unified API
    const mockTask: Task = {
      title: 'Reading Task',
      content: 'Creating a small and nimble rapid-response team',
      type: 'reading' as TaskType,
    };

    set({
      suggestedTask: mockTask,
      isLoading: false,
    });
  },

  acceptTask: () => {
    const { suggestedTask, onTaskAccepted } = get();
    if (suggestedTask && onTaskAccepted) {
      onTaskAccepted(suggestedTask);
    }
    set({
      isVisible: false,
      promptText: '',
      suggestedTask: null,
    });
  },

  rejectTask: () => {
    set({
      isVisible: false,
      promptText: '',
      suggestedTask: null,
    });
  },

  setOnTaskAccepted: (callback: (task: Task) => void) => {
    set({ onTaskAccepted: callback });
  },
}));
