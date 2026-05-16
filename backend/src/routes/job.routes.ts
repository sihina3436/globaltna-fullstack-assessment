import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} from "../controllers/job.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);

router.post("/", protect, createJob);
router.patch("/:id", protect, updateJobStatus);
router.delete("/:id", protect, deleteJob);

export default router;