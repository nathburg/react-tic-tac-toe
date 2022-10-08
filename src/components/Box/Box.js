import { useContext } from 'react';
import { GameContext } from '../../GameContext';
import './Box.css';

export default function Box({ position, content }) {
  const { 
    makeMove
  } = useContext(GameContext);

  return (
    <div className="box" onClick={() => makeMove(position, content)}>
      <div>
        {content}
      </div>
    </div>
  );
}  