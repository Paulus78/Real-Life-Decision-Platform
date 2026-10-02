# Project Status & Backlog

Live synchronization tracker for **Claude**, **ChatGPT**, and project maintainers. Update this document as tasks progress.

---

## 🚀 Current Milestone: Milestone 1 - Core Foundations & Decision Engine

| Status | Task | Assigned To | Target / Notes |
| :--- | :--- | :--- | :--- |
| **DONE** | Initialize repository structure & AI collaboration guides | Antigravity AI | Project setup, `CLAUDE.md`, `CHATGPT.md`, ADR |
| **DONE** | Add sync script and GitHub Action configurations | Antigravity AI | `scripts/sync.sh`, Claude Action template |
| **IN PROGRESS** | Define Core Decision Domain Models (Criteria, Alternatives, Scores) | Claude / ChatGPT | TypeScript interfaces / Python dataclasses |
| **TODO** | Implement Weighted Sum Model (WSM) calculation engine | Claude / ChatGPT | Deterministic scoring & normalization |
| **TODO** | Implement Analytic Hierarchy Process (AHP) pair-wise comparisons | Claude / ChatGPT | Consistency ratio (CR) calculation |
| **TODO** | Add Sensitivity Analysis module (Weight variation testing) | Claude / ChatGPT | Test sensitivity of top choices to weight shifts |
| **TODO** | Interactive Web UI / CLI prototype | Claude / ChatGPT | Visualize decision matrix & results |

---

## 📌 Rules for Claude and ChatGPT:
1. When starting a task, move it from **TODO** to **IN PROGRESS** and note your name (e.g., `Claude` or `ChatGPT`).
2. When finished, mark it **DONE** and add a reference to the commit/PR and any relevant entry in [`DECISION_LOG.md`](./DECISION_LOG.md).
