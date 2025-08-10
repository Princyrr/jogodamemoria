import React from 'react';
import { Card as CardType } from '../types/game';
import logoImg from '../assets/logo.png';


interface CardProps {
  card: CardType;
  onFlip: (cardId: string) => void;
  imageSize: string; // recebe classes Tailwind responsivas
}

export const Card: React.FC<CardProps> = ({ card, onFlip, imageSize }) => {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onFlip(card.id);
    }
  };

  return (
    <div
      className="relative w-full aspect-square cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`
          absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d
          ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
        `}
      >
        {/* Verso */}
       {/* Verso */}
<div
  className={`
    absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg
    bg-gradient-to-br from-pink-300 to-pink-400
    flex items-center justify-center
    border-4 border-pink-300 hover:scale-105 transition-transform duration-200
    ${card.isMatched ? 'ring-4 ring-green-400' : ''}
  `}
>
  <img src={logoImg} alt="Logo" className="w-16 h-16 object-contain" />
</div>


        {/* Frente */}
        <div
          className={`
            absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg rotate-y-180
            bg-gradient-to-br from-white to-gray-50
            flex flex-col items-center justify-center
            border-4 transition-colors duration-300
            ${card.isMatched 
              ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100' 
              : 'border-gray-200'
            }
          `}
        >
          {card.image ? (
            <img
              src={card.image}
              alt={card.animal}
              className={`${imageSize} object-contain mb-2`} 
            />
          ) : (
            <span className="text-5xl sm:text-4xl mb-2">❓</span> // fallback, emoji genérico
          )}

          <span className="text-sm sm:text-base font-semibold text-gray-700 text-center px-2">
            {card.animal}
          </span>
        </div>
      </div>
    </div>
  );
};

// Estilos CSS customizados para o efeito 3D flip
const style = document.createElement('style');
style.textContent = `
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;
document.head.appendChild(style);
