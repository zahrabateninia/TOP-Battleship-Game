const Ship = require('../src/modules/ship');

test("creates a ship with correct length and positions", () => {
  const ship = new Ship(3, [[0, 0], [0, 1], [0, 2]]);
  expect(ship.length).toBe(3);
  expect(ship.positionSet.has("0,0")).toBe(true);
  expect(ship.positionSet.has("0,1")).toBe(true);
});

test("registers a hit", () => {
  const ship = new Ship(3, [[0, 0], [0, 1], [0, 2]]);
  expect(ship.hit([0, 1])).toBe(true);
  expect(ship.hits).toBe(1);
});

test("does not register a hit if position is wrong", () => {
  const ship = new Ship(3, [[0, 0], [0, 1], [0, 2]]);
  expect(ship.hit([1, 1])).toBe(false);
});

