FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build Medusa
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/medusa-config.ts ./
COPY --from=builder /app/static ./static

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 9000

# Start Medusa
CMD ["npm", "run", "start"]
