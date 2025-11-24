import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";

// GET all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE employee with profile photo
export const createEmployee = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.profilePic = req.file.path;
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const emp = await Employee.create(data);
    res.status(201).json({ message: "Employee created", emp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE employee
export const updateEmployee = async (req, res) => {
  try {
    const updateData = req.body;

    // If file uploaded, update profile picture
    if (req.file) {
      updateData.profilePic = req.file.path;
    }

    // If password is provided, hash it before updating
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee updated", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE employee
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
