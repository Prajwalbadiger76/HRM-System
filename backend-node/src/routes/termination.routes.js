import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getTerminations, createTermination, updateTermination, deleteTermination }
from "../controllers/termination.controller.js";

const router = express.Router();

router.get("/", verifyToken, getTerminations);
router.post("/", verifyToken, createTermination);
router.put("/:id", verifyToken, updateTermination);
router.delete("/:id", verifyToken, deleteTermination);

export default router;
