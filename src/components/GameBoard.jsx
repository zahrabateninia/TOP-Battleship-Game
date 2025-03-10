import React, { useState } from "react";
import "../styles/GameBoard.css"; 

const GameBoard = () => {
  const gridSize = 10; // 10x10 grid
  const [board, setBoard] = useState(
    Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null))
  );

  // Function to handle clicks on a square (for ship placement or attacks)
  const handleSquareClick = (row, col) => {
    console.log(`Clicked on row: ${row}, col: ${col}`);
    // Future logic for placing ships or attacking
  };

  // Function to render each square
  const renderSquare = (row, col) => {
    return (
      <div
        key={`${row}-${col}`}
        className="square"
        onClick={() => handleSquareClick(row, col)}
      />
    );
  };

  // Function to render the entire board
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
    <div className="game-board">
      {renderBoard()}
    </div>
  );
};

export default GameBoard;
