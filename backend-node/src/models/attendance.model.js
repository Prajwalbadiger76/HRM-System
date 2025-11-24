import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: String, required: true },
    punchIn: String,
    punchOut: String,
    status: { type: String, default: "Present" }
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
