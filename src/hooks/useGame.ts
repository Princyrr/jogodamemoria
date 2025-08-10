import { useState, useCallback, useEffect } from 'react';
import { GameState, Difficulty } from '../types/game';
import { createDeck } from '../utils/gameUtils';

const initialGameState: GameState = {
  cards: [],
  flippedCards: [],
  moves: 0,
  matches: 0,
  gameWon: false,
  gameStarted: false,
  startTime: null,
  endTime: null,
};

export const useGame = (difficulty: Difficulty) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [elapsedTime, setElapsedTime] = useState(0);

  const initializeGame = useCallback(() => {
    const newCards = createDeck(difficulty);
    setGameState({
      ...initialGameState,
      cards: newCards,
    });
    setElapsedTime(0);
  }, [difficulty]);

  const startGame = useCallback(() => {
    if (!gameState.gameStarted) {
      setGameState(prev => ({
        ...prev,
        gameStarted: true,
        startTime: Date.now(),
      }));
    }
  }, [gameState.gameStarted]);

  const flipCard = useCallback((cardId: string) => {
    if (!gameState.gameStarted) {
      startGame();
    }

    setGameState(prev => {
      const card = prev.cards.find(c => c.id === cardId);
      
      if (!card || card.isFlipped || card.isMatched || prev.flippedCards.length >= 2) {
        return prev;
      }

      const newFlippedCards = [...prev.flippedCards, card];
      const updatedCards = prev.cards.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      );

      return {
        ...prev,
        cards: updatedCards,
        flippedCards: newFlippedCards,
      };
    });
  }, [gameState.gameStarted, startGame]);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [card1, card2] = gameState.flippedCards;
      const isMatch = card1.animal === card2.animal;

      setTimeout(() => {
        setGameState(prev => {
          const updatedCards = prev.cards.map(card => {
            if (card.id === card1.id || card.id === card2.id) {
              if (isMatch) {
                return { ...card, isMatched: true };
              } else {
                return { ...card, isFlipped: false };
              }
            }
            return card;
          });

          const newMatches = isMatch ? prev.matches + 1 : prev.matches;
          const newMoves = prev.moves + 1;
          const gameWon = newMatches === prev.cards.length / 2;

          return {
            ...prev,
            cards: updatedCards,
            flippedCards: [],
            moves: newMoves,
            matches: newMatches,
            gameWon,
            endTime: gameWon ? Date.now() : null,
          };
        });
      }, 1000);
    }
  }, [gameState.flippedCards]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.gameStarted && !gameState.gameWon && gameState.startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - gameState.startTime!) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.gameStarted, gameState.gameWon, gameState.startTime]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    elapsedTime,
    flipCard,
    initializeGame,
  };
};