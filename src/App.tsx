import  { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameStats } from './components/GameStats';
import { GameControls } from './components/GameControls';
import { WinMessage } from './components/WinMessage';
import { useGame } from './hooks/useGame';
import { Difficulty } from './types/game';
import { Brain } from 'lucide-react';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const { gameState, elapsedTime, flipCard, initializeGame } = useGame(difficulty);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    if (!gameState.gameStarted) {
      setDifficulty(newDifficulty);
    }
  };

  const handleReset = () => {
    initializeGame();
  };

  const totalPairs = gameState.cards.length / 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-yellow-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 text-pink-600" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-800 to-yellow-800 bg-clip-text text-transparent">
              Jogo da Memória
            </h1>
          </div>
           <p className="text-sm text-pink-800 mb-4 italic">
            Desenvolvido por Priscila Ramonna
          </p>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Teste sua memória encontrando todos os pares de Desenhos da Disney!  </p>
             <p className="text-lg text-gray-800 max-w-2xl mx-auto"> Vire duas cartas por vez e tente lembrar onde estão os pares.
          </p>
        </div>

        {/* Game Controls */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onReset={handleReset}
          gameStarted={gameState.gameStarted}
        />

        {/* Game Stats */}
        <GameStats
          moves={gameState.moves}
          matches={gameState.matches}
          totalPairs={totalPairs}
          elapsedTime={elapsedTime}
          gameWon={gameState.gameWon}
        />

        {/* Game Board */}
        <GameBoard
          cards={gameState.cards}
          difficulty={difficulty}
          onCardFlip={flipCard}
        />

        {/* Win Message */}
        {gameState.gameWon && (
          <WinMessage
            moves={gameState.moves}
            elapsedTime={elapsedTime}
            onNewGame={handleReset}
          />
        )}

        {/* Instructions */}
        {!gameState.gameStarted && (
          <div className="text-center mt-8 bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Como Jogar</h3>
            <div className="text-gray-800 space-y-2">
              <p>• Clique em uma carta para virá-la</p>
              <p>• Clique em outra carta para encontrar o par</p>
              <p>• Se as cartas forem iguais, elas permanecerão viradas</p>
              <p>• Se forem diferentes, elas voltarão para baixo</p>
              <p>• Encontre todos os pares no menor número de jogadas possível!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;