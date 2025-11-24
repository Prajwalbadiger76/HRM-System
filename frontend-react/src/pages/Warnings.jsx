import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Warnings = () => {
  const [warnings, setWarnings] = useState([]);
  const [form, setForm] = useState({});

  const fetchWarnings = async () => {
    const res = await API.get("/warnings");
    setWarnings(res.data);
  };

  const handleCreate = async () => {
    await API.post("/warnings", form);
    setForm({});
    fetchWarnings();
  };

  const handleResolve = async (id) => {
    await API.put(`/warnings/resolve/${id}`);
    fetchWarnings();
  };

  const handleDelete = async (id) => {
    await API.delete(`/warnings/${id}`);
    fetchWarnings();
  };

  useEffect(() => {
    fetchWarnings();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Warnings</h1>

        <div className="flex gap-3 mb-4">
          <input type="text" placeholder="Employee ID" className="border p-2"
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />

          <input type="text" placeholder="Title" className="border p-2"
            onChange={(e) => setForm({ ...form, title: e.target.value })} />

          <textarea placeholder="Message" className="border p-2"
            onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
            Issue
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warnings.map((w) => (
              <tr key={w._id}>
                <td className="p-2 border">{w.employeeId}</td>
                <td className="p-2 border">{w.title}</td>
                <td className="p-2 border">{w.message}</td>
                <td className="p-2 border">{w.status}</td>
                <td className="p-2 border flex gap-2">
                  <button className="bg-green-600 text-white px-2 rounded" onClick={() => handleResolve(w._id)}>Resolve</button>
                  <button className="bg-red-600 text-white px-2 rounded" onClick={() => handleDelete(w._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Warnings;
