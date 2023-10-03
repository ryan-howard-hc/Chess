import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/chessboard.css';
// import Pawn from './01pawn';

const Chessboard = () => {
  const initialBoardState = [
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ];
  const [boardState, setBoardState] = useState(initialBoardState);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoardState = [...boardState];
    newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol];
    newBoardState[fromRow][fromCol] = '';
    setBoardState(newBoardState);
  };

  const isPawnMoveValid = (fromRow, fromCol, toRow, toCol, piece) => {
    const direction = piece === 'P' ? 1 : -1;
  
    if (piece === 'p' || piece === 'P') {
      // one square forward
      if (
        fromCol === toCol &&
        (fromRow + direction === toRow || fromRow - direction === toRow) && // Modified this line
        boardState[toRow][toCol] === ' '
      ) {
        return true;
      }
  
      // first move can be two squares forward
      if (
        fromCol === toCol &&
        fromRow + direction * 2 === toRow &&
        fromRow === (piece === 'P' ? 1 : 6) && // Starting position
        boardState[toRow][toCol] === ' ' &&
        boardState[fromRow + direction][toCol] === ' '
      ) {
        return true;
      }
  
      // captures diagonally
      if (
        Math.abs(fromCol - toCol) === 1 &&
        (fromRow + direction === toRow || fromRow - direction === toRow) && // Modified this line
        boardState[toRow][toCol] !== ' '
      ) {
        return true;
      }
    }
  
    return false;
  };
  

  

  const board = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareColor = (row + col) % 2 === 0 ? 'white' : 'black';
      const squareId = `${String.fromCharCode(97 + col)}${8 - row}`;
      const piece = boardState[row][col];

      board.push(
<div
  key={squareId}
  className={`square ${squareColor}`}
  onClick={() => {
    if (selectedPiece === null && piece !== '') {
      setSelectedPiece({ row, col });
    } else if (selectedPiece !== null) {
      const isValidMove = isPawnMoveValid(selectedPiece.row, selectedPiece.col, row, col, boardState[selectedPiece.row][selectedPiece.col]);
      if (isValidMove) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
      } else {
        alert('Invalid move for the pawn.');
      }
      setSelectedPiece(null);
    }
  }}
>
          {piece && (
            <div className="chess-piece">
              {piece}
            </div>
          )}
        </div>
      );
    }
  }

  return <div className="chessboard">{board}</div>;
};

export default Chessboard;



