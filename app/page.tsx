'use client';

import { useState } from 'react';
import { SCHEDULE } from './data/schedule';
import DayView from './components/DayView';
import WeekNav from './components/WeekNav';

function getDaySchedule(date: Date) {
  const jsDay = date.getDay();
  const scheduleIdx = jsDay === 0 ? 6 : jsDay - 1;
  return SCHEDULE[scheduleIdx];
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const day = getDaySchedule(currentDate);
  const dateStr = currentDate.toISOString().split('T')[0];

  return (
    <>
      <WeekNav currentDate={currentDate} onDateChange={setCurrentDate} />
      <DayView day={day} dateStr={dateStr} date={currentDate} />
    </>
  );
}
