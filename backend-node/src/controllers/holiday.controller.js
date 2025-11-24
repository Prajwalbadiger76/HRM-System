import Holiday from "../models/holiday.model.js";

export const createHoliday = async (req, res) => {
  try {
    const h = await Holiday.create(req.body);
    res.status(201).json({ message: "Holiday Created", h });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHolidays = async (req, res) => {
  try {
    const list = await Holiday.find().sort({ date: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHoliday = async (req, res) => {
  try {
    await Holiday.findByIdAndDelete(req.params.id);
    res.json({ message: "Holiday Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
