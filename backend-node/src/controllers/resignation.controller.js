import Resignation from "../models/resignation.model.js";

export const submitResignation = async (req, res) => {
  try {
    const resignation = await Resignation.create({ 
      ...req.body,
      employeeId: req.user.id 
    });

    res.status(201).json({ message: "Resignation submitted", resignation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResignations = async (req, res) => {
  try {
    const list = await Resignation.find().sort({ date: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResignation = async (req, res) => {
  try {
    await Resignation.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "Resignation updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
