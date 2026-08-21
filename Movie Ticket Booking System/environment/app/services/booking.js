const pool = require('../db/pool');

/**
 * Books `seatsRequested` seats for `customerEmail` on `showtimeId`.
 *
 * This charges the customer (creates a completed payment record) and
 * reserves the seats (decrements showtimes.available_seats) as a single
 * all-or-nothing operation: if the seats cannot be reserved, the customer
 * must not be charged.
 */
async function bookTicket(showtimeId, customerEmail, seatsRequested) {
  await pool.query('BEGIN');
  try {
    const showtime = await pool.query(
      'SELECT price_cents FROM showtimes WHERE id = $1',
      [showtimeId]
    );
    if (showtime.rows.length === 0) {
      throw new Error('Showtime not found');
    }
    const amountCents = showtime.rows[0].price_cents * seatsRequested;

    const payment = await pool.query(
      `INSERT INTO payments (amount_cents, status) VALUES ($1, 'completed') RETURNING id`,
      [amountCents]
    );

    const seatUpdate = await pool.query(
      `UPDATE showtimes SET available_seats = available_seats - $1
       WHERE id = $2 AND available_seats >= $1
       RETURNING available_seats`,
      [seatsRequested, showtimeId]
    );

    if (seatUpdate.rows.length === 0) {
      throw new Error('Not enough seats available');
    }

    const booking = await pool.query(
      `INSERT INTO bookings (showtime_id, payment_id, customer_email, seats_booked)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [showtimeId, payment.rows[0].id, customerEmail, seatsRequested]
    );

    await pool.query('COMMIT');
    return { bookingId: booking.rows[0].id, paymentId: payment.rows[0].id };
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
}

module.exports = { bookTicket };
