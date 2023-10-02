import React from 'react';

const PlayerTurn = ({ currentPlayer }) => {
  return (
    <div className="player-turn">
      
      <h2>{currentPlayer}'s Turn</h2>
    </div>
  );
};

export default PlayerTurn;