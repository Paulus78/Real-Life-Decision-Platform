# Architectural Decision Log (ADR)

This file is the shared memory between **Claude**, **ChatGPT**, and human maintainers. Whenever an architectural, design, or algorithmic decision is made, document it here using the format below.

---

## Log Entries

### ADR-001: Initial Repository Architecture & Dual-AI Collaboration Setup
- **Date:** 2026-10-02
- **Author:** Antigravity AI (Pair Programmer)
- **Status:** Accepted
- **Context:**
  The user wants to develop the *Real-Life Decision Platform* using both **Claude** and **ChatGPT** simultaneously, using [Paulus78/Real-Life-Decision-Platform](https://github.com/Paulus78/Real-Life-Decision-Platform) as the single source of truth.
- **Decision:**
  1. We establish `CLAUDE.md` and `CHATGPT.md` as context primers tailored to each AI assistant.
  2. We introduce `DECISION_LOG.md` (this file) and `PROJECT_STATUS.md` as synchronizing state files so neither AI overwrites the other's progress.
  3. We provide a cross-platform synchronization tool (`scripts/sync.sh`) and an OpenAPI schema for ChatGPT Custom GPT write-actions.
  4. The core calculation engine is designed with modular mathematical foundations (WSM, AHP, TOPSIS).
- **Consequences:**
  Both AIs can read the repo via standard GitHub integrations, and write back changes cleanly via CLI, Custom GPT Actions, or local sync scripts.
