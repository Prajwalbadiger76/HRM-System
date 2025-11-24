import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({});

  const fetchPromotions = async () => {
    const res = await API.get("/promotions");
    setPromotions(res.data);
  };

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  const handleCreate = async () => {
    await API.post("/promotions", form);
    setForm({});
    fetchPromotions();
  };

  const handleDelete = async (id) => {
    await API.delete(`/promotions/${id}`);
    fetchPromotions();
  };

  useEffect(() => {
    fetchEmployees();
    fetchPromotions();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Promotions</h1>

        <div className="flex gap-3 mb-4">

          {/* Employee Dropdown */}
          <select
            className="border p-2"
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName} {emp.lastName} ({emp.empId})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="New Role"
            className="border p-2"
            onChange={(e) => setForm({ ...form, newRole: e.target.value })}
          />

          <input
            type="number"
            placeholder="New Salary"
            className="border p-2"
            onChange={(e) => setForm({ ...form, newSalary: e.target.value })}
          />

          <textarea
            placeholder="Reason"
            className="border p-2"
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Promote
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Old Role</th>
              <th className="p-2 border">New Role</th>
              <th className="p-2 border">Old Salary</th>
              <th className="p-2 border">New Salary</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {promotions.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">{p.employeeId}</td>
                <td className="p-2 border">{p.oldRole}</td>
                <td className="p-2 border">{p.newRole}</td>
                <td className="p-2 border">{p.oldSalary}</td>
                <td className="p-2 border">{p.newSalary}</td>
                <td className="p-2 border">
                  <button
                    className="bg-red-600 text-white px-2 rounded"
                    onClick={() => handleDelete(p._id)}
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

export default Promotions;
