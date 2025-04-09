import React, { useState, useEffect } from "react";
import Game from "../modules/game";

const BattleshipGame = ({ playerBoard }) => {
  const [game, setGame] = useState(null);
  const [winner, setWinner] = useState(null);
  const [attackedCoords, setAttackedCoords] = useState(new Set());

  useEffect(() => {
    if (playerBoard) {
      const newGame = new Game();
      newGame.setupPlayerShips(playerBoard);
      newGame.setupComputerShips(); // Places random ships for computer
      setGame(newGame);
    }
  }, [playerBoard]);

  const handlePlayerAttack = (coord) => {
    if (!game || winner) return;

    const coordKey = coord.join(",");
    if (attackedCoords.has(coordKey)) return; // Don't attack same cell twice

    const result = game.playerAttack(coord);
    setAttackedCoords((prev) => new Set(prev).add(coordKey));

    if (result) {
      const currentWinner = game.checkWinner();
      if (currentWinner) {
        setWinner(currentWinner);
      }
    }
  };

  const renderBoard = (board, isComputer = false) => {
    if (!board) return null;

    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => {
          const coordKey = `${rowIndex},${colIndex}`;
          const isAttacked = attackedCoords.has(coordKey);
          const hasShip = cell !== null;
          const cellClass = [
            "cell",
            hasShip && !isComputer ? "ship-cell" : "", // Show player ships
            isAttacked && isComputer && hasShip ? "hit-cell" : "", // Show hit on computer
            isAttacked && isComputer && !hasShip ? "miss-cell" : "", // Show miss on computer
          ].join(" ");

          
          return (
            <div
              key={coordKey}
              className={cellClass}
              onClick={() => isComputer && handlePlayerAttack([rowIndex, colIndex])}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <div className="app-container">
      <div className="boards-container">
        <div>
          <h3>Player's Board</h3>
          <div className="board">
            {game?.playerBoard?.board && renderBoard(game.playerBoard.board)}
          </div>
        </div>
        <div>
          <h3>Computer's Board</h3>
          <div className="board">
            {game?.computerBoard?.board && renderBoard(game.computerBoard.board, true)}
          </div>
        </div>
      </div>
      {winner && <h2>{winner}</h2>}
    </div>
  );
};

export default BattleshipGame;
