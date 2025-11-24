import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Finance = () => {
  const [data, setData] = useState({});

  const fetchSummary = async () => {
    const res = await API.get("/finance/summary");
    setData(res.data);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-600 text-white p-4 rounded">
            <h2 className="text-lg font-bold">Total Employees</h2>
            <p className="text-3xl">{data.totalEmployees}</p>
          </div>

          <div className="bg-green-600 text-white p-4 rounded">
            <h2 className="text-lg font-bold">Total Salary Expense</h2>
            <p className="text-3xl">₹{data.totalSalaries}</p>
          </div>

          <div className="bg-red-600 text-white p-4 rounded">
            <h2 className="text-lg font-bold">Pending Leaves</h2>
            <p className="text-3xl">{data.pendingLeaves}</p>
          </div>
        </div>

        {/* Simple Chart Placeholder */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Payroll Chart</h2>
          <p>Chart placeholder (will integrate chart later)</p>
        </div>
      </div>
    </div>
  );
};

export default Finance;
