# CLAUDE.md - Project Guide for Claude

This document provides essential context, architectural standards, and workflow instructions for Claude (both Claude Projects and Claude Code CLI) working on the **Real-Life Decision Platform**.

---

## 1. Project Overview & Vision
The **Real-Life Decision Platform** is a structured, collaborative decision-support framework designed to help individuals, teams, and organizations make high-stakes, rational, and transparent real-world decisions.

### Core Capabilities:
- **Multi-Criteria Decision Analysis (MCDA):** Weighted scoring models (WSM, AHP, TOPSIS).
- **Decision Trees & Scenario Simulation:** Risk-adjusted outcome modeling and sensitivity testing.
- **Collaborative Deliberation:** Stakeholder input aggregation, bias checks, and perspective mapping.
- **Auditability & Traceability:** Immutable rationale logging, trade-off matrices, and post-mortem tracking.

---

## 2. AI Collaboration & Co-Development Rules
This repository is co-developed by **Claude** and **ChatGPT**. To ensure zero conflicts and seamless teamwork:

1. **Check State First:** Always read [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) and [`DECISION_LOG.md`](./DECISION_LOG.md) before designing or implementing any changes.
2. **Log Every Major Decision:** Whenever you implement a new feature, refactor code, or establish an architectural pattern, record an entry in [`DECISION_LOG.md`](./DECISION_LOG.md).
3. **Update Status:** Keep [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) up-to-date with active tasks, completed items, and blockers.
4. **Git Branching Strategy:**
   - Feature branches: `feat/claude/<feature-name>`
   - Bugfixes: `fix/claude/<issue-name>`
   - Commits should follow [Conventional Commits](https://www.conventionalcommits.org/): `feat: ...`, `fix: ...`, `docs: ...`, `test: ...`.

---

## 3. Architecture & Directory Structure

```text
Real-Life-Decision-Platform/
├── CLAUDE.md                  # Claude project instructions & context (this file)
├── CHATGPT.md                 # ChatGPT project instructions
├── DECISION_LOG.md            # Shared architectural decision record (ADR)
├── PROJECT_STATUS.md          # Shared backlog, milestones & sprint status
├── README.md                  # Public project documentation & introduction
├── docs/                      # Architectural docs & setup guides
│   ├── ai_setup_guide.md      # How to connect Claude & ChatGPT to this repo
│   ├── architecture.md        # Technical domain model & design specs
│   └── chatgpt_github_openapi.yaml # OpenAPI schema for Custom GPT GitHub action
├── scripts/                   # Workflow scripts
│   └── sync.sh                # Rapid sync & push script
├── src/                       # Application source code
│   ├── core/                  # Decision calculation engine (MCDA, AHP, scoring)
│   ├── models/                # Domain models (Criteria, Options, Evaluations)
│   └── utils/                 # Helpers, validation, formatting
└── tests/                     # Unit and integration test suites
```

---

## 4. Coding & Quality Standards
- **Clarity & Modularity:** Decouple calculation algorithms from UI/presentation logic.
- **Deterministic Calculations:** All mathematical scoring functions must be pure, deterministic, and covered by unit tests.
- **Defensive Input Handling:** Handle edge cases (zero weights, missing criteria scores, tied ranks).
- **TypeScript / Modern Python:** Code should be typed, documented with clean JSDoc/docstrings, and lint-clean.

---

## 5. Development & Sync Workflow
When running with **Claude Code** (CLI):
```bash
# Check status
git status

# Run local sync script to pull & commit
./scripts/sync.sh "feat: add TOPSIS decision scoring algorithm"
```
