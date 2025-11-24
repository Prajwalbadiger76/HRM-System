import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave
} from "../controllers/leave.controller.js";

const router = express.Router();

router.post("/", verifyToken, applyLeave);
router.get("/me", verifyToken, getMyLeaves);
router.get("/", verifyToken, getAllLeaves);

// Admin Actions
router.put("/:id/approve", verifyToken, approveLeave);
router.put("/:id/reject", verifyToken, rejectLeave);

export default router;
