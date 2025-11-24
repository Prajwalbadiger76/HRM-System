import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPromotions, createPromotion, deletePromotion } from "../controllers/promotion.controller.js";

const router = express.Router();

router.get("/", verifyToken, getPromotions);
router.post("/", verifyToken, createPromotion);
router.delete("/:id", verifyToken, deletePromotion);

export default router;
