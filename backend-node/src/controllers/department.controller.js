import Department from "../models/department.model.js";

export const createDepartment = async (req, res) => {
  try {
    const dept = await Department.create({ name: req.body.name });
    res.status(201).json({ message: "Department created", dept });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const all = await Department.find();
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
