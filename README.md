# How to Execute the App Locally

## Prerequisites
- Docker
- Docker Compose
- Node.js
- npm
- PostgreSQL

## Example `.env` File
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=secret_password
DATABASE_NAME=countries_api_db
DATABASE_SYNCHRONIZE=false
AUTH0_DOMAIN=dev-pj1zxl64trws11nn.eu.auth0.com
AUTH0_AUDIENCE=code-challenge
```

## Starting Locally with Docker Compose
To start the application using Docker Compose, execute the following steps:

1. Navigate to the root folder of the project.
2. Run the command below:
   ```bash
   docker compose up -d --build --force-recreate
   ```

> **Note:** The `docker-compose.yml` file contains default database variables, but you can customize them in the `.env` file. By default, the `.env` file is automatically loaded when running the `docker compose` command.

After the command completes, the app will be accessible at: [http://localhost:3000](http://localhost:3000).

### Testing the Countries Endpoint
API documentation is available at: [http://localhost:3000/api](http://localhost:3000/api).

To test the endpoints:
1. Click the **Authorize** button.
2. Paste the test token provided below(Valid for 1 month):

```text
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNYZzJpa1dYTl9rUTMyNUxHVXY5NCJ9.eyJpc3MiOiJodHRwczovL2Rldi1wajF6eGw2NHRyd3MxMW5uLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJRM1ljM29jVkxFV29VeE5XSVVVanBUNWgzekJtaG1EQkBjbGllbnRzIiwiYXVkIjoiY29kZS1jaGFsbGVuZ2UiLCJpYXQiOjE3MzQxMDc0ODQsImV4cCI6MTczNjY5OTQ4NCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiUTNZYzNvY1ZMRVdvVXhOV0lVVWpwVDVoM3pCbWhtREIifQ.YF8qRnDc_jzmDUSUlqjf_29B_8q3bhHQHOITYlOaPlK-WCXirEuZwDNHc4HUYDm03PkHnJIFJq1TPZ8eAEKoVRU3zNp8nmXq7_jvVFg_yDtXqfD1mJqWBwRh6qBXcgqtsYnPdyYfhX7GV7kqD9uOQCfV8WpvFNI408YezMaula4vixvjmmzade8tW1RJg3W7TEDasab8j98WCKBihrXLGVSnTzw6DMZnohnL5Np4D4T56YMU02MyODDayDMHNA80lr0O69906R7wb2ykHUT-R8zqvtzPrAxREv2U7iH6h23LbqHLZclpHBNw1umO2wCXxoA9gZ1fFsGHLjDr5HwtRA
```

### Stopping the App
To stop the application, run the following command:
```bash
docker compose down
```

## Starting Locally with Node.js

1. Create a `.env` file with the content provided in the example above.
2. If the test database is not running, start it using Docker Compose:
   ```bash
   docker compose up -d db --force-recreate
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Run the database migrations and seed the data:
   ```bash
   npm run migration:run
   ```
5. Start the application:
   ```bash
   npm run start
   ```

### Running the Fetch Countries Task via CLI
To fetch countries, use the CLI command:
```bash
npm run cli countries:fetch
```

For testing endpoints, refer to the instructions in the [Testing the Countries Endpoint](#testing-the-countries-endpoint) section.

## Additional Notes

- **Cron Job Implementation:**
  - Scheduled using the `@nestjs/schedule` package to run daily at 2:30 AM.
  - An alternative cron job is included in the Docker image build but is commented out in the `Dockerfile`.

- **Database Optimization:**
  - The `name` field in the `countries` table is unique to prevent duplicate entries. It uses a gin index with trigram options for efficient case-insensitive searches with the `%` operator e.g. `%IL%` for `Israel`.

- **Cloud Deployment:**
  - The API app and Cron app were tested on AWS Lambda using the Serverless Framework.
  - The API app was deployed to AWS Lambda with API Gateway.
  - The Cron app was deployed to AWS Lambda with CloudWatch Event.
