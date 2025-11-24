import Attendance from "../models/attendance.model.js";

export const punchIn = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({ employeeId, date: today });
    if (existing) return res.status(400).json({ message: "Already punched in today" });

    const record = await Attendance.create({
      employeeId,
      date: today,
      punchIn: new Date().toLocaleTimeString()
    });

    res.status(201).json({ message: "Punch In successful", record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const punchOut = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const record = await Attendance.findOne({ employeeId, date: today });

    if (!record) return res.status(400).json({ message: "Punch In not found" });
    if (record.punchOut) return res.status(400).json({ message: "Already punched out today" });

    record.punchOut = new Date().toLocaleTimeString();
    await record.save();

    res.status(200).json({ message: "Punch Out successful", record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const records = await Attendance.find({ employeeId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
