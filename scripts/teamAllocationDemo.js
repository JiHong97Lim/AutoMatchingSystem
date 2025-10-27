const { allocateParticipants } = require('..');
const playerData = require('../src/data/players');

const CASE_ID = 1; // 케이스 1 또는 2로 설정하세요.
const PARTICIPANT_COUNT = 16; // 팀을 구성할 총 인원 수를 설정하세요.
const ratingLookup = new Map(playerData.map(({ name, rating }) => [name, rating]));

const PARTICIPANTS = playerData
  .slice(0, PARTICIPANT_COUNT)
  .map(({ name, rating }) => ({ name, rating })); // 필요한 경우 직접 데이터 배열로 교체하세요.

function resolveMemberName(member) {
  if (typeof member === 'object' && member !== null && 'name' in member) {
    return member.name;
  }
  return String(member);
}

function resolveMemberRating(member) {
  if (typeof member === 'object' && member !== null && typeof member.rating === 'number') {
    return member.rating;
  }
  const name = resolveMemberName(member);
  const rating = ratingLookup.get(name);
  return typeof rating === 'number' ? rating : undefined;
}

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
  const ratingValues = team
    .map((member) => resolveMemberRating(member))
    .filter((value) => typeof value === 'number');
  const averageRating =
    ratingValues.length === 0
      ? 0
      : ratingValues.reduce((total, rating) => total + rating, 0) / ratingValues.length;

  console.log(`\nTeam ${index + 1}`);
  console.log(`  평균 평점: ${averageRating.toFixed(2)}`);
  team.forEach((member, memberIndex) => {
    const name = resolveMemberName(member);
    const rating = resolveMemberRating(member);
    const ratingText = typeof rating === 'number' ? rating.toFixed(2) : 'N/A';
    console.log(`  ${memberIndex + 1}. ${name} (${ratingText} PPG)`);
  });
});
