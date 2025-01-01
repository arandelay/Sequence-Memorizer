import React from 'react';
import { SequenceSettings } from '../types';

interface Props {
  settings: SequenceSettings;
  onSettingsChange: (settings: SequenceSettings) => void;
  onClose: () => void;
}

export default function Settings({ settings, onSettingsChange, onClose }: Props) {
  const handleChange = (field: keyof SequenceSettings, value: number | boolean) => {
    onSettingsChange({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Sequence Length
            </label>
            <input
              type="range"
              min="4"
              max="20" // Changed from 12 to 20
              value={settings.length}
              onChange={(e) => handleChange('length', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{settings.length} characters</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Timer Duration
            </label>
            <input
              type="range"
              min="3" // Changed from 5 to 3
              max="30"
              value={settings.timerDuration}
              onChange={(e) => handleChange('timerDuration', parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{settings.timerDuration} seconds</span>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.allowNumbers}
                onChange={(e) => handleChange('allowNumbers', e.target.checked)}
                className="rounded"
              />
              <span>Allow Numbers</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.allowLetters}
                onChange={(e) => handleChange('allowLetters', e.target.checked)}
                className="rounded"
              />
              <span>Allow Letters</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.allowSpecial}
                onChange={(e) => handleChange('allowSpecial', e.target.checked)}
                className="rounded"
              />
              <span>Allow Special Characters</span>
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}