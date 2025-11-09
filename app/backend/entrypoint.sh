#!/bin/bash
set -e

rm -f /app/tmp/pids/server.pid

echo "Running migrations..."
bundle exec rails db:migrate

exec "$@"
