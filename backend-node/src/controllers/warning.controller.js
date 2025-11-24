import Warning from "../models/warning.model.js";

export const getWarnings = async (req, res) => {
  try {
    const list = await Warning.find().sort({ date: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWarning = async (req, res) => {
  try {
    const warning = await Warning.create(req.body);
    res.status(201).json({ message: "Warning issued", warning });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveWarning = async (req, res) => {
  try {
    await Warning.findByIdAndUpdate(req.params.id, { status: "Resolved" });
    res.json({ message: "Warning resolved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWarning = async (req, res) => {
  try {
    await Warning.findByIdAndDelete(req.params.id);
    res.json({ message: "Warning deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
