import { type FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IconButton, Text, VStack } from '@fillmore/ui';

import S from './styles';

export interface PriorityItemData {
  id: string;
  title: string;
  description: string;
  icon: IconDefinition;
}

interface PriorityItemProps {
  item: PriorityItemData;
}

const PriorityItem: FC<PriorityItemProps> = ({ item }) => (
  <S.Card>
    <IconButton>
      <FontAwesomeIcon size="lg" icon={item.icon} color="var(--white)" />
    </IconButton>
    <VStack gap={4} align="start">
      <Text as="b" size={16} weight="bold" color="var(--white)">
        {item.title}
      </Text>
      <Text as="span" size={12} color="var(--white)">
        {item.description}
      </Text>
    </VStack>
    <FontAwesomeIcon
      icon={faCaretRight}
      color="var(--white)"
      style={{ marginLeft: 'auto' }}
      size="sm"
    />
  </S.Card>
);

export default PriorityItem;
