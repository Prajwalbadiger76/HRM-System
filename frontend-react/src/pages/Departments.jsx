import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await API.post("/departments", { name });
      setName("");
      fetchDepartments();
    } catch (error) {
      alert("Failed to create");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Departments</h1>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            className="border p-2"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
            Add
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Department Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d._id}>
                <td className="p-2 border">{d.name}</td>
                <td className="p-2 border">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(d._id)}
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

export default Departments;
