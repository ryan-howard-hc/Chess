import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/chessboard.css';

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
    if (fromRow === toRow && fromCol === toCol) {
      return;
    }
  
    const newBoardState = [...boardState];
    const piece = newBoardState[fromRow][fromCol];
  
    console.log('Moving piece:', piece);
    console.log('From:', fromRow, fromCol);
    console.log('To:', toRow, toCol);
  
    if (newBoardState[toRow][toCol] !== ' ') {
      console.log('Capturing piece at destination:', newBoardState[toRow][toCol]);
      newBoardState[toRow][toCol] = ' ';
    }
  
    newBoardState[toRow][toCol] = piece;
    newBoardState[fromRow][fromCol] = ' ';
    
    console.log('Updated board state:', newBoardState);
    
    setBoardState(newBoardState);
  };



  const isPawnMoveValid = (fromRow, fromCol, toRow, toCol, piece) => {
    const direction = piece === 'P' ? 1 : -1;
    const startingRow = piece === 'P' ? 1 : 6;

    if (piece === 'p' || piece === 'P') {
      console.log('Piece:', piece);
      console.log('fromRow:', fromRow);
      console.log('fromCol:', fromCol);
      console.log('toRow:', toRow);
      console.log('toCol:', toCol);
      console.log('Source square:', boardState[fromRow][fromCol]);
      console.log('Destination square:', boardState[toRow][toCol]);

      if (
        fromCol === toCol &&
        (fromRow + direction === toRow || fromRow - direction === toRow) &&
        boardState[toRow][toCol] === ' ' &&
        boardState[fromRow][fromCol] === piece
      ) {
        console.log('Valid');
        return true;
      }

      if (
        fromCol === toCol &&
        fromRow + direction * 2 === toRow &&
        fromRow === startingRow &&
        boardState[toRow][toCol] === ' ' &&
        boardState[fromRow + direction][toCol] === ' '
      ) {
        console.log('Valid move for first step!');
        return true;
      }

      if (
        Math.abs(fromCol - toCol) === 1 &&
        (fromRow + direction === toRow || fromRow - direction === toRow) &&
        boardState[toRow][toCol] !== ' '
      ) {
        console.log('Valid capture');
        return true;
      }
    }

    console.log('Invalid move');
    return false;
  };

  const isRookMoveValid = (fromRow, fromCol, toRow, toCol, piece) => {
    if (fromRow === toRow || fromCol === toCol) {
      // if the rook is moving in a straight line
      const rowStep = fromRow === toRow ? 0 : fromRow < toRow ? 1 : -1;
      const colStep = fromCol === toCol ? 0 : fromCol < toCol ? 1 : -1;
  
      let currentRow = fromRow + rowStep;
      let currentCol = fromCol + colStep;
  
      while (currentRow !== toRow || currentCol !== toCol) {
        // if there are any pieces blocking the path
        if (boardState[currentRow][currentCol] !== ' ') {
          console.log('Invalid move, blocked by piece');
          return false;
        }
  
        currentRow += rowStep;
        currentCol += colStep;
      }
  
      // if the destination square is empty or has an opponent's piece
      if (boardState[toRow][toCol] === ' ' || (piece === piece.toUpperCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toLowerCase()) || (piece === piece.toLowerCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toUpperCase())) {
        console.log('Valid move for rook');
        return true;
      }
    }
  
    console.log('Invalid move for rook');
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
    if (selectedPiece === null) {
      setSelectedPiece({ row, col });
      console.log('Selected Piece:', boardState[row][col]);
    } else {
      const piece = boardState[selectedPiece.row][selectedPiece.col];
      let isValidMove = false;

      if (piece === 'P' || piece === 'p') {
        isValidMove = isPawnMoveValid(
          selectedPiece.row,
          selectedPiece.col,
          row,
          col,
          piece
        );
      } else if (piece === 'R' || piece === 'r') {
        isValidMove = isRookMoveValid(
          selectedPiece.row,
          selectedPiece.col,
          row,
          col,
          piece
        );
      }

      if (isValidMove) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        console.log('Piece moved successfully');
      } else {
        alert('Invalid move for the selected piece.');
        console.log('Invalid move for the selected piece.');
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