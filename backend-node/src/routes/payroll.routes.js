import express from "express";
import { processPayroll } from "../controllers/payroll.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/process", verifyToken, processPayroll);

export default router;
