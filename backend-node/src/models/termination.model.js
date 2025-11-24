import mongoose from "mongoose";

const terminationSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  reason: { type: String, required: true },
  terminatedBy: { type: String, required: true },   // admin
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Terminated" }   // Terminated / Revoked
});

export default mongoose.model("Termination", terminationSchema);
