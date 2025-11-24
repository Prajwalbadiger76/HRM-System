import Termination from "../models/termination.model.js";

export const getTerminations = async (req, res) => {
  try {
    const list = await Termination.find().sort({ date: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTermination = async (req, res) => {
  try {
    const data = {
      ...req.body,
      terminatedBy: req.user.id
    };

    const termination = await Termination.create(data);
    res.status(201).json({ message: "Employee terminated", termination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTermination = async (req, res) => {
  try {
    await Termination.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "Termination status updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTermination = async (req, res) => {
  try {
    await Termination.findByIdAndDelete(req.params.id);
    res.json({ message: "Termination removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
