import styled from '@emotion/styled';

const AlertButton = styled.button<{ isSelected: boolean }>`
  transition: opacity 0.3s;
  background-color: #0dd4e6;
  color: var(--white);
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  padding: 4px 12px;
  cursor: pointer;

  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
`;

const RecommendationButton = styled.button<{ isSelected: boolean }>`
  transition: opacity 0.3s;
  background-color: var(--blue);
  color: var(--white);
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  padding: 4px 12px;
  cursor: pointer;

  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
`;

export default {
  AlertButton,
  RecommendationButton,
};
