#!/bin/sh

SCRIPT_DIR="$(dirname "$0")"
ln -sf "$SCRIPT_DIR/pre-commit" "$SCRIPT_DIR/../../.git/hooks/pre-commit"
echo "Pre-commit hook has been set up."
