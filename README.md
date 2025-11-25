# Web3 Message Signer & Verifier

A full-stack Web3 application for signing and verifying Ethereum messages using Dynamic.xyz headless wallet integration.

## Live Demo

Frontend: 
https://main.d28z8oqntazhkp.amplifyapp.com

Backend API:
 https://zl83pu4pik.execute-api.us-east-1.amazonaws.com/prod

## How to Use

### 1. Sign Up / Login
1. Open frontend 
2. Enter your email address
3. Check your email for OTP code
4. Enter the 6-digit code
5. You're authenticated!


### 3. Sign a Message
1. Enter your message in the textarea
2. Click "Sign & Verify"
3. Message is signed and verified
4. Result shows in history

### 4. View History
- All signed messages appear in "Verification History"
- Shows: timestamp, validity, signer address, original message
- History persists in browser localStorage


## Quick Start

Prerequisites:
- Node.js 18+
- npm 
- Dynamic.xyz account

Setup:

cd frontend
npm install
VITE_DYNAMIC_ENVIRONMENT_ID=your_id VITE_BACKEND_URL=http://localhost:3000 npm run dev

cd backend
npm install
npm run dev


## Backend API


GET /
Returns: 404 Route not found


POST /verify-signature

Request body:
{
  "message": "string (required, min 1 char)",
  "signature": "string (required, 0x + 130 hex chars)"
}

Response 200


## Backend Testing

Run tests:
cd backend
npm test

Test files:
- src/tests/test-servise.ts: SignatureVerifierService tests
- src/tests/test-middleware.ts: Middleware tests
- src/tests/test-routes.ts: Route handler tests
- src/tests/test-errors.ts: Error handling tests


## Frontend Testing

Run tests:
cd frontend
npm test

Test files:
- src/services/apiService.test.ts: API calls
- src/services/historyService.test.ts: localStorage management
- src/components/auth/LoginFrom.test.tsx: Login component

### Error Handling

Error types:
- 400 Bad Request: Validation failed
- 404 Not Found: Route not found
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Unexpected error



### Backend Test Scenarios

1. Valid Signature
   Input: message="Hello", signature="0x..." (valid)
   Expected: { isValid: true, signer: "0x...", originalMessage: "Hello" }

2. Invalid Signature
   Input: message="Hello", signature="0x..." (invalid)
   Expected: { isValid: false, signer: "", originalMessage: "Hello" }

3. Validation Error - Missing Message
   Input: { signature: "0x..." }
   Expected: 400 error "Message is required"

4. Validation Error - Invalid Signature Format
   Input: { message: "Hello", signature: "invalid" }
   Expected: 400 error "Signature must be a valid 132-character..."

5. Rate Limit
   Input: 6 requests in 60 seconds
   Expected: 6th request returns 429 "Too many requests"


## Configuration

Backend .env:
PORT=3000 (server port)
NODE_ENV=development (environment)
CORS_ORIGIN=http://localhost:5173 (allowed frontend)
LOG_LEVEL=info (logging level: info, warn, error)

Frontend .env:
VITE_DYNAMIC_ENVIRONMENT_ID=... (Dynamic.xyz ID)
VITE_BACKEND_URL=http://localhost:3000 (backend URL)


## Project Structure

backend/
├── src/
│   ├── index.ts (Express setup)
│   ├── routes/verify-signature.ts (POST endpoint)
│   ├── services/SignatureVerifierService.ts (ethers.js)
│   ├── middleware/
│   │   ├── cors.ts
│   │   ├── error-handling.ts
│   │   ├── rate-limit.ts
│   │   └── validation/
│   │       ├── schemas.ts (Zod schemas)
│   │       └── validation.ts (middleware)
│   ├── config/config.ts (configuration)
│   ├── errors/AppError.ts (error class)
│   ├── utils/Logger.ts (Winston logger)
│   └── tests/ (test files)

frontend/
├── src/
│   ├── main.tsx (entry point)
│   ├── App.tsx (routing)
│   ├── components/
│   │   ├── auth/LoginForm.tsx
│   │   ├── signPanel/MessageSigner.tsx
│   │   ├── wallet/CustomWidgets.tsx
│   │   └── ui/ErrorDisplay.tsx
│   ├── services/
│   │   ├── apiService.ts
│   │   └── historyService.ts
│   ├── context/DynamicProvider.tsx
│   └── pages/
│       ├── Landing.tsx
│       └── Home.tsx


## Trade-offs

EC2 instead of ECS/Fargate . For production better to use ECS Fargate with ECR 

Single EC2 instance - no high availability. For production need Load Balancer + Auto Scaling Group with minimum 2 instances in different AZs.

LocalStorage instead of database - Simple for MVP but data lost on browser clear. For production need database.

Context API - Sufficient for this project. For larger app consider Redux.

No E2E tests - For production add Playwright or Cypress.

## Areas for Improvement

High Availability and Scalability:
- Move to ECS Fargate + ECR instead of EC2 (serverless containers, automatic scaling)
- Application Load Balancer for traffic distribution
- ECS Service with minimum 2 tasks in different Availability Zones
- Health checks and automatic failover
- Multi-AZ RDS for database
- CloudFront CDN for frontend
- ElastiCache Redis for caching and sessions