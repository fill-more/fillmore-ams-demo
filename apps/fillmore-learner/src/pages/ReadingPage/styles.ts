import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { TaskType } from '@/types/task.types';
import { getTaskColors } from '@/lib/presenters/taskStyles';

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  max-width: 600px;
  padding: 0 24px;
  margin: 0 auto;
  text-align: center;
`;

const MissionBadge = styled.div<{ $type: TaskType }>(
  ({ $type }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    background-color: var(--black-40);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(to right, ${getTaskColors($type)});
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;
    }
  `
);

export default {
  CenterContent,
  MissionBadge,
};
