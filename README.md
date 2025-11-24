# Web3 Message Signer & Verifier

A full-stack Web3 application for signing and verifying Ethereum messages using Dynamic.xyz headless wallet integration.

## Live Demo

Frontend: https://main.d28z8oqntazhkp.amplifyapp.com

Backend API: https://zl83pu4pik.execute-api.us-east-1.amazonaws.com/prod

## How to Use

### 1. Sign Up / Login
1. Open frontend at `http://localhost:5173`
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

### Prerequisites
- Node.js 18+
- npm 
- Dynamic.xyz account with environment ID

### Setting Up Dynamic.xyz

1. Go to https://app.dynamic.xyz
2. Sign up or log in to your account
3. Create a new project or select existing one
4. In the dashboard, find "Environment ID"
5. Copy the Environment ID 
6. This ID is used in frontend `.env` file as `VITE_DYNAMIC_ENVIRONMENT_ID`


### Environment Variables

**Frontend** (`.env`):
env
VITE_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id
VITE_BACKEND_URL=http://localhost:3000


**Backend** (`.env`):
env
PORT=3000
CORS_ORIGIN=http://localhost:5173

## Frontend Setup

cd frontend
npm install
npm run dev

## Backend Setup
cd backend
npm install
npm run dev
 
## Trade-offs & Future Improvements

### Current Trade-offs
- **In-memory state**: No database, data lost on server restart
- **localStorage**: Limited to browser, no cross-device sync
- **Single EC2 instance**: No high availability


### Future Improvements
- Add PostgreSQL for persistent storage
- Implement user sessions with JWT
- Add multi-wallet support
- Deploy with load balancing
- Add E2E tests with Playwright
- Implement WebSocket for real-time updates
- Add message encryption
- Support multiple blockchain networks

