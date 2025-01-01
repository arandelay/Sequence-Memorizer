import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import SequenceInput from './components/SequenceInput';
import SequenceDisplay from './components/SequenceDisplay';
import SequenceVerification from './components/SequenceVerification';
import Stats from './components/Stats';
import Settings from './components/Settings';
import { useGameState } from './hooks/useGameState';
import { useGameSettings } from './hooks/useGameSettings';
import { useGameStats } from './hooks/useGameStats';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings } = useGameSettings();
  const { stats, updateStats } = useGameStats();
  const { gameState, startSequence, handleVerification, handleTimeExpired } = useGameState(settings, updateStats);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Memory Master</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Train your memory with sequence challenges
          </p>
        </header>

        <main className="flex flex-col items-center space-y-8">
          {!gameState.isMemorizing ? (
            <SequenceInput
              settings={settings}
              onSequenceSubmit={startSequence}
              onSettingsClick={() => setShowSettings(true)}
            />
          ) : gameState.isHidden ? (
            <SequenceVerification
              onVerify={handleVerification}
              feedback={gameState.feedback}
              sequenceLength={settings.length}
            />
          ) : (
            <SequenceDisplay
              sequence={gameState.sequence}
              isHidden={gameState.isHidden}
              timeRemaining={gameState.timeRemaining}
              onTimeExpired={handleTimeExpired}
            />
          )}

          <Stats stats={stats} />
        </main>

        {showSettings && (
          <Settings
            settings={settings}
            onSettingsChange={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;