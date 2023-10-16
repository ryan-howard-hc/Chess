import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/chessboard.css';
import PlayerTurn from './07playerturns';
import ChessPiece from './01chesspiece';
import EasyModeToggle from './02easymode';
import TakenPieces from './03takenpieces';


const Chessboard = () => {
  // const [gameOver, setGameOver] = useState(false);
  // const [checkmateMessage, setCheckmateMessage] = useState('');
  // const [gameOverAlert, setGameOverAlert] = useState(false);
  const [checkNotification, setCheckNotification] = useState(false);


const [easyMode, setEasyMode] = useState(false);   //sets initial state for my easy mode component to be turned off
const [validMovesForSelectedPiece, setValidMovesForSelectedPiece] = useState([]);  //declares state variable and corresponding setter function. Valid moves is initialized as an empty array for storing moves where the pieces can and cannot go based on where a piece has been moved to, taken, etc

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

const [pieceDesign, setPieceDesign] = useState('default');
const togglePieceDesign = () => {
  if (pieceDesign === 'default') {
    setPieceDesign('alternate');
  } else if (pieceDesign === 'alternate') {
    setPieceDesign('altAlt');
  } else {
    setPieceDesign('default');
  }
};


const toggleEasyMode = () => {
  setEasyMode(!easyMode);
};

const [takenPieces, setTakenPieces] = useState([]); //refer to line 68


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
      setTakenPieces([...takenPieces, newBoardState[toRow][toCol]]);
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
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const isPawnMoveValid = (fromRow, fromCol, toRow, toCol, piece, currentPlayer) => {
  const direction = currentPlayer === 'White' ? 1 : -1;
  const startingRow = currentPlayer === 'White' ? 1 : 6;

  if ((piece === 'p' && currentPlayer === 'White') || (piece === 'P' && currentPlayer === 'Black')) {
    // checks if it's the correct player's turn
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

    if (Math.abs(fromCol - toCol) === 1 && (fromRow + direction === toRow || fromRow - direction === toRow) && boardState[toRow][toCol] !== ' ' && (piece === 'p' && boardState[toRow][toCol] === 'P' || piece === 'P' && boardState[toRow][toCol] === 'p')) {
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
  const validPositions = [];

  if (piece === 'P' && currentPlayer === 'White') {
    // checks if the pawn can move one square forward
    if (row + 1 < 8 && boardState[row + 1][col] === ' ') {
      validPositions.push({ row: row + 1, col });
    }
  
    // checks if the pawn can move two squares forward from its starting position
    if (row === 1 && boardState[row + 1][col] === ' ' && boardState[row + 2][col] === ' ') {
      validPositions.push({ row: row + 2, col });
    }
  
    // checks if the pawn can capture diagonally to the right
    if (col + 1 < 8 && row + 1 < 8 && boardState[row + 1][col + 1] !== ' ' && boardState[row + 1][col + 1].toUpperCase() === 'B') {
      validPositions.push({ row: row + 1, col: col + 1 });
    }
  
    // checks if the pawn can capture diagonally to the left
    if (col - 1 >= 0 && row + 1 < 8 && boardState[row + 1][col - 1] !== ' ' && boardState[row + 1][col - 1].toUpperCase() === 'B') {
      validPositions.push({ row: row + 1, col: col - 1 });
    }
    console.log('Valid move positions:', validPositions);

  } else if (piece === 'p' && currentPlayer === 'Black') {


    // checks if the pawn can move one square forward
    if (row - 1 >= 0 && boardState[row - 1][col] === ' ') {
      validPositions.push({ row: row - 1, col });
    }
  
    // checks if the pawn can move two squares forward from its starting position
    if (row === 6 && boardState[row - 1][col] === ' ' && boardState[row - 2][col] === ' ') {
      validPositions.push({ row: row - 2, col });
    }
  
    // checks if the pawn can capture diagonally to the right
    if (col + 1 < 8 && row - 1 >= 0 && boardState[row - 1][col + 1] !== ' ' && boardState[row - 1][col + 1].toUpperCase() === 'W') {
      validPositions.push({ row: row - 1, col: col + 1 });
    }
  
    // checks if the pawn can capture diagonally to the left
    if (col - 1 >= 0 && row - 1 >= 0 && boardState[row - 1][col - 1] !== ' ' && boardState[row - 1][col - 1].toUpperCase() === 'W') {
      validPositions.push({ row: row - 1, col: col - 1 });
    }
  
  
  console.log('Valid move positions:', validPositions);
  


}else if (piece === 'R' && currentPlayer === 'White') {
    // checks valid moves for the rook in the upward direction
    for (let r = row - 1; r >= 0; r--) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'B') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the rook in the downward direction
    for (let r = row + 1; r < 8; r++) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'B') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the rook to the right
    for (let c = col + 1; c < 8; c++) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'B') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the rook to the left
    for (let c = col - 1; c >= 0; c--) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'B') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
      console.log('Valid move positions for rook:', validPositions);

    }

  } else if (piece === 'r' && currentPlayer === 'Black') {
    // checks valid moves for the rook in the upward direction
    for (let r = row - 1; r >= 0; r--) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'W') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the rook in the downward direction
    for (let r = row + 1; r < 8; r++) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'W') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the rook to the right
    for (let c = col + 1; c < 8; c++) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'W') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the rook to the left
    for (let c = col - 1; c >= 0; c--) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'W') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
    console.log('Valid move positions for rook:', validPositions);

  }
  

  else if (piece === 'N' && currentPlayer === 'White') {
    const knightMoves = [
      { row: row - 2, col: col + 1 },
      { row: row - 2, col: col - 1 },
      { row: row - 1, col: col + 2 },
      { row: row - 1, col: col - 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 1, col: col - 2 },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col - 1 },
    ];
  
    for (const move of knightMoves) {
      const { row: newRow, col: newCol } = move;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (boardState[newRow][newCol] === ' ' || boardState[newRow][newCol].toUpperCase() === 'B') {
          validPositions.push(move);
        }
      }
      
    }
    console.log('Valid move positions for knight:', validPositions);

  } else if (piece === 'n' && currentPlayer === 'Black') {
    const knightMoves = [
      { row: row - 2, col: col + 1 },
      { row: row - 2, col: col - 1 },
      { row: row - 1, col: col + 2 },
      { row: row - 1, col: col - 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 1, col: col - 2 },
      { row: row + 2, col: col + 1 },
      { row: row + 2, col: col - 1 },
    ];
  
    for (const move of knightMoves) {
      const { row: newRow, col: newCol } = move;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (boardState[newRow][newCol] === ' ' || boardState[newRow][newCol].toUpperCase() === 'W') {
          validPositions.push(move);
        }
      }
    }
    console.log('Valid move positions for knight:', validPositions);

  }
  


  else if (piece === 'B' && currentPlayer === 'White') {
    // checks valid moves for the bishop diagonally to the upper right
    for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the bishop diagonally to the upper left
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the bishop diagonally to the lower right
    for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the bishop diagonally to the lower left
    for (let r = row + 1, c = col - 1; r < 8 && c >= 0; r++, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
    console.log('Valid move positions for bishop:', validPositions);

  } else if (piece === 'b' && currentPlayer === 'Black') {
    // checks valid moves for the bishop diagonally to the upper right
    for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the bishop diagonally to the upper left
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the bishop diagonally to the lower right
    for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the bishop diagonally to the lower left
    for (let r = row + 1, c = col - 1; r < 8 && c >= 0; r++, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
    console.log('Valid move positions for bishop:', validPositions);

  }
  


  else if (piece === 'Q' && currentPlayer === 'White') {
    // checks valid moves for the queen horizontally to the right
    for (let c = col + 1; c < 8; c++) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'B') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen horizontally to the left
    for (let c = col - 1; c >= 0; c--) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'B') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen vertically upwards
    for (let r = row - 1; r >= 0; r--) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'B') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen vertically downwards
    for (let r = row + 1; r < 8; r++) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'B') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the upper right
    for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the upper left
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the lower right
    for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the lower left
    for (let r = row + 1, c = col - 1; r < 8 && c >= 0; r++, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'B') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
    console.log('Valid move positions for queen:', validPositions);

  } else if (piece === 'q' && currentPlayer === 'Black') {
    // checks valid moves for the queen horizontally to the right
    for (let c = col + 1; c < 8; c++) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'W') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen horizontally to the left
    for (let c = col - 1; c >= 0; c--) {
      if (boardState[row][c] === ' ') {
        validPositions.push({ row, col: c });
      } else if (boardState[row][c].toUpperCase() === 'W') {
        validPositions.push({ row, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen vertically upwards
    for (let r = row - 1; r >= 0; r--) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'W') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen vertically downwards
    for (let r = row + 1; r < 8; r++) {
      if (boardState[r][col] === ' ') {
        validPositions.push({ row: r, col });
      } else if (boardState[r][col].toUpperCase() === 'W') {
        validPositions.push({ row: r, col });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the upper right
    for (let r = row - 1, c = col + 1; r >= 0 && c < 8; r--, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the upper left
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the lower right
    for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
  
    // checks valid moves for the queen diagonally to the lower left
    for (let r = row + 1, c = col - 1; r < 8 && c >= 0; r++, c--) {
      if (boardState[r][c] === ' ') {
        validPositions.push({ row: r, col: c });
      } else if (boardState[r][c].toUpperCase() === 'W') {
        validPositions.push({ row: r, col: c });
        break; // stops if there's an opponent's piece blocking the path
      } else {
        break; // stops if there's a friendly piece blocking the path
      }
    }
    console.log('Valid move positions for queen:', validPositions);

  }
  

  else if (piece === 'K' && currentPlayer === 'White') {
    // checks valid moves for the king in all 8 directions
    const directions = [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ];
  
    for (const direction of directions) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;
  
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (boardState[newRow][newCol] === ' ' || boardState[newRow][newCol].toUpperCase() === 'B') {
          validPositions.push({ row: newRow, col: newCol });
        }
      }
    }
      console.log('Valid move positions for king:', validPositions);

  } else if (piece === 'k' && currentPlayer === 'Black') {
    // checks valid moves for the king in all 8 directions
    const directions = [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ];
  
    for (const direction of directions) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;
  
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (boardState[newRow][newCol] === ' ' || boardState[newRow][newCol].toUpperCase() === 'W') {
          validPositions.push({ row: newRow, col: newCol });
        }
      }
    }
    console.log('Valid move positions for king:', validPositions);

  }
  setValidMovesForSelectedPiece(validPositions);    //
  console.log('Valid move positions:', validPositions);

  };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function isKingInCheck(currentPlayer, boardState, updateValidMovePositions) {
//   const opponentColor = (currentPlayer === 'White') ? 'Black' : 'White';
//   const kingSymbol = (currentPlayer === 'White') ? 'K' : 'k';

//   // Find the current position of the king
//   let kingRow, kingCol;
//   for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//       if (boardState[row][col] === kingSymbol) {
//         kingRow = row;
//         kingCol = col;
//       }
//     }
//   }

//   // Iterate over opponent's pieces
//   for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//       if (boardState[row][col].toUpperCase() === opponentColor) {
//         const piece = boardState[row][col];
//         const validMoves = updateValidMovePositions(piece, row, col, boardState, currentPlayer);

//         // Check if any of the valid moves can capture the king
//         if (validMoves.some(move => move.row === kingRow && move.col === kingCol)) {
//           return true; // King is in check
//         }
//       }
//     }
//   }

//   return false; // King is not in check
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const [showModal, setShowModal] = useState(false);
const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};
const [showAlert, setShowAlert] = useState(false);

const showNotification = (message) => {
  setShowAlert(true);
  setTimeout(() => {
    setShowAlert(false);
  }, 3000);
};

// useEffect(() => {
//   if (checkNotification) {
//     const notificationTimeout = setTimeout(() => {
//       setCheckNotification(false);
//     }, 3000); // Adjust the timeout duration as needed (3 seconds in this example)

//     return () => clearTimeout(notificationTimeout); // Clear the timeout on component unmount
//   }
// }, [checkNotification]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

const handleSquareClick = (row, col) => {

  if (selectedPiece === null) {
    setSelectedPiece({ row, col });
    updateValidMovePositions(row, col);
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
      setValidMovesForSelectedPiece([]);  //resets the valid moves for easy mode/check functions
      updateValidMovePositions(row, col); //offers the new valid moves to account for the check function that I need to make

      
    } else {
      showNotification('Invalid move for the selected piece.');
      console.log('Invalid move for the selected piece.');
    }
    

  }
};



const board = [];


for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const squareColor = (row + col) % 2 === 0 ? 'white' : 'black';
    const squareId = `${String.fromCharCode(97 + col)}${8 - row}`;
    const piece = boardState[row][col];

    const isSquareHighlighted =
      easyMode &&
      validMovesForSelectedPiece.some(
        (move) => move.row === row && move.col === col
      );
      board.push(
        <div
          key={squareId}
          className={`square ${squareColor} ${isSquareHighlighted ? 'highlighted' : ''}`}
          onClick={() => handleSquareClick(row, col)} 
        >
          {piece && (
            <div className="chess-piece">
              <ChessPiece piece={piece} design={pieceDesign} />
            </div>
          )}
        </div>
      );
    }
    
}

return (
  <div className="container col-12 col-md-12 ">
    
    <PlayerTurn currentPlayer={currentPlayer} />
    <div className="btn-group mb-3 container col-6 col-md-6 ">
      <button 
          className={`btn btn-primary rounded chess-button ${easyMode ? 'active' : ''}`}
          onClick={toggleEasyMode}
      >
        Easy Mode
      </button>

      <button
        className="btn btn-primary rounded chess-button"
        onClick={togglePieceDesign}
      >
        Change Pieces
      </button>

    </div>

    <div className="container col-12 col-md-12 ">
      <div className="row col-12 col-md-12">
        

        <div className="col-6 col-md-6 chessboard-column offset-md-3" >

          <div className="chessboard "  style={{ marginLeft: '30px' }}>
            
            {board}
          </div>
          
        </div>
        <div className={`flash-alert${showAlert || checkNotification ? ' visible' : ''}`}>
  {showAlert ? 'Invalid move for the selected piece.' : ''}
  {checkNotification ? 'Check!' : ''}
</div>
        <div className="col-2 col-md-2 offset-md-1">
          <div className="taken-pieces">
          <TakenPieces takenPieces={takenPieces} pieceDesign={pieceDesign} />
          </div>
        </div>

      </div>
    </div>


  </div>
);
};

export default Chessboard;


{/* <Modal show={showModal} onHide={() => setShowModal(false)} className="d-flex align-items-center justify-content-center">
<Modal.Header closeButton>
  <Modal.Title><h1 className="d-flex justify-content-center">oops!</h1></Modal.Title>
</Modal.Header>
<Modal.Body>
  <p className="d-flex justify-content-center">Invalid move for the selected piece.</p>
</Modal.Body>
<Modal.Footer className="d-flex justify-content-center">
  <Button variant="primary" onClick={() => setShowModal(false)}>
    Close
  </Button>
</Modal.Footer>
</Modal> */}



  // if (isCheckmate(currentPlayer)) {
  //   setGameOver(true);
  //   setCheckmateMessage(`${currentPlayer} is in checkmate! Game Over.`);
  //   setGameOverAlert(true); // Show game over alert
  //   // Hide the game over alert after 3 seconds (adjust the timeout duration as needed)
  //   setTimeout(() => {
  //     setGameOverAlert(false);
  //   }, 3000);
  // }