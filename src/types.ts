/**
 * Core domain types for Real-Life Decision Platform
 */

export interface Criterion {
  id: string;
  name: string;
  description?: string;
  /** Importance weight (normalized between 0 and 1) */
  weight: number;
  /** If true, lower raw values are preferred (e.g. price, commute time, risk) */
  isCost?: boolean;
}

export interface Alternative {
  id: string;
  name: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export type ScoreMatrix = Record<string, Record<string, number>>; // [alternativeId][criterionId] = rawScore

export interface AlternativeScoreBreakdown {
  alternativeId: string;
  alternativeName: string;
  totalScore: number;
  rank: number;
  criterionContributions: Record<string, {
    rawScore: number;
    normalizedScore: number;
    weightedContribution: number;
  }>;
}

export interface DecisionEvaluationResult {
  method: 'WSM' | 'TOPSIS' | 'AHP';
  evaluatedAt: string;
  rankedAlternatives: AlternativeScoreBreakdown[];
  criteriaWeights: Record<string, number>;
}
