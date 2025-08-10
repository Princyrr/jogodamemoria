import React from 'react';
import { Difficulty } from '../types/game';
import { RotateCcw, Settings } from 'lucide-react';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
  gameStarted: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  difficulty,
  onDifficultyChange,
  onReset,
  gameStarted,
}) => {
  const difficulties: { value: Difficulty; label: string; pairs: number }[] = [
    { value: 'easy', label: 'Fácil', pairs: 6 },
    { value: 'medium', label: 'Médio', pairs: 8 },
    { value: 'hard', label: 'Difícil', pairs: 12 },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 font-medium">Dificuldade:</span>
      </div>
      
      <div className="flex gap-2">
        {difficulties.map(({ value, label, pairs }) => (
          <button
            key={value}
            onClick={() => onDifficultyChange(value)}
            disabled={gameStarted}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${difficulty === value
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }
              ${gameStarted ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
            `}
          >
            {label} ({pairs} pares)
          </button>
        ))}
      </div>
      
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium
                 hover:bg-orange-600 hover:scale-105 transition-all duration-200 shadow-lg"
      >
        <RotateCcw className="w-4 h-4" />
        Novo Jogo
      </button>
    </div>
  );
};