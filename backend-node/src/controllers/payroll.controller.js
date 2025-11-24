import axios from "axios";

export const processPayroll = async (req, res) => {
  try {
    const employees = [
      {
        id: "EMP001",
        salary: 60000,
        workingDays: 30,
        presentDays: 28
      }
    ];

    const response = await axios.post("http://localhost:8081/api/payroll/process", { employees });

    res.status(200).json({
      message: "Payroll processed successfully",
      data: response.data
    });

  } catch (error) {
    console.log("Payroll Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Payroll processing failed",
      details: error.message
    });
  }
};
