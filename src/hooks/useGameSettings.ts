import { useState } from 'react';
import { SequenceSettings } from '../types';

const initialSettings: SequenceSettings = {
  length: 6,
  allowNumbers: true,
  allowLetters: true,
  allowSpecial: false,
  timerDuration: 3,
};

export function useGameSettings() {
  const [settings, setSettings] = useState<SequenceSettings>(initialSettings);

  const updateSettings = (newSettings: SequenceSettings) => {
    setSettings(newSettings);
  };

  return {
    settings,
    updateSettings,
  };
}