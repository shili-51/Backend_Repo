const fs = require('fs');
const path = require('path');
const pool = require('../db/pool');

async function seed() {
  const schema = fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf8');
  await pool.query(schema);
  await pool.query(
    `INSERT INTO showtimes (movie_title, available_seats, price_cents) VALUES ($1, $2, $3)`,
    ['The Terminal Benchmark', 20, 1200]
  );
  console.log('seeded');
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
