import Complaint from "../models/complaint.model.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({ ...req.body, employeeId: req.user.id });
    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const list = await Complaint.find().sort({ date: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(req.params.id, { status: "Resolved" });
    res.json({ message: "Complaint resolved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
