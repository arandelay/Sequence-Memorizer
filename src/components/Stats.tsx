import React from 'react';
import { Trophy, Clock, Zap } from 'lucide-react';
import { SequenceStats } from '../types';

interface Props {
  stats: SequenceStats;
}

export default function Stats({ stats }: Props) {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">Success Rate</span>
          </div>
          <p className="text-2xl font-bold">
            {stats.attempts > 0
              ? Math.round((stats.successes / stats.attempts) * 100)
              : 0}
            %
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Best Time</span>
          </div>
          <p className="text-2xl font-bold">
            {stats.bestTime.toFixed(1)}s
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="font-medium">Current Streak</span>
          </div>
          <p className="text-2xl font-bold">{stats.currentStreak}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-green-500" />
            <span className="font-medium">Best Streak</span>
          </div>
          <p className="text-2xl font-bold">{stats.bestStreak}</p>
        </div>
      </div>
    </div>
  );
}