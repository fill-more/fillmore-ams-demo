import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import S from './styles';
import { Text } from '@fillmore/ui';
import { DAY_HEADERS } from '@/lib/constants';

interface CalendarEvent {
  id: string;
  title: string;
  date: number;
  type?: 'training' | 'report' | 'check-in' | 'meeting';
}

interface CalendarViewProps {
  currentDate: Dayjs;
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentDate }) => {
  const today = dayjs();
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startOfCalendar = startOfMonth.startOf('week');
  const endOfCalendar = endOfMonth.endOf('week');

  // Sample events data based on the image
  const events: CalendarEvent[] = [
    { id: '1', title: 'Training period kickoff', date: 25, type: 'training' },
    { id: '2', title: 'Daily report', date: 4, type: 'report' },
    { id: '3', title: 'Weekly check-in', date: 5, type: 'check-in' },
    { id: '4', title: 'One on one - Henderson', date: 8, type: 'meeting' },
    { id: '5', title: 'One on one - Brown', date: 10, type: 'meeting' },
    { id: '6', title: 'February report due', date: 11, type: 'report' },
    { id: '7', title: 'Weekly check-in', date: 12, type: 'check-in' },
    { id: '8', title: 'Weekly check-in', date: 19, type: 'check-in' },
  ];

  const getEventsForDate = (date: number, month: number) => {
    if (month !== currentDate.month()) return [];
    return events.filter((event) => event.date === date);
  };

  const isToday = (date: Dayjs) => {
    return date.isSame(today, 'day');
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === currentDate.month();
  };

  const isSpecialDate = (date: number, month: number) => {
    if (month !== currentDate.month()) return false;
    return getEventsForDate(date, month).length > 0;
  };

  const renderCalendarDays = () => {
    const days = [];
    let date = startOfCalendar;

    while (date.isBefore(endOfCalendar) || date.isSame(endOfCalendar)) {
      const dayEvents = getEventsForDate(date.date(), date.month());
      const isTodayDate = isToday(date);
      const isCurrentMonthDate = isCurrentMonth(date);
      const isSpecial = isSpecialDate(date.date(), date.month());

      days.push(
        <S.CalendarCell
          key={date.format('YYYY-MM-DD')}
          isSpecial={isSpecial}
          isCurrentMonth={isCurrentMonthDate}
        >
          <S.DateNumber isSpecial={isSpecial} isToday={isTodayDate}>
            {isTodayDate && (
              <Text as="b" size={10} weight="bold" color="var(--white)">
                TODAY:
              </Text>
            )}
            {date.date()}
          </S.DateNumber>
          {dayEvents.map((event) => (
            <Text as="b" key={event.id} size={12} weight="bold">
              ◆ {event.title}
            </Text>
          ))}
        </S.CalendarCell>
      );
      date = date.add(1, 'day');
    }

    return days;
  };

  return (
    <S.CalendarContainer>
      {DAY_HEADERS.map((day) => (
        <S.DayHeader key={day}>
          <Text as="b" size={16} weight="bold">
            {day}
          </Text>
        </S.DayHeader>
      ))}
      {renderCalendarDays()}
    </S.CalendarContainer>
  );
};

export default CalendarView;
