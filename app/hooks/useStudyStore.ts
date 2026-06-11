'use client';

import { useState, useEffect, useCallback } from 'react';

export interface BlockState {
  done: boolean;
  studied: string;      // what I studied this session
  nextTopic: string;    // what to study in next session of this subject
}

export type StoreData = Record<string, BlockState>; // key = `${dateStr}__${blockId}`

function getKey(dateStr: string, blockId: string) {
  return `${dateStr}__${blockId}`;
}

const STORAGE_KEY = 'study-tracker-v1';

function load(): StoreData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(data: StoreData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useStudyStore() {
  const [store, setStore] = useState<StoreData>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStore(load());
    setHydrated(true);
  }, []);

  const getBlock = useCallback((dateStr: string, blockId: string): BlockState => {
    const key = getKey(dateStr, blockId);
    return store[key] ?? { done: false, studied: '', nextTopic: '' };
  }, [store]);

  const updateBlock = useCallback((dateStr: string, blockId: string, patch: Partial<BlockState>) => {
    setStore(prev => {
      const key = getKey(dateStr, blockId);
      const next = { ...prev, [key]: { ...(prev[key] ?? { done: false, studied: '', nextTopic: '' }), ...patch } };
      save(next);
      return next;
    });
  }, []);

  // Given a blockId and category, find the most recently written nextTopic
  // from the last occurrence of that cat block (across all dates) before today
  const getPrevNextTopic = useCallback((blockId: string, cat: string, dateStr: string): string => {
    // Look through all stored keys for the same blockId pattern (same subject)
    // across all dates before dateStr. The blockId encodes the subject slot.
    const catPrefix = blockId.split('-').slice(0, 2).join('-'); // e.g. 'mon-dsa'
    // Find any key that matches this block across dates and pick the most recent before dateStr
    const allKeys = Object.keys(store);
    const matches = allKeys
      .filter(k => {
        const parts = k.split('__');
        if (parts.length !== 2) return false;
        const [kDate, kBlock] = parts;
        return kBlock === blockId && kDate < dateStr;
      })
      .sort()
      .reverse();
    
    if (matches.length > 0 && store[matches[0]]?.nextTopic) {
      return store[matches[0]].nextTopic;
    }

    // Also check same category blocks from previous days' same-cat sessions
    // using category matching across all block IDs
    const catMatches = allKeys
      .filter(k => {
        const parts = k.split('__');
        if (parts.length !== 2) return false;
        const [kDate] = parts;
        return kDate < dateStr;
      })
      .sort()
      .reverse();

    for (const key of catMatches) {
      const [, kBlock] = key.split('__');
      // Match by category prefix pattern
      if (kBlock.endsWith('-' + cat) || kBlock.includes('-' + cat)) {
        if (store[key]?.nextTopic) return store[key].nextTopic;
      }
    }

    return '';
  }, [store]);

  return { store, getBlock, updateBlock, getPrevNextTopic, hydrated };
}
