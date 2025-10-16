import React, { useState } from 'react';
import { VStack } from '@fillmore/ui';
import dayjs, { Dayjs } from 'dayjs';
import CalendarHeader from './components/CalendarHeader';
import CalendarView from './components/CalendarView';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs('2024-03'));

  return (
    <VStack
      gap={32}
      fullWidth={true}
      style={{ padding: '84px 40px', minHeight: '100vh' }}
    >
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <CalendarView currentDate={currentDate} />
    </VStack>
  );
};

export default CalendarPage;
