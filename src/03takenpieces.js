import React from 'react';
import ChessPiece from './01chesspiece';
import './css/chessboard.css';

const TakenPieces = ({ takenPieces, pieceDesign }) => {
  const takenPiecesList = takenPieces.map((piece, index) => (
    <div key={index} className="taken-piece">
      {piece && (
        <div className="chess-piece">
          <ChessPiece piece={piece} design={pieceDesign} />
        </div>
      )}
    </div>
  ));

  return (
    <div className="taken-pieces">
      <h2 className='taken'>Taken Pieces</h2>
      <div className="taken-pieces-list">
        {takenPiecesList}
      </div>
    </div>
  );
};

export default TakenPieces;