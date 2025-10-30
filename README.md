# Telecom Experience API

This project implements a **simplified in-memory Experience API layer** for a telecom cart system.
It’s built in **Node.js (v20+) and TypeScript**, following clean modular architecture principles and mimicking Salesforce cart behavior without real API calls.

---

## Overview

The API provides cart management functionality — adding, viewing, and clearing items — through a lightweight service layer and a mock `SalesforceCartClient`.

All operations are **in-memory** and designed to demonstrate **architecture, testing, and API design clarity** — not production persistence.

---

## Tech Stack

* **Node.js 20+**
* **TypeScript**
* **Express 5**
* **Jest / ts-jest / Supertest** for testing

---

## Project Structure

```
telecom-experience-api/
├── src/
│   ├── index.ts                     # Entry point + /health endpoint
│   └── cart/
│       ├── cart.controller.ts       # REST endpoints
│       ├── cart.service.ts          # Business logic layer
│       └── salesforceCartClient.ts  # Mock Salesforce cart client
│
├── tests/
│   ├── unit/
│   │   └── cart.service.spec.ts     # Unit tests for service logic
│   └── integration/
│       └── app.spec.ts              # Integration tests via Express
│
├── SPEC-A-architecture.md           # Architecture design document
├── SPEC-B-api.md                    # API specification
├── PROMPTS.md                       # Prompts used to generate documentation
├── tsconfig.json
├── package.json
└── README.md
```

---

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Run the API

```bash
npm run start
```

Server runs at [http://localhost:3000](http://localhost:3000)

### 3. Run in dev mode

(with auto-reload)

```bash
npm run dev
```

---

## Endpoints

| Method     | Endpoint      | Description               |
| ---------- | ------------- | ------------------------- |
| **GET**    | `/health`     | Returns uptime and status |
| **POST**   | `/cart/items` | Add or update a cart item |
| **GET**    | `/cart`       | Get current cart state    |
| **DELETE** | `/cart`       | Clear all cart items      |

**Example:**

```bash
curl -X POST http://localhost:3000/cart/items \
     -H "Content-Type: application/json" \
     -d '{"productId": "A123", "quantity": 2}'
```

**Response:**

```json
{
  "A123": 2
}
```

---

## Testing

This project includes both **unit** and **integration** tests.

| Type        | Command                    | Description                        |
| ----------- | -------------------------- | ---------------------------------- |
| Unit        | `npm run test:unit`        | Tests service logic and validation |
| Integration | `npm run test:integration` | Tests full Express endpoints       |
| All         | `npm test`                 | Runs both suites sequentially      |

### Example coverage:

* Add / Clear / Get cart operations
* Validation for invalid payloads
* `/health` endpoint status check
* Internal `_meta` verification (timestamps, expiry)

---

## Design Notes

* Clean three-layer architecture (Controller → Service → Client)
* Fully isolated in-memory logic (no DB, no external APIs)
* `_meta` context included internally, not exposed via API
* `/health` endpoint for uptime and integration testing
* Separated test structure for clarity and maintainability
* Documentation generated via structured prompts

---

## Documentation

| File                       | Purpose                               |
| -------------------------- | ------------------------------------- |
| **SPEC-A-architecture.md** | Architecture overview                 |
| **SPEC-B-api.md**          | API endpoints and contracts           |
| **PROMPTS.md**             | Original prompt history and reasoning |

---
