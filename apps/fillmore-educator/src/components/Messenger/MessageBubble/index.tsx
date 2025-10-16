import type { ReactNode } from 'react';
import { HStack } from '@fillmore/ui';
import ProfileImage from '@/components/ProfileImage';
import S from './styles';

interface MessageBubbleProps {
  children: ReactNode;
  isOwn: boolean;
  profileImage?: string | null;
  displayName?: string;
}

function MessageBubble({
  children,
  isOwn,
  profileImage,
  displayName,
}: MessageBubbleProps) {
  if (isOwn) {
    return (
      <HStack align="end" gap={8} justify="end">
        <S.BubbleContent isOwn={true}>{children}</S.BubbleContent>
        <ProfileImage src={null} size={32} borderColor="var(--black-20)" />
      </HStack>
    );
  }

  return (
    <HStack align="end" gap={8}>
      <ProfileImage
        src={profileImage || null}
        alt={displayName}
        size={32}
        borderColor="var(--black-50)"
      />
      <S.BubbleContent isOwn={false}>{children}</S.BubbleContent>
    </HStack>
  );
}

export default MessageBubble;
