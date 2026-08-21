A small movie ticket booking service is failing under load. Customers are being charged for
tickets they never actually receive.

The booking logic lives in `/app/services/booking.js`, exposing `bookTicket(showtimeId,
customerEmail, seatsRequested)`. It talks to a local Postgres database (`moviebooking`) with
three tables: `showtimes`, `payments`, and `bookings` (see `/app/db/schema.sql` for the exact
schema). A correct booking must be atomic: the customer is charged and their seats are reserved
together, or neither happens.

Fix `bookTicket` so that, under concurrent booking requests, every request that could legitimately
be satisfied by available seat inventory succeeds in full, and no customer is ever charged without
a matching seat reservation. Do not change the database schema or the function's signature.
