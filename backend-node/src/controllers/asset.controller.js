import Asset from "../models/asset.model.js";

export const getAssets = async (req, res) => {
  try {
    const list = await Asset.find();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json({ message: "Asset Added", asset });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const returnAsset = async (req, res) => {
  try {
    await Asset.findByIdAndUpdate(req.params.id, { status: "Returned" });
    res.json({ message: "Asset Returned" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: "Asset Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
