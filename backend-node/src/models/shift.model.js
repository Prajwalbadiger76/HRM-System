import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  shiftType: { type: String, required: true }, // Morning, Evening, Night
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, default: "Scheduled" }
});

export default mongoose.model("Shift", shiftSchema);
