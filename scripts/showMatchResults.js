const { Player, matchTeamsByAverageRating } = require('..');
const playerData = require('../src/data/players');

const demoPlayers = playerData.map((data) => new Player(data));

const { matches, unmatched } = matchTeamsByAverageRating(demoPlayers);

console.log('=== Team Match Results ===');
matches.forEach(({ teams: [teamA, teamB], ratingDifference }, index) => {
  console.log(`\nMatch ${index + 1}`);
  console.log(
    `  Team A average: ${teamA.averageRating.toFixed(2)} — Players: ${teamA.players
      .map((player) =>
        `${player.name} (${player.rating.toFixed(2)} PPG, ${player.appearances} games)`
      )
      .join(', ')}`
  );
  console.log(
    `  Team B average: ${teamB.averageRating.toFixed(2)} — Players: ${teamB.players
      .map((player) =>
        `${player.name} (${player.rating.toFixed(2)} PPG, ${player.appearances} games)`
      )
      .join(', ')}`
  );
  console.log(`  Average rating difference: ${ratingDifference.toFixed(2)}`);
});

if (unmatched.length > 0) {
  console.log('\nUnmatched Players:');
  unmatched.forEach((player) => {
    console.log(`- ${player.name} (${player.rating.toFixed(2)} PPG, ${player.appearances} games)`);
  });
} else {
  console.log('\nNo unmatched players.');
}
