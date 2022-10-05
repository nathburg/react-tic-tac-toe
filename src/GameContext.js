import { useState, createContext } from 'react';
import initialBoard from './initial-board';


const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isScratchGame, setIsScratchGame] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [boardState, setBoardState] = useState(initialBoard);
  const [xPositions, setXPositions] = useState(new Set());
  const [oPositions, setOPositions] = useState(new Set());
  
  const newGame = () => {
    setIsPlaying(true);
    setIsScratchGame(false);
    setCurrentPlayer('X');
    setBoardState(initialBoard);
    setXPositions(new Set());
    setOPositions(new Set());
  };
  
  const isPositionUsed = (gamePosition) => {
    if (gamePosition.content) {
      return true;
    }
  };  
  
  const checkScratchGame = () => {
    if (boardState.every(isPositionUsed)) {
      setIsScratchGame(true);
      setIsPlaying(false);
    }
  };
  
  const checkXWinner = () => {
    if (
      (xPositions.has(1) && xPositions.has(2) && xPositions.has(3)) ||
      (xPositions.has(4) && xPositions.has(5) && xPositions.has(6)) ||
      (xPositions.has(7) && xPositions.has(8) && xPositions.has(9)) ||
      (xPositions.has(1) && xPositions.has(4) && xPositions.has(7)) ||
      (xPositions.has(2) && xPositions.has(5) && xPositions.has(8)) ||
      (xPositions.has(3) && xPositions.has(6) && xPositions.has(9)) ||
      (xPositions.has(1) && xPositions.has(5) && xPositions.has(9)) ||
      (xPositions.has(7) && xPositions.has(5) && xPositions.has(3))
    ) {
      setCurrentPlayer('X');
      setIsPlaying(false);
    } else {
      checkScratchGame();
    }
  };
  
  const checkOWinner = () => {
    if (
      (oPositions.has(1) && oPositions.has(2) && oPositions.has(3)) ||
      (oPositions.has(4) && oPositions.has(5) && oPositions.has(6)) ||
      (oPositions.has(7) && oPositions.has(8) && oPositions.has(9)) ||
      (oPositions.has(1) && oPositions.has(4) && oPositions.has(7)) ||
      (oPositions.has(2) && oPositions.has(5) && oPositions.has(8)) ||
      (oPositions.has(3) && oPositions.has(6) && oPositions.has(9)) ||
      (oPositions.has(1) && oPositions.has(5) && oPositions.has(9)) ||
      (oPositions.has(7) && oPositions.has(5) && oPositions.has(3))
    ) {
      setCurrentPlayer('O');
      setIsPlaying(false);
    }
  };

  return <GameContext.Provider value={{
    isPlaying,
    setIsPlaying,
    currentPlayer,
    setCurrentPlayer,
    boardState,
    setBoardState,
    xPositions,
    setXPositions,
    oPositions,
    setOPositions,
    checkXWinner,
    checkOWinner,
    isScratchGame,
    newGame
  }}>
    {children}
  </GameContext.Provider>;
};

export { GameProvider, GameContext };