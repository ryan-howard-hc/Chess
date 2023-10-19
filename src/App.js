import './App.css';
import React, { useState } from 'react';
import Chessboard from './0gameboard';
import '../src/css/chessboard.css';

function App() {
  return (
    <div className="App">
      <h1 className='title'>Chess on React</h1>
      <Chessboard />
    </div>
  );
}

export default App;
