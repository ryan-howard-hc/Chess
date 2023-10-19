import React from 'react';
import './css/chessboard.css';


const PlayerTurn = ({ currentPlayer }) => {
  return (
    <div className="player-turn">
      
      <h2>{currentPlayer}</h2>
    </div>
  );
};

export default PlayerTurn;


// import React, { useState, useEffect } from 'react';

// const PlayerTurn = ({ currentPlayer, onTurnChange }) => {
//   const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

//   useEffect(() => {
//     // Display s turns

//     onTurnChange(isPlayer1Turn ? 'Player 1' : 'Player 2');
//     console.log(`Turn changed to: ${isPlayer1Turn ? 'Player 1' : 'Player 2'}`);

//   }, [isPlayer1Turn, onTurnChange]);

//   const toggleTurn = () => {
//     setIsPlayer1Turn((prevTurn) => !prevTurn);
//     console.log(`Turn toggled: ${isPlayer1Turn ? 'Player 1' : 'Player 2'} -> ${!isPlayer1Turn ? 'Player 1' : 'Player 2'}`);

//   };

//   return (
//     <div className="player-turn">
//       <h2>{currentPlayer}'s Turn</h2>
//       <button onClick={toggleTurn}>End Turn</button>
//     </div>
//   );
// };

// export default PlayerTurn;