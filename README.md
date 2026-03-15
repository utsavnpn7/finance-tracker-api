# Finance Tracker API

A REST API for tracking personal income and expenses, built with Node.js, Express, TypeScript, and MongoDB. Features JWT authentication with refresh token rotation and httpOnly cookie security.

---

## Tech Stack

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| Node.js + Express  | Server and routing            |
| TypeScript         | Type safety and OOP structure |
| MongoDB + Mongoose | Database                      |
| JWT                | Authentication                |
| bcryptjs           | Password hashing              |
| cookie-parser      | httpOnly cookie support       |

---

## Project Structure

```
finance-tracker/
├── src/
|   ├──interface/
│   │   ├── IController.ts              # Transaction Controller Contract
│   │   └── IServices.ts                # Transaction Service Contract
│   ├── models/
│   │   ├── User.ts                     # User schema
│   │   └── Transaction.ts              # Transaction schema
│   ├── controllers/
│   │   ├── AuthController.ts           # Handles auth requests
│   │   └── TransactionController.ts    #Handles transaction requests
│   ├── services/
│   │   ├── AuthService.ts              # Auth business logic
│   │   └── TransactionService.ts       # Transaction business logic
│   │   └── dbConnection.ts             # databaseConnection Lodgic
│   ├── routes/
│   │   ├── authRoutes.ts               # Auth endpoints
│   │   └── transactionRoutes.ts        # Transaction endpoints
│   ├── middleware/
│   │   └── authMiddleware.ts           # JWT
│   │   └── errorMiddleware.ts          # Global Error Handler
│   └── app.ts                          # Entry point
├── .env
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
```

Generate strong secrets using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Server runs on `http://localhost:5000`

---

## API Endpoints

### Auth

| Method | Endpoint             | Description             | Auth Required |
| ------ | -------------------- | ----------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user     | No            |
| POST   | `/api/auth/login`    | Login and get tokens    | No            |
| POST   | `/api/auth/refresh`  | Get new access token    | Cookie        |
| POST   | `/api/auth/logout`   | Logout and clear cookie | No            |

### Transactions

| Method | Endpoint                    | Description                   | Auth Required |
| ------ | --------------------------- | ----------------------------- | ------------- |
| POST   | `/api/transactions`         | Create a transaction          | Yes           |
| GET    | `/api/transactions`         | Get all transactions          | Yes           |
| GET    | `/api/transactions/summary` | Get income vs expense summary | Yes           |
| GET    | `/api/transactions/:id`     | Get a single transaction      | Yes           |
| DELETE | `/api/transactions/:id`     | Delete a transaction          | Yes           |

---

## Request & Response Examples

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Utsav",
  "email": "utsav@gmail.com",
  "password": "123456"
}
```

```json
{
  "message": "User registered successfully",
  "data": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Utsav",
    "email": "utsav@gmail.com"
  }
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "utsav@gmail.com",
  "password": "123456"
}
```

```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

> The refresh token is automatically set as an `httpOnly` cookie.

### Create Transaction

```http
POST /api/transactions
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

{
  "serviceName": "Groceries",
  "type": "expense",
  "amount": 50
}
```

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
  "serviceName": "Groceries",
  "type": "expense",
  "amount": 50,
  "userId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Get Summary

```http
GET /api/transactions/summary
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

```json
{
  "totalIncome": 5000,
  "totalExpenses": 1200,
  "balance": 3800
}
```

---

## Authentication Flow

```
1. POST /login  →  get accessToken (15 min) + refreshToken cookie (7 days)
2. Every request  →  send accessToken in Authorization header
3. accessToken expires  →  POST /refresh with cookie  →  get new accessToken
4. POST /logout  →  cookie cleared
```

The `refreshToken` is stored in an `httpOnly` cookie — it is invisible to JavaScript, protecting against XSS attacks.

---

## Error Responses

All errors follow this format:

```json
{
  "message": "Error description here"
}
```

| Status | Meaning                                 |
| ------ | --------------------------------------- |
| 400    | Bad request — invalid data              |
| 401    | Unauthorized — missing or invalid token |
| 404    | Not found — resource does not exist     |
| 500    | Server error                            |

---

## Scripts

```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
```

---

## OOP Architecture

This project applies core OOP principles throughout:

| Principle     | Where                                               |
| ------------- | --------------------------------------------------- |
| Abstraction   | Services hide business logic from controllers       |
| Encapsulation | Private methods in service classes                  |
| Inheritance   | Controllers and services follow consistent patterns |
| Interfaces    | TypeScript interfaces define data shapes            |

---

## License

MIT
