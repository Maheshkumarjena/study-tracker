'use client';

import { useState } from 'react';
import { Block, CATEGORY_STYLES } from '../data/schedule';
import { BlockState } from '../hooks/useStudyStore';

interface Props {
  block: Block;
  dateStr: string;
  state: BlockState;
  prevNextTopic: string;
  onChange: (patch: Partial<BlockState>) => void;
}

export default function BlockCard({ block, state, prevNextTopic, onChange }: Props) {
  const [expanded, setExpanded] = useState(false);
  const s = CATEGORY_STYLES[block.cat];

  if (block.isBreak) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', opacity: 0.55 }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 72, fontVariantNumeric: 'tabular-nums' }}>{block.time}</span>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{block.name} — {block.sub}</span>
      </div>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${state.done ? 'var(--border)' : 'var(--border)'}`,
        borderRadius: 10,
        background: state.done ? 'var(--surface-2)' : 'var(--surface)',
        overflow: 'hidden',
        transition: 'all 0.15s',
      }}
    >
      {/* Header row */}
      <div
        style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', cursor: 'pointer' }}
        onClick={() => setExpanded(e => !e)}
      >
        <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 72, paddingTop: 2, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{block.time}</span>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, flexShrink: 0, marginTop: 4 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: state.done ? 'var(--text-3)' : s.text,
              textDecoration: state.done ? 'line-through' : 'none',
              transition: 'all 0.15s',
            }}>{block.name}</span>
            {state.done && (
              <span style={{
                fontSize: 10,
                background: 'var(--dsa-bg)',
                color: 'var(--dsa-text)',
                borderRadius: 999,
                padding: '1px 7px',
                fontWeight: 500,
              }}>done</span>
            )}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{block.sub}</div>
          {/* Show prevNextTopic as a hint pill if available and not expanded */}
          {prevNextTopic && !expanded && !state.done && (
            <div style={{
              marginTop: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: s.bg,
              borderRadius: 6,
              padding: '3px 8px',
              fontSize: 11,
              color: s.text,
              maxWidth: '100%',
              overflow: 'hidden',
            }}>
              <span style={{ flexShrink: 0 }}>📌</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Continue: {prevNextTopic}
              </span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <input
            type="checkbox"
            checked={state.done}
            onClick={e => e.stopPropagation()}
            onChange={e => onChange({ done: e.target.checked })}
            aria-label={`Mark ${block.name} as done`}
          />
          <span style={{ fontSize: 11, color: 'var(--text-3)', userSelect: 'none' }}>
            {expanded ? '▲' : '▼'}
          </span>
        </div>
      </div>

      {/* Expanded notes area */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--bg)' }}>
          {prevNextTopic && (
            <div style={{
              background: s.bg,
              border: `1px solid ${s.dot}22`,
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 12,
              color: s.text,
              display: 'flex',
              gap: 8,
              alignItems: 'flex-start',
            }}>
              <span>📌</span>
              <div>
                <div style={{ fontWeight: 500, marginBottom: 2 }}>Carry-forward from last session</div>
                <div style={{ opacity: 0.85 }}>{prevNextTopic}</div>
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-2)', marginBottom: 4 }}>
              What I studied this session
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Implemented a RAG chain with FAISS, tested retrieval accuracy..."
              value={state.studied}
              onChange={e => onChange({ studied: e.target.value })}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-2)', marginBottom: 4 }}>
              What to cover in the next session of this subject
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Add metadata filters to retrieval, try LangGraph state machine..."
              value={state.nextTopic}
              onChange={e => onChange({ nextTopic: e.target.value })}
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
