import LogoColored from '@/assets/logo-mark/colored.svg';
import S from './styles';
import { useEffect, useRef, useState } from 'react';
import { TextField, VStack } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIChat } from '@/hooks/useAIChat';

const QuickAIButton = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const { messageList, isLoading, sendMessage } = useAIChat();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    setInputValue('');
    await sendMessage(inputValue);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    });
  }, [messageList]);

  return (
    <>
      <S.Overlay isOpen={isOpen}>
        <VStack
          gap={24}
          style={{
            position: 'absolute',
            bottom: 40,
            width: '30%',
          }}
        >
          <VStack
            ref={scrollRef}
            gap={20}
            style={{ overflowY: 'auto', maxHeight: 800, paddingTop: 400 }}
          >
            <AnimatePresence mode="popLayout">
              {messageList.map((message) => {
                if (message.text.trim() === '') return null;
                return (
                  <motion.div
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, layout: { duration: 0.3 } }}
                  >
                    <S.Message $sender={message.sender}>
                      {message.text}
                    </S.Message>
                  </motion.div>
                );
              })}
              {isLoading &&
                messageList[messageList.length - 1]?.sender !== 'ai' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <S.LoadingMessage>
                      <S.LoadingDot delay={0} />
                      <S.LoadingDot delay={0.2} />
                      <S.LoadingDot delay={0.4} />
                    </S.LoadingMessage>
                  </motion.div>
                )}
            </AnimatePresence>
          </VStack>
          <TextField
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />}
            multiline
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onEnterPress={handleSendMessage}
            disabled={isLoading}
          />
        </VStack>
      </S.Overlay>
      <S.Container style={{ zIndex: isOpen ? 1001 : 300 }}>
        <S.CircleWrapper>
          <S.CircleBorder width={200} height={200} isOpen={isOpen} />
          <S.CircleBorder
            width={124}
            height={124}
            isOpen={isOpen}
            style={{
              backgroundColor: isOpen ? 'var(--black-20)' : 'var(--white-20)',
            }}
          />
          <S.Logo
            src={LogoColored}
            alt="AI Assistant"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </S.CircleWrapper>
      </S.Container>
    </>
  );
};

export default QuickAIButton;
