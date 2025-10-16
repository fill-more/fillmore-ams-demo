/**
 * Functional message utilities for AI API communication
 */

interface TextContent {
  type: 'text';
  text: string;
}

interface FileContent {
  type: 'file';
  file: {
    filename?: string;
    file_data?: string; // Base64 data URL
    file_id?: string; // Files API ID
  };
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | (TextContent | FileContent)[];
}

/**
 * Create a simple text message
 * @param role - Message role (system, user, assistant)
 * @param content - Text content
 */
export const createTextMessage = (
  role: ChatMessage['role'],
  content: string
): ChatMessage => ({
  role,
  content,
});

/**
 * Create a message with file attachment (Base64)
 * @param role - Message role
 * @param text - Text content
 * @param fileName - Name of the file
 * @param base64Data - Base64 encoded file data
 */
export const createFileMessage = (
  role: ChatMessage['role'],
  text: string,
  fileName: string,
  base64Data: string
): ChatMessage => ({
  role,
  content: [
    {
      type: 'file',
      file: {
        filename: fileName,
        file_data: base64Data,
      },
    },
    {
      type: 'text',
      text,
    },
  ],
});

/**
 * Create a message with file ID (Files API)
 * @param role - Message role
 * @param text - Text content
 * @param fileId - File ID from Files API
 */
export const createFileIdMessage = (
  role: ChatMessage['role'],
  text: string,
  fileId: string
): ChatMessage => ({
  role,
  content: [
    {
      type: 'file',
      file: {
        file_id: fileId,
      },
    },
    {
      type: 'text',
      text,
    },
  ],
});

/**
 * Create a conversation with system instruction and user message
 * @param userMessage - User's message text
 * @param systemInstruction - System instruction
 */
export const createTextConversation = (
  userMessage: string,
  systemInstruction: string
): ChatMessage[] => {
  const messages: ChatMessage[] = [];

  if (systemInstruction.trim()) {
    messages.push(createTextMessage('system', systemInstruction));
  }

  messages.push(createTextMessage('user', userMessage));

  return messages;
};

/**
 * Create a conversation with file attachment (Base64)
 * @param userMessage - User's message text
 * @param fileName - Name of the file
 * @param base64Data - Base64 encoded file data
 * @param systemInstruction - System instruction
 */
export const createFileConversation = (
  userMessage: string,
  fileName: string,
  base64Data: string,
  systemInstruction: string
): ChatMessage[] => {
  const messages: ChatMessage[] = [];

  if (systemInstruction.trim()) {
    messages.push(createTextMessage('system', systemInstruction));
  }

  messages.push(createFileMessage('user', userMessage, fileName, base64Data));

  return messages;
};

/**
 * Create a conversation with file ID (Files API)
 * @param userMessage - User's message text
 * @param fileId - File ID from Files API
 * @param systemInstruction - System instruction
 */
export const createFileIdConversation = (
  userMessage: string,
  fileId: string,
  systemInstruction: string
): ChatMessage[] => {
  const messages: ChatMessage[] = [];

  if (systemInstruction.trim()) {
    messages.push(createTextMessage('system', systemInstruction));
  }

  messages.push(createFileIdMessage('user', userMessage, fileId));

  return messages;
};
