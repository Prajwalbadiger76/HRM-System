import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { submitResignation, getResignations, updateResignation } from "../controllers/resignation.controller.js";

const router = express.Router();

router.get("/", verifyToken, getResignations);
router.post("/", verifyToken, submitResignation);
router.put("/:id", verifyToken, updateResignation);

export default router;
