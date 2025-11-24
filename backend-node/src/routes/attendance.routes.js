import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  punchIn,
  punchOut,
  getAttendance
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/punch-in", verifyToken, punchIn);
router.post("/punch-out", verifyToken, punchOut);
router.get("/me", verifyToken, getAttendance);

export default router;
