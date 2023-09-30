import './App.css';
import React, { useState } from 'react';
import Chessboard from './Chessboard';
import PlayerTurn from './PlayerTurn';
import SwitchTurnButton from './SwitchTurnButton';


function App() {
  const [currentPlayer, setCurrentPlayer] = useState('White');

  const togglePlayerTurn = () => {
    setCurrentPlayer(currentPlayer === 'White' ? 'Black' : 'White');
  };

  return (
    <div className="App">
      <h1>React Chess App</h1>
      <PlayerTurn currentPlayer={currentPlayer} />
      <Chessboard />
      <SwitchTurnButton onClick={togglePlayerTurn} /> {/* Render the SwitchTurnButton component */}
    </div>
  );
}

export default App;
