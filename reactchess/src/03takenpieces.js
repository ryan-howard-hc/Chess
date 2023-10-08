import React from 'react';

const TakenPieces = ({ takenPieces }) => {
  const takenPiecesList = takenPieces.map((piece, index) => (
    <div key={index} className="taken-piece">
      {piece}
    </div>
  ));

  return (
    <div className="taken-pieces">
      <h2>Taken Pieces</h2>
      <div className="taken-pieces-list">
        {takenPiecesList}
      </div>
    </div>
  );
};

export default TakenPieces;