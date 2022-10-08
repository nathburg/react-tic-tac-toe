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
  
  const checkScratchGame = (newBoard) => {
    if (newBoard.every(isPositionUsed)) {
      setIsScratchGame(true);
      setIsPlaying(false);
    }
  };
  
  const checkXWinner = (newXSet, newBoard) => {
    if (
      (newXSet.has(1) && newXSet.has(2) && newXSet.has(3)) ||
      (newXSet.has(4) && newXSet.has(5) && newXSet.has(6)) ||
      (newXSet.has(7) && newXSet.has(8) && newXSet.has(9)) ||
      (newXSet.has(1) && newXSet.has(4) && newXSet.has(7)) ||
      (newXSet.has(2) && newXSet.has(5) && newXSet.has(8)) ||
      (newXSet.has(3) && newXSet.has(6) && newXSet.has(9)) ||
      (newXSet.has(1) && newXSet.has(5) && newXSet.has(9)) ||
      (newXSet.has(7) && newXSet.has(5) && newXSet.has(3))
    ) {
      setCurrentPlayer('X');
      setIsPlaying(false);
    } else {
      checkScratchGame(newBoard);
    }
  };
  
  const checkOWinner = (newOSet, newBoard) => {
    if (
      (newOSet.has(1) && newOSet.has(2) && newOSet.has(3)) ||
      (newOSet.has(4) && newOSet.has(5) && newOSet.has(6)) ||
      (newOSet.has(7) && newOSet.has(8) && newOSet.has(9)) ||
      (newOSet.has(1) && newOSet.has(4) && newOSet.has(7)) ||
      (newOSet.has(2) && newOSet.has(5) && newOSet.has(8)) ||
      (newOSet.has(3) && newOSet.has(6) && newOSet.has(9)) ||
      (newOSet.has(1) && newOSet.has(5) && newOSet.has(9)) ||
      (newOSet.has(7) && newOSet.has(5) && newOSet.has(3))
    ) {
      setCurrentPlayer('O');
      setIsPlaying(false);
    } else {
      checkScratchGame(newBoard);
    }
  };

  const makeMove = (position, content) => {
    const newPosition = { 'position': position, 'content': currentPlayer };
    const makeNewBoard = (prevBoard) => {
      return prevBoard.map((boardPosition) => {
        return boardPosition.position === position ? newPosition : { ...boardPosition };
      });};
    const newBoard = makeNewBoard(boardState);
    const newXSet = new Set([...xPositions, position]);
    const newOSet = new Set([...oPositions, position]);      
    
    if (content === '') {
      if (currentPlayer === 'X') {
        setCurrentPlayer('O');
        checkXWinner(newXSet, newBoard);
        setXPositions(newXSet);
      } else {
        setCurrentPlayer('X');
        checkOWinner(newOSet, newBoard);
        setOPositions(newOSet);
      }
      setBoardState(newBoard);
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
    newGame,
    isPositionUsed,
    makeMove
  }}>
    {children}
  </GameContext.Provider>;
};

export { GameProvider, GameContext };