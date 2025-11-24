import File from "../models/file.model.js";

export const uploadFile = async (req, res) => {
  try {
    const file = await File.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
      uploadedBy: req.user.id,
    });

    res.status(201).json({ message: "File uploaded", file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await File.find().populate("uploadedBy", "firstName lastName email");
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
