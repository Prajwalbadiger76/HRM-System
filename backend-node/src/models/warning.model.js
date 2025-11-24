import mongoose from "mongoose";

const warningSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Active" },  // Active / Resolved
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Warning", warningSchema);
