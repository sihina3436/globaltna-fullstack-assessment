# Service Request Board - NEXT.js

A full-stack web application where homeowners can post service requests and tradespeople can browse, filter, and manage them.

---

## Live Demo

| Service | URL |
|---|---|
| Frontend | https://globaltna-fullstack-assessment-iun4.vercel.app|
| Backend API | https://globaltna-fullstack-assessment.vercel.app |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (Mongoose ODM) |
| Testing | Jest, Supertest, mongodb-memory-server |
| Auth (bonus) | JSON Web Tokens (JWT), bcryptjs |

---
## Features

- Browse all open service requests on the home page
- Filter jobs by category and status
- Keyword search across title and description
- Post a new service request with client-side and server-side validation
- View full job details including contact information
- Update job status (Open → In Progress → Closed)
- Delete a job request
- JWT-based authentication — only logged-in users can post or delete jobs _(bonus task)_
- Seed script to populate the database with 10 sample jobs _(bonus task)_
- Unit tests for all API endpoints _(bonus task)_
- Applied Separation of Concerns (SoC) architecture by organizing the project into dedicated layers for controllers, routes, middleware, models, reusable UI components, hooks, API utilities, and feature-based modules to improve scalability, maintainability, and code readability.

---

## Project Structure

```text
globaltna-assessment/
├── backend/                    # Express REST API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── job.controller.ts
│   │   ├── middleware/
│   │   │   ├── __mocks__/
│   │   │   │   └── auth.ts     # Mock authentication for tests (Jest manual mock)
│   │   │   ├── auth.ts         # JWT protect middleware
│   │   │   └── errorHandler.ts # Global error handler
│   │   ├── models/
│   │   │   ├── JobRequest.model.ts   # Mongoose schema
│   │   │   └── User.model.ts         # Mongoose schema
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── job.routes.ts
│   │   ├── __tests__/
│   │   │   ├── jobs.test.ts    # Jest + Supertest tests
│   │   │   ├── setup.ts        # In-memory DB setup (mongodb-memory-server)
│   │   │   └── testApp.ts      # Express app factory used by tests
│   │   ├── index.ts            # Entry point
│   │   └── seed.ts             # Sample data seeder
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # Next.js App
    ├── app/
    │   ├── auth/
    │   │   ├── layout.tsx
    │   │   └── page.tsx        # Login / Register page
    │   ├── home/
    │   │   └── page.tsx
    │   ├── jobs/
    │   │   ├── new/
    │   │   │   └── page.tsx    # New job form
    │   │   └── [id]/
    │   │       └── page.tsx    # Job detail page
    │   ├── layout.tsx
    │   ├── page.tsx            # Home — job list
    │   └── globals.css
    ├── components/
    │   ├── ui/
    │   │   ├── Badge.tsx
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Input.tsx
    │   │   ├── Select.tsx
    │   │   └── Skeleton.tsx
    │   ├── ErrorMessage.tsx
    │   ├── Header.tsx
    │   ├── JobCard.tsx
    │   ├── JobForm.tsx
    │   ├── LoadingSpinner.tsx
    │   └── StatusBadge.tsx
    ├── feature/
    │   ├── auth/
    │   │   ├── components/
    │   │   │   └── authform.tsx
    │   │   └── hooks/
    │   │       └── useAuth.ts
    │   └── Job/
    │       ├── components/
    │       │   ├── JobDetailsCard.tsx
    │       │   ├── JobsFiltersBar.tsx
    │       │   └── JobGrid.tsx
    │       ├── hooks/
    │       │   ├── useJob.ts
    │       │   └── useJobQuery.ts
    │       └── constants.ts
    ├── lib/
    │   ├── api.ts              # All API call functions
    │   ├── auth.ts             # Token helpers
    │   └── auth-api.ts         # Auth API calls
    ├── types/
    │   └── job.ts              # Shared TypeScript interfaces
    ├── .env.local.example
    ├── package.json
    └── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A free MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sihina3436/globaltna-fullstack-assessment.git
cd  globaltna-fullstack-assessment
```
### 2. Configure environment variables

**Backend**

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in the values (see [Environment Variables](#environment-variables) below).

```bash
cd ../frontend
cp .env.local.example .env.local
```

The default value (`http://localhost:5000`) works for local development.
---

## Environment Variables

### Backend — `backend/.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | No | Port the Express server listens on | `5000` |
| `MONGO_URI` | **Yes** | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/globaltna?retryWrites=true&w=majority` |
| `FRONTEND_URL` | No | Allowed CORS origin | `http://localhost:3000` |
| `JWT_SECRET` | **Yes** | Secret used to sign JWT tokens | `some_long_random_string` |
| `JWT_EXPIRES_IN` | No | Token expiry duration | `7d` |


**How to get your MONGO_URI from Atlas:**

1. Sign in at https://cloud.mongodb.com and create a free M0 cluster
2. Click **Connect** → **Drivers** → select Node.js
3. Copy the connection string and replace `<password>` with your Atlas database user password
4. Append the database name before the `?`: `.../globaltna?retryWrites=...`
5. Go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)

### Frontend — `frontend/.env.local`

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | **Yes** | Base URL of the Express API | `http://localhost:5000` |

---

## Running the Project

Open **two terminals** and run each command in its own terminal.

**Terminal 1 — Backend**

```bash
cd backend
npm install
npm run dev
```

The API will be running at `http://localhost:5000`.

**Terminal 2 — Frontend**

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

---

---

## API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| GET | `/api/jobs` | No | List all jobs. Supports `?category=`, `?status=`, `?search=` |
| GET | `/api/jobs/:id` | No | Get a single job by ID |
| POST | `/api/jobs` | Yes (JWT) | Create a new job |
| PATCH | `/api/jobs/:id` | Yes (JWT) | Update job status |
| DELETE | `/api/jobs/:id` | Yes (JWT) | Delete a job |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive a JWT |

**Authentication header format:**

```
Authorization: Bearer <jwt_token>
```
---

## Running Tests

Tests use **Jest** + **Supertest** with an in-memory MongoDB instance — no real database connection is needed.

```bash
cd backend
npm test
```
---

## Seed Sample Data

To populate the database with 10 sample jobs:

```bash
cd backend
npm run seed
```
---

## Screenshots

### Login Page

<img src="./screenshots/login.png" alt="Login Page" width="700"/>

### Register Page

<img src="./screenshots/register.png" alt="Register Page" width="700"/>

### Home Page

<img src="./screenshots/serviceRequestPage.png" alt="Home Page" width="700"/>

### Job Detail Page

<img src="./screenshots/job.png" alt="Job Detail Page" width="700"/>

### New Job Form

<img src="./screenshots/createService.png" alt="New Job Form" width="700"/>


## Author

**Sihina Nimnada**

- Email: nimnadasihina@gmail.com
- GitHub: [sihina3436](https://github.com/sihina3436)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/feed/)
- Portfolio: [sihinanimnada.me](https://www.sihinanimnada.me)
