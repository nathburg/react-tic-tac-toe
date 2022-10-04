import { useState, createContext } from 'react';
import initialBoard from './initial-board';


const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [boardState, setBoardState] = useState(initialBoard);
  const [xPositions, setXPositions] = useState(new Set());
  const [oPositions, setOPositions] = useState(new Set());

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
    setOPositions
  }}>
    {children}
  </GameContext.Provider>;
};

export { GameProvider, GameContext };