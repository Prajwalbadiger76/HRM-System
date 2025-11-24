import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createComplaint, getComplaints, resolveComplaint, deleteComplaint } from "../controllers/complaint.controller.js";

const router = express.Router();

router.post("/", verifyToken, createComplaint);
router.get("/", verifyToken, getComplaints);
router.put("/resolve/:id", verifyToken, resolveComplaint);
router.delete("/:id", verifyToken, deleteComplaint);

export default router;
