import Shift from "../models/shift.model.js";

export const getShifts = async (req, res) => {
  try {
    const list = await Shift.find().sort({ date: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).json({ message: "Shift assigned", shift });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShift = async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.id);
    res.json({ message: "Shift deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
