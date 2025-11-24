import Travel from "../models/travel.model.js";

export const getTravel = async (req, res) => {
  try {
    const list = await Travel.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTravel = async (req, res) => {
  try {
    const travel = await Travel.create(req.body);
    res.status(201).json({ message: "Travel request submitted", travel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTravelStatus = async (req, res) => {
  try {
    const updated = await Travel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ message: "Status updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTravel = async (req, res) => {
  try {
    await Travel.findByIdAndDelete(req.params.id);
    res.json({ message: "Travel entry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
