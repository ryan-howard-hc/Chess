import React from 'react';

const ChessPiece = ({ piece }) => {
  const pieceToSymbol = {
    'P': '♙',
    'N': '♘',
    'B': '♗',
    'R': '♖',
    'Q': '♕',
    'K': '♔',
    'p': '♟',
    'n': '♞',
    'b': '♝',
    'r': '♜',
    'q': '♛',
    'k': '♚',
    ' ': null, 
  };

  return (
    <div className="chess-piece">
      {pieceToSymbol[piece]}
    </div>
  );
};

export default ChessPiece;