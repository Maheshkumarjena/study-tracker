'use client';

import { SCHEDULE } from '../data/schedule';

interface Props {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function getWeekDates(anchor: Date) {
  // Get Mon-Sun of the week containing anchor
  const d = new Date(anchor);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(monday);
    dt.setDate(monday.getDate() + i);
    return dt;
  });
}

export default function WeekNav({ currentDate, onDateChange }: Props) {
  const weekDates = getWeekDates(currentDate);
  const today = new Date();

  function shiftWeek(delta: number) {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + delta * 7);
    onDateChange(next);
  }

  const monthLabel = currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      padding: '10px 16px',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Month + week nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <button onClick={() => shiftWeek(-1)} style={btnStyle}>← prev</button>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>{monthLabel}</span>
          <button onClick={() => shiftWeek(1)} style={btnStyle}>next →</button>
        </div>

        {/* Day pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {weekDates.map((date, i) => {
            const dayData = SCHEDULE[i];
            const isSelected = isSameDay(date, currentDate);
            const isToday = isSameDay(date, today);
            return (
              <button
                key={i}
                onClick={() => onDateChange(date)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: '6px 4px',
                  borderRadius: 8,
                  border: isSelected ? '1.5px solid var(--text)' : '1px solid transparent',
                  background: isSelected ? 'var(--surface)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                }}
              >
                <span style={{ fontSize: 10, color: isToday ? 'var(--genai)' : 'var(--text-3)', fontWeight: isToday ? 600 : 400, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {dayData.name.slice(0, 3)}
                </span>
                <span style={{
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  color: isToday ? 'var(--genai)' : isSelected ? 'var(--text)' : 'var(--text-2)',
                  lineHeight: 1,
                }}>
                  {date.getDate()}
                </span>
                {isToday && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--genai)' }} />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

const btnStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--text-2)',
  background: 'none',
  border: '1px solid var(--border)',
  borderRadius: 6,
  padding: '4px 10px',
  cursor: 'pointer',
};
