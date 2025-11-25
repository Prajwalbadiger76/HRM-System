import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./src/routes/index.js";   // <--- Import here

import connectDB from "./src/config/db.js";
import leaveRoutes from "./src/routes/leave.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import fileRoutes from "./src/routes/file.routes.js";
import departmentRoutes from "./src/routes/department.routes.js";
import holidayRoutes from "./src/routes/holiday.routes.js";
import announcementRoutes from "./src/routes/announcement.routes.js";
import backupRoutes from "./src/routes/backup.routes.js";
import assetRoutes from "./src/routes/asset.routes.js";
import complaintRoutes from "./src/routes/complaint.routes.js";
import warningRoutes from "./src/routes/warning.routes.js";
import resignationRoutes from "./src/routes/resignation.routes.js";
import terminationRoutes from "./src/routes/termination.routes.js";

import promotionRoutes from "./src/routes/promotion.routes.js";

import financeRoutes from "./src/routes/finance.routes.js";
import shiftRoutes from "./src/routes/shift.routes.js";

import travelRoutes from "./src/routes/travel.routes.js";





dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routes);   // all routes come here
app.use("/api/leaves", leaveRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/db", backupRoutes);
app.use("/api/assets", assetRoutes);

app.use("/api/complaints", complaintRoutes);
app.use("/api/warnings", warningRoutes);

app.use("/api/resignations", resignationRoutes);
app.use("/api/terminations", terminationRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/travel", travelRoutes);

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
