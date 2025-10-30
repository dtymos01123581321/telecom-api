# SPEC-A — Architecture & Abstractions

## Overview

This document describes the architecture of the **Telecom Experience API**, a lightweight TypeScript/Express service that simulates a Salesforce cart integration.
The purpose is to demonstrate clean modular design, layered separation of concerns, and in-memory data orchestration.

---

## High-Level Architecture

```
Request → Controller → Service → SalesforceCartClient → In-Memory Store → Response
```

| Layer                    | Responsibility                                                                       | Implementation                        |
| ------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------- |
| **Controller**           | Exposes HTTP routes and handles input/output mapping                                 | `cart.controller.ts`                  |
| **Service**              | Business logic: orchestrates operations, validation, and data shaping                | `cart.service.ts`                     |
| **Client (Adapter)**     | Simulates external Salesforce API, holds runtime cart context                        | `salesforceCartClient.ts`             |
| **Server (Entry Point)** | Initializes Express, middleware, `/health` endpoint, and routers                     | `index.ts`                            |
| **Tests**                | Unit and integration test suites validating both isolated logic and end-to-end flows | `cart.service.spec.ts`, `app.spec.ts` |

---

## Design Principles

1. **Single Responsibility** — each module has one clear purpose.
2. **Dependency Direction** — Controller → Service → Client (no circular dependencies).
3. **In-Memory Store** — runtime data only; resets between executions.
4. **Transparency & Testability** — predictable behavior for demonstration and testing.
5. **Simplicity First** — focus on clean interfaces over production complexity.

---

## Module Breakdown

### `src/index.ts`

* Initializes Express and middleware (`express.json()`).
* Adds a lightweight **`/health` endpoint** returning `{ status: "ok", uptime, timestamp }`.
* Registers the `CartController` at `/cart`.
* Starts the server on port `3000`.

### `src/cart/cart.controller.ts`

* Handles cart-related routes:

  * `POST /cart/items` → add item(s) to cart.
  * `GET /cart` → fetch current cart state.
  * `DELETE /cart` → clear all items.
* Performs input validation and structured error handling (`400` for invalid payloads).
* Delegates domain logic to `CartService`.

### `src/cart/cart.service.ts`

* Encapsulates all cart business logic.
* Uses `SalesforceCartClient` to perform operations.
* Returns only the **`items`** subset of the context (excluding meta data).
* Throws validation errors for invalid quantities.
* Acts as the main bridge between controller and client.

### `src/cart/salesforceCartClient.ts`

* Simulates a Salesforce-style cart context.
* Maintains cart data and expiration in memory.
* `getContext()` now returns a structured object:

```
{
  items: { [productId: string]: number },
  _meta: { createdAt: string, expiresAt: string }
}
```

* `_meta` is used internally; not exposed via public API.

### `tests/unit/cart.service.spec.ts`

* Validates service-level operations:

  * Adding items.
  * Clearing the cart.
  * Negative quantity validation.
  * Timestamp and context metadata integrity.

### `tests/integration/app.spec.ts`

* Runs end-to-end flows through Express:

  * Health check endpoint.
  * Add / Get / Clear routes.
  * Validation and error responses.
* Confirms interaction between controller, service, and client layers.

---

## Testing Strategy

| Type                  | Scope                                | Example                |
| --------------------- | ------------------------------------ | ---------------------- |
| **Unit Tests**        | Service logic (pure business layer)  | `cart.service.spec.ts` |
| **Integration Tests** | Full Express app behavior            | `app.spec.ts`          |
| **Coverage Goal**     | Focus on correctness, not percentage | Both                   |

Tests are isolated and stateless — each integration test rebuilds a fresh Express app instance.

---

## Key Improvements Since Initial Version

* Added `/health` endpoint for uptime monitoring.
* Introduced `_meta` context data (timestamps, expiry).
* `CartService` now returns only `ctx.items`.
* Split test suites into **unit** and **integration** for clarity.

---

## Trade-offs & Limitations

| Aspect           | Decision                  | Trade-off                         |
| ---------------- | ------------------------- | --------------------------------- |
| Persistence      | In-memory only            | No saved state between runs       |
| API completeness | Minimal endpoints         | Limited realism                   |
| Meta context     | Internal only             | Not returned via HTTP             |
| Testing          | Jest (unit + integration) | Lightweight, no mocking framework |

---

## Extensibility Notes

* Replace `SalesforceCartClient` with real Salesforce SDK or REST integration.
* Add authentication middleware.
* Extend service with pricing, discounts, or checkout logic.
* Introduce persistent storage if needed.

---
