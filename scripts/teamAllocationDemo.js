const { allocateParticipants } = require('..');
const playerData = require('../src/data/players');

const CASE_ID = 1; // 케이스 1 또는 2로 설정하세요.
const PARTICIPANT_COUNT = 16; // 팀을 구성할 총 인원 수를 설정하세요.
const PARTICIPANTS = playerData
  .slice(0, PARTICIPANT_COUNT)
  .map(({ name }) => name); // 필요한 경우 직접 이름 배열로 교체하세요.

const allocation = allocateParticipants({
  caseId: CASE_ID,
  participantCount: PARTICIPANT_COUNT,
  participants: PARTICIPANTS,
});

console.log(`\n=== Case ${CASE_ID} 팀 편성 결과 ===`);
console.log(`총 인원: ${allocation.participantCount}`);
console.log(`팀 수: ${allocation.teamCount}`);
console.log(`팀 별 인원: ${allocation.teamSizes.join(', ')}`);

allocation.teams.forEach((team, index) => {
  console.log(`\nTeam ${index + 1}`);
  team.forEach((member, memberIndex) => {
    console.log(`  ${memberIndex + 1}. ${member}`);
  });
});
