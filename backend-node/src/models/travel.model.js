import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  destination: { type: String, required: true },
  travelDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Travel", travelSchema);
