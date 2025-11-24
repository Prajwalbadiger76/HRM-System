import express from "express";
import { getFinanceSummary } from "../controllers/finance.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", verifyToken, getFinanceSummary);

export default router;
