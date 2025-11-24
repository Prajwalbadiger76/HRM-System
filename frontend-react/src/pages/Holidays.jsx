import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({});

  const fetchHolidays = async () => {
    try {
      const res = await API.get("/holidays");
      setHolidays(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await API.post("/holidays", form);
      setForm({});
      fetchHolidays();
    } catch (error) {
      alert("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/holidays/${id}`);
      fetchHolidays();
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Holidays</h1>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Holiday Name"
            className="border p-2"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="date"
            className="border p-2"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
            Add
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Holiday</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {holidays.map((h) => (
              <tr key={h._id}>
                <td className="p-2 border">{h.name}</td>
                <td className="p-2 border">{h.date}</td>
                <td className="p-2 border">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(h._id)}
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

export default Holidays;
