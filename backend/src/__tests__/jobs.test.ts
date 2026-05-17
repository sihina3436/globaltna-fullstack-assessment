import request from "supertest";

// Mock authentication middleware
// This prevents protected routes from returning 401 during tests
jest.mock("../middleware/auth");

import { connect, disconnect, clearDB } from "./setup";
import createTestApp from "./testApp";

// Create test Express app
const app = createTestApp();

// Connect to in-memory MongoDB before all tests
beforeAll(async () => {
  await connect();
});

// Disconnect and cleanup after all tests
afterAll(async () => {
  await disconnect();
});

// Clear database before each test
beforeEach(async () => {
  await clearDB();
});

// Sample job object
const sampleJob = {
  title: "Fix leaking tap",
  description: "Kitchen cold tap dripping constantly",
  category: "Plumbing",
  location: "Test Location",
  contactName: "Test",
  contactEmail: "Test@example.com",
};

// Detect whether routes are mounted on /api/jobs or /jobs
async function detectBasePath() {
  const bases = ["/api/jobs", "/jobs"];

  for (const base of bases) {
    const res = await request(app).get(base);
    // if mounted, route should not be 404 (likely 200 or 401)
    if (res.status !== 404) return base;
  }

  throw new Error(
    "Jobs routes are not mounted. Check src/__tests__/testApp.ts and src/routes/job.routes.ts"
  );
}

describe("Jobs API (minimal)", () => {
  let base = "/api/jobs";
 // Detect correct route before tests run
  beforeAll(async () => {
    base = await detectBasePath();
  });
  
  // Test creating a new job
  it("POST creates a job and returns 201", async () => {
    const res = await request(app).post(base).send(sampleJob);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data?._id).toBeDefined();
    expect(res.body.data.title).toBe(sampleJob.title);
  });

  // Test fetching all jobs
  it("GET returns array + count", async () => {
    await request(app).post(base).send(sampleJob);

    const res = await request(app).get(base);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBe(1);
  });

  // Test fetching a single job by ID
  it("GET /:id returns the created job", async () => {
    const created = await request(app).post(base).send(sampleJob);
    expect(created.status).toBe(201);

    const id = created.body.data._id;

    const res = await request(app).get(`${base}/${id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(id);
  });

  // Test deleting a job
  it("DELETE /:id deletes the job (then GET returns 404)", async () => {
    const created = await request(app).post(base).send(sampleJob);
    expect(created.status).toBe(201);

    const id = created.body.data._id;

    const delRes = await request(app).delete(`${base}/${id}`);
    expect(delRes.status).toBe(200);

    const getRes = await request(app).get(`${base}/${id}`);
    expect(getRes.status).toBe(404);
  });
});