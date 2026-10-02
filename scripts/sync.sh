#!/usr/bin/env bash
# ==============================================================================
# sync.sh - Automated Git Sync for Claude & ChatGPT Co-Development
# ==============================================================================
# Usage:
#   ./scripts/sync.sh "feat: add scoring model"
#   ./scripts/sync.sh (will prompt for a commit message)
# ==============================================================================

set -euo pipefail

# Ensure we are at repo root
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo "=================================================="
echo "  Real-Life Decision Platform - Git Sync"
echo "=================================================="

# Check if branch exists
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")"
echo "Current branch: $CURRENT_BRANCH"

# Pull latest changes first
echo "--> Pulling latest remote changes..."
git pull --rebase origin "$CURRENT_BRANCH" 2>/dev/null || echo "No remote commits yet or pull skipped."

# Check status
if [[ -z "$(git status --porcelain)" ]]; then
    echo "No local changes to commit. Repository is clean and up to date."
    exit 0
fi

echo "--> Detected local changes:"
git status --short

# Commit message
COMMIT_MSG="${1:-}"
if [[ -z "$COMMIT_MSG" ]]; then
    read -rp "Enter commit message: " COMMIT_MSG
fi

if [[ -z "$COMMIT_MSG" ]]; then
    COMMIT_MSG="chore: update project state via AI sync [$(date '+%Y-%m-%d %H:%M')]"
fi

# Stage all tracked and new untracked files
echo "--> Staging changes..."
git add -A

# Commit
echo "--> Committing changes..."
git commit -m "$COMMIT_MSG"

# Push
echo "--> Pushing to origin $CURRENT_BRANCH..."
git push -u origin "$CURRENT_BRANCH"

echo "=================================================="
echo "  Sync successfully completed!"
echo "=================================================="
