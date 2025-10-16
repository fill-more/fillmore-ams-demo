import styled from '@emotion/styled';

const BubbleContent = styled.div<{ isOwn: boolean }>`
  display: flex;
  max-width: 70%;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 5px 10px var(--black-10);
`;

export default {
  BubbleContent,
};
