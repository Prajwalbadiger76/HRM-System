import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createHoliday, getHolidays, deleteHoliday } from "../controllers/holiday.controller.js";

const router = express.Router();

router.post("/", verifyToken, createHoliday);
router.get("/", verifyToken, getHolidays);
router.delete("/:id", verifyToken, deleteHoliday);

export default router;
