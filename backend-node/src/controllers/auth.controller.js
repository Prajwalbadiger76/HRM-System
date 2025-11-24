import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // Generate auto empId
    const lastEmployee = await Employee.find().sort({ createdAt: -1 }).limit(1);
    let newEmpId = "EMP001";
    if (lastEmployee.length > 0) {
      const lastId = parseInt(lastEmployee[0].empId.replace("EMP", ""));
      newEmpId = `EMP${String(lastId + 1).padStart(3, "0")}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      empId: newEmpId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Employee registered successfully", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, employee.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token, employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
