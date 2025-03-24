const Gameboard = require("./gameboard");

class Game {
  constructor() {
    this.playerBoard = new Gameboard();
    this.computerBoard = new Gameboard();
    this.isPlayerTurn = true;
  }

  setupPlayerShips(shipPlacements) {
    for (const { name, startCoord, direction } of shipPlacements) {
      const result = this.playerBoard.placeShip(name, startCoord, direction);
      if (result?.startsWith("Error")) {
        return result; // Return error message if ship placement fails
      }
    }
  }

  setupComputerShips() {
    this.computerBoard.placeRandomShips();
  }

  playerAttack(coord) {
    if (!this.isPlayerTurn) return "Wait for your turn!";
    const result = this.computerBoard.receiveAttack(coord);
    if (result !== "hit") this.isPlayerTurn = false;
    return result;
  }

  computerAttack() {
    if (this.isPlayerTurn) return "Wait for your turn!";

    let row, col, coord;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      coord = [row, col];
    } while (this.playerBoard.missedShots.has(coord.join(",")));

    const result = this.playerBoard.receiveAttack(coord);
    this.isPlayerTurn = true; // Switch back to player
    return result;
  }

  checkWinner() {
    if (this.playerBoard.checkVictory()) return "Computer Wins!";
    if (this.computerBoard.checkVictory()) return "Player Wins!";
    return null;
  }

  resetGame() {
    this.playerBoard.resetGame();
    this.computerBoard.resetGame();
    this.isPlayerTurn = true;
  }
}

module.exports = Game;
