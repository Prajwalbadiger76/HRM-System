import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getShifts, assignShift, deleteShift } from "../controllers/shift.controller.js";

const router = express.Router();

router.get("/", verifyToken, getShifts);
router.post("/", verifyToken, assignShift);
router.delete("/:id", verifyToken, deleteShift);

export default router;
