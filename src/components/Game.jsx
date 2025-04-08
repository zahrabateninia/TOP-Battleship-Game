import React, { useState, useEffect } from "react";
import Game from "../modules/game"

const BattleshipGame  = ({ playerBoard }) => {
  const [game, setGame] = useState(null);
  const [winner, setWinner] = useState(null);


  useEffect(() => {
    if (playerBoard) {
      const newGame = new Game();  // Initialize game
      newGame.setupPlayerShips(playerBoard);  // Set up player's ships
      newGame.setupComputerShips();  // Set up computer's ships randomly
      setGame(newGame);
    }
  }, [playerBoard]);

  // Handle attacks and check for winner
  const handlePlayerAttack = (coord) => {
    if (game) {
      const result = game.playerAttack(coord);
      if (result) {
        const winner = game.checkWinner();
        if (winner) {
          setWinner(winner);
        }
      }
    }
  };

  // Render the board for a given player (player or computer)
  const renderBoard = (board) => {
    if (!board) return null;  // Return null if the board is not available
  
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell ? 'ship-cell' : ''}`}  // Apply 'ship-cell' class if the cell has a ship
            onClick={() => handlePlayerAttack([rowIndex, colIndex])}
          />
        ))}
      </div>
    ));
  };
  
  
  

  return (
    <div className="app-container">
      <div className="boards-container">
        <div>
          <h3>Player's Board</h3>
          <div className="board">
            {/* {game && renderBoard(game.playerBoard.board)} */}
            {game?.playerBoard?.board && renderBoard(game.playerBoard.board)}

          </div>
        </div>
        <div>
          <h3>Computer's Board</h3>
          <div className="board">
            {/* {game && renderBoard(game.computerBoard.board)} */}
            {game?.computerBoard?.board && renderBoard(game.computerBoard.board)}

          </div>
        </div>
      </div>
      {winner && <h2>{winner}</h2>}
    </div>
  );
  
};

export default BattleshipGame;
