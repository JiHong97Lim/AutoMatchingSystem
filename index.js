const Player = require('./src/player');
const { matchPlayersByRating, matchTeamsByAverageRating } = require('./src/matchMaker');

module.exports = {
  Player,
  matchPlayersByRating,
  matchTeamsByAverageRating,
};
