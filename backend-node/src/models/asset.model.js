import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assignedTo: { type: String, required: true }, // employeeId
  status: { type: String, default: "Issued" },  // Issued / Returned
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Asset", assetSchema);
