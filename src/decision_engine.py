#!/usr/bin/env python3
"""
Real-Life Decision Platform - Core Mathematical Calculation Engine (Python)

Provides Weighted Sum Model (WSM), criteria normalization, and ranking.
"""

from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class Criterion:
    id: str
    name: str
    weight: float
    is_cost: bool = False
    description: Optional[str] = None


@dataclass
class Alternative:
    id: str
    name: str
    description: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)


def calculate_wsm(
    criteria: List[Criterion],
    alternatives: List[Alternative],
    score_matrix: Dict[str, Dict[str, float]],
) -> Dict[str, Any]:
    """
    Calculates decision rankings using the Weighted Sum Model (WSM).

    - Normalizes criterion weights so sum(weights) == 1.
    - Min-Max normalizes raw scores (benefit vs. cost criteria).
    - Returns ranked alternatives with transparent score breakdown.
    """
    if not criteria or not alternatives:
        raise ValueError("At least one criterion and one alternative are required.")

    # 1. Normalize weights
    total_weight = sum(max(0.0, c.weight) for c in criteria)
    if total_weight <= 0:
        raise ValueError("Total criteria weight must be positive.")

    norm_weights = {c.id: max(0.0, c.weight) / total_weight for c in criteria}

    # 2. Compute min and max for each criterion
    min_max: Dict[str, Dict[str, float]] = {}
    for c in criteria:
        vals = [score_matrix.get(alt.id, {}).get(c.id, 0.0) for alt in alternatives]
        min_max[c.id] = {"min": min(vals), "max": max(vals)}

    # 3. Calculate scores
    ranked_results = []
    for alt in alternatives:
        total_score = 0.0
        breakdown = {}

        for c in criteria:
            raw = score_matrix.get(alt.id, {}).get(c.id, 0.0)
            c_min = min_max[c.id]["min"]
            c_max = min_max[c.id]["max"]
            val_range = c_max - c_min

            if val_range == 0:
                norm_score = 1.0
            elif c.is_cost:
                norm_score = (c_max - raw) / val_range
            else:
                norm_score = (raw - c_min) / val_range

            weighted_contrib = norm_score * norm_weights[c.id]
            total_score += weighted_contrib

            breakdown[c.id] = {
                "raw_score": raw,
                "normalized_score": round(norm_score, 4),
                "weighted_contribution": round(weighted_contrib, 4),
            }

        ranked_results.append({
            "alternative_id": alt.id,
            "alternative_name": alt.name,
            "total_score": round(total_score, 4),
            "breakdown": breakdown,
        })

    # 4. Sort and assign ranks
    ranked_results.sort(key=lambda x: x["total_score"], reverse=True)
    for idx, item in enumerate(ranked_results, 1):
        item["rank"] = idx

    return {
        "method": "WSM",
        "evaluated_at": datetime.utcnow().isoformat() + "Z",
        "ranked_alternatives": ranked_results,
        "criteria_weights": {k: round(v, 4) for k, v in norm_weights.items()},
    }


if __name__ == "__main__":
    # Example test run
    test_criteria = [
        Criterion(id="salary", name="Salary ($k)", weight=0.4, is_cost=False),
        Criterion(id="commute", name="Commute (mins)", weight=0.3, is_cost=True),
        Criterion(id="growth", name="Career Growth (1-10)", weight=0.3, is_cost=False),
    ]

    test_alternatives = [
        Alternative(id="opt_a", name="Startup Alpha"),
        Alternative(id="opt_b", name="Enterprise Beta"),
        Alternative(id="opt_c", name="Remote Gamma"),
    ]

    test_matrix = {
        "opt_a": {"salary": 110, "commute": 45, "growth": 9},
        "opt_b": {"salary": 130, "commute": 60, "growth": 6},
        "opt_c": {"salary": 105, "commute": 0, "growth": 7},
    }

    result = calculate_wsm(test_criteria, test_alternatives, test_matrix)
    print("Decision Ranking Results:")
    for res in result["ranked_alternatives"]:
        print(f"Rank {res['rank']}: {res['alternative_name']} - Score: {res['total_score']}")
