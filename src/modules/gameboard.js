// This module manages ship placement, attacks, and game state.
const Ship = require("./ship");

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = new Set(); // Set to track missed shots
  }

  placeShip(length, startCoord, direction) {
    let position = [];

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        position.push([startCoord[0], startCoord[1] + i]);
      } else if (direction === "vertical") {
        position.push([startCoord[0] + i, startCoord[1]]);
      }
    }

    // Prevent ship overlap
    if (
      this.ships.some((ship) =>
        ship.position.some((pos) =>
          position.some((newPos) => newPos[0] === pos[0] && newPos[1] === pos[1])
        )
      )
    ) {
      return "Error: Ship overlap detected!";
    }

    const ship = new Ship(length, position);
    this.ships.push(ship);
  }

  placeRandomShips() {
    const shipLengths = [5, 4, 3, 3, 2]; // Standard Battleship ship sizes
    let placedShips = 0;

    while (placedShips < shipLengths.length) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      let direction = Math.random() > 0.5 ? "horizontal" : "vertical";

      if (this.placeShip(shipLengths[placedShips], [row, col], direction) !== "Error: Ship overlap detected!") {
        placedShips++;
      }
    }
  }

  receiveAttack(coord) {
    for (let ship of this.ships) {
      if (ship.hit(coord)) {
        if (this.checkVictory()) {
          return "You won! All ships have been sunk.";
        }
        return "hit";
      }
    }

    this.missedShots.add(coord.join(","));
    if (this.checkVictory()) {
      return "Game Over! You lost.";
    }
    return "miss";
  }

  checkVictory() {
    return this.ships.every((ship) => ship.isSunk());
  }

  resetGame() {
    this.ships = [];
    this.missedShots = new Set();
  }
}

module.exports = Gameboard;
