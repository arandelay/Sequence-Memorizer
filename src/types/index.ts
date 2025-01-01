export interface SequenceSettings {
  length: number;
  allowNumbers: boolean;
  allowLetters: boolean;
  allowSpecial: boolean;
  timerDuration: number;
}

export interface SequenceStats {
  attempts: number;
  successes: number;
  averageTime: number;
  bestTime: number;
  currentStreak: number;
  bestStreak: number;
}

export interface GameState {
  sequence: string;
  isMemorizing: boolean;
  isHidden: boolean;
  userInput: string;
  feedback: string[];
  timerActive: boolean;
  timeRemaining: number;
}