const test = require('node:test');
const assert = require('node:assert');

const { Player, matchPlayersByRating, matchTeamsByAverageRating } = require('..');

test('pairs adjacent players after sorting by rating', () => {
  const players = [
    new Player({ id: 1, name: 'Alice', rating: 1200 }),
    new Player({ id: 2, name: 'Bob', rating: 1250 }),
    new Player({ id: 3, name: 'Charlie', rating: 1350 }),
    new Player({ id: 4, name: 'Diana', rating: 1400 }),
  ];

  const { matches, unmatched } = matchPlayersByRating(players);

  assert.strictEqual(matches.length, 2);
  assert.strictEqual(unmatched.length, 0);
  assert.deepStrictEqual(
    matches.map(({ players: [p1, p2] }) => [p1.id, p2.id]),
    [
      [1, 2],
      [3, 4],
    ]
  );
});

test('respects maximum rating difference constraint', () => {
  const players = [
    new Player({ id: 1, name: 'Alice', rating: 1000 }),
    new Player({ id: 2, name: 'Bob', rating: 1100 }),
    new Player({ id: 3, name: 'Charlie', rating: 1500 }),
  ];

  const { matches, unmatched } = matchPlayersByRating(players, { maxDifference: 50 });

  assert.strictEqual(matches.length, 0);
  assert.strictEqual(unmatched.length, 3);
});

test('normalizes plain player-like objects', () => {
  const { matches } = matchPlayersByRating([
    { id: 'A', name: 'Player A', rating: 1200 },
    { id: 'B', name: 'Player B', rating: 1210 },
  ]);

  assert.strictEqual(matches.length, 1);
  const [firstMatch] = matches;
  assert.ok(firstMatch.players[0] instanceof Player);
  assert.ok(firstMatch.players[1] instanceof Player);
});

test('creates balanced teams of six players with similar averages', () => {
  const players = Array.from({ length: 12 }, (_, index) =>
    new Player({ id: index + 1, name: `Player ${index + 1}`, rating: 1000 + index * 10 })
  );

  const { matches, unmatched } = matchTeamsByAverageRating(players);

  assert.strictEqual(matches.length, 1);
  assert.strictEqual(unmatched.length, 0);

  const [match] = matches;
  match.teams.forEach((team) => {
    assert.strictEqual(team.players.length, 6);
  });
  assert.strictEqual(match.ratingDifference, 0);
});

test('returns unmatched players when not enough for two teams', () => {
  const players = Array.from({ length: 14 }, (_, index) =>
    new Player({ id: index + 1, name: `Player ${index + 1}`, rating: 1200 + index * 5 })
  );

  const { matches, unmatched } = matchTeamsByAverageRating(players);

  assert.strictEqual(matches.length, 1);
  assert.strictEqual(unmatched.length, 2);
  unmatched.forEach((player) => {
    assert.ok(player instanceof Player);
  });
});
