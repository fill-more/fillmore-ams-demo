import { useState } from 'react';
import { APIService } from '@/lib/services/ai/apiService';
import { fetchInstructionByType } from '@fillmore/db';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export const useAIChat = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addOrUpdateAIMessage = (id: string | null, text: string): string => {
    if (!id) {
      const newId = crypto.randomUUID();
      setMessageList((prev) => [
        ...prev,
        { id: newId, text, sender: 'ai' as const },
      ]);
      return newId;
    }

    setMessageList((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text } : msg))
    );
    return id;
  };

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setMessageList((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: userMessage, sender: 'user' },
    ]);

    setIsLoading(true);
    let aiMessageId: string | null = null;

    try {
      const instruction = await fetchInstructionByType('SYSTEM');
      if (!instruction) {
        throw new Error('SYSTEM instruction not found');
      }

      const apiService = new APIService();
      let accumulatedText = '';

      for await (const chunk of apiService.streamChat(
        userMessage,
        instruction.content
      )) {
        accumulatedText += chunk;
        aiMessageId = addOrUpdateAIMessage(aiMessageId, accumulatedText);
      }
    } catch (error) {
      console.error('Stream error:', error);
      const errorMessage = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      addOrUpdateAIMessage(aiMessageId, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messageList,
    isLoading,
    sendMessage,
  };
};
