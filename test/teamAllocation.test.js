const test = require('node:test');
const assert = require('node:assert/strict');

const { determineTeamAllocation, allocateParticipants } = require('..');

const sampleParticipants = Array.from({ length: 24 }, (_, index) => `Player ${index + 1}`);

test('case 1 uses the correct team counts', () => {
  const allocation = determineTeamAllocation(1, 12);
  assert.equal(allocation.teamCount, 2);
  assert.deepEqual(allocation.teamSizes, [6, 6]);
});

test('case 1 with 19 participants creates 4 teams with balanced sizes', () => {
  const allocation = determineTeamAllocation(1, 19);
  assert.equal(allocation.teamCount, 4);
  assert.deepEqual(allocation.teamSizes, [5, 5, 5, 4]);
});

test('case 2 with 14 participants produces 2 teams', () => {
  const allocation = determineTeamAllocation(2, 14);
  assert.equal(allocation.teamCount, 2);
  assert.deepEqual(allocation.teamSizes, [7, 7]);
});

test('allocateParticipants divides members into correct team sizes', () => {
  const allocation = allocateParticipants({
    caseId: 2,
    participantCount: 19,
    participants: sampleParticipants,
  });

  assert.equal(allocation.teamCount, 4);
  assert.deepEqual(allocation.teamSizes, [5, 5, 5, 4]);
  assert.equal(allocation.teams.length, 4);
  allocation.teams.forEach((team, index) => {
    assert.equal(team.length, allocation.teamSizes[index]);
  });
});

test('allocateParticipants throws when insufficient members are provided', () => {
  assert.throws(() => {
    allocateParticipants({ caseId: 1, participantCount: 12, participants: ['A'] });
  });
});

test('allocateParticipants balances team average ratings', () => {
  const highRated = Array.from({ length: 6 }, (_, index) => ({
    name: `High ${index + 1}`,
    rating: 5,
  }));
  const lowRated = Array.from({ length: 6 }, (_, index) => ({
    name: `Low ${index + 1}`,
    rating: 1,
  }));

  const participants = [...highRated, ...lowRated];

  const allocation = allocateParticipants({
    caseId: 1,
    participantCount: participants.length,
    participants,
  });

  const averages = allocation.teams.map((team) => {
    const totalRating = team.reduce((total, member) => total + member.rating, 0);
    return totalRating / team.length;
  });

  const maxAverage = Math.max(...averages);
  const minAverage = Math.min(...averages);

  assert.ok(maxAverage - minAverage <= 0.5);
});
