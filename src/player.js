class Player {
  constructor({ id, name, rating, appearances } = {}) {
    if (typeof id === 'undefined' || id === null) {
      throw new Error('Player id is required');
    }
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Player name must be a non-empty string');
    }
    if (typeof rating !== 'number' || Number.isNaN(rating)) {
      throw new Error('Player rating must be a valid number');
    }
    if (
      typeof appearances !== 'undefined' &&
      (!Number.isInteger(appearances) || appearances < 0)
    ) {
      throw new Error('Player appearances must be a non-negative integer when provided');
    }

    this.id = id;
    this.name = name;
    this.rating = rating;
    this.appearances = appearances;
  }
}

module.exports = Player;
