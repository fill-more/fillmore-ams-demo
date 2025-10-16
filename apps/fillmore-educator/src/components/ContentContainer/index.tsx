import type { CSSProperties, ReactNode } from 'react';
import { Text, VStack } from '@fillmore/ui';
import S from './styles';

interface ContentContainerProps {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
  padding?: string;
  noPadding?: boolean;
}

function ContentContainer({
  title,
  children,
  style,
  padding,
}: ContentContainerProps) {
  return (
    <VStack gap={12} style={style}>
      <Text as="b" size={16} weight="bold">
        {title}
      </Text>
      <S.Container padding={padding}>{children}</S.Container>
    </VStack>
  );
}

export default ContentContainer;
