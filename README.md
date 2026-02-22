# Users With Pet — Full-Stack Assignment

This repository contains a small full-stack solution for the “Users with Pet” coding assignment.

- **Backend**: Java 17, Spring Boot 3
- **Frontend**: React, TypeScript, Vite
- **APIs used**: `https://randomuser.me/`, `https://dog.ceo/dog-api/`

## Backend (Java — Spring Boot)

- Exposes `GET /api/users-with-pet`
- Calls:
  - **Random User API** to fetch user data
  - **Dog API** to fetch a random dog image per user
- Aggregates both into a single JSON array response:

```jsonc
[
  {
    "id": "7145588T",
    "gender": "male",
    "country": "FI",
    "name": "Kaylie Greenfelder",
    "email": "Greenfelder@hotmail.com",
    "dob": { "date": "1968-03-29T05:26:03.876Z", "age": 57 },
    "phone": "(743) 374-5564 x9928",
    "petImage": "https://images.dog.ceo/breeds/pariah-indian/The_Indian_Pariah_Dog.jpg"
  }
]
```

### Query parameters

- `count` (number, required, 1–50, default 5): number of users to fetch
- `nat` (string, optional): nationality filter passed directly to Random User API (e.g. `US`, `GB`, `FR`).

### Run backend locally

From the `backend` folder:

```bash
mvn spring-boot:run
```

The backend listens on `http://localhost:8080`.

## Frontend (React + TypeScript)

The frontend is a single-page app that:

- Calls the backend endpoint `GET /api/users-with-pet`
- Provides controls to:
  - Filter by nationality (All/US/GB/FR/DE/BR)
  - Specify the number of users to fetch
- Renders a responsive card grid showing each user with their paired dog image.

### Configuration

- The frontend uses `VITE_API_BASE_URL` to know where the backend lives.
  - **Local dev**: defaults to `http://localhost:8080`
  - **Docker**: set to `http://backend:8080` via Docker build args

### Run frontend locally

From the `frontend` folder:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Running everything with Docker (optional bonus)

You can run both services with a single command using Docker Compose.

From the project root:

```bash
docker compose up --build
```

- Backend: `http://localhost:8081` (mapped from container port 8080)
- Frontend (Nginx serving the built app): `http://localhost:3000`

The frontend Docker image is built with `VITE_API_BASE_URL=http://backend:8080` so that it can reach the backend via the internal Docker network.

### Troubleshooting Docker

**Port conflict error:**
If you see:
```
Error response from daemon: ports are not available: exposing port TCP 0.0.0.0:8080 -> 127.0.0.1:0: listen tcp 0.0.0.0:8080: bind: address already in use
```

This means port 8080 is already in use (likely by a local Spring Boot instance). Solutions:
1. **Stop the local backend**: Find and stop the process using port 8080
2. **Use Docker only**: The Docker setup uses port 8081 externally (as configured in `docker-compose.yml`)

**Docker Desktop not running:**
If you encounter errors like:
```
unable to get image 'aimo-test-backend': error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/...": The system cannot find the file specified.
```

**Solution**: This means Docker Desktop is not running. Please:
1. Start **Docker Desktop** application on Windows
2. Wait for it to fully start (check the system tray icon)
3. Verify Docker is running: `docker ps` should work without errors
4. Then retry: `docker compose up --build`

**Alternative**: If you don't have Docker Desktop installed or prefer not to use it, you can run the application locally:
- Backend: `cd backend && mvn spring-boot:run`
- Frontend: `cd frontend && npm install && npm run dev`

