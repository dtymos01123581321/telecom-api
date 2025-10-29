# Telecom Experience API

This project implements a **simplified in-memory Experience API layer** for a telecom cart system.  
It’s written in **Node.js (v20+) and TypeScript**, following modular architecture principles and mimicking Salesforce cart behavior without real API calls.

---

## 🧠 Overview

The API provides cart management functionality — adding, viewing, and clearing items — through a lightweight service layer and a mock `SalesforceCartClient`.

All operations are **in-memory** and designed to demonstrate architectural understanding rather than production readiness.

---

## ⚙️ Tech Stack

- **Node.js 20+**
- **TypeScript**
- **Express 5**
- **Jest / ts-jest** for testing

---

## 📂 Project Structure

```
telecom-experience-api/
├── src/
│   ├── index.ts                    # Entry point
│   └── cart/
│       ├── cart.controller.ts      # HTTP routes for /cart
│       ├── cart.service.ts         # Business logic
│       └── salesforceCartClient.ts # Mock Salesforce cart client
│
├── tests/
│   └── cart.service.spec.ts        # Unit tests
│
├── SPEC-A-architecture.md          # Architecture design document
├── SPEC-B-api.md                   # API specification
├── PROMPTS.md                      # AI prompts used to generate specs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Run Locally

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run the API
```bash
npm run start
```

Server runs at [http://localhost:3000](http://localhost:3000)

### 3️⃣ Run in dev mode
(with auto-reload)
```bash
npm run dev
```

### 4️⃣ Run tests
```bash
npm run test
```

---

## 🧩 Available Endpoints

| Method | Endpoint          | Description              |
|--------|--------------------|--------------------------|
| **POST** | `/cart/items`     | Add an item to the cart  |
| **GET**  | `/cart`           | Get current cart state   |
| **DELETE** | `/cart`         | Clear the entire cart    |

Example:
```bash
curl -X POST http://localhost:3000/cart/items      -H "Content-Type: application/json"      -d '{"productId": "A123", "quantity": 2}'
```

Response:
```json
{
  "A123": 2
}
```

---

## 🧪 Tests

Unit tests verify:
- Item addition and quantity tracking  
- Clearing the cart  
- Proper in-memory behavior of SalesforceCartClient  

Run:
```bash
npm run test
```

---

## 🧱 Design Notes

- Architecture documented in **SPEC-A-architecture.md**
- API contracts defined in **SPEC-B-api.md**
- All prompts and iterations recorded in **PROMPTS.md**
- Fully isolated in-memory logic (no DB, no external APIs)
- Each layer (controller → service → client) is testable independently

---

