import React, { useState } from 'react';

const GameBoard = () => {
  const gridSize = 10; // 10x10 grid
  const [board, setBoard] = useState(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null)));

  const handleClick = (row, col) => {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]); // Create a copy of the board
      newBoard[row][col] = newBoard[row][col] ? null : 'S'; // Toggle ship placement
      return newBoard;
    });
  };

  const renderSquare = (row, col) => (
    <div
      key={`${row}-${col}`}
      className="square"
      onClick={() => handleClick(row, col)}
      style={{
        width: '30px',
        height: '30px',
        border: '1px solid #ccc',
        backgroundColor: board[row][col] ? 'gray' : 'white',
        cursor: 'pointer',
      }}
    />
  );

  return (
    <div>
      <h2>Game Board</h2>
      <div className="game-board" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 30px)` }}>
        {board.flatMap((row, rowIndex) =>
          row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
