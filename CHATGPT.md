# CHATGPT.md - Project Guide for ChatGPT

This document defines the instructions, architectural standards, and workflow rules for **ChatGPT** (ChatGPT Projects, Custom GPTs, and Codex Desktop) working on the **Real-Life Decision Platform**.

---

## 1. Project Purpose & Role
You are the lead architect and core engineer co-developing the **Real-Life Decision Platform** alongside **Claude** and human maintainers.

The platform provides structured decision-making tools for complex personal, professional, and organizational decisions:
- Decision matrix with criteria weighting & normalization.
- Multi-Criteria Decision Analysis (Weighted Sum Model, Analytic Hierarchy Process, TOPSIS).
- Risk assessment & uncertainty modeling.
- Clear, visual decision trade-off rationales.

---

## 2. Co-Development Rules with Claude
Claude and ChatGPT share this repository as their primary project workspace. Follow these rules strictly:

1. **Read Existing State First:**
   - Always inspect [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) and [`DECISION_LOG.md`](./DECISION_LOG.md) before designing or writing new features.
   - Do not overwrite or undo decisions recorded in [`DECISION_LOG.md`](./DECISION_LOG.md) without explicit justification and user confirmation.
2. **Log Your Work:**
   - Whenever you complete a feature or make an architectural decision, add an entry to [`DECISION_LOG.md`](./DECISION_LOG.md).
   - Update [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) under "In Progress" / "Done".
3. **Branching & Commits:**
   - Feature branches: `feat/chatgpt/<feature-name>`
   - Bugfixes: `fix/chatgpt/<issue-name>`
   - Format: Conventional Commits (`feat: ...`, `fix: ...`, `docs: ...`, `test: ...`).

---

## 3. How ChatGPT Pushes Changes to GitHub
Depending on which interface you are running in:

- **Option A: Custom GPT with GitHub Action:**
  If you have the GitHub REST API action enabled (see [`docs/chatgpt_github_openapi.yaml`](./docs/chatgpt_github_openapi.yaml)), use the API endpoint `PUT /repos/Paulus78/Real-Life-Decision-Platform/contents/{path}` or create a Pull Request to commit files directly.
- **Option B: Codex / Desktop Work Mode:**
  Use the integrated workspace terminal to stage, commit, and push.
- **Option C: Code Delivery in Chat:**
  When generating code for the user to commit, specify the exact file path and provide ready-to-run terminal commands:
  ```bash
  ./scripts/sync.sh "feat(chatgpt): description of your change"
  ```

---

## 4. Code Standards
- **Strong Typing:** Clear interfaces for `DecisionModel`, `Criterion`, `Alternative`, `ScoreMatrix`, and `EvaluationResult`.
- **Pure Math Engine:** Calculation logic should have zero side effects, enabling high testability.
- **Explainability:** Decision models must provide human-readable explanations of why Option A ranks above Option B.
