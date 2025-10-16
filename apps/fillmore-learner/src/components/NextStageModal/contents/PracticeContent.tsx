import { useMemo, useState, type ChangeEvent } from 'react';
import { Button, Text, TextField, VStack } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

import S from './styles';
import { practicePrompts } from '../content';

interface PracticeContentProps {
  onSubmit: () => void;
}

const createInitialEntries = () =>
  practicePrompts.reduce<Record<string, string>>((acc, prompt) => {
    acc[prompt.id] = '';
    return acc;
  }, {});

function PracticeContent({ onSubmit }: PracticeContentProps) {
  const [entries, setEntries] =
    useState<Record<string, string>>(createInitialEntries);

  const handleChange = (
    promptId: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEntries((prev) => ({ ...prev, [promptId]: event.target.value }));
  };

  const allFilled = useMemo(
    () =>
      practicePrompts.every((prompt) =>
        Boolean((entries[prompt.id] ?? '').trim().length)
      ),
    [entries]
  );

  return (
    <VStack align="center" gap={24}>
      {practicePrompts.map((prompt, index) => (
        <S.SectionCard key={prompt.id}>
          <Text as="h3" size={16} color="var(--white)" weight="bold">
            {`Scenario ${index + 1}: ${prompt.title}`}
          </Text>
          <Text as="p" size={14} color="var(--white)">
            {prompt.description}
          </Text>
          <TextField
            value={entries[prompt.id] ?? ''}
            onChange={(event) => handleChange(prompt.id, event)}
            placeholder={'Enter command prompt'}
            icon={
              <FontAwesomeIcon
                icon={faTerminal}
                size="sm"
                color="var(--white)"
              />
            }
            wrapperStyle={{
              padding: '16px',
              backgroundColor: 'var(--black)',
            }}
            style={{ color: 'var(--white)' }}
          />
        </S.SectionCard>
      ))}

      <Button
        variant="dark"
        filled={allFilled}
        disabled={!allFilled}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </VStack>
  );
}

export default PracticeContent;
