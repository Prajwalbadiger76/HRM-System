import mongoose from "mongoose";

const resignationSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending / Approved / Rejected
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Resignation", resignationSchema);
