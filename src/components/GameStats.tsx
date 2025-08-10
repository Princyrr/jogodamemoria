import React from 'react';
import { formatTime } from '../utils/gameUtils';
import { Clock, Target, Trophy } from 'lucide-react';

interface GameStatsProps {
  moves: number;
  matches: number;
  totalPairs: number;
  elapsedTime: number;
  gameWon: boolean;
}

export const GameStats: React.FC<GameStatsProps> = ({
  moves,
  matches,
  totalPairs,
  elapsedTime,
  gameWon,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
        <Target className="w-5 h-5 text-blue-500" />
        <span className="font-semibold text-gray-700">
          Jogadas: <span className="text-blue-600">{moves}</span>
        </span>
      </div>
      
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
        <Trophy className="w-5 h-5 text-green-500" />
        <span className="font-semibold text-gray-700">
          Pares: <span className="text-green-600">{matches}/{totalPairs}</span>
        </span>
      </div>
      
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
        <Clock className="w-5 h-5 text-purple-500" />
        <span className="font-semibold text-gray-700">
          Tempo: <span className="text-purple-600">{formatTime(elapsedTime)}</span>
        </span>
      </div>
    </div>
  );
};