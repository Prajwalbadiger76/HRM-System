import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getWarnings, createWarning, resolveWarning, deleteWarning } from "../controllers/warning.controller.js";

const router = express.Router();

router.get("/", verifyToken, getWarnings);
router.post("/", verifyToken, createWarning);
router.put("/resolve/:id", verifyToken, resolveWarning);
router.delete("/:id", verifyToken, deleteWarning);

export default router;
