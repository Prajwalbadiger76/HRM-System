import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", verifyToken, getDashboardStats);

export default router;