#!/bin/bash
set -e

service postgresql start

# Wait for postgres to accept connections
for i in $(seq 1 30); do
  if su postgres -c "pg_isready -q"; then
    break
  fi
  sleep 1
done

# Set password and explicitly create the moviebooking database using psql
su postgres -c "psql -d template1 -c \"ALTER USER postgres WITH PASSWORD 'postgres';\"" > /dev/null
su postgres -c "psql -d template1 -c \"CREATE DATABASE moviebooking;\"" 2>/dev/null || true

# Always reseed to a known, deterministic starting state.
node /app/scripts/seed.js

exec "$@"
