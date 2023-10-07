import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/chessboard.css';
import PlayerTurn from './07playerturns';
import ChessPiece from './01chesspiece';
import EasyModeToggle from './02easymode';
const Chessboard = () => {
const [easyMode, setEasyMode] = useState(false);   //sets initial state for my easy mode component to be turned off
const [validMoves, setValidMoves] = useState([]);   //declares state variable and corresponding setter function. Valid moves is initialized as an empty array for storing moves where the pieces can and cannot go based on where a piece has been moved to, taken, etc

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

const [currentPlayer, setCurrentPlayer] = useState('White');
const [validMovePositions, setValidMovePositions] = useState([]);

const [boardState, setBoardState] = useState(initialBoardState);
const [selectedPiece, setSelectedPiece] = useState(null);

const toggleEasyMode = () => {
  setEasyMode(!easyMode);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const movePiece = (fromRow, fromCol, toRow, toCol) => {    // function takes the four coordinate parameters, from and to
  if (fromRow === toRow && fromCol === toCol) { 
    return; // if statement checks whether the source/destination are the same. therefore returns early and doesnt perform any actions
  }

  const newBoardState = [...boardState]; //creates new shalow array, copies all the elements from the previous array. boardState is the 2d array of my board, this effectively helps keep the board the same while you can move or simulate/decide where your next piece will go. 
  const piece = newBoardState[fromRow][fromCol];//new constant variable that assigns it the piece that was moved/found at the specified coordinates you pulled the piece from on the newBoardState

    console.log('Moving piece:', piece);
    console.log('From:', fromRow, fromCol);
    console.log('To:', toRow, toCol);

  if (newBoardState[toRow][toCol] !== ' ') {
    console.log('Capturing piece at destination:', newBoardState[toRow][toCol]);
    newBoardState[toRow][toCol] = ' ';
  } //if statement checks if there is a piece at the destination coordinates based on the updated newBoardState and logs that a piece has been captured.
    // (LATER in other functions determines whether each individual piece's logic will actually capture the target piece)

  newBoardState[toRow][toCol] = piece; 
  newBoardState[fromRow][fromCol] = ' '; // these update to move the piece to the new coordinates, sets the cell it just moved from, back to empty

  console.log('Updated board state:', newBoardState); 

  setBoardState(newBoardState); //updates the game board to log that a move has just been made.
  setCurrentPlayer(currentPlayer === 'White' ? 'Black' : 'White'); //updates current player

  // Clear valid moves and selected piece after the move to prepare for next player's turn
  setSelectedPiece(null);
  setValidMoves([]);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const isPawnMoveValid = (fromRow, fromCol, toRow, toCol, piece, currentPlayer) => {
  const direction = currentPlayer === 'White' ? 1 : -1;
  const startingRow = currentPlayer === 'White' ? 1 : 6;

  if ((piece === 'p' && currentPlayer === 'White') || (piece === 'P' && currentPlayer === 'Black')) {
    // Check if it's the correct player's turn
    console.log('It is not the current player\'s turn.');
    return false;
  }

  if (piece === 'p' || piece === 'P') {
    console.log('Piece:', piece);
    console.log('fromRow:', fromRow);
    console.log('fromCol:', fromCol);
    console.log('toRow:', toRow);
    console.log('toCol:', toCol);
    console.log('Source square:', boardState[fromRow][fromCol]);
    console.log('Destination square:', boardState[toRow][toCol]);

    if (fromCol === toCol && (fromRow + direction === toRow || fromRow - direction === toRow) && boardState[toRow][toCol] === ' ' && boardState[fromRow][fromCol] === piece) {
      console.log('Valid');
      return true;
    }

    if (fromCol === toCol && fromRow + direction * 2 === toRow && fromRow === startingRow && boardState[toRow][toCol] === ' ' && boardState[fromRow + direction][toCol] === ' ') {
      console.log('Valid move for first step!');
      return true;
    }

    if (Math.abs(fromCol - toCol) === 1 && (fromRow + direction === toRow || fromRow - direction === toRow) && boardState[toRow][toCol] !== ' ' && boardState[toRow][toCol] !== piece.toLowerCase()) {
      console.log('Valid capture');
      return true;
    }
  }

  console.log('Invalid move');
  return false;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const isRookMoveValid = (fromRow, fromCol, toRow, toCol, piece, currentPlayer) => { 
  
  if ((piece === 'r' && currentPlayer === 'White') || (piece === 'R' && currentPlayer === 'Black')) {
    console.log('It is not the current player\'s turn.');
    return false;
  }

  // if the rook is moving in a straight line
    if (fromRow === toRow || fromCol === toCol) {
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const isKnightMoveValid = (fromRow, fromCol, toRow, toCol, piece, currentPlayer) => {
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);
  if ((piece === 'n' && currentPlayer === 'White') || (piece === 'N' && currentPlayer === 'Black')) {
    console.log('It is not the current player\'s turn.');
    return false;
  }
  // Knights move in an L-shape: 2 squares in one direction and 1 square in a perpendicular direction.
  if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) {


    //  if the destination square is empty or has an opponent's piece
    if (
      boardState[toRow][toCol] === ' ' ||
      (piece === piece.toUpperCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toLowerCase()) ||
      (piece === piece.toLowerCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toUpperCase())
    ) {
      console.log('Valid move for knight');
      return true;
    }
  }

  console.log('Invalid move for knight');
  return false;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const isBishopMoveValid = (fromRow, fromCol, toRow, toCol, piece, currentPlayer) => {
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);
  if ((piece === 'b' && currentPlayer === 'White') || (piece === 'B' && currentPlayer === 'Black')) {
    console.log('It is not the current player\'s turn.');
    return false;
  }
  // Bishops move diagonally, so dx should equal dy for a valid move.
  if (dx === dy) {
    const rowStep = fromRow < toRow ? 1 : -1;
    const colStep = fromCol < toCol ? 1 : -1;
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
    if (
      boardState[toRow][toCol] === ' ' ||
      (piece === piece.toUpperCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toLowerCase()) ||
      (piece === piece.toLowerCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toUpperCase())
    ) {
      console.log('Valid move for bishop');
      return true;
    }
  }

  console.log('Invalid move for bishop');
  return false;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const isQueenMoveValid = (fromRow, fromCol, toRow, toCol, piece, currentPlayer) => {
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);
  if ((piece === 'q' && currentPlayer === 'White') || (piece === 'Q' && currentPlayer === 'Black')) {
    console.log('It is not the current player\'s turn.');
    return false;
  }
  // Queen can move diagonally or in a straight line
  if (dx === dy || fromRow === toRow || fromCol === toCol) {
    // if the path is clear for a straight line move
    if (fromRow === toRow || fromCol === toCol) {
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
    }

    // if the path is clear for a diagonal move
    if (dx === dy) {
      const rowStep = fromRow < toRow ? 1 : -1;
      const colStep = fromCol < toCol ? 1 : -1;
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
    }

    // if the destination square is empty or has an opponent's piece
    if (
      boardState[toRow][toCol] === ' ' ||
      (piece === piece.toUpperCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toLowerCase()) ||
      (piece === piece.toLowerCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toUpperCase())
    ) {
      console.log('Valid move for queen');
      return true;
    }
  }

  console.log('Invalid move for queen');
  return false;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const isKingMoveValid = (fromRow, fromCol, toRow, toCol, piece, currentPlayer) => {
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);
  if ((piece === 'k' && currentPlayer === 'White') || (piece === 'K' && currentPlayer === 'Black')) {
    console.log('It is not the current player\'s turn.');
    return false;
  }
  // King can move one square in any direction
  if (dx <= 1 && dy <= 1) {
    // if the destination square is empty or has an opponent's piece
    if (
      boardState[toRow][toCol] === ' ' ||
      (piece === piece.toUpperCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toLowerCase()) ||
      (piece === piece.toLowerCase() && boardState[toRow][toCol] === boardState[toRow][toCol].toUpperCase())
    ) {
      console.log('Valid move for king');
      return true;
    }
  }

  console.log('Invalid move for king');
  return false;
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const updateValidMovePositions = (row, col) => {
  const piece = boardState[row][col];
  let validPositions = [];

  if (piece === 'P' || piece === 'p') {
    validPositions = isPawnMoveValid(row, col, piece, currentPlayer);
  } else if (piece === 'R' || piece === 'r') {
    validPositions = isRookMoveValid(row, col, piece, currentPlayer);
  } else if (piece === 'N' || piece === 'n') {
    validPositions = isKnightMoveValid(row, col, piece, currentPlayer);
  } else if (piece === 'B' || piece === 'b') {
    validPositions = isBishopMoveValid(row, col, piece, currentPlayer);
  } else if (piece === 'Q' || piece === 'q') {
    validPositions = isQueenMoveValid(row, col, piece, currentPlayer);
  } else if (piece === 'K' || piece === 'k') {
    validPositions = isKingMoveValid(row, col, piece, currentPlayer);
  }

  setValidMovePositions(validPositions);
};

useEffect(() => {
  if (selectedPiece !== null) {
    const [row, col] = [selectedPiece.row, selectedPiece.col];
    updateValidMovePositions(row, col);
  } else {
    setValidMovePositions([]);
  }
}, [selectedPiece, currentPlayer]);


const board = [];

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const squareColor = (row + col) % 2 === 0 ? 'white' : 'black';
        const squareId = `${
            String.fromCharCode(97 + col)
        }${
            8 - row
        }`;
        const piece = boardState[row][col];

        board.push (
            <div key={squareId}
                className={
                    `square ${squareColor}`
                }
                onClick={
                    () => {
                        if (selectedPiece === null) {
                            setSelectedPiece({row, col});
                            console.log('Selected Piece:', boardState[row][col]);
                        } else {
                            const piece = boardState[selectedPiece.row][selectedPiece.col];
                            let isValidMove = false;

                            if (piece === 'P' || piece === 'p') {
                                isValidMove = isPawnMoveValid(selectedPiece.row, selectedPiece.col, row, col, piece, currentPlayer);
                            } else if (piece === 'R' || piece === 'r') {
                                isValidMove = isRookMoveValid(selectedPiece.row, selectedPiece.col, row, col, piece, currentPlayer);
                            } else if (piece === 'N' || piece === 'n') {
                                isValidMove = isKnightMoveValid(selectedPiece.row, selectedPiece.col, row, col, piece, currentPlayer);
                            } else if (piece === 'B' || piece === 'b') {
                                isValidMove = isBishopMoveValid(selectedPiece.row, selectedPiece.col, row, col, piece, currentPlayer);
                            } else if (piece === 'Q' || piece === 'q') {
                                isValidMove = isQueenMoveValid(selectedPiece.row, selectedPiece.col, row, col, piece, currentPlayer);
                            } else if (piece === 'K' || piece === 'k') {
                                isValidMove = isKingMoveValid(selectedPiece.row, selectedPiece.col, row, col, piece, currentPlayer);
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
                    }
            }>
                {
                piece && (
                    <div className="chess-piece">
                        {piece && <ChessPiece piece={piece} />}
 </div>
                )
            } </div>
        );
    }
}

return (
  <div>
    <PlayerTurn currentPlayer={currentPlayer} />

    {/* Render the EasyModeToggle component */}
    <EasyModeToggle easyMode={easyMode} toggleEasyMode={toggleEasyMode} />

    <div className="chessboard-container">
      <div className="chessboard">
{board}      </div>
    </div>
  </div>
);
};

export default Chessboard;



// else {
//   alert('Invalid move for the selected piece.');
//   console.log('Invalid move for the selected piece.');
// }