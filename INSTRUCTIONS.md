# Setup Instructions

## Live Demo

Frontend: https://main.d28z8oqntazhkp.amplifyapp.com
Backend API: https://zl83pu4pik.execute-api.us-east-1.amazonaws.com/prod

## Tech Stack

Frontend:
- React 19 + TypeScript
- Vite
- Dynamic.xyz SDK 
- Vitest + Testing Library

Backend:
- Node.js + Express + TypeScript
- ethers.js v6
- Zod validation
- Native Node.js test runner

Infrastructure:
- AWS SAM/CloudFormation
- AWS Amplify (frontend)
- AWS EC2 + API Gateway (backend)

## Local Development

### Backend

cd backend
npm install
npm run dev

Backend runs on http://localhost:3000

### Frontend

Create .env file:

VITE_DYNAMIC_ENVIRONMENT_ID=your_dynamic_id
VITE_API_URL=http://localhost:3000

Then run:

cd frontend
npm install
npm run dev

Frontend runs on http://localhost:5173

### Tests

Backend:
cd backend
npm test

Frontend:
cd frontend
npm test

## Production Deployment

### Prerequisites

Install AWS SAM CLI and AWS CLI:

Or follow official guides:
- AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- SAM CLI: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

Configure AWS credentials:

aws configure

### Preparation

1. Add variables to AWS Systems Manager Parameter Store:

aws ssm put-parameter --name "/token" --value "your_github_token" --type "SecureString"
aws ssm put-parameter --name "/DynamicId" --value "your_dynamic_environment_id" --type "String"

2. Enable deploy in organization GitHub repository (Settings → Actions )

### Deploy

cd infra
sam build
sam deploy --guided

When running `sam deploy --guided` enter:
- Stack Name: `web3-app`
- AWS Region: `us-east-1` (or your region)
- Token: (leave empty, will use Parameter Store)
- DynamicId: (leave empty, will use Parameter Store)
- RepositoryUrl: `github.com/your-org/your-repo.git` (your GitHub repository)
- Confirm changes: `y`

### After Successful Deploy

You will get outputs:
- `AmplifyURL` - Frontend application URL
- `BackendUrl` - API Gateway URL for backend
- `RunJobCommand` - Command for first frontend deploy

### First Frontend Deploy

Run command from `RunJobCommand` output:

aws amplify start-job --app-id <app-id> --branch-name main --job-type RELEASE

Or push to GitHub repo - Amplify will deploy automatically.

**Deploy take ~5 minutes**


## Trade-offs

EC2 instead of ECS/Fargate - Simple for demo. For production better to use ECS Fargate with ECR for Docker images - automatic scaling, no server management, better ALB integration.

Single EC2 instance - Simple for demo but no high availability. For production need Load Balancer + Auto Scaling Group with minimum 2 instances in different AZs.

LocalStorage instead of database - Simple for MVP but data lost on browser clear. For production need database.

In-memory backend - No persistence. For production add PostgreSQL.

Context API - Sufficient for this project. For larger app consider Redux.

Global rate limiting - For production implement per-user rate limiting.

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

For Production:
- Add database (PostgreSQL/RDS)
- User authentication and sessions
- Monitoring (CloudWatch)
- API documentation (Swagger)
- CI/CD pipeline
- Per-user rate limiting
- Secrets Manager instead of Parameter Store
- VPC with private subnets

Features:
- Support multiple wallet types (MetaMask, WalletConnect, Coinbase Wallet)
- Multi-factor authentication (MFA) for enhanced security

