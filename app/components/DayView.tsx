'use client';

import { DaySchedule, CATEGORY_STYLES, SCHEDULE } from '../data/schedule';
import BlockCard from './BlockCard';
import { useStudyStore } from '../hooks/useStudyStore';

interface Props {
  day: DaySchedule;
  dateStr: string;
  date: Date;
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DayView({ day, dateStr, date }: Props) {
  const { getBlock, updateBlock, hydrated } = useStudyStore();

  const activeBlocks = day.blocks.filter(b => !b.isBreak);
  const doneCount = activeBlocks.filter(b => getBlock(dateStr, b.id).done).length;
  const pct = activeBlocks.length > 0 ? Math.round((doneCount / activeBlocks.length) * 100) : 0;

  // Find carry-forward nextTopic for a block by looking at the previous week's same block
  function getPrevNextTopicForBlock(blockId: string, cat: string): string {
    // Look at the same block in the previous 7 days
    for (let delta = 1; delta <= 7; delta++) {
      const prevDate = new Date(date);
      prevDate.setDate(prevDate.getDate() - delta);
      const prevDateStr = prevDate.toISOString().split('T')[0];
      const state = getBlock(prevDateStr, blockId);
      if (state.nextTopic) return state.nextTopic;
    }
    // Also look at previous same-category blocks from other days in the last week
    const flatBlocks: { dayIdx: number; blockId: string; cat: string }[] = [];
    for (const d of SCHEDULE) {
      for (const b of d.blocks) {
        if (!b.isBreak) flatBlocks.push({ dayIdx: d.dayIndex, blockId: b.id, cat: b.cat });
      }
    }
    const myIdx = flatBlocks.findIndex(f => f.blockId === blockId);
    // Search backwards in flatBlocks from myIdx, wrapping
    const len = flatBlocks.length;
    for (let i = 1; i < len; i++) {
      const prevIdx = (myIdx - i + len) % len;
      const prev = flatBlocks[prevIdx];
      if (prev.cat !== cat) continue;
      // Look for this prev block across last 14 days
      for (let delta = 1; delta <= 14; delta++) {
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - delta);
        const prevDateStr = prevDate.toISOString().split('T')[0];
        const state = getBlock(prevDateStr, prev.blockId);
        if (state.nextTopic) return state.nextTopic;
      }
    }
    return '';
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 16px 80px' }}>
      {/* Day header */}
      <div style={{ padding: '28px 0 20px' }}>
        <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          {formatDate(date)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: 'var(--text)', margin: 0 }}>{day.name}</h1>
          <span style={{
            fontSize: 12,
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 999,
            padding: '3px 10px',
            color: 'var(--text-2)',
          }}>{day.type}</span>
          <span style={{
            fontSize: 12,
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 999,
            padding: '3px 10px',
            color: 'var(--text-2)',
          }}>⏱ {day.hours}</span>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: pct === 100 ? 'var(--dsa)' : 'var(--genai)',
              borderRadius: 999,
              transition: 'width 0.3s',
            }} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-3)', minWidth: 60 }}>
            {doneCount}/{activeBlocks.length} done
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px 14px',
        padding: '10px 14px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        marginBottom: 16,
      }}>
        {Object.entries(CATEGORY_STYLES).map(([key, val]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: val.dot }} />
            <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{val.label}</span>
          </div>
        ))}
      </div>

      {/* Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {hydrated ? day.blocks.map(block => (
          <BlockCard
            key={block.id}
            block={block}
            dateStr={dateStr}
            state={getBlock(dateStr, block.id)}
            prevNextTopic={!block.isBreak ? getPrevNextTopicForBlock(block.id, block.cat) : ''}
            onChange={patch => updateBlock(dateStr, block.id, patch)}
          />
        )) : (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>Loading…</div>
        )}
      </div>
    </div>
  );
}
