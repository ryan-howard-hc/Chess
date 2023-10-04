import './App.css';
import React, { useState } from 'react';
import Chessboard from './0gameboard';
import PlayerTurn from './07playerturns';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [currentPlayer, setCurrentPlayer] = useState('White');

  const togglePlayerTurn = () => {
    setCurrentPlayer(currentPlayer === 'White' ? 'Black' : 'White');
  };

  return (
    <div className="App">
      <h1>React Chess App</h1>
      <Chessboard />
    </div>
  );
}

export default App;
