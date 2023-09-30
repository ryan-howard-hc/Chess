import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Chessboard = () => {
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
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="chessboard">
                {board}
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Chessboard;