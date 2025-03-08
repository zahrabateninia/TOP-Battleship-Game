const Player = require("../src/modules/player");
const Gameboard = require("../src/modules/gameboard");

describe("Player", () => {
  let player, enemyBoard;

  beforeEach(() => {
    player = new Player(false);
    enemyBoard = new Gameboard();
    enemyBoard.placeShip(3, [0, 0], "horizontal"); // Place a test ship
  });

  test("attacks the enemy gameboard successfully", () => {
    const result = player.attack([0, 0], enemyBoard);
    expect(result).toBe("hit");
    expect(enemyBoard.ships[0].hits).toBe(1);
  });

  test("prevents duplicate attacks", () => {
    player.attack([0, 0], enemyBoard);
    const result = player.attack([0, 0], enemyBoard);
    expect(result).toBe("already attacked");
  });

  test("computer generates a valid attack", () => {
    const computer = new Player(true);
    const result = computer.computerAttack(enemyBoard);

    expect(["hit", "miss"]).toContain(result); // Ensures it returns either "hit" or "miss"
  });

  test("computer does not attack the same place twice", () => {
    const computer = new Player(true);
    const firstAttack = computer.computerAttack(enemyBoard);
    const secondAttack = computer.computerAttack(enemyBoard);

    expect(firstAttack).not.toBe("already attacked");
    expect(secondAttack).not.toBe("already attacked");
  });
});