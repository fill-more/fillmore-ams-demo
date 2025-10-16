import styled from '@emotion/styled';
import fillmoreGradient from '@/assets/fillmore-gradient.png';

const CalendarContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  overflow: hidden;
  align-self: center;
`;

const DayHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayHeader = styled.div`
  padding: 12px 8px;
  border-bottom: 1px solid var(--black-10);

  &:last-child {
    border-right: none;
  }
`;

const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: var(--black-20);
  backdrop-filter: blur(12px);
`;

const CalendarCell = styled.div<{
  isSpecial: boolean;
  isCurrentMonth: boolean;
}>`
  min-height: 100px;
  padding: 8px;
  border-bottom: 1px solid var(--black-10);
  border-right: 1px solid var(--black-10);
  background: ${({ isSpecial }) =>
    isSpecial
      ? 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.10) 100%);'
      : 'var(--black-10)'};

  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? '1' : '0.2')};

  &:nth-of-type(7n + 1) {
    border-left: 1px solid var(--black-10);
  }

  &:nth-of-type(7n) {
    border-right: 1px solid var(--black-10);
  }
`;

const DateNumber = styled.div<{ isSpecial: boolean; isToday: boolean }>`
  background: ${({ isSpecial, isToday }) =>
    isToday
      ? `url(${fillmoreGradient})`
      : isSpecial
        ? 'var(--blue-50)'
        : 'transparent'};

  background-size: cover;
  background-position: center;
  border-radius: 16px;
  color: var(--white);
  font-size: 14px;
  font-weight: bold;
  align-self: flex-end;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ isToday }) => (isToday ? 'auto' : '24px')};
  height: 24px;
  padding: 0 8px;
`;

export default {
  CalendarContainer,
  DayHeaderContainer,
  DayHeader,
  CellContainer,
  CalendarCell,
  DateNumber,
};
