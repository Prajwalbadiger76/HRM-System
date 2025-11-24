import express from "express";

import authRoutes from "./auth.routes.js";
import employeeRoutes from "./employee.routes.js";
// later we will add:
import attendanceRoutes from "./attendance.routes.js";
import leavesRoutes from "./leave.routes.js";
import payrollRoutes from "./payroll.routes.js";





const router = express.Router();

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leaves", leavesRoutes);
router.use("/payroll", payrollRoutes);


export default router;
