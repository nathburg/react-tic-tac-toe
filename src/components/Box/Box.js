import { useContext } from 'react';
import { GameContext } from '../../GameContext';
import './Box.css';

export default function Box({ position, content }) {
  const { currentPlayer, setCurrentPlayer, boardState, setBoardState } = useContext(GameContext);
  const newPosition = { 'position': position, 'content': currentPlayer };
  const newBoardState = boardState.slice(position - 1, 1);
  console.log(newBoardState);
  boardState.insert(position - 1, newPosition);
  const clickHandler = () => {
    setBoardState(boardState);
    if (currentPlayer === 'X') {
      setCurrentPlayer('O');
    } else {
      setCurrentPlayer('X');
    }
  };

  return (
    <div className="box" onClick={() => clickHandler}>
      <div>
        {content}
      </div>
    </div>
  );
}