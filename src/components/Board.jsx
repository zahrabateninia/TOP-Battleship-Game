import React from "react";

const Board = ({ board, onCellClick }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 40px)", gap: "5px" }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: cell ? "#4CAF50" : "transparent", // Green if ship is placed
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          />
        ))
      )}
    </div>
  );
};

export default Board;
