const { Player, matchPlayersByRating } = require('..');

const demoPlayers = [
  new Player({ id: 1, name: 'Alice', rating: 1320 }),
  new Player({ id: 2, name: 'Bob', rating: 1285 }),
  new Player({ id: 3, name: 'Charlie', rating: 1410 }),
  new Player({ id: 4, name: 'Diana', rating: 1190 }),
  new Player({ id: 5, name: 'Evan', rating: 1260 }),
];

const { matches, unmatched } = matchPlayersByRating(demoPlayers);

console.log('=== Match Results ===');
matches.forEach(({ players: [p1, p2], ratingDifference }, index) => {
  console.log(
    `Match ${index + 1}: ${p1.name} (${p1.rating}) vs ${p2.name} (${p2.rating}) — Δ ${ratingDifference}`
  );
});

if (unmatched.length > 0) {
  console.log('\nUnmatched Players:');
  unmatched.forEach((player) => {
    console.log(`- ${player.name} (${player.rating})`);
  });
} else {
  console.log('\nNo unmatched players.');
}
