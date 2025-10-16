import styled from '@emotion/styled';

const CalendarContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  overflow: hidden;
  align-self: center;
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
      ? 'radial-gradient(50% 50% at 50% 50%, rgba(170, 204, 228, 0.03) 0%, rgba(97, 124, 143, 0.10) 100%);'
      : 'transparent'};

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
      ? 'linear-gradient(135deg, #0dd4e6 0%, #00e9be 100%)'
      : isSpecial
        ? 'var(--blue)'
        : 'transparent'};
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  color: ${({ isToday }) => (isToday ? 'white' : 'var(--black)')};
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
  DayHeader,
  CalendarCell,
  DateNumber,
};
