import React, { useState, useEffect } from "react";
import Game from "../modules/game";

const BattleshipGame = ({ playerBoard }) => {
  const [game, setGame] = useState(null);
  const [winner, setWinner] = useState(null);
  const [attackedCoords, setAttackedCoords] = useState(new Set());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Track whose turn it is
  const [message, setMessage] = useState("Your turn!"); // Message to show whose turn it is

  useEffect(() => {
    if (playerBoard) {
      const newGame = new Game();
      newGame.setupPlayerShips(playerBoard);
      newGame.setupComputerShips(); // Places random ships for the computer
      setGame(newGame);
    }
  }, [playerBoard]);

  // Handle player's attack
  const handlePlayerAttack = (coord) => {
    if (!game || winner || !isPlayerTurn) return; // Prevent attack if it's not player's turn

    const coordKey = coord.join(",");
    if (attackedCoords.has(coordKey)) return; // Don't attack the same cell twice

    const result = game.playerAttack(coord);
    setAttackedCoords((prev) => new Set(prev).add(coordKey));

    if (result) {
      const currentWinner = game.checkWinner();
      if (currentWinner) {
        setWinner(currentWinner);
        setMessage(`${currentWinner} wins!`);
      }
    }

    setIsPlayerTurn(false); // Switch turn to computer
    setMessage("Computer's turn..."); // Set message to computer's turn
  };

  // Handle computer's attack
  const handleComputerAttack = () => {
    if (isPlayerTurn || !game) return; // If it's the player's turn, don't let the computer attack

    let row, col, coord;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      coord = [row, col];
    } while (attackedCoords.has(coord.join(","))); // Ensure no repeated attacks

    const result = game.computerAttack(coord);
    setAttackedCoords((prev) => new Set(prev).add(coord.join(",")));

    if (result) {
      const currentWinner = game.checkWinner();
      if (currentWinner) {
        setWinner(currentWinner);
        setMessage(`${currentWinner} wins!`);
      }
    }

    setIsPlayerTurn(true); // Switch turn back to player
    setMessage("Your turn!"); // Set message to player's turn
  };

  useEffect(() => {
    // Trigger the computer's attack after player's attack
    if (!isPlayerTurn) {
      setTimeout(() => {
        handleComputerAttack();
      }, 1000); // Add delay to simulate computer's thinking time
    }
  }, [isPlayerTurn]); // Trigger computer attack when it's computer's turn

  // Render the board for both the player and the computer
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
      {message && <h2>{message}</h2>} {/* Show current game message */}
      {winner && <h2>{winner}</h2>} {/* Display winner when the game ends */}
    </div>
  );
};

export default BattleshipGame;
