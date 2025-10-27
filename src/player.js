class Player {
  constructor({ id, name, rating }) {
    if (typeof id === 'undefined' || id === null) {
      throw new Error('Player id is required');
    }
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Player name must be a non-empty string');
    }
    if (typeof rating !== 'number' || Number.isNaN(rating)) {
      throw new Error('Player rating must be a valid number');
    }

    this.id = id;
    this.name = name;
    this.rating = rating;
  }
}

module.exports = Player;
