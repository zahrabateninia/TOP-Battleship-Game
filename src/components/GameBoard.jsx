// Displays both player and computer boards.
// The player attacks the computer's board (computer’s ships are hidden).
// Manages turns and game logic.

import React, { useState, useEffect } from "react";
import Gameboard from "../modules/gameboard"; 

const GameBoard = () => {
    const [playerBoard, setPlayerBoard] = useState(new Gameboard());
    const [computerBoard, setComputerBoard] = useState(new Gameboard());
    const [playerShipsPlaced, setPlayerShipsPlaced] = useState(0);
    const [selectedDirection, setSelectedDirection] = useState("horizontal");
    const [gameStarted, setGameStarted] = useState(false);

    // Ship lengths in order (example: 5 ships with varying lengths)
    const shipLengths = [5, 4, 3, 3, 2];

    // Handle player ship placement
    const handlePlaceShip = (row, col) => {
        if (playerShipsPlaced >= shipLengths.length || gameStarted) return; // if the game is started you cannot place your ships 

        const length = shipLengths[playerShipsPlaced];
        const result = playerBoard.placeShip(length, [row, col], selectedDirection);

        if (result !== "Error: Ship overlap detected!") {
            setPlayerShipsPlaced(playerShipsPlaced + 1);
            setPlayerBoard({ ...playerBoard });
        }
    };

    // Automatically place computer's ships
    useEffect(() => {
        computerBoard.placeRandomShips();
        setComputerBoard({ ...computerBoard });
    }, []);

    // Start the game only when the player has placed all ships
    const startGame = () => {
        if (playerShipsPlaced === shipLengths.length) {
            setGameStarted(true);
        }
    };

    return (
        <div>
            <h2>Place Your Ships</h2>
            <div>
                <button onClick={() => setSelectedDirection("horizontal")}>Horizontal</button>
                <button onClick={() => setSelectedDirection("vertical")}>Vertical</button>
            </div>

            {/* Player's Board */}
            <div className="board">
                {Array.from({ length: 10 }, (_, row) => (
                    <div key={row} className="row">
                        {Array.from({ length: 10 }, (_, col) => (
                            <div
                                key={col}
                                className="cell"
                                onClick={() => handlePlaceShip(row, col)}
                            >
                                {/* Display ships (Optional UI enhancement) */}
                                {playerBoard.ships.some(ship =>
                                    ship.position.some(([r, c]) => r === row && c === col)
                                ) ? "🚢" : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Start game button */}
            <button onClick={startGame} disabled={playerShipsPlaced < shipLengths.length}>
                Start Game
            </button>

            {gameStarted && <h3>Game has started! Time to attack!</h3>}
        </div>
    );
};

export default GameBoard;
