import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";

export const getFinanceSummary = async (req, res) => {
  try {
    const employees = await Employee.find();
    const leaves = await Leave.find({ status: "Pending" });

    const totalSalaries = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);

    res.status(200).json({
      totalEmployees: employees.length,
      totalSalaries,
      pendingLeaves: leaves.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
