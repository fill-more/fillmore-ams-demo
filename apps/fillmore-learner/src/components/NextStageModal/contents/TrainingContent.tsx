import { useMemo, useState } from 'react';
import { Button, Text, VStack } from '@fillmore/ui';

import S from './styles';
import { trainingQuestionGroup } from '../content';

const { prompts, options } = trainingQuestionGroup;

interface QuestionView {
  id: string;
  segments: string[];
  blankIds: string[];
}

const questionViews: QuestionView[] = prompts.map((question) => {
  const segments: string[] = question.prompt.split('___');
  const blankIds: string[] = segments
    .slice(1)
    .map((_, index) => `${question.id}-${index}`);

  return {
    id: question.id,
    segments,
    blankIds,
  };
});

const orderedBlankIds: string[] = questionViews.flatMap(
  (question: QuestionView) => question.blankIds
);

const createInitialAnswers: () => Record<string, string> = () =>
  orderedBlankIds.reduce<Record<string, string>>((acc, blankId) => {
    acc[blankId] = '';
    return acc;
  }, {});

const trainingOptionLabelById = options.reduce<Record<string, string>>(
  (acc, option) => {
    acc[option.id] = option.label;
    return acc;
  },
  {}
);

interface BlankPromptProps {
  index: number;
  segments: string[];
  selectedLabels: Array<string | undefined>;
}

interface TrainingContentProps {
  onSubmit: () => void;
}

function TrainingContent({ onSubmit }: TrainingContentProps) {
  const [answers, setAnswers] =
    useState<Record<string, string>>(createInitialAnswers);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => {
      const assignedEntry = Object.entries(prev).find(
        ([, value]) => value === optionId
      );

      if (assignedEntry) {
        const [blankId] = assignedEntry;
        return { ...prev, [blankId]: '' };
      }

      const nextBlankId = orderedBlankIds.find(
        (blankId) => !(prev[blankId] ?? '').length
      );

      if (!nextBlankId) {
        return prev;
      }

      return { ...prev, [nextBlankId]: optionId };
    });
  };

  const BlankPrompt = ({
    index,
    segments,
    selectedLabels,
  }: BlankPromptProps) => {
    const [firstSegment = '', ...restSegments] = segments;

    return (
      <Text as="p" size={14} color="var(--white)">
        {`${index + 1}. ${firstSegment}`}
        {restSegments.map((segment, segmentIndex) => (
          <Text
            as="span"
            key={`segment-${segmentIndex}`}
            size={14}
            color="var(--white)"
          >
            <S.BlankHighlight>
              {selectedLabels[segmentIndex] || ''}
            </S.BlankHighlight>
            {segment}
          </Text>
        ))}
      </Text>
    );
  };

  const allAnswered = useMemo(
    () => orderedBlankIds.every((blankId) => Boolean(answers[blankId])),
    [answers]
  );

  const selectedOptions = useMemo(
    () => Object.values(answers).filter(Boolean),
    [answers]
  );

  return (
    <VStack align="center" gap={24}>
      <S.SectionCard>
        {questionViews.map((question, index) => (
          <BlankPrompt
            key={question.id}
            index={index}
            segments={question.segments}
            selectedLabels={question.blankIds.map(
              (blankId) => trainingOptionLabelById[answers[blankId]]
            )}
          />
        ))}
      </S.SectionCard>

      <S.SectionCard>
        <S.OptionGroup>
          {options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);

            return (
              <Button
                key={option.id}
                variant="dark"
                size="small"
                style={{ opacity: isSelected ? 0.5 : 1 }}
                onClick={() => handleSelect(option.id)}
              >
                {option.label}
              </Button>
            );
          })}
        </S.OptionGroup>
      </S.SectionCard>

      <Button
        variant="dark"
        filled={allAnswered}
        disabled={!allAnswered}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </VStack>
  );
}

export default TrainingContent;
