import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SequenceSettings } from '../types';

interface Props {
  settings: SequenceSettings;
  onSequenceSubmit: (sequence: string) => void;
  onSettingsClick: () => void;
}

export default function SequenceInput({ settings, onSequenceSubmit, onSettingsClick }: Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const validateSequence = (value: string) => {
    if (value.length !== settings.length) {
      return `Sequence must be ${settings.length} characters long`;
    }
    
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasSpecial = /[^a-zA-Z0-9]/.test(value);

    if (!settings.allowNumbers && hasNumber) return 'Numbers are not allowed';
    if (!settings.allowLetters && hasLetter) return 'Letters are not allowed';
    if (!settings.allowSpecial && hasSpecial) return 'Special characters are not allowed';

    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateSequence(input);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSequenceSubmit(input);
    setInput('');
    setError('');
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Enter Your Sequence</h2>
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={settings.length}
            className="w-full px-4 py-2 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
            placeholder={`Enter ${settings.length} characters`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Start Memorizing
        </button>
      </form>
    </div>
  );
}