import { useContext } from 'react';
import { GameContext } from '../../GameContext';
import Box from '../Box/Box';
import './Main.css';

export default function Main() {
  const { isPlaying, currentPlayer, boardState } = useContext(GameContext);
  
  return (
    (isPlaying &&
    <div className='main'>
      <h2>Current Player is {currentPlayer}</h2>
    </div>
    )
    (!isPlaying &&
    <div className='main'>
      <h2>{currentPlayer} Wins!</h2>
      <
    </div>  
    )  
    <div className='board'>
      {boardState.map(({ position, content }) => 
        <Box key={position} position={position} content={content} />
      }
    </div>   

  );
}
