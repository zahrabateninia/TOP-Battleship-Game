import React, { useState } from 'react';

const GameBoard = () => {
  const gridSize = 10; // For a 10x10 grid
  const [board, setBoard] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  

  // Render each square of the board
  const renderSquare = (row, col) => {
    return (
      <div
        key={`${row}-${col}`}
        className="square"
        style={{
          width: '30px',
          height: '30px',
          border: '1px solid #ccc',
          backgroundColor: board[row][col] ? 'gray' : 'white',
        }}
      />
    );
  };

  const renderBoard = () => {
    let squares = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        squares.push(renderSquare(row, col));
      }
    }
    return squares;
  };

  return (
    <div>
      <div className="game-board" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 30px)` }}>
        {renderBoard()}
      </div>
    </div>
  );
};

export default GameBoard;
