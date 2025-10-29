# SPEC-A — Architecture & Abstractions

## Overview
This document describes the architecture and internal abstractions of the **Telecom Experience API**,  
a thin integration layer built on top of a mock Salesforce cart context.  
The goal is to demonstrate clean modular design, separation of concerns, and in-memory data flow.

The API is written in **TypeScript (Node.js 20+)** and exposes minimal HTTP endpoints for cart operations.

---

## High-Level Architecture

```
Request → Controller → Service → SalesforceCartClient → In-Memory Store → Response
```

### Components:
| Layer | Responsibility | Implementation |
|--------|----------------|----------------|
| **Controller** | Exposes HTTP routes and handles request/response mapping | `cart.controller.ts` |
| **Service** | Contains core business logic and orchestrates operations | `cart.service.ts` |
| **Client (Adapter)** | Simulates external Salesforce API interactions | `salesforceCartClient.ts` |
| **Server (Entry Point)** | Initializes Express, registers routes | `index.ts` |
| **Tests** | Unit tests validating critical paths | `cart.service.spec.ts` |

---

## Design Principles

1. **Single Responsibility** — Each module handles exactly one domain concern.  
2. **Dependency Direction** — Controller depends on Service, Service depends on Client.  
3. **In-Memory Store** — No persistent database; state is stored in runtime memory.  
4. **Testability** — All logic is implemented via pure functions where possible.  
5. **Clarity > Completeness** — Production-grade complexity intentionally avoided in favor of transparency.

---

##  Module Breakdown

### `src/index.ts`
- Creates the Express app and configures middleware.
- Registers the `CartController` at route `/cart`.
- Starts the HTTP server on port `3000`.

### `src/cart/cart.controller.ts`
- Initializes all cart-related routes:
  - `POST /cart/items` → add item to cart.
  - `GET /cart` → fetch current cart state.
  - `DELETE /cart` → clear the cart.
- Delegates logic to `CartService`.
- Handles request parsing and response formatting.

### `src/cart/cart.service.ts`
- Contains all cart domain logic:
  - Adds items, merges quantities.
  - Clears cart and returns updated state.
- Acts as a mediator between `controller` and `SalesforceCartClient`.

### `src/cart/salesforceCartClient.ts`
- Provides a mock simulation of Salesforce cart behavior.
- Stores cart data in-memory (`{ [productId]: quantity }`).
- Includes context expiration logic (5-minute validity window).
- Implements `addItem`, `getContext`, and `clearCart`.

### `tests/cart.service.spec.ts`
- Uses Jest to validate critical flows:
  - Item addition.
  - Quantity accumulation.
  - Cart clearing.

---

## Abstractions and Interfaces

Even though the system is minimal, it follows layered abstractions:

```ts
interface ICartClient {
  addItem(productId: string, quantity: number): void;
  getContext(): Record<string, number>;
  clearCart(): void;
}
```

`SalesforceCartClient` acts as the in-memory implementation of this abstraction.

---

## Data Flow Example

### Add Item (`POST /cart/items`)
1. Client sends `POST /cart/items` with `{ "productId": "A1", "quantity": 2 }`.
2. Controller delegates to `CartService.addItem`.
3. `CartService` calls `SalesforceCartClient.addItem`.
4. The mock client updates its internal store and returns the new context.
5. The controller sends this context as the HTTP response.

---

## Testing Approach

- **Unit tests** target the `CartService` class.
- Tests use the real in-memory client (no mocks needed).
- Focus on correctness, not coverage — verifying pure functions and state transitions.

---

## Trade-offs & Limitations

| Aspect | Decision | Trade-off |
|--------|-----------|-----------|
| State storage | In-memory | No persistence, resets on restart |
| Framework | Express | Minimal boilerplate, no decorators |
| Data access | Mock client | No external calls, less realism |
| Expiry | Simple 5-min timeout | Not refreshable dynamically |
| Error handling | Basic | Focused on clarity over production polish |

---

## Extensibility Notes

The current design supports easy future extension:
- Replace `SalesforceCartClient` with a real Salesforce API adapter.
- Add middleware (auth, validation) at the controller level.
- Extend service to handle pricing, discounts, or checkout.

---

## Summary

The Telecom Experience API implements a minimal but realistic architecture illustrating:
- Clean separation between HTTP, business, and data layers.
- Simple but testable in-memory store.
- Mocked integration boundary to emulate Salesforce.

This design balances simplicity, correctness, and clarity — ideal for technical demonstration or early prototyping.

---
