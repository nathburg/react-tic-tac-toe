import { useContext } from 'react';
import { GameContext } from '../../GameContext';
import './Box.css';

export default function Box({ position, content }) {
  const { currentPlayer, setCurrentPlayer, boardState, setBoardState } = useContext(GameContext);
  
  const clickHandler = () => {
    if (content === '') {
      const newPosition = { 'position': position, 'content': currentPlayer };
      boardState.splice(position - 1, 1, newPosition);
      setBoardState(boardState);
      if (currentPlayer === 'X') {
        setCurrentPlayer('O');
      } else {
        setCurrentPlayer('X');
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