import express from "express";
import { upload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";
import { uploadFile, getFiles, deleteFile } from "../controllers/file.controller.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("file"), uploadFile);
router.get("/", verifyToken, getFiles);
router.delete("/:id", verifyToken, deleteFile);

export default router;
