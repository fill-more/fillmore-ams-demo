import React, { useMemo } from 'react';
import { HStack, Button, Dropdown, IconButton, Text } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import arrowLeft from '@/assets/arrow-left.svg';
import arrowRight from '@/assets/arrow-right.svg';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarNavigationProps {
  currentDate: Dayjs;
  onDateChange: (date: Dayjs) => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentDate,
  onDateChange,
}) => {
  const handlePrevMonth = () => {
    onDateChange(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    onDateChange(currentDate.add(1, 'month'));
  };

  const handleToday = () => {
    onDateChange(dayjs());
  };

  const handleNewSchedule = () => {
    console.log('New Schedule clicked');
  };

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const monthDate = dayjs().month(index).year(currentDate.year());
        return {
          value: `${currentDate.year()}-${index}`,
          label: monthDate.format('MMMM YYYY'),
        };
      }),
    [currentDate.year()]
  );

  const handleMonthChange = (value: string) => {
    const [year, month] = value.split('-');
    onDateChange(dayjs().year(parseInt(year)).month(parseInt(month)));
  };

  const currentMonthYear = `${currentDate.year()}-${currentDate.month()}`;

  return (
    <HStack
      align="center"
      justify="center"
      gap={16}
      style={{ padding: '0 24px' }}
    >
      <HStack align="center" gap={8}>
        <IconButton onClick={handlePrevMonth} title="Previous month">
          <img src={arrowLeft} width={32} height={32} alt="Previous month" />
        </IconButton>
        <Button variant="light" size="small" onClick={handleToday}>
          Today
        </Button>
        <IconButton onClick={handleNextMonth} title="Next month">
          <img src={arrowRight} width={32} height={32} alt="Next month" />
        </IconButton>
      </HStack>

      <HStack align="center">
        <Dropdown
          options={monthOptions}
          value={currentMonthYear}
          onChange={handleMonthChange}
        />
      </HStack>

      <Button size="small" onClick={handleNewSchedule}>
        <HStack align="center" justify="center" gap={8}>
          <FontAwesomeIcon icon={faCirclePlus} size="sm" />
          <Text as="span" size={14}>
            New Schedule
          </Text>
        </HStack>
      </Button>
    </HStack>
  );
};

export default CalendarNavigation;
