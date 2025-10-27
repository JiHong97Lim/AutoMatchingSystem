const test = require('node:test');
const assert = require('node:assert');

const { Player, matchPlayersByRating } = require('..');

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
