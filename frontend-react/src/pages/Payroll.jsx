import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Payroll = () => {
  const [results, setResults] = useState([]);

  const handleProcess = async () => {
    try {
      const res = await API.post("/payroll/process");
      setResults(res.data.data.processedPayroll);
    } catch (error) {
      console.log("PAYROLL ERROR:", error.response?.data);
      alert("Payroll processing failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Payroll</h1>

        <button
          onClick={handleProcess}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Process Payroll
        </button>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{r.employeeId}</td>
                <td className="p-2 border">{r.netSalary.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Payroll;
