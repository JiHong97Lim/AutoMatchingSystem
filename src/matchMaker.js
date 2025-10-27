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

function validateTeamSize(teamSize) {
  if (!Number.isInteger(teamSize) || teamSize <= 0) {
    throw new Error('teamSize must be a positive integer');
  }
}

function createBalancedTeams(players, teamSize) {
  const sortedDescending = sortPlayersByRating(players).reverse();

  const teamA = [];
  const teamB = [];
  let totalRatingA = 0;
  let totalRatingB = 0;

  sortedDescending.forEach((player) => {
    if (teamA.length === teamSize) {
      teamB.push(player);
      totalRatingB += player.rating;
      return;
    }

    if (teamB.length === teamSize) {
      teamA.push(player);
      totalRatingA += player.rating;
      return;
    }

    if (totalRatingA <= totalRatingB) {
      teamA.push(player);
      totalRatingA += player.rating;
    } else {
      teamB.push(player);
      totalRatingB += player.rating;
    }
  });

  return {
    teamA,
    teamB,
    totalRatingA,
    totalRatingB,
  };
}

function createMatchFromTeams(teamA, teamB, teamSize, totalRatingA, totalRatingB) {
  const averageRatingA = teamSize === 0 ? 0 : totalRatingA / teamSize;
  const averageRatingB = teamSize === 0 ? 0 : totalRatingB / teamSize;

  return {
    teams: [
      {
        players: teamA,
        totalRating: totalRatingA,
        averageRating: averageRatingA,
      },
      {
        players: teamB,
        totalRating: totalRatingB,
        averageRating: averageRatingB,
      },
    ],
    ratingDifference: Math.abs(averageRatingA - averageRatingB),
  };
}

function matchTeamsByAverageRating(players, { teamSize = 6 } = {}) {
  if (!Array.isArray(players)) {
    throw new Error('Players must be provided as an array');
  }

  validateTeamSize(teamSize);

  const normalizedPlayers = players.map(normalizePlayer);
  const sortedPlayers = sortPlayersByRating(normalizedPlayers);

  const matches = [];
  while (sortedPlayers.length >= teamSize * 2) {
    const segment = sortedPlayers.splice(-teamSize * 2);
    const { teamA, teamB, totalRatingA, totalRatingB } = createBalancedTeams(segment, teamSize);
    matches.push(createMatchFromTeams(teamA, teamB, teamSize, totalRatingA, totalRatingB));
  }

  return { matches, unmatched: sortedPlayers };
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
  matchTeamsByAverageRating,
};
