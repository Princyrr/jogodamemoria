export interface Card {
  id: string;
  animal: string;
  image?: string; // nova propriedade para caminho da imagem
  isFlipped: boolean;
  isMatched: boolean;
}


export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  moves: number;
  matches: number;
  gameWon: boolean;
  gameStarted: boolean;
  startTime: number | null;
  endTime: number | null;
}

export type Difficulty = 'easy' | 'medium' | 'hard';