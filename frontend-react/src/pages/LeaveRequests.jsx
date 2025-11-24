import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchAllLeaves = async () => {
    try {
      const res = await API.get("/leaves");
      setLeaves(res.data);
    } catch (error) {
      console.log("LEAVES FETCH ERROR:", error.response?.data);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/leaves/${id}/approve`);
      fetchAllLeaves();
    } catch (error) {
      console.log("APPROVE ERROR:", error.response?.data);
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/leaves/${id}/reject`);
      fetchAllLeaves();
    } catch (error) {
      console.log("REJECT ERROR:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Leave Requests</h1>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Dates</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="p-2 border">
                  {leave.employeeId?.firstName} {leave.employeeId?.lastName}
                </td>
                <td className="p-2 border">{leave.type}</td>
                <td className="p-2 border">{leave.startDate} - {leave.endDate}</td>
                <td className="p-2 border">{leave.status}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleApprove(leave._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(leave._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default LeaveRequests;
