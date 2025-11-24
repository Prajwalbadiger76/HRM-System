import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    gender: String,
    dob: String,
    maritalStatus: String,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    designation: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    salary: {
     type: Number,
     default: 30000
    },
    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },
    documents: [
      {
        type: {
          type: String,
        },
        fileUrl: String,
      },
    ],
    education: [
      {
        degree: String,
        college: String,
        year: Number,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        from: String,
        to: String,
      },
    ],
    salary: Number,
    joinDate: String,
    status: {
      type: String,
      default: "Active",
    },
    profilePic: String,
    role: {
      type: String,
      default: "employee",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
