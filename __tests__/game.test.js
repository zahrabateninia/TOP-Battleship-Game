const Game = require("../src/modules/game");

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game();
    game.playerBoard.placeShip(2, [0, 0], "horizontal"); // Player's ship -> [0,0] [0,1]
    game.computerBoard.placeShip(2, [1, 1], "horizontal"); // Computer's ship
  });

  test("player can attack and switch turns", () => {
    expect(game.currentTurn).toBe(game.player);

    game.playerAttack([1, 1]); // Hit computer's ship
    expect(game.currentTurn).toBe(game.computer); // Turn should switch
  });

  test("computer attacks after player turn", () => {
    game.playerAttack([1, 1]); 
    game.computerAttack(); 

    expect(game.currentTurn).toBe(game.player); // Turn should switch back
  });

  test("game detects when player wins", () => {
    game.playerAttack([1, 1]); // Hit
    game.computerAttack();
    game.playerAttack([1, 2]); // Sink ship
    // debug:
    console.log("Computer ships:", game.computerBoard.ships);

    expect(game.checkGameOver()).toBe("You won! All computer ships have been sunk.");
  });

  test("game detects when computer wins", () => {
    game.computerAttack(); // Simulate attacks until the player loses
    game.playerBoard.receiveAttack([0, 0]);
    game.playerBoard.receiveAttack([0, 1]);

    expect(game.checkGameOver()).toBe("Game Over! You lost.");
  });

  test("game resets properly", () => {
    game.resetGame();

    expect(game.playerBoard.ships.length).toBe(0);
    expect(game.computerBoard.ships.length).toBe(0);
    expect(game.currentTurn).toBe(game.player);
  });
});