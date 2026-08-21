# Movie Ticket Booking System - Connection-Safe Transaction Service

An enterprise-grade, high-concurrency Node.js booking engine designed to eliminate transactional race conditions and connection-checkout bugs in PostgreSQL connection pools.

---

### **Project Overview**

In multi-client, high-concurrency applications—such as movie ticket reservation systems—maintaining ACID transaction integrity is critical to prevent race conditions (e.g., double-booking or orphan reservations).

This project resolves a critical, non-obvious architecture bug inherent to `node-postgres` (`pg`): **connection pool query mismatches**. By enforcing explicit single-client checkouts via `pool.connect()`, this service ensures that multi-statement SQL transactions (`BEGIN`, `UPDATE`/`INSERT`, `COMMIT`/`ROLLBACK`) execute sequentially on the *exact same dedicated connection*, guaranteeing absolute data consistency under heavy concurrent traffic.

---

### **The Problem Solved**

When executing SQL transactions with `node-postgres`, calling `pool.query('BEGIN')` acquires and immediately releases a single client back to the pool by default. Subsequent query calls (`UPDATE`, `COMMIT`) pull different connection clients from the pool at random:

* **The Flaw:** `BEGIN` and `COMMIT` wrap independent connections, causing intermediate queries to auto-commit outside a unified transaction boundary.
* **The Impact:** Under concurrent load, seat reservations fail silently, inventory updates leak, and inconsistent state corrupts the database.
* **The Solution:** Implements rigorous client checkout, stateful transaction scoping, and safe resource cleanup (`client.release()`) within structured `try...catch...finally` blocks to ensure robust rollback on failure and complete prevention of connection leaks.

---

### **Key Features**

* **Connection-Safe Transaction Scoping:** Guarantees all transactional statements execute across a single checked-out `pg.Client` instance.
* **Deterministic Concurrency Control:** Prevents double-booking and invalid inventory updates when hundreds of users attempt to reserve seats simultaneously.
* **Automated Rollback & Resource Recovery:** Releases checked-out clients back to the pool instantly upon error or success, guarding against pool exhaustion.
* **Automated End-to-End Test Verification:** Includes unit, integration, and scenario-based tests (`pytest`, `scenario.js`) to verify transaction isolation, edge-case failure modes, and connection behavior under high concurrency.
* **Containerized Benchmark Infrastructure:** Fully Dockerized development and verification environment adhering to standardized terminal benchmark specs.

---

### **Key Advantages**

* **Zero Race Conditions:** Prevents silent auto-commits and partial state updates during simultaneous ticket reservations.
* **High-Throughput Pool Efficiency:** Maximizes PostgreSQL connection pool usage without stalling or leaking pool sockets.
* **Production-Grade Resilience:** Solves real-world software engineering failure modes that bypass naive local testing setups.

---

### **Technology Stack**

* **Backend:** Node.js, Express / JavaScript (ES6+)
* **Database:** PostgreSQL, `node-postgres` (`pg` pool management)
* **Testing & Verification:** Pytest, JavaScript Scenario Testing (`scenario.js`)
* **Infrastructure:** Docker, Linux CLI
