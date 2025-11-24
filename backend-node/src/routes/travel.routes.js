import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getTravel, createTravel, updateTravelStatus, deleteTravel } from "../controllers/travel.controller.js";

const router = express.Router();

router.get("/", verifyToken, getTravel);
router.post("/", verifyToken, createTravel);
router.put("/:id", verifyToken, updateTravelStatus);
router.delete("/:id", verifyToken, deleteTravel);

export default router;
