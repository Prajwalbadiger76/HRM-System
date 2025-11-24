import Promotion from "../models/promotion.model.js";
import Employee from "../models/employee.model.js";

export const getPromotions = async (req, res) => {
  try {
    const list = await Promotion.find().sort({ date: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPromotion = async (req, res) => {
  try {
    const { employeeId, newRole, newSalary, reason } = req.body;

    const emp = await Employee.findById(employeeId);
    if (!emp) return res.status(404).json({ message: "Employee not found" });

    const oldRole = emp.role;
    const oldSalary = emp.salary ? Number(emp.salary) : 0;

    const promotion = await Promotion.create({
      employeeId,
      oldRole,
      newRole,
      oldSalary,
      newSalary: Number(newSalary),
      reason
    });

    emp.role = newRole;
    emp.salary = Number(newSalary);
    await emp.save();

    res.status(201).json({ message: "Promotion successful", promotion });

  } catch (error) {
  console.error("PROMOTION ERROR:", error);
  res.status(500).json({ message: "Promotion failed", details: error.message });
  }

};

export const deletePromotion = async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ message: "Promotion deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
