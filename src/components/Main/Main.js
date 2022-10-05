import { useContext } from 'react';
import { GameContext } from '../../GameContext';
import Box from '../Box/Box';
import './Main.css';

export default function Main() {
  const { isPlaying, currentPlayer, boardState, isScratchGame, newGame } = useContext(GameContext);

  return (
    <div className='main'>
      {isPlaying &&
      <h2>Current Player is {currentPlayer}</h2>
      }
      {!isPlaying && isScratchGame &&
      <div>
        <h2>Scratch Game</h2>
        <h3 onClick= {() => newGame()}>Play again?</h3>  
      </div>
      }
      {!isPlaying && !isScratchGame &&
      <div>
        <h2>{currentPlayer} Wins!</h2>
        <h3 onClick= {() => newGame()}>Play again?</h3>  
      </div>
      }
      <div className='board'>
        {boardState.map(({ position, content }) => 
          <Box key={position} position={position} content={content} />
        )}
      </div> 
    </div>  
  );
}
