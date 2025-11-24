import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getAssets, createAsset, returnAsset, deleteAsset } from "../controllers/asset.controller.js";

const router = express.Router();

router.get("/", verifyToken, getAssets);
router.post("/", verifyToken, createAsset);
router.put("/return/:id", verifyToken, returnAsset);
router.delete("/:id", verifyToken, deleteAsset);

export default router;
