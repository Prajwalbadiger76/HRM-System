import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [form, setForm] = useState({});

  const fetchShifts = async () => {
    const res = await API.get("/shifts");
    setShifts(res.data);
  };

  const handleAssign = async () => {
    await API.post("/shifts", form);
    setForm({});
    fetchShifts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/shifts/${id}`);
    fetchShifts();
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Shifts</h1>

        <div className="flex gap-3 mb-4">
        
          <input type="text" placeholder="Employee ID"
            className="border p-2"
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })} />

          <select className="border p-2"
            onChange={(e) => setForm({ ...form, shiftType: e.target.value })}>
            <option value="">Shift Type</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>

          <input type="date" className="border p-2"
            onChange={(e) => setForm({ ...form, date: e.target.value })} />

          <input type="time" className="border p-2"
            onChange={(e) => setForm({ ...form, startTime: e.target.value })} />

          <input type="time" className="border p-2"
            onChange={(e) => setForm({ ...form, endTime: e.target.value })} />

          <button onClick={handleAssign} className="bg-green-600 text-white px-4 py-2 rounded">
            Assign
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Shift</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Start</th>
              <th className="p-2 border">End</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {shifts.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.employeeId}</td>
                <td className="p-2 border">{s.shiftType}</td>
                <td className="p-2 border">{s.date}</td>
                <td className="p-2 border">{s.startTime}</td>
                <td className="p-2 border">{s.endTime}</td>
                <td className="p-2 border">
                  <button className="bg-red-600 text-white px-2 rounded"
                    onClick={() => handleDelete(s._id)}>
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

export default Shifts;
