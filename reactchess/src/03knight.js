import React, { useState } from 'react';

const Knight = ({ piece, position, moveKnight }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (isSelected) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };

  const handleMove = (toRow, toCol) => {
    moveKnight(position[0], position[1], toRow, toCol);
    setIsSelected(false);
  };

  return (
    <div
      className={`knight ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {piece}
      {isSelected && (
        <div className="valid-moves">
          <button onClick={() => handleMove(position[0] - 2, position[1] - 1)}>
            Move Up-Left
          </button>
          {/* Add more movement options here */}
        </div>
      )}
    </div>
  );
};

export default Knight;