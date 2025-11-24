import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  oldRole: { type: String, required: true },
  newRole: { type: String, required: true },
  salary: { type: Number, default: 0 },
  oldSalary: { type: Number, required: true },
  newSalary: { type: Number, required: true },
  reason: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Promotion", promotionSchema);
