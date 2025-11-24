import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({});

  const fetchComplaints = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  const handleCreate = async () => {
    await API.post("/complaints", form);
    setForm({});
    fetchComplaints();
  };

  const handleResolve = async (id) => {
    await API.put(`/complaints/resolve/${id}`);
    fetchComplaints();
  };

  const handleDelete = async (id) => {
    await API.delete(`/complaints/${id}`);
    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Complaints</h1>

        <div className="flex gap-3 mb-4">
          <input type="text" placeholder="Title" className="border p-2"
            onChange={(e) => setForm({ ...form, title: e.target.value })} />

          <textarea placeholder="Message" className="border p-2 w-1/2"
            onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
            Submit
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id}>
                <td className="p-2 border">{c.employeeId}</td>
                <td className="p-2 border">{c.title}</td>
                <td className="p-2 border">{c.message}</td>
                <td className="p-2 border">{c.status}</td>
                <td className="p-2 border flex gap-2">
                  <button className="bg-green-600 text-white px-2 rounded" onClick={() => handleResolve(c._id)}>Resolve</button>
                  <button className="bg-red-600 text-white px-2 rounded" onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Complaints;
