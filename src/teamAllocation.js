const CASE_RULES = {
  1: [
    { min: 10, max: 12, teamCount: 2 },
    { min: 13, max: 15, teamCount: 3 },
    { min: 16, max: 20, teamCount: 4 },
  ],
  2: [
    { min: 12, max: 14, teamCount: 2 },
    { min: 15, max: 18, teamCount: 3 },
    { min: 19, max: 24, teamCount: 4 },
  ],
};

function assertPositiveInteger(value, name) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
}

function findRule(caseId, participantCount) {
  const rules = CASE_RULES[caseId];

  if (!rules) {
    throw new Error(`Unknown case: ${caseId}`);
  }

  return rules.find(({ min, max }) => participantCount >= min && participantCount <= max);
}

function calculateTeamSizes(participantCount, teamCount) {
  const baseSize = Math.floor(participantCount / teamCount);
  const remainder = participantCount % teamCount;

  return Array.from({ length: teamCount }, (_, index) => baseSize + (index < remainder ? 1 : 0));
}

function determineTeamAllocation(caseId, participantCount) {
  assertPositiveInteger(participantCount, 'participantCount');

  const matchingRule = findRule(caseId, participantCount);

  if (!matchingRule) {
    throw new Error(
      `No allocation rule for ${participantCount} participants in case ${caseId}`
    );
  }

  const { teamCount } = matchingRule;
  const teamSizes = calculateTeamSizes(participantCount, teamCount);

  return {
    caseId,
    participantCount,
    teamCount,
    teamSizes,
  };
}

function allocateParticipants({ caseId, participantCount, participants }) {
  if (!Array.isArray(participants)) {
    throw new Error('participants must be provided as an array');
  }

  const effectiveCount = participantCount ?? participants.length;
  assertPositiveInteger(effectiveCount, 'participantCount');

  if (participants.length < effectiveCount) {
    throw new Error(
      `Not enough participants provided: expected ${effectiveCount}, received ${participants.length}`
    );
  }

  const selected = participants.slice(0, effectiveCount);
  const allocation = determineTeamAllocation(caseId, effectiveCount);

  let offset = 0;
  const teams = allocation.teamSizes.map((size) => {
    const team = selected.slice(offset, offset + size);
    offset += size;
    return team;
  });

  return {
    ...allocation,
    teams,
  };
}

module.exports = {
  CASE_RULES,
  determineTeamAllocation,
  allocateParticipants,
};
