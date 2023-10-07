import React from 'react';

const ChessPiece = ({ piece, design }) => {
  const pieceDesigns = {
    default: {
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
    },
    alternate: {
      'P': '😊',
      'N': '😃',
      'B': '😇',
      'R': '😄',
      'Q': '😍',
      'K': '😎',
      'p': '😋',
      'n': '😁',
      'b': '🥰',
      'r': '😆',
      'q': '😌',
      'k': '👑',
      ' ': null,
    },
  };

  return (
    <div className="chess-piece">
      {pieceDesigns[design][piece]}
    </div>
  );
};

export default ChessPiece;