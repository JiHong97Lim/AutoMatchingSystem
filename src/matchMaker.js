const Player = require('./player');

function normalizePlayer(candidate) {
  if (candidate instanceof Player) {
    return candidate;
  }

  if (typeof candidate !== 'object' || candidate === null) {
    throw new Error('Invalid player data. Expected a Player instance or plain object.');
  }

  return new Player(candidate);
}

function sortPlayersByRating(players) {
  return [...players].sort((a, b) => a.rating - b.rating);
}

/**
 * Match players purely by rating.
 *
 * The function sorts players by their rating and pairs adjacent players to
 * ensure that each match has the lowest possible rating difference.
 *
 * @param {Array<Player|Object>} players - A list of players or player-like objects.
 * @param {Object} [options]
 * @param {number} [options.maxDifference=Infinity] - The maximum allowed rating difference for a match.
 * @returns {{ matches: Array<{ players: [Player, Player], ratingDifference: number }>, unmatched: Player[] }}
 */
function matchPlayersByRating(players, { maxDifference = Infinity } = {}) {
  if (!Array.isArray(players)) {
    throw new Error('Players must be provided as an array');
  }

  if (typeof maxDifference !== 'number' || maxDifference < 0 || Number.isNaN(maxDifference)) {
    throw new Error('maxDifference must be a non-negative number');
  }

  const normalizedPlayers = players.map(normalizePlayer);
  const sortedPlayers = sortPlayersByRating(normalizedPlayers);

  const matches = [];
  const unmatched = [];

  for (let i = 0; i < sortedPlayers.length; i += 1) {
    const current = sortedPlayers[i];
    const next = sortedPlayers[i + 1];

    if (next) {
      const difference = Math.abs(current.rating - next.rating);
      if (difference <= maxDifference) {
        matches.push({ players: [current, next], ratingDifference: difference });
        i += 1; // Skip the next player because they have been matched.
        continue;
      }
    }

    unmatched.push(current);
  }

  return { matches, unmatched };
}

module.exports = {
  matchPlayersByRating,
  normalizePlayer,
  sortPlayersByRating,
};
