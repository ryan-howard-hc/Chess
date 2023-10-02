import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/chessboard.css';
import Pawn from './01pawn';

const Chessboard = () => {
  const initialBoardState = [
    ['R', 'P', '', '', '', '', 'p', 'r'],
    ['N', 'P', '', '', '', '', 'p', 'n'],
    ['B', 'P', '', '', '', '', 'p', 'b'],
    ['Q', 'P', '', '', '', '', 'p', 'q'],
    ['K', 'P', '', '', '', '', 'p', 'k'],
    ['B', 'P', '', '', '', '', 'p', 'b'],
    ['N', 'P', '', '', '', '', 'p', 'n'],
    ['R', 'P', '', '', '', '', 'p', 'r'],
  ];
  const [boardState, setBoardState] = useState(initialBoardState);

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoardState = [...boardState];
    newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol];
    newBoardState[fromRow][fromCol] = '';
    setBoardState(newBoardState);
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
            if (piece !== '') {
              // handle piece movement
              // move any piece to an empty square
              const targetPiece = prompt('Enter the target square:');
              if (targetPiece) {
                const targetCol = targetPiece.charCodeAt(0) - 97;
                const targetRow = 8 - parseInt(targetPiece[1], 10);
                movePiece(row, col, targetRow, targetCol);
              }
            }
          }}
        >
          {piece && (
            <Pawn
              piece={piece}
              position={[row, col]}
              movePiece={movePiece}
            />
          )}
        </div>
      );
    }
  }

  return <div className="chessboard">{board}</div>;
};

export default Chessboard;