import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.post("/", verifyToken, createAnnouncement);
router.get("/", verifyToken, getAnnouncements);
router.delete("/:id", verifyToken, deleteAnnouncement);

export default router;
