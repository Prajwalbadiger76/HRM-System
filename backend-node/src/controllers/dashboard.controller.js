import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import Leave from "../models/leave.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const today = new Date().toISOString().split("T")[0];
    const presentToday = await Attendance.countDocuments({ date: today });

    const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
    const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
    const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });

    res.status(200).json({
      totalEmployees,
      presentToday,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
