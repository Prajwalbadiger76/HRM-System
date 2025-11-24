import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({});

  const fetchAssets = async () => {
    const res = await API.get("/assets");
    setAssets(res.data);
  };

  const handleCreate = async () => {
    await API.post("/assets", form);
    setForm({});
    fetchAssets();
  };

  const handleReturn = async (id) => {
    await API.put(`/assets/return/${id}`);
    fetchAssets();
  };

  const handleDelete = async (id) => {
    await API.delete(`/assets/${id}`);
    fetchAssets();
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-4">Assets</h1>

        <div className="flex gap-3 mb-4">
          <input type="text" placeholder="Asset Name" className="border p-2"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="text" placeholder="Employee ID" className="border p-2"
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} />
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
            Assign
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Asset</th>
              <th className="p-2 border">Assigned To</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a._id}>
                <td className="p-2 border">{a.name}</td>
                <td className="p-2 border">{a.assignedTo}</td>
                <td className="p-2 border">{a.status}</td>
                <td className="p-2 border flex gap-2">
                  <button className="bg-blue-600 text-white px-2 rounded" onClick={() => handleReturn(a._id)}>
                    Return
                  </button>
                  <button className="bg-red-600 text-white px-2 rounded" onClick={() => handleDelete(a._id)}>
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

export default Assets;
