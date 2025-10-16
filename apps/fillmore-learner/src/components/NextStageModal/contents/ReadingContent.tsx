import { Button, Text, VStack } from '@fillmore/ui';

import S from './styles';
import { readingContent } from '../content';

interface ReadingContentProps {
  onSubmit: () => void;
}

function ReadingContent({ onSubmit }: ReadingContentProps) {
  return (
    <VStack align="center" gap={24}>
      <S.SectionCard>
        <Text as="h2" size={26} color="var(--white)" weight="bold">
          {readingContent.title}
        </Text>
        {readingContent.paragraphs.map((paragraph, idx) => (
          <Text key={idx} as="p" size={14} color="var(--white)">
            {paragraph}
          </Text>
        ))}
      </S.SectionCard>

      <Button variant="dark" filled onClick={onSubmit}>
        Mark as read
      </Button>
    </VStack>
  );
}

export default ReadingContent;
