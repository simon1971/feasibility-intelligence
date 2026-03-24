#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT_DIR"
TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)
RELEASE_NAME="$TIMESTAMP"
REMOTE_BASE="/srv/mvps/feasibility-intelligence/prod"
REMOTE_RELEASES="$REMOTE_BASE/releases"
REMOTE_RELEASE="$REMOTE_RELEASES/$RELEASE_NAME"

echo "Building static export..."
npm run build

echo "Creating remote release $REMOTE_RELEASE"
ssh mvp "mkdir -p '$REMOTE_RELEASE' '$REMOTE_BASE/incoming'"
tar -C out -cf - . | ssh mvp "tar -xf - -C '$REMOTE_RELEASE'"
ssh mvp '
set -e
REMOTE_BASE="/srv/mvps/feasibility-intelligence/prod"
REMOTE_RELEASES="$REMOTE_BASE/releases"
REMOTE_RELEASE="'"$REMOTE_RELEASE"'"
if [ -L "$REMOTE_BASE/current" ]; then
  CURRENT_TARGET=$(readlink -f "$REMOTE_BASE/current")
  ln -sfn "$CURRENT_TARGET" "$REMOTE_BASE/previous"
fi
ln -sfn "$REMOTE_RELEASE" "$REMOTE_BASE/current"
'

echo "Deployed release: $REMOTE_RELEASE"
