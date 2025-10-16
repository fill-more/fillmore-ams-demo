import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { HStack, IconButton, TextField, VStack } from '@fillmore/ui';
import SuggestedTask from './SuggestedTask';
import coloredLogo from '@/assets/logo-mark/colored.svg';
import { useSuggestedTask } from '@/hooks/useSuggestedTask';
import type { Task } from '@/types/task.types';

interface ChatInputProps {
  onTaskAccepted?: (task: Task) => void;
  onSendMessage?: (content: string) => void;
}

function ChatInput({ onTaskAccepted, onSendMessage }: ChatInputProps) {
  // TODO: Replace with zustand hook when available
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLogoColored, setIsLogoColored] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  // Use the suggested task store
  const { isVisible, generateTask, setOnTaskAccepted } = useSuggestedTask();

  // Set up callback for task acceptance
  useEffect(() => {
    if (onTaskAccepted) {
      setOnTaskAccepted(onTaskAccepted);
    }
  }, [onTaskAccepted, setOnTaskAccepted]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);

    if (isLogoColored) {
      await generateTask(newMessage);
    } else {
      onSendMessage?.(newMessage);
    }

    setNewMessage('');

    setIsSending(false);
  };

  const handleLogoClick = () => {
    setIsLogoColored(!isLogoColored);
  };

  return (
    <VStack gap={16} style={{ backgroundColor: 'var(--white)' }}>
      {isVisible && <SuggestedTask />}

      <HStack align="center" gap={12}>
        <IconButton onClick={handleLogoClick}>
          <img
            src={coloredLogo}
            width={32}
            height={32}
            style={{
              filter: `brightness(${isLogoColored ? '1' : '0'})`,
              transition: 'filter 0.3s ease',
            }}
          />
        </IconButton>
        <TextField
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onEnterPress={handleSendMessage}
          wrapperStyle={{
            border: `1px solid ${isLogoColored ? '#0DD4E6' : 'var(--black-20)'}`,
            borderRadius: '8px',
            padding: '12px 16px',
            flex: '1',
            transition: 'border-color 0.3s ease',
          }}
        />
        <IconButton onClick={handleSendMessage} isLoading={isSending}>
          <FontAwesomeIcon size="lg" icon={faPaperPlane} />
        </IconButton>
      </HStack>
    </VStack>
  );
}

export default ChatInput;
