import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { backupDatabase } from "../controllers/backup.controller.js";

const router = express.Router();

router.get("/backup", verifyToken, backupDatabase);

export default router;
