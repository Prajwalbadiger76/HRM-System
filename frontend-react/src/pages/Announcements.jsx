import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({});

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get("/announcements");
      setAnnouncements(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await API.post("/announcements", form);
      setForm({});
      fetchAnnouncements();
    } catch (error) {
      alert("Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Announcements</h1>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-1/3"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Message"
            className="border p-2 w-1/2"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
            Publish
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a._id}>
                <td className="p-2 border">{a.title}</td>
                <td className="p-2 border">{a.message}</td>
                <td className="p-2 border">{new Date(a.createdAt).toLocaleDateString()}</td>
                <td className="p-2 border">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(a._id)}
                  >
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

export default Announcements;
