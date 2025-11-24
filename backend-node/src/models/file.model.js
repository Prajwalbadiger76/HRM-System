import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
