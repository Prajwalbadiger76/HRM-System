import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Terminations = () => {
  const [terminations, setTerminations] = useState([]);
  const [form, setForm] = useState({});

  const fetchData = async () => {
    const res = await API.get("/terminations");
    setTerminations(res.data);
  };

  const handleCreate = async () => {
    await API.post("/terminations", form);
    setForm({});
    fetchData();
  };

  const handleUpdate = async (id, status) => {
    await API.put(`/terminations/${id}`, { status });
    fetchData();
  };

  const handleDelete = async (id) => {
    await API.delete(`/terminations/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-4">Terminations</h1>

        <div className="flex gap-3 mb-4">
          <input type="text" placeholder="Employee ID" className="border p-2"
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />

          <textarea placeholder="Reason" className="border p-2"
            onChange={(e) => setForm({ ...form, reason: e.target.value })} />

          <button className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}>
            Terminate
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
            {terminations.map((t) => (
              <tr key={t._id}>
                <td className="p-2 border">{t.employeeId}</td>
                <td className="p-2 border">{t.reason}</td>
                <td className="p-2 border">{t.status}</td>
                <td className="p-2 border flex gap-2">
                  <button className="bg-blue-600 text-white px-2 rounded"
                    onClick={() => handleUpdate(t._id, "Revoked")}>
                    Revoke
                  </button>
                  <button className="bg-red-600 text-white px-2 rounded"
                    onClick={() => handleDelete(t._id)}>
                    Delete
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

export default Terminations;

