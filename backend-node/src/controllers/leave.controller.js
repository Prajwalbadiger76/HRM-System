import Leave from "../models/leave.model.js";

// APPLY LEAVE (with DSA - Greedy Interval Scheduling)
export const applyLeave = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { type, startDate, endDate, reason } = req.body;

    // Step 1: Fetch existing approved leaves for employee
    const existingLeaves = await Leave.find({ employeeId, status: "Approved" });

    // Step 2: Convert strings to dates & sort by end date  (Greedy approach)
    const sortedLeaves = existingLeaves.sort(
      (a, b) => new Date(a.endDate) - new Date(b.endDate)
    );

    let lastEnd = sortedLeaves.length > 0 ? new Date(sortedLeaves[0].endDate) : null;

    // Step 3: Detect conflict using Greedy interval check
    for (let i = 0; i < sortedLeaves.length; i++) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // If overlaps with any approved leave
      if (!(end < new Date(sortedLeaves[i].startDate) || start > new Date(sortedLeaves[i].endDate))) {
        return res.status(409).json({ message: "Leave conflict detected (DSA Applied)" });
      }
    }

    // Step 4: Create Leave if no conflict
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
