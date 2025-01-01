import { useState, useCallback } from 'react';
import { GameState, SequenceSettings } from '../types';

const initialGameState: GameState = {
  sequence: '',
  isMemorizing: false,
  isHidden: false,
  userInput: '',
  feedback: [],
  timerActive: false,
  timeRemaining: 0,
};

export function useGameState(
  settings: SequenceSettings,
  updateStats: (correct: boolean) => void
) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startSequence = useCallback((sequence: string) => {
    setGameState({
      ...initialGameState,
      sequence,
      isMemorizing: true,
      timeRemaining: settings.timerDuration,
      timerActive: true,
    });

    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timeRemaining: prev.timeRemaining - 1,
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setGameState((prev) => ({
        ...prev,
        isHidden: true,
        timerActive: false,
      }));
    }, settings.timerDuration * 1000);
  }, [settings.timerDuration]);

  const handleVerification = useCallback((input: string) => {
    const feedback: string[] = [];
    let correct = true;

    for (let i = 0; i < gameState.sequence.length; i++) {
      if (input[i] !== gameState.sequence[i]) {
        feedback.push(`Character ${i + 1} is incorrect`);
        correct = false;
      }
    }

    if (correct) {
      feedback.push('Sequence is correct!');
    }

    updateStats(correct);
    setGameState((prev) => ({
      ...prev,
      feedback,
    }));
  }, [gameState.sequence, updateStats]);

  const handleTimeExpired = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isHidden: true,
      timerActive: false,
    }));
  }, []);

  return {
    gameState,
    startSequence,
    handleVerification,
    handleTimeExpired,
  };
}