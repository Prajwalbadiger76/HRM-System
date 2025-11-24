import Leave from "../models/leave.model.js";

// APPLY LEAVE
export const applyLeave = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { type, startDate, endDate, reason } = req.body;

    const conflicts = await Leave.find({
      employeeId,
      status: "Approved",
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });

    if (conflicts.length > 0) {
      return res.status(409).json({ message: "Leave conflict detected" });
    }

    const leave = await Leave.create({
      employeeId,
      type,
      startDate,
      endDate,
      reason
    });

    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE or REJECT
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, approverId } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status, approverId },
      { new: true }
    );

    res.status(200).json({ message: `Leave ${status}`, leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIST ALL LEAVES FOR LOGGED IN USER


export const getMyLeaves = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const leaves = await Leave.find({ employeeId }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADMIN: Get all leaves

// export const getAllLeaves = async (req, res) => {
//   try {
//     const leaves = await Leave.find();
//     res.status(200).json(leaves);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId", "firstName lastName email");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: "Approved" }, { new: true });
    res.json({ message: "Leave Approved", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: "Rejected" }, { new: true });
    res.json({ message: "Leave Rejected", leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
