const Ship = require("./ship");

const ships = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Cruiser", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Destroyer", length: 2 },
];

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = new Set(); // Set to track missed shots
  }

  placeShip(shipName, startCoord, direction) {
    const shipData = ships.find(s => s.name === shipName);
    if (!shipData) return "Error: Invalid ship name!";

    let position = [];

    for (let i = 0; i < shipData.length; i++) {
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

    const ship = new Ship(shipData.name, shipData.length, position);
    this.ships.push(ship);
  }

  placeRandomShips() {
    const availableShips = [...ships]; // Copy ship list to prevent modification

    while (availableShips.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableShips.length);
      const shipData = availableShips.splice(randomIndex, 1)[0]; // Remove selected ship

      let row, col, direction, validPlacement;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        direction = Math.random() > 0.5 ? "horizontal" : "vertical";
        validPlacement = this.placeShip(shipData.name, [row, col], direction);
      } while (validPlacement === "Error: Ship overlap detected!");
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
