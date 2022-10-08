import { useContext, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { GameContext } from '../../GameContext';
import './Box.css';

export default function Box({ position, content }) {
  const { 
    currentPlayer,
    setCurrentPlayer,
    setBoardState,
    xPositions,
    setXPositions,
    oPositions,
    setOPositions,
    checkXWinner,
    checkOWinner, boardState
  } = useContext(GameContext);
  
  const endTurn = () => {
    console.log('PLZ ', boardState);
    if (currentPlayer === 'X') {
      const newSet = new Set([...xPositions, position]);
      setXPositions(newSet);
      setCurrentPlayer('O');
      checkXWinner();
    } else {
      const newSet = new Set([...oPositions, position]);
      setOPositions(newSet);
      setCurrentPlayer('X');
      checkOWinner();
    }
  };
  
  useEffect(() => {
    endTurn()
    ;},
  [boardState]
  );
  const clickHandler = () => {
    if (content === '') {
      const newPosition = { 'position': position, 'content': currentPlayer };
      // const prevBoard = boardState;
      setBoardState((prevBoard) => {
        return prevBoard.map((boardPosition) => {
          return boardPosition.position === position ? newPosition : { ...boardPosition };
        });});
      
      
      // setBoardState(newBoard, endTurn());
      console.log(boardState);
    }
  };
      

  return (
    <div className="box" onClick={() => clickHandler()}>
      <div>
        {content}
      </div>
    </div>
  );
}  