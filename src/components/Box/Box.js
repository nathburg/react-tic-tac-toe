import { useContext } from 'react';
import { GameContext } from '../../GameContext';
import './Box.css';

export default function Box({ position, content }) {
  const { 
    currentPlayer,
    setCurrentPlayer,
    boardState,
    setBoardState,
    xPositions,
    setXPositions,
    oPositions,
    setOPositions,
    checkXWinner,
    checkOWinner
  } = useContext(GameContext);
  
  const clickHandler = () => {
    if (content === '') {
      const newPosition = { 'position': position, 'content': currentPlayer };
      boardState.splice(position - 1, 1, newPosition);
      setBoardState(boardState);

      if (currentPlayer === 'X') {
        setCurrentPlayer('O');
        xPositions.add(position);
        setXPositions(xPositions);
        checkXWinner();
      } else {
        setCurrentPlayer('X');
        oPositions.add(position);
        setOPositions(oPositions);
        checkOWinner();
      }
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