import React, { useEffect } from 'react';
import { Timer } from 'lucide-react';

interface Props {
  sequence: string;
  isHidden: boolean;
  timeRemaining: number;
  onTimeExpired: () => void;
}

export default function SequenceDisplay({ sequence, isHidden, timeRemaining, onTimeExpired }: Props) {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeExpired();
    }
  }, [timeRemaining, onTimeExpired]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Memorize Sequence</h2>
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5" />
          <span className="text-lg font-mono">{timeRemaining}s</span>
        </div>
      </div>
      <div className="p-8 text-center border-2 rounded-lg bg-white dark:bg-gray-800">
        {isHidden ? (
          <div className="text-2xl font-mono tracking-wider">****</div>
        ) : (
          <div className="text-2xl font-mono tracking-wider">{sequence}</div>
        )}
      </div>
    </div>
  );
}