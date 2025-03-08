const Gameboard = require("./gameboard");
const Player = require("./player");

class Game {
  constructor() {
    this.player = new Player(false);
    this.computer = new Player(true);
    this.playerBoard = new Gameboard();
    this.computerBoard = new Gameboard();
    
    this.currentTurn = this.player; // Start with player
  }

  // Player attack method
  playerAttack(coord) {
    if (this.currentTurn !== this.player) return "Not your turn!";
    
    const result = this.player.attack(coord, this.computerBoard);
    if (result !== "already attacked") {
      this.switchTurn();
    }
    return result;
  }

  // Computer attack method
  computerAttack() {
    if (this.currentTurn !== this.computer) return "Not computer's turn!";
    
    const result = this.computer.computerAttack(this.playerBoard);
    this.switchTurn();
    return result;
  }

  // Check if the game is over
  checkGameOver() {
    if (this.computerBoard.checkVictory()) {
      return "You won! All computer ships have been sunk.";
    }
    if (this.playerBoard.checkVictory()) {
      return "Game Over! You lost.";
    }
    return null;
  }

  // Switch turns
  switchTurn() {
    this.currentTurn = this.currentTurn === this.player ? this.computer : this.player;
    this.currentTurn.startTurn();
  }

  // Reset game for a new round
  resetGame() {
    this.playerBoard.resetGame();
    this.computerBoard.resetGame();
    this.player.attackedCoordinates.clear();
    this.computer.attackedCoordinates.clear();
    this.currentTurn = this.player; // Player starts
  }
}

module.exports = Game;
