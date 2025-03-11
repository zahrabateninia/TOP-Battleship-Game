// this module manages ship placement, attacks, and game state. 

const Ship= require('./ship');
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
    if (this.ships.some(ship => 
      ship.position.some(pos => 
        position.some(newPos => newPos[0] === pos[0] && newPos[1] === pos[1])
      )
    )) {
      return "Error: Ship overlap detected!";
    }

    const ship = new Ship(length, position);
    this.ships.push(ship);
  }

  receiveAttack(coord) {
    for (let ship of this.ships) {
      if (ship.hit(coord)) {
        // Check victory after a successful hit
        if (this.checkVictory()) {
          return "You won! All ships have been sunk.";
        }
        return "hit";
      }
    }

    this.missedShots.add(coord.join(',')); 
    // Check if player lost after every attack
    if (this.checkVictory()) {
      return "Game Over! You lost.";
    }
    return "miss";
  }

  // Function to check if all ships are sunk
  checkVictory() {
    // Check if all ships are sunk (no hits left on any ship)
    return this.ships.every(ship => ship.isSunk());
  }

  // Function to reset the game for a new round
  resetGame() {
    this.ships = [];
    this.missedShots = new Set();
  }
}

module.exports = Gameboard;
