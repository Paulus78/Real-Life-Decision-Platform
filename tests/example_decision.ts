import { calculateWSM } from '../src/core/wsm';
import { Criterion, Alternative, ScoreMatrix } from '../src/types';

// Example: Job Offer Decision Problem
const criteria: Criterion[] = [
  { id: 'salary', name: 'Annual Salary ($k)', weight: 0.4, isCost: false },
  { id: 'commute', name: 'Commute Time (mins)', weight: 0.3, isCost: true },
  { id: 'growth', name: 'Career Growth Rating (1-10)', weight: 0.3, isCost: false },
];

const alternatives: Alternative[] = [
  { id: 'offer_a', name: 'Startup Alpha' },
  { id: 'offer_b', name: 'Corporate Beta' },
  { id: 'offer_c', name: 'Remote Gamma' },
];

const scores: ScoreMatrix = {
  offer_a: { salary: 110, commute: 45, growth: 9 },
  offer_b: { salary: 130, commute: 60, growth: 6 },
  offer_c: { salary: 105, commute: 0, growth: 7 },
};

export function runDemo(): void {
  console.log('--- Running Real-Life Decision Platform WSM Evaluation ---');
  const result = calculateWSM(criteria, alternatives, scores);
  console.log(`Evaluation Method: ${result.method}`);
  console.log('Rankings:');
  result.rankedAlternatives.forEach((alt) => {
    console.log(`Rank ${alt.rank}: ${alt.alternativeName} (Score: ${alt.totalScore})`);
  });
}

if (require.main === module) {
  runDemo();
}
