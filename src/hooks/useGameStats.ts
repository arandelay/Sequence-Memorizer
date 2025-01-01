import { useState } from 'react';
import { SequenceStats } from '../types';

const initialStats: SequenceStats = {
  attempts: 0,
  successes: 0,
  averageTime: 0,
  bestTime: Infinity,
  currentStreak: 0,
  bestStreak: 0,
};

export function useGameStats() {
  const [stats, setStats] = useState<SequenceStats>(initialStats);

  const updateStats = (correct: boolean) => {
    setStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
      successes: correct ? prev.successes + 1 : prev.successes,
      currentStreak: correct ? prev.currentStreak + 1 : 0,
      bestStreak: correct ? Math.max(prev.currentStreak + 1, prev.bestStreak) : prev.bestStreak,
    }));
  };

  return {
    stats,
    updateStats,
  };
}