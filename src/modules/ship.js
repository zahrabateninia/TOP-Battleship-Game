class Ship {
  constructor(name, length, position) {
    this.name = name; // Store ship's name
    this.length = length;
    this.hits = 0;
    this.position = position; // Store as an array of arrays
    this.positionSet = new Set(position.map(coord => coord.join(','))); // Use a Set for fast hit lookup
  }

  hit(coord) {
    if (this.positionSet.has(coord.join(','))) {
      this.hits++;
      return true; // Ship was hit
    }
    return false;
  }

  isSunk() {
    return this.hits === this.length;
  }
}

module.exports = Ship;
