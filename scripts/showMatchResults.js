const { Player, matchTeamsByAverageRating } = require('..');

const demoPlayers = [
  new Player({ id: 1, name: 'Alice', rating: 1880 }),
  new Player({ id: 2, name: 'Bob', rating: 1710 }),
  new Player({ id: 3, name: 'Charlie', rating: 1640 }),
  new Player({ id: 4, name: 'Diana', rating: 1500 }),
  new Player({ id: 5, name: 'Evan', rating: 1795 }),
  new Player({ id: 6, name: 'Fay', rating: 1425 }),
  new Player({ id: 7, name: 'Gina', rating: 1605 }),
  new Player({ id: 8, name: 'Hector', rating: 1690 }),
  new Player({ id: 9, name: 'Isabel', rating: 1815 }),
  new Player({ id: 10, name: 'Jon', rating: 1475 }),
  new Player({ id: 11, name: 'Kay', rating: 1580 }),
  new Player({ id: 12, name: 'Leo', rating: 1760 }),
  new Player({ id: 13, name: 'Mia', rating: 1360 }),
  new Player({ id: 14, name: 'Nia', rating: 1495 }),
];

const { matches, unmatched } = matchTeamsByAverageRating(demoPlayers);

console.log('=== Team Match Results ===');
matches.forEach(({ teams: [teamA, teamB], ratingDifference }, index) => {
  console.log(`\nMatch ${index + 1}`);
  console.log(
    `  Team A average: ${teamA.averageRating.toFixed(2)} — Players: ${teamA.players
      .map((player) => `${player.name} (${player.rating})`)
      .join(', ')}`
  );
  console.log(
    `  Team B average: ${teamB.averageRating.toFixed(2)} — Players: ${teamB.players
      .map((player) => `${player.name} (${player.rating})`)
      .join(', ')}`
  );
  console.log(`  Average rating difference: ${ratingDifference.toFixed(2)}`);
});

if (unmatched.length > 0) {
  console.log('\nUnmatched Players:');
  unmatched.forEach((player) => {
    console.log(`- ${player.name} (${player.rating})`);
  });
} else {
  console.log('\nNo unmatched players.');
}
