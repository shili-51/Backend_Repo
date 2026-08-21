DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS showtimes;

CREATE TABLE showtimes (
    id SERIAL PRIMARY KEY,
    movie_title TEXT NOT NULL,
    available_seats INT NOT NULL CHECK (available_seats >= 0),
    price_cents INT NOT NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    amount_cents INT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    showtime_id INT NOT NULL REFERENCES showtimes(id),
    payment_id INT NOT NULL REFERENCES payments(id),
    customer_email TEXT NOT NULL,
    seats_booked INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
