import React from 'react';

const PlayerTurn = ({ currentPlayer }) => {
  return (
    <div className="player-turn">
      <h2>Player's Turn</h2>
      <p>{currentPlayer}'s Turn</p>
    </div>
  );
};

export default PlayerTurn;