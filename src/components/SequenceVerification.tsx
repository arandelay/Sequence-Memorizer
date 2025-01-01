import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Props {
  onVerify: (input: string) => void;
  feedback: string[];
  sequenceLength: number;
}

export default function SequenceVerification({ onVerify, feedback, sequenceLength }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Enter the Sequence</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={sequenceLength}
          className="w-full px-4 py-2 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
          placeholder={`Enter ${sequenceLength} characters`}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Verify
        </button>
      </form>
      {feedback.length > 0 && (
        <div className="space-y-2">
          {feedback.map((message, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 ${
                message.includes('correct') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message.includes('correct') ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <span>{message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}