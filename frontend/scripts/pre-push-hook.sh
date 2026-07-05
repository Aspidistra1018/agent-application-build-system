#!/bin/bash


# Set the red ANSI escape code
RED='\033[0;31m'
# ANSI escape code to reset color
NC='\033[0m'

CURRENT_USER=$(git config user.email)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
CURRENT_ORIGIN_BRANCH=$(git rev-parse --abbrev-ref @{u})

# Get current origin URL
CURRENT_ORIGIN_URL=$(git remote get-url origin)

# if [[ -n "$CURRENT_ORIGIN_BRANCH" ]]; then
#   block_unresolved_conflict "$CURRENT_BRANCH..$CURRENT_ORIGIN_BRANCH"
# fi

if git status --porcelain | grep -q "pnpm-lock.yaml"; then
  echo -e "${RED}Error: pnpm-lock.yaml is included in the changes. Please commit it before push!${NC}"
  exit 1
fi

