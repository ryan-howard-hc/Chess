// import React, { useState } from 'react';

// const Pawn = ({ piece, position, movePawn }) => {
//   const [isSelected, setIsSelected] = useState(false);

//   const handleClick = () => {
//     if (isSelected) {
//       setIsSelected(false);
//     } else {
//       setIsSelected(true);
//     }
//   };

//   const handleMove = (toRow, toCol) => {
//     movePawn(position[0], position[1], toRow, toCol);
//     setIsSelected(false);
//   };

//   return (
//     <div
//       className={`pawn ${isSelected ? 'selected' : ''}`}
//       onClick={handleClick}
//     >
//       {piece}
//       {isSelected && (
//         <div className="valid-moves">
//           <button onClick={() => handleMove(position[0] - 1, position[1])}>
//             Move Up
//           </button>



//           {/*  */}



          
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pawn;