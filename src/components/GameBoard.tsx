import React from 'react';
import { Card } from './Card';
import { Card as CardType, Difficulty } from '../types/game';

interface GameBoardProps {
  cards: CardType[];
  difficulty: Difficulty;
  onCardFlip: (cardId: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ cards, difficulty, onCardFlip }) => {
  return (
    <div 
      className={`
        grid gap-3 sm:gap-2 w-full max-w-4xl mx-auto p-4
        ${difficulty === 'easy' ? 'grid-cols-2 sm:grid-cols-4' : ''}
        ${difficulty === 'medium' ? 'grid-cols-2 sm:grid-cols-4' : ''}
        ${difficulty === 'hard' ? 'grid-cols-3 sm:grid-cols-6' : ''}
      `}
    >
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          onFlip={onCardFlip}
          imageSize={
            difficulty === 'hard'
              ? 'w-[60%] h-auto sm:w-[60%] sm:h-auto'
              : 'w-[80%] h-auto sm:w-[80%] sm:h-auto'
          }
        />
      ))}
    </div>
  );
};
