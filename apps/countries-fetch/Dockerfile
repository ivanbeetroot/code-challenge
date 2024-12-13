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
RUN npm run build countries-fetch

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /usr/src/app
RUN apk add --no-cache curl

# Copy only the compiled output for countries-fetch and the minimal necessary files
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
# For npm 7+ you can use `--omit=dev` to skip devDependencies:
RUN npm ci --omit=dev

#RUN crontab -r -u node && \
#    echo "30 2 * * * CLI_PATH=/usr/src/app/dist/apps/countries-fetch/apps/countries-fetch/src/cli.js /usr/src/app/node_modules/.bin/nestjs-command countries:fetch" > /tmp/node_cron && \
#    crontab -u node /tmp/node_cron && \
#    rm /tmp/node_cron

# If using npm 6 or older, you could do:
# RUN npm ci && npm prune --production

# Expose the NestJS default port
EXPOSE 3000

CMD CLI_PATH=/usr/src/app/dist/apps/countries-fetch/apps/countries-fetch/src/cli.js /usr/src/app/node_modules/.bin/nestjs-command countries:fetch && node ./dist/apps/countries-fetch/apps/countries-fetch/src/main.js
