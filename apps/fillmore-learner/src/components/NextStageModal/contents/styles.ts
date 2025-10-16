import styled from '@emotion/styled';

const SectionCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--white-10);
`;

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const BlankHighlight = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  margin: 0 4px;
  color: var(--blue);
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid var(--white-30);
`;

export default { SectionCard, OptionGroup, BlankHighlight };
