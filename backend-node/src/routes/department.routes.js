import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createDepartment, getDepartments, deleteDepartment } from "../controllers/department.controller.js";

const router = express.Router();

router.post("/", verifyToken, createDepartment);
router.get("/", verifyToken, getDepartments);
router.delete("/:id", verifyToken, deleteDepartment);

export default router;
