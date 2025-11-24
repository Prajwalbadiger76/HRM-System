import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending / Resolved
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Complaint", complaintSchema);
