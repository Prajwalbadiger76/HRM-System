import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Resignations = () => {
  const [resignations, setResignations] = useState([]);
  const [reason, setReason] = useState("");

  const fetchResignations = async () => {
    const res = await API.get("/resignations");
    setResignations(res.data);
  };

  const handleSubmit = async () => {
    await API.post("/resignations", { reason });
    setReason("");
    fetchResignations();
  };

  const handleAction = async (id, status) => {
    await API.put(`/resignations/${id}`, { status });
    fetchResignations();
  };

  useEffect(() => {
    fetchResignations();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Resignations</h1>

        <div className="flex gap-3 mb-4">
          <textarea
            placeholder="Reason for resignation"
            className="border p-2 w-64"
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resignations.map((r) => (
              <tr key={r._id}>
                <td className="p-2 border">{r.employeeId}</td>
                <td className="p-2 border">{r.reason}</td>
                <td className="p-2 border">{r.status}</td>
                <td className="p-2 border flex gap-2">
                  <button className="bg-green-600 text-white px-2 rounded" onClick={() => handleAction(r._id, "Approved")}>Approve</button>
                  <button className="bg-red-600 text-white px-2 rounded" onClick={() => handleAction(r._id, "Rejected")}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Resignations;
