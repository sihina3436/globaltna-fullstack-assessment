import express from "express";
import cors from "cors";
import jobRoutes from "../routes/job.routes";
import { errorHandler, notFound } from "../middleware/errorHandler";

const createTestApp = () => {
  // Create isolated Express app for testing
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Mount jobs routes on both paths
  // Tests will auto-detect which one exists
  app.use("/api/jobs", jobRoutes);
  app.use("/jobs", jobRoutes);
// Handle unknown routes (404)
  app.use(notFound);
  // Global error handling middleware
  app.use(errorHandler);

  return app;
};

export default createTestApp;