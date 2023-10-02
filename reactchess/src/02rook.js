import React from 'react';

const Rook = ({ color, fromRow, fromCol, boardState, onMove }) => {
  const calculateValidMoves = () => {
    const validMoves = [];

    for (let col = 0; col < 8; col++) {
      if (col !== fromCol && boardState[fromRow][col] === '') {
        validMoves.push({ toRow: fromRow, toCol: col });
      }
    }

    for (let row = 0; row < 8; row++) {
      if (row !== fromRow && boardState[row][fromCol] === '') {
        validMoves.push({ toRow: row, toCol: fromCol });
      }
    }

    return validMoves;
  };

  const handleMove = (toRow, toCol) => {
    const validMoves = calculateValidMoves();
  
    if (validMoves.length > 0 && validMoves.some(move => move.toRow === toRow && move.toCol === toCol)) {
      const newBoardState = [...boardState];
      newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol];
      newBoardState[fromRow][fromCol] = '';
      onMove(newBoardState);
    } else {
      console.log('Invalid move for a Rook!');
    }
  };

  const validMoves = calculateValidMoves();

  return (
    <div className={`piece rook ${color}`} onClick={() => handleMove(validMoves[0].toRow, validMoves[0].toCol)}>
      R 
    </div>
  );
};

export default Rook;
