import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log("DASHBOARD ERROR", error.response?.data);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-200 rounded">Total Employees: {stats.totalEmployees}</div>
          <div className="p-4 bg-gray-200 rounded">Present Today: {stats.presentToday}</div>
          <div className="p-4 bg-gray-200 rounded">Pending Leaves: {stats.pendingLeaves}</div>
          <div className="p-4 bg-gray-200 rounded">Approved Leaves: {stats.approvedLeaves}</div>
          <div className="p-4 bg-gray-200 rounded">Rejected Leaves: {stats.rejectedLeaves}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
