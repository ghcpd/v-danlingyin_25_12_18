#!/bin/bash
# Run project validation
set -e

echo "Running validation script..."
node validate_project.js

if command -v pnpm >/dev/null 2>&1; then
  echo "Running pnpm build..."
  pnpm build || { echo "pnpm build failed"; exit 1; }
else
  echo "pnpm not installed; skipping build step"
fi

# Run test runner
node test_runner.js || { echo "test_runner failed"; exit 1; }
