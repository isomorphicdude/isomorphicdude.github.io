#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

export PATH="/opt/homebrew/opt/ruby@2.7/bin:$PATH"

exec bundle exec jekyll serve \
  --host 127.0.0.1 \
  --port "${PORT:-4000}" \
  --livereload \
  "$@"
