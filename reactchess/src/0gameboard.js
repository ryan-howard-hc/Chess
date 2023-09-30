import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/chessboard.css';
const Chessboard = () => {
    const [boardState, setBoardState] = useState(initialBoardState);

    const initialBoardState = [
        ['WR', 'WP', '', '', '', '', 'BP', 'BR'],
        ['WN', 'WP', '', '', '', '', 'BP', 'BN'],
        ['WB', 'WP', '', '', '', '', 'BP', 'BB'],
        ['WQ', 'WP', '', '', '', '', 'BP', 'BQ'],
        ['WK', 'WP', '', '', '', '', 'BP', 'BK'],
        ['WB', 'WP', '', '', '', '', 'BP', 'BB'],
        ['WN', 'WP', '', '', '', '', 'BP', 'BN'],
        ['WR', 'WP', '', '', '', '', 'BP', 'BR'],
      ];

      const movePawn = (fromRow, fromCol, toRow, toCol) => {
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
        board.push(
          <div key={squareId} className={`square ${squareColor}`}>


            
          </div>
        );
      }
    }
  
    return (
        <div className="chessboard">
          {board}
          {boardState.map((row, rowIndex) => (
            row.map((piece, colIndex) => (
              piece && (
                <Pawn
                  key={`${rowIndex}-${colIndex}`}
                  piece={piece}
                  position={[rowIndex, colIndex]}
                  movePawn={movePawn}
                />
              )
            ))
          ))}
        </div>
      );
    };
    
    export default Chessboard;