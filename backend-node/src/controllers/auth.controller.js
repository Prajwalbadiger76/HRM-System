import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // Generate Auto empId safely
    const last = await Employee.findOne().sort({ createdAt: -1 });
    let empNumber = 1;

    if (last && last.empId) {
      empNumber = parseInt(last.empId.replace("EMP", "")) + 1;
    }

    const empId = `EMP${empNumber.toString().padStart(3, "0")}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({
      empId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "employee",
      status: "Active",
    });

    await employee.save();

    res.status(201).json({
      message: "Registered successfully",
      employee
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, employee.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token, employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
