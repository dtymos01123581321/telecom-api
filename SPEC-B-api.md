# SPEC-B — API Specification

## Overview
This document defines the REST API contracts for the **Telecom Experience API**.  
The API provides a simple interface for managing cart items within an in-memory Salesforce cart simulation.

All endpoints are served under the base path:

```
/cart
```

Each endpoint follows **RESTful conventions** and exchanges data using **JSON**.

---

## General Information

| Property | Value |
|-----------|--------|
| **Base URL** | `http://localhost:3000/cart` |
| **Content-Type** | `application/json` |
| **Authentication** | Not required (mock service) |
| **Persistence** | In-memory (data cleared on restart) |
| **Timeout / Expiry** | 5 minutes (mock context expiration) |

---

## Endpoints

### 1. `GET /cart`

**Description:**  
Retrieve the current state of the cart.

**Response Example:**
```json
{
  "A123": 2,
  "B456": 1
}
```

**Status Codes:**
| Code | Description |
|------|--------------|
| `200 OK` | Successfully retrieved the current cart |
| `500 Internal Server Error` | Unexpected server error |

---

### 2. `POST /cart/items`

**Description:**  
Add or update an item in the cart.  
If the item already exists, its quantity is increased.

**Request Example:**
```json
{
  "productId": "A123",
  "quantity": 2
}
```

**Response Example:**
```json
{
  "A123": 2
}
```

**Status Codes:**
| Code | Description |
|------|--------------|
| `200 OK` | Item added successfully |
| `400 Bad Request` | Invalid input data |
| `500 Internal Server Error` | Context expired or server error |

---

### 3. `DELETE /cart`

**Description:**  
Clear all items from the cart (reset cart state).

**Response:**  
No content.

**Status Codes:**
| Code | Description |
|------|--------------|
| `204 No Content` | Cart cleared successfully |
| `500 Internal Server Error` | Unexpected server error |

---

## Example Usage with `curl`

### Add Item
```bash
curl -X POST http://localhost:3000/cart/items      -H "Content-Type: application/json"      -d '{"productId": "A123", "quantity": 3}'
```

### Get Cart
```bash
curl http://localhost:3000/cart
```

### Clear Cart
```bash
curl -X DELETE http://localhost:3000/cart
```

---

## Request & Response Models

### Request Body — Add Item
| Field | Type | Required | Description |
|--------|------|----------|--------------|
| `productId` | `string` | +        | Unique product identifier |
| `quantity` | `number` | +        | Quantity to add |

### Response Body — Cart State
| Field | Type | Description |
|--------|------|-------------|
| `[productId]` | `number` | Quantity of each product in the cart |

---

##️ Error Responses

### Example: Invalid Input
```json
{
  "error": "Invalid productId or quantity"
}
```

### Example: Expired Context
```json
{
  "error": "Cart context expired"
}
```

---

## API Design Principles

1. **Simplicity:** Minimal REST surface — only essential endpoints.  
2. **Predictability:** Each request returns deterministic state.  
3. **Extensibility:** Easy to add new routes (e.g., `/cart/checkout`, `/cart/discounts`).  
4. **Consistency:** All responses in JSON format with meaningful HTTP status codes.  
5. **No External Dependencies:** All logic in-memory, for demo and testing purposes.

---

## Future Enhancements

| Feature | Description |
|----------|--------------|
| `PATCH /cart/items/:id` | Update quantity or item details |
| `POST /cart/checkout` | Simulate checkout process |
| `GET /cart/summary` | Return subtotal, tax, and total price |
| `Error Middleware` | Centralized error handling and logging |
| `Auth Middleware` | Add mock user sessions or JWT validation |

---

## Summary

The API provides a minimal, clear, and testable REST interface for managing cart data in memory.  
Its design demonstrates clean layering, proper REST semantics, and readiness for extension to a real Salesforce integration.

---
