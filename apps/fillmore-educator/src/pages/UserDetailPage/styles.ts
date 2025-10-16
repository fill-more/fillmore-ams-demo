import styled from '@emotion/styled';

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 8px;
  direction: rtl;
`;

const RecommendationLabel = styled.div`
  background-color: var(--blue);
  color: var(--white);
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  padding: 4px 12px;
`;

const TraineeListContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export default {
  AchievementsGrid,
  RecommendationLabel,
  TraineeListContainer,
};
