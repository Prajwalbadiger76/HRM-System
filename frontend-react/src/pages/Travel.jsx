import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Travel = () => {
  const [travel, setTravel] = useState([]);
  const [form, setForm] = useState({});

  const fetchData = async () => {
    const res = await API.get("/travel");
    setTravel(res.data);
  };

  const handleCreate = async () => {
    await API.post("/travel", form);
    setForm({});
    fetchData();
  };

  const handleStatus = async (id, status) => {
    await API.put(`/travel/${id}`, { status });
    fetchData();
  };

  const handleDelete = async (id) => {
    await API.delete(`/travel/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Travel Requests</h1>

        <div className="flex gap-3 mb-4">
          <input type="text" placeholder="Employee ID" className="border p-2"
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />

          <input type="text" placeholder="Destination" className="border p-2"
            onChange={(e) => setForm({ ...form, destination: e.target.value })} />

          <input type="date" className="border p-2"
            onChange={(e) => setForm({ ...form, travelDate: e.target.value })} />

          <input type="date" className="border p-2"
            onChange={(e) => setForm({ ...form, returnDate: e.target.value })} />

          <input type="text" placeholder="Reason" className="border p-2"
            onChange={(e) => setForm({ ...form, reason: e.target.value })} />

          <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Destination</th>
              <th className="p-2 border">Travel</th>
              <th className="p-2 border">Return</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {travel.map((t) => (
              <tr key={t._id}>
                <td className="p-2 border">{t.employeeId}</td>
                <td className="p-2 border">{t.destination}</td>
                <td className="p-2 border">{t.travelDate}</td>
                <td className="p-2 border">{t.returnDate}</td>
                <td className="p-2 border">{t.status}</td>
                <td className="p-2 border flex gap-2">
                  <button className="bg-blue-600 text-white px-2 rounded" onClick={() => handleStatus(t._id, "Approved")}>Approve</button>
                  <button className="bg-yellow-600 text-white px-2 rounded" onClick={() => handleStatus(t._id, "Rejected")}>Reject</button>
                  <button className="bg-red-600 text-white px-2 rounded" onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Travel;
