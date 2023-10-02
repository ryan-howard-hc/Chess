import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/chessboard.css';
import Pawn from './01pawn';
const Chessboard = () => {
    const initialBoardState = [
      ['R', 'P', '', '', '', '', 'P', 'R'],
      ['N', 'P', '', '', '', '', 'P', 'N'],
      ['B', 'P', '', '', '', '', 'P', 'B'],
      ['Q', 'P', '', '', '', '', 'P', 'Q'],
      ['K', 'P', '', '', '', '', 'P', 'K'],
      ['B', 'P', '', '', '', '', 'P', 'B'],
      ['N', 'P', '', '', '', '', 'P', 'N'],
      ['R', 'P', '', '', '', '', 'P', 'R'],
    ];
  
    const [boardState, setBoardState] = useState(initialBoardState);
  
    // one const to movepieces, will update accordingly
    const movePiece = (fromRow, fromCol, toRow, toCol) => {
      // if there is a piece at the source position
      if (boardState[fromRow][fromCol] === '') {
        console.log('No piece to move!');
        return;
      }
  
      if (toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) {
        console.log('Invalid destination!');
        return; 
      }
  
      //  proceed with move
      const newBoardState = [...boardState];
      newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol];
      newBoardState[fromRow][fromCol] = '';
      setBoardState(newBoardState);
    };
  
    return (
      <div className="chessboard">
        {boardState.map((row, rowIndex) => (
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`square ${((rowIndex + colIndex) % 2 === 0) ? 'white' : 'black'}`}
              onClick={() => movePiece(rowIndex, colIndex, newRow, newCol)}
              >
              {piece && <div className="piece">{piece}</div>}
            </div>
          ))
        ))}
      </div>
    );
  };
  
  export default Chessboard;