import React from 'react';
import { Trophy, Star, Clock, Target } from 'lucide-react';
import { formatTime } from '../utils/gameUtils';

interface WinMessageProps {
  moves: number;
  elapsedTime: number;
  onNewGame: () => void;
}

const Confetti: React.FC = () => (
  <>
    <style>{`
      .confetti-piece {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: red;
        opacity: 0.9;
        border-radius: 2px;
        animation-name: confettiFall;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
      }
      @keyframes confettiFall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100px) rotate(360deg);
          opacity: 0;
        }
      }
    `}</style>

    {/* Confetes posicionados em várias direções */}
    {Array.from({ length: 15 }).map((_, i) => {
      const left = Math.random() * 80 + 10; // posição horizontal random entre 10 e 90%
      const delay = Math.random() * 2; // delay random para não saírem juntos
      const duration = 1 + Math.random() * 1.5; // duração entre 1s e 2.5s
      const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#f472b6']; // vermelho, amarelo, verde, azul, rosa
      const color = colors[i % colors.length];

      return (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${left}%`,
            backgroundColor: color,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            top: 0,
          }}
        />
      );
    })}
  </>
);

export const WinMessage: React.FC<WinMessageProps> = ({
  moves,
  elapsedTime,
  onNewGame,
}) => {
  const getPerformanceMessage = () => {
    if (moves <= 20 && elapsedTime <= 60) {
      return { message: 'Incrível! Desempenho excepcional!', stars: 3 };
    } else if (moves <= 30 && elapsedTime <= 120) {
      return { message: 'Muito bom! Belo desempenho!', stars: 2 };
    } else {
      return { message: 'Parabéns! Você conseguiu!', stars: 1 };
    }
  };

  const { message, stars } = getPerformanceMessage();

  // CSS para swing (balanço) e pulse (pulso)
  const swingAnimation = {
    animation: 'swing 1s ease-in-out infinite',
    display: 'inline-block',
  };
  const pulseAnimation = {
    animation: 'pulseSoft 2s ease-in-out infinite',
  };

  return (
    <>
      {/* Keyframes swing, pulse */}
      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl transform relative">
          <div className="mb-6 relative inline-block mx-auto">
            {/* Troféu com pulso */}
            <Trophy
              className="w-16 h-16 text-yellow-500 mb-4"
              style={pulseAnimation}
            />
            {/* Confetes posicionados absolutamente em relação ao container */}
            <Confetti />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Parabéns!{' '}
            {/* Emoji com balanço */}
            <span style={swingAnimation}>🎉</span>
          </h2>
          <p className="text-lg text-gray-600">{message}</p>

          <div className="flex justify-center mb-6">
            {Array.from({ length: 3 }, (_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{moves}</div>
              <div className="text-sm text-blue-700">Jogadas</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {formatTime(elapsedTime)}
              </div>
              <div className="text-sm text-purple-700">Tempo</div>
            </div>
          </div>

          <button
            onClick={onNewGame}
            className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-3 px-6 rounded-lg
                   font-semibold text-lg hover:from-yellow-600 hover:to-pink-600 
                   transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    </>
  );
};
