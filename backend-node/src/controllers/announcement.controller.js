import Announcement from "../models/announcement.model.js";

export const createAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.create(req.body);
    res.status(201).json({ message: "Announcement Created", ann });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const list = await Announcement.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
