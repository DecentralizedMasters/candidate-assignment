
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install 
COPY . .
RUN npm test
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --production
COPY --from=builder /app/dist ./dist
CMD ["npm", "run", "start"]