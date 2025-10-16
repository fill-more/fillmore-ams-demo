import { fileToBase64 } from '@/lib/utils/fileUtils';

interface StreamRequestPayload {
  message: string;
  fileName: string;
  fileBase64: string;
  instruction: string;
  model?: string;
}

interface StreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason?: string | null;
  }>;
}

interface ChatRequestPayload {
  message: string;
  instruction?: string;
  model?: string;
}

export class APIService {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  async *streamTaskCardGeneration(
    message: string,
    file: File,
    instruction: string,
    model?: string
  ): AsyncGenerator<string, void, unknown> {
    try {
      const fileBase64 = await fileToBase64(file);

      const payload: StreamRequestPayload = {
        message,
        fileName: file.name,
        fileBase64,
        instruction,
        model,
      };

      const response = await fetch(`${this.baseURL}/generate-taskcard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const decoded = decoder.decode(value, { stream: true });
          buffer += decoded;
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              if (data === '[DONE]') {
                return;
              }

              try {
                const chunk: StreamChunk = JSON.parse(data);
                const content = chunk.choices[0]?.delta?.content;
                if (content) {
                  yield content;
                }
              } catch (parseError) {
                console.warn('Failed to parse chunk:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Stream Error: ${error.message}`);
      }
      throw new Error('Unknown streaming error');
    }
  }

  async *streamChat(
    message: string,
    instruction?: string,
    model?: string
  ): AsyncGenerator<string, void, unknown> {
    try {
      const payload: ChatRequestPayload = {
        message,
        instruction,
        model,
      };

      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            yield chunk;
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Stream Error: ${error.message}`);
      }
      throw new Error('Unknown streaming error');
    }
  }
}
