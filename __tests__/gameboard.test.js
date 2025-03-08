const Gameboard = require("../src/modules/gameboard");

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("detects when all ships are sunk", () => {
    gameboard.placeShip(2, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);

    expect(gameboard.checkVictory()).toBe(true);
  });

  test("does not report victory if ships are still afloat", () => {
    gameboard.placeShip(2, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);

    expect(gameboard.checkVictory()).toBe(false);
  });

  test("registers missed shots correctly", () => {
    gameboard.receiveAttack([5, 5]);

    expect(gameboard.missedShots.has("5,5")).toBe(true);
  });
});