# SPEC-B — API Specification

## Overview

This document defines the public API of the **Telecom Experience API**, a lightweight Express-based service that simulates Salesforce-style cart interactions.
It specifies available endpoints, payload structures, validation rules, and example responses.

---

## Base URL

```
http://localhost:3000
```

All routes are prefixed with `/cart` except for the `/health` endpoint.

---

## Endpoints

### 🩺 Health Check

**GET /health**

**Description:** Returns current service health and uptime information.

**Response:**

```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2025-10-30T01:00:00.000Z"
}
```

**Status Codes:**

| Code | Meaning            |
| ---- | ------------------ |
| 200  | Service is running |

---

### Add Item to Cart

**POST /cart/items**

**Description:** Adds or updates an item in the in-memory Salesforce cart context.

**Request Body:**

```json
{
  "productId": "A1",
  "quantity": 2
}
```

**Validation Rules:**

* `productId` — required, non-empty string.
* `quantity` — required, positive integer (>0).

**Example Response:**

```json
{
  "A1": 2
}
```

**Status Codes:**

| Code | Meaning                            |
| ---- | ---------------------------------- |
| 200  | Item successfully added or updated |
| 400  | Invalid input payload              |

**Error Example:**

```json
{
  "error": "Invalid input"
}
```

---

### Get Current Cart

**GET /cart**

**Description:** Retrieves the current in-memory cart state.

**Response:**

```json
{
  "A1": 2,
  "B2": 1
}
```

> **Note:** Internal metadata (`_meta`) is used internally by the service for timestamps and expiry tracking but is **not exposed** via public API responses.

**Status Codes:**

| Code | Meaning                    |
| ---- | -------------------------- |
| 200  | Cart returned successfully |

---

## Clear Cart

**DELETE /cart**

**Description:** Clears all items from the current in-memory cart.

**Response:**

```
204 No Content
```

**Status Codes:**

| Code | Meaning                   |
| ---- | ------------------------- |
| 204  | Cart cleared successfully |

---

## Internal Context (for reference only)

Internally, the SalesforceCartClient maintains a structured context:

```
{
  items: { [productId: string]: number },
  _meta: {
    createdAt: string,
    expiresAt: string
  }
}
```

The `_meta` object is **not returned** in any API responses but is verified during testing.

---

## Testing Coverage

| Suite                 | Scope                  | Description                                                   |
| --------------------- | ---------------------- | ------------------------------------------------------------- |
| **Unit Tests**        | `cart.service.spec.ts` | Tests core business logic (add, clear, validation, meta)      |
| **Integration Tests** | `app.spec.ts`          | Tests full request flow via Express (health, add, get, clear) |

Tests are isolated and run on a fresh app instance each time for statelessness.

---

## Example Sequence

### 1. Add two items

```bash
POST /cart/items
{
  "productId": "A1",
  "quantity": 2
}
POST /cart/items
{
  "productId": "B2",
  "quantity": 1
}
```

### 2. Retrieve cart

```bash
GET /cart
```

Response:

```json
{
  "A1": 2,
  "B2": 1
}
```

### 3. Clear cart

```bash
DELETE /cart
```

Response:

```
204 No Content
```

### 4. Health check

```bash
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---
