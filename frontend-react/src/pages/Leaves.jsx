import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({});

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves/me");
      setLeaves(res.data);
    } catch (error) {
      console.log("LEAVE FETCH ERROR:", error.response?.data);
    }
  };

  const handleApplyLeave = async () => {
    console.log("APPLY LEAVE DATA:", form);  // debug log

    if (!form.type || !form.startDate || !form.endDate) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await API.post("/leaves", form);
      console.log("APPLY LEAVE RESPONSE:", res.data); // debug log

      setShowModal(false);
      setForm({});
      fetchLeaves();
    } catch (error) {
      console.log("APPLY LEAVE ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Apply Leave Failed");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Leaves</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowModal(true)}
        >
          + Apply Leave
        </button>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Start</th>
              <th className="p-2 border">End</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="p-2 border">{leave.type}</td>
                <td className="p-2 border">{leave.startDate}</td>
                <td className="p-2 border">{leave.endDate}</td>
                <td className="p-2 border">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Apply Leave Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 space-y-3">
              <h2 className="text-xl font-bold">Apply Leave</h2>

              <select
                className="border p-2 w-full"
                value={form.type || ""}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Vacation Leave">Vacation Leave</option>
              </select>

              <input
                type="date"
                className="border p-2 w-full"
                value={form.startDate || ""}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />

              <input
                type="date"
                className="border p-2 w-full"
                value={form.endDate || ""}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />

              <textarea
                placeholder="Reason"
                className="border p-2 w-full"
                rows="3"
                value={form.reason || ""}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleApplyLeave}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Leaves;
