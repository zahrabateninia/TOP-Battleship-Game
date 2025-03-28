import React, { useState } from "react";
import ShipPlacement from "./ShipPlacement";
import Board from "./Board";
import Gameboard from "../modules/gameboard";

const Game = () => {
  const [playerBoard, setPlayerBoard] = useState(null);
  const [computerBoard, setComputerBoard] = useState(new Gameboard());
  const [gameStarted, setGameStarted] = useState(false);

  const handleShipsPlaced = (boardData) => {
    const playerGameboard = new Gameboard();
    
    // Convert boardData to ship placements
    boardData.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell === "S") {
          playerGameboard.placeShip("Unknown", [rIdx, cIdx], "horizontal"); // Temporary
        }
      });
    });

    // Generate random placements for the computer
    computerBoard.placeRandomShips();

    setPlayerBoard(playerGameboard);
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted ? (
        <ShipPlacement onShipsPlaced={handleShipsPlaced} />
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <h2>Player Board</h2>
            <Board board={playerBoard.ships} isPlayerBoard={true} />
          </div>
          <div>
            <h2>Computer Board</h2>
            <Board board={computerBoard.ships} isPlayerBoard={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
