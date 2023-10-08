import './App.css';
import React, { useState } from 'react';
import Chessboard from './0gameboard';

function App() {
  return (
    <div className="App">
      <h1>React Chess App</h1>
      <Chessboard />
    </div>
  );
}

export default App;
