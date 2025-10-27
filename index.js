const Player = require('./src/player');
const { matchPlayersByRating, matchTeamsByAverageRating } = require('./src/matchMaker');
const { determineTeamAllocation, allocateParticipants } = require('./src/teamAllocation');

module.exports = {
  Player,
  matchPlayersByRating,
  matchTeamsByAverageRating,
  determineTeamAllocation,
  allocateParticipants,
};
