import React, { useState, useEffect } from 'react';
import Player from '../modules/player.js';
import Gameboard from '../modules/gameboard.js';
import '../styles/GameBoard.css';

const gridSize = 10;

const GameBoard = () => {
  const [player] = useState(new Player(false));
  const [computer] = useState(new Player(true));
  const [playerBoard, setPlayerBoard] = useState(new Gameboard());
  const [computerBoard, setComputerBoard] = useState(new Gameboard());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState("Game in progress...");

  // Computer attacks after the player's turn
  useEffect(() => {
    if (!isPlayerTurn) {
      setTimeout(() => {
        const result = computer.computerAttack(playerBoard);
        setPlayerBoard({ ...playerBoard });

        if (result.includes("Game Over")) {
          setGameStatus(result);
        } else {
          setIsPlayerTurn(true);
        }
      }, 1000);
    }
  }, [isPlayerTurn]);

  const handleAttack = (row, col) => {
    if (!isPlayerTurn || gameStatus !== "Game in progress...") return;

    const result = player.attack([row, col], computerBoard);
    if (result.includes("You won")) {
      setGameStatus(result);
    } else if (result !== "already attacked") {
      setComputerBoard({ ...computerBoard });
      setIsPlayerTurn(false);
    }
  };

  const renderBoard = (board, isEnemy) => (
    <div className="game-board" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 30px)`, gap: '2px' }}>
      {Array.from({ length: gridSize }, (_, row) =>
        Array.from({ length: gridSize }, (_, col) => {
          const coordStr = `${row},${col}`;
          const isHit = board.ships.some(ship => ship.hits.has(coordStr));
          const isMiss = board.missedShots.has(coordStr);

          return (
            <div
              key={coordStr}
              className="square"
              onClick={isEnemy ? () => handleAttack(row, col) : undefined}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid #ccc',
                backgroundColor: isHit ? 'red' : isMiss ? 'blue' : 'white',
                cursor: isEnemy ? 'pointer' : 'default',
              }}
            />
          );
        })
      )}
    </div>
  );

  return (
    <div>
      <h2>Battleship Game</h2>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div>
          <h3>Your Board</h3>
          {renderBoard(playerBoard, false)}
        </div>
        <div>
          <h3>Enemy Board</h3>
          {renderBoard(computerBoard, true)}
        </div>
      </div>
      <p>{gameStatus}</p>
    </div>
  );
};

export default GameBoard;
