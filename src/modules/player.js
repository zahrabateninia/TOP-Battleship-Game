// Controls the player’s attack logic and computer AI attacks.
class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.attackedCoordinates = new Set(); // Store attacked coordinates for efficiency
  }

  attack(coord, enemyGameboard) {
    const coordStr = coord.join(",");

    // console.log(coordStr)

    if (this.attackedCoordinates.has(coordStr)) {
      return "already attacked"; // Prevent duplicate attacks
    }

    this.attackedCoordinates.add(coordStr);
    return enemyGameboard.receiveAttack(coord);
  }

  computerAttack(enemyGameboard) {
    let coord;
    do {
      coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } while (this.attackedCoordinates.has(coord.join(","))); // Ensure unique attack

    return this.attack(coord, enemyGameboard);
  }

  startTurn() {
    this.isMyTurn = true;
  }
  
}

module.exports = Player;
