import { Card, Difficulty } from '../types/game';

// Importando as imagens da pasta assets
import aliceImg from '../assets/alice.jpg';
import auroraImg from '../assets/aurora.jpg';
import belaImg from '../assets/bela.jpg';
import brancadeneveImg from '../assets/brancadeneve.jpg';
import chapeleiroImg from '../assets/chapeleiro.jpg';
import cinderelaImg from '../assets/cinderela.jpg';
import dianaImg from '../assets/diana.jpg';
import esmeraldaImg from '../assets/esmeralda.jpg';
import jasminImg from '../assets/jasmin.jpg';
import moanaImg from '../assets/moana.jpg';
import mulaImg from '../assets/mula.jpg';
import peterpanImg from '../assets/peterpan.jpg';
import pocahontasImg from '../assets/pocahontas.jpg';
import raponzelImg from '../assets/raponzel.jpg';
import ratosImg from '../assets/ratos.jpg';
import sereiaImg from '../assets/sereia.jpg';
import sininhoImg from '../assets/sininho.jpg';
import velarelogioImg from '../assets/velarelogio.jpg';

export const animals = [
  { name: 'Alice', image: aliceImg },
  { name: 'Aurora', image: auroraImg },
  { name: 'Bela', image: belaImg },
  { name: 'Branca', image: brancadeneveImg },
  { name: 'Chapeleiro', image: chapeleiroImg },
  { name: 'Cinderela', image: cinderelaImg },
  { name: 'Diana', image: dianaImg },
  { name: 'Esmeralda', image: esmeraldaImg },
  { name: 'Jasmin', image: jasminImg },
  { name: 'Moana', image: moanaImg },
  { name: 'Mulan', image: mulaImg },
  { name: 'Peter Pan', image: peterpanImg },
  { name: 'Pocahontas', image: pocahontasImg },
  { name: 'Raponzel', image: raponzelImg },
  { name: 'Ratos', image: ratosImg },
  { name: 'Sereia', image: sereiaImg },
  { name: 'Sininho', image: sininhoImg },
  { name: 'Vela e Relógio', image: velarelogioImg },
];

export const getDifficultyConfig = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { pairs: 6, columns: 4 };
    case 'medium':
      return { pairs: 8, columns: 4 };
    case 'hard':
      return { pairs: 12, columns: 6 };
    default:
      return { pairs: 6, columns: 4 };
  }
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const createDeck = (difficulty: Difficulty): Card[] => {
  const { pairs } = getDifficultyConfig(difficulty);
  const selectedAnimals = animals.slice(0, pairs);
  
  const cards: Card[] = [];
  
  selectedAnimals.forEach((animal, index) => {
    cards.push(
      {
        id: `${index}-1`,
        animal: animal.name,
        image: animal.image,  // usa o caminho da imagem
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${index}-2`,
        animal: animal.name,
        image: animal.image,
        isFlipped: false,
        isMatched: false,
      }
    );
  });
  
  return shuffleArray(cards);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
