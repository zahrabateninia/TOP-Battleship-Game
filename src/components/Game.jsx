import React, { useState, useEffect } from "react";
import Game from "../modules/game";

const BattleshipGame = ({ playerBoard }) => {
  const [game, setGame] = useState(null);
  const [winner, setWinner] = useState(null);
  const [playerAttacks, setPlayerAttacks] = useState(new Set()); // player -> computer
  const [computerAttacks, setComputerAttacks] = useState(new Set()); // computer -> player
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState("Your turn!");

  useEffect(() => {
    if (playerBoard) {
      const newGame = new Game();
      newGame.setupPlayerShips(playerBoard);
      newGame.setupComputerShips();
      setGame(newGame);
    }
  }, [playerBoard]);

  const handlePlayerAttack = (coord) => {
    if (!game || !isPlayerTurn || winner) return;

    const coordKey = coord.join(",");
    if (playerAttacks.has(coordKey)) return;

    const result = game.playerAttack(coord);
    setPlayerAttacks((prev) => new Set(prev).add(coordKey));

    if (result) {
      const currentWinner = game.checkWinner();
      if (currentWinner) {
        setWinner(currentWinner);
        setMessage(`${currentWinner} wins!`);
        return;
      }
    }

    setIsPlayerTurn(false);
    setMessage("Computer's turn...");
  };

  const handleComputerTurn = () => {
    if (isPlayerTurn || !game || winner) return;

    let row, col, coord, coordKey;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      coord = [row, col];
      coordKey = coord.join(",");
    } while (computerAttacks.has(coordKey));

    const result = game.computerAttack(coord);
    setComputerAttacks((prev) => new Set(prev).add(coordKey));

    if (result) {
      const currentWinner = game.checkWinner();
      if (currentWinner) {
        setWinner(currentWinner);
        setMessage(`${currentWinner} wins!`);
        return;
      }
    }

    setIsPlayerTurn(true);
    setMessage("Your turn!");
  };

  useEffect(() => {
    if (game && !isPlayerTurn && !winner) {
      const timer = setTimeout(handleComputerTurn, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, game, winner]);

  const renderBoard = (board, isComputer = false) => {
    if (!board) return null;

    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => {
          const coordKey = `${rowIndex},${colIndex}`;
          const attackedSet = isComputer ? playerAttacks : computerAttacks;
          const isAttacked = attackedSet.has(coordKey);
          const hasShip = cell !== null;

          const cellClass = [
            "cell",
            hasShip && !isComputer ? "ship-cell" : "",
            isAttacked && hasShip ? "hit-cell" : "",
            isAttacked && !hasShip ? "miss-cell" : "",
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
      <h3>{message}</h3>
    </div>
  );
};

export default BattleshipGame;
