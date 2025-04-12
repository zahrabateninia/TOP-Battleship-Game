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
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));  
    this.ships = [];
    this.missedShots = new Set(); // Set to track missed shots
  }

  placeShip(shipName, startCoord, direction) {
    const shipData = ships.find(s => s.name === shipName);
    if (!shipData) return "Error: Invalid ship name!";

    const position = [];

    for (let i = 0; i < shipData.length; i++) {
      let row = startCoord[0];
      let col = startCoord[1];

      if (direction === "horizontal") {
        col += i;
      } else if (direction === "vertical") {
        row += i;
      }

      // Check if out of bounds
      if (row >= 10 || col >= 10) return "Error: Ship goes out of bounds!";

      position.push([row, col]);
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

    // Mark the ship on the board
    for (const [row, col] of position) {
      this.board[row][col] = true;
    }

    return "ok";
  }

  placeRandomShips() {
    const availableShips = [...ships];

    for (const shipData of availableShips) {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
        const result = this.placeShip(shipData.name, [row, col], direction);
        if (result === "ok") {
          placed = true;
        }
      }
    }
  }
  receiveAttack(coord, label = "Unknown") {
    // console.log(`Receiving attack on ${label} board at:`, coord);
    // console.log(`Ships on ${label} board:`, this.ships);
  
    for (let ship of this.ships) {
      if (ship.hit(coord)) {
        // console.log("HIT!");
        return this.checkVictory() ? "You won! All ships have been sunk." : "hit";
      }
    }
  
    this.missedShots.add(coord.join(","));
    // console.log("MISS!");
    return this.checkVictory() ? "Game Over! You lost." : "miss";
  }
  

  checkVictory() {
    return this.ships.every((ship) => ship.isSunk());
  }

  resetGame() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));  
    this.ships = [];
    this.missedShots = new Set();
  }
  
}

module.exports = Gameboard;
