import {
  Criterion,
  Alternative,
  ScoreMatrix,
  DecisionEvaluationResult,
  AlternativeScoreBreakdown,
} from '../types';

/**
 * Calculates decision rankings using the Weighted Sum Model (WSM / Multi-Attribute Utility).
 *
 * Steps:
 * 1. Normalize weights to sum to 1.
 * 2. Min-Max normalize criterion raw values across all alternatives.
 *    - For benefit criteria: (x - min) / (max - min)
 *    - For cost criteria:    (max - x) / (max - min)
 * 3. Compute weighted sum for each alternative.
 * 4. Rank alternatives descending by total score.
 */
export function calculateWSM(
  criteria: Criterion[],
  alternatives: Alternative[],
  scoreMatrix: ScoreMatrix
): DecisionEvaluationResult {
  if (criteria.length === 0 || alternatives.length === 0) {
    throw new Error('At least one criterion and one alternative are required.');
  }

  // 1. Normalize weights
  const totalWeight = criteria.reduce((sum, c) => sum + Math.max(0, c.weight), 0);
  if (totalWeight <= 0) {
    throw new Error('Total criteria weight must be positive.');
  }
  const normalizedWeights: Record<string, number> = {};
  criteria.forEach((c) => {
    normalizedWeights[c.id] = Math.max(0, c.weight) / totalWeight;
  });

  // 2. Find min and max for each criterion
  const minMax: Record<string, { min: number; max: number }> = {};
  criteria.forEach((c) => {
    const values = alternatives.map((alt) => scoreMatrix[alt.id]?.[c.id] ?? 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    minMax[c.id] = { min, max };
  });

  // 3. Compute normalized scores and weighted contributions
  const breakdowns: AlternativeScoreBreakdown[] = alternatives.map((alt) => {
    let totalScore = 0;
    const criterionContributions: AlternativeScoreBreakdown['criterionContributions'] = {};

    criteria.forEach((c) => {
      const raw = scoreMatrix[alt.id]?.[c.id] ?? 0;
      const { min, max } = minMax[c.id];
      const range = max - min;

      let norm = 0;
      if (range === 0) {
        norm = 1.0; // All alternatives scored equally on this criterion
      } else if (c.isCost) {
        norm = (max - raw) / range;
      } else {
        norm = (raw - min) / range;
      }

      const weightedContribution = norm * normalizedWeights[c.id];
      totalScore += weightedContribution;

      criterionContributions[c.id] = {
        rawScore: raw,
        normalizedScore: Number(norm.toFixed(4)),
        weightedContribution: Number(weightedContribution.toFixed(4)),
      };
    });

    return {
      alternativeId: alt.id,
      alternativeName: alt.name,
      totalScore: Number(totalScore.toFixed(4)),
      rank: 0,
      criterionContributions,
    };
  });

  // 4. Sort and assign ranks
  breakdowns.sort((a, b) => b.totalScore - a.totalScore);
  breakdowns.forEach((item, index) => {
    item.rank = index + 1;
  });

  return {
    method: 'WSM',
    evaluatedAt: new Date().toISOString(),
    rankedAlternatives: breakdowns,
    criteriaWeights: normalizedWeights,
  };
}
