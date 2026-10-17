#!/usr/bin/env bash

set -euo pipefail

metro_pid=""

stop_metro() {
  if [[ -n "$metro_pid" ]]; then
    kill "$metro_pid" 2>/dev/null || true
  fi
}

trap stop_metro EXIT INT TERM

if ! curl --silent --fail http://localhost:8081/status 2>/dev/null | grep --quiet "packager-status:running"; then
  ./node_modules/.bin/expo start --dev-client --host localhost &
  metro_pid=$!

  for _ in {1..60}; do
    if curl --silent --fail http://localhost:8081/status 2>/dev/null | grep --quiet "packager-status:running"; then
      break
    fi
    sleep 1
  done

  if ! curl --silent --fail http://localhost:8081/status 2>/dev/null | grep --quiet "packager-status:running"; then
    echo "Metro did not start on port 8081." >&2
    exit 1
  fi
fi

# Expo SDK 54's bundled CLI does not recognize Xcode 27 Device Hub. Use a
# Device-Hub-aware CLI for the native build, while keeping SDK 54's Metro.
npx --yes expo@58.0.14 run:ios --device "iPhone 18 Pro" --no-bundler

if [[ -n "$metro_pid" ]]; then
  wait "$metro_pid"
fi
