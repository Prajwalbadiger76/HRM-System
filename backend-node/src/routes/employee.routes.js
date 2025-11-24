import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.get("/", verifyToken, getEmployees);
router.get("/:id", verifyToken, getEmployeeById);
router.post("/", verifyToken, upload.single("profilePic"), createEmployee);
router.put("/:id", verifyToken, upload.single("profilePic"), updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

export default router;
