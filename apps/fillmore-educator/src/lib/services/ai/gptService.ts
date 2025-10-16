import axios from 'axios';
import { fileToBase64, validatePDFFile } from '@/lib/utils/fileUtils';
import { GPT_CONFIG } from '@/lib/constants/models';
import {
  createTextConversation,
  createFileConversation,
  createFileIdConversation,
} from './messageBuilder';

interface OpenAIChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface OpenAIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChoice[];
  usage: OpenAIUsage;
}

interface OpenAIStreamChunk {
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

interface OpenAIErrorResponse {
  error: {
    message: string;
    type?: string;
    param?: string;
    code?: string;
  };
}

interface AxiosErrorWithResponse extends Error {
  response?: {
    data?: OpenAIErrorResponse;
    status?: number;
  };
  request?: unknown;
}

interface FileUploadResponse {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
}

export class GPTService {
  private apiKey: string;
  private baseURL: string = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    if (!apiKey || apiKey.trim() === '') {
      throw new Error('API key is required to create GPTService instance.');
    }

    if (!this.validateApiKey()) {
      throw new Error(
        'Invalid API key format. Must start with "sk-" and be at least 50 characters long.'
      );
    }
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  async sendMessage(
    message: string,
    instruction: string,
    model: string = GPT_CONFIG.DEFAULT_MODEL
  ): Promise<string> {
    try {
      const messages = createTextConversation(message, instruction);

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model,
          messages,
        },
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;

      if (axiosError.response?.data?.error) {
        throw new Error(
          `API Error: ${axiosError.response.data.error.message || 'Unknown error'}`
        );
      }

      if (axiosError.request) {
        throw new Error('Network Error: No response received from the server');
      }

      const errorMessage = axiosError.message || 'Unknown error occurred';
      throw new Error(`Unexpected Error: ${errorMessage}`);
    }
  }

  async sendMessageWithFile(
    message: string,
    file: File,
    instruction: string,
    model: string = GPT_CONFIG.DEFAULT_MODEL
  ): Promise<string> {
    try {
      // 1. File validation
      const validation = validatePDFFile(file, GPT_CONFIG.MAX_FILE_SIZE);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // 2. Encoding the file to Base64
      const base64Data = await fileToBase64(file);

      // 3. Preparing the message content using functional utilities
      const messages = createFileConversation(
        message,
        file.name,
        base64Data,
        instruction
      );

      // 4. Sending the request
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model,
          messages,
        },
        { headers: this.getHeaders() }
      );

      return response.data.choices[0].message.content;
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;

      if (axiosError.response?.data?.error) {
        throw new Error(
          `API Error: ${axiosError.response.data.error.message || 'Unknown error'}`
        );
      }

      if (axiosError.request) {
        throw new Error('Network Error: No response received from the server');
      }

      const errorMessage = axiosError.message || 'Unknown error occurred';
      throw new Error(`File Upload Error: ${errorMessage}`);
    }
  }

  async sendMessageWithUsage(
    message: string,
    instruction: string,
    model: string = GPT_CONFIG.DEFAULT_MODEL
  ): Promise<{
    content: string;
    usage: OpenAIUsage;
    fullResponse: OpenAIResponse;
  }> {
    try {
      const messages = createTextConversation(message, instruction);

      const response = await axios.post<OpenAIResponse>(
        `${this.baseURL}/chat/completions`,
        {
          model,
          messages,
        },
        { headers: this.getHeaders() }
      );

      return {
        content: response.data.choices[0]?.message?.content || '',
        usage: response.data.usage,
        fullResponse: response.data,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;

      if (axiosError.response?.data?.error) {
        throw new Error(
          `API Error: ${axiosError.response.data.error.message || 'Unknown error'}`
        );
      }

      if (axiosError.request) {
        throw new Error('Network Error: No response received from the server');
      }

      const errorMessage = axiosError.message || 'Unknown error occurred';
      throw new Error(`Unexpected Error: ${errorMessage}`);
    }
  }

  async sendMessageWithFileAndUsage(
    message: string,
    file: File,
    instruction: string,
    model: string = GPT_CONFIG.DEFAULT_MODEL
  ): Promise<{
    content: string;
    usage: OpenAIUsage;
    fullResponse: OpenAIResponse;
  }> {
    try {
      // 1. File validation
      const validation = validatePDFFile(file, GPT_CONFIG.MAX_FILE_SIZE);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // 2. Encoding the file to Base64
      const base64Data = await fileToBase64(file);

      // 3. Preparing the message content using functional utilities
      const messages = createFileConversation(
        message,
        file.name,
        base64Data,
        instruction
      );

      // 4. Sending the request
      const response = await axios.post<OpenAIResponse>(
        `${this.baseURL}/chat/completions`,
        {
          model,
          messages,
        },
        { headers: this.getHeaders() }
      );

      return {
        content: response.data.choices[0]?.message?.content || '',
        usage: response.data.usage,
        fullResponse: response.data,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;

      if (axiosError.response?.data?.error) {
        throw new Error(
          `API Error: ${axiosError.response.data.error.message || 'Unknown error'}`
        );
      }

      if (axiosError.request) {
        throw new Error('Network Error: No response received from the server');
      }

      const errorMessage = axiosError.message || 'Unknown error occurred';
      throw new Error(`File Upload Error: ${errorMessage}`);
    }
  }

  private validateApiKey(): boolean {
    return this.apiKey.startsWith('sk-') && this.apiKey.length >= 50;
  }

  async uploadFileToOpenAI(file: File): Promise<FileUploadResponse> {
    try {
      // 1. File validation
      const validation = validatePDFFile(file, GPT_CONFIG.MAX_FILE_SIZE);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // 2. Prepare FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('purpose', 'user_data');

      // 3. Call Files API
      const response = await axios.post<FileUploadResponse>(
        `${this.baseURL}/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;

      if (axiosError.response?.data?.error) {
        throw new Error(
          `File Upload API Error: ${
            axiosError.response.data.error.message || 'Unknown error'
          }`
        );
      }

      if (axiosError.request) {
        throw new Error('Network Error: No response received from the server');
      }

      const errorMessage = axiosError.message || 'Unknown error occurred';
      throw new Error(`File Upload Error: ${errorMessage}`);
    }
  }

  async sendMessageWithFileUpload(
    message: string,
    file: File,
    instruction: string,
    model: string = GPT_CONFIG.DEFAULT_MODEL
  ): Promise<string> {
    try {
      // 1. Upload the file and get file_id
      const uploadedFile = await this.uploadFileToOpenAI(file);

      // 2. Preparing the message content using functional utilities
      const messages = createFileIdConversation(
        message,
        uploadedFile.id,
        instruction
      );

      // 3. Sending the request
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model,
          messages,
        },
        { headers: this.getHeaders() }
      );

      return response.data.choices[0].message.content;
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithResponse;

      if (axiosError.response?.data?.error) {
        throw new Error(
          `API Error: ${axiosError.response.data.error.message || 'Unknown error'}`
        );
      }

      if (axiosError.request) {
        throw new Error('Network Error: No response received from the server');
      }

      const errorMessage = axiosError.message || 'Unknown error occurred';
      throw new Error(`File Upload Error: ${errorMessage}`);
    }
  }

  async *sendMessageWithFileStream(
    message: string,
    file: File,
    instruction: string,
    model: string = GPT_CONFIG.DEFAULT_MODEL
  ): AsyncGenerator<string, void, unknown> {
    try {
      // 1. File validation
      const validation = validatePDFFile(file, GPT_CONFIG.MAX_FILE_SIZE);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // 2. Encoding the file to Base64
      const base64Data = await fileToBase64(file);

      // 3. Preparing the message content using functional utilities
      const messages = createFileConversation(
        message,
        file.name,
        base64Data,
        instruction
      );

      // 4. Sending the streaming request
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${errorData.error?.message || 'Unknown error'}`
        );
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
          if (done) {
            break;
          }

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
                const chunk: OpenAIStreamChunk = JSON.parse(data);
                const content = chunk.choices[0]?.delta?.content;
                if (content) {
                  yield content;
                }
              } catch (parseError) {
                console.warn(
                  '⚠️ Failed to parse chunk:',
                  parseError,
                  'Data:',
                  data
                );
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Stream Error: ${error.message}`);
      }
      throw new Error('Unknown streaming error occurred');
    }
  }
}
