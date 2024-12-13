# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy root package files and lock file
COPY package*.json ./

# Install dependencies (including devDependencies) for the entire monorepo
# Using `npm ci` ensures a clean and reproducible install based on package-lock.json
RUN npm ci

# Copy the entire monorepo source
COPY . .

# Build all apps and libs
RUN npm run build countries-api && npm run build database

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /usr/src/app
RUN apk add --no-cache curl

# Copy only the compiled output for countries-api and the minimal necessary files
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
# For npm 7+ you can use `--omit=dev` to skip devDependencies:
RUN npm ci --omit=dev

# If using npm 6 or older, you could do:
# RUN npm ci && npm prune --production

# Expose the NestJS default port
EXPOSE 3000
USER node
CMD ./node_modules/.bin/typeorm -d dist/libs/database/database.config.js migration:run && node dist/apps/countries-api/apps/countries-api/src/main.js
