import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
      alert("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreateEmployee = async () => {
    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("empId", `EMP${Date.now()}`);  // Generate unique ID
    formData.append("role", "employee");           // Default role
    formData.append("status", "Active");           // Default status

    if (file) formData.append("profilePic", file);

    try {
      await API.post("/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowModal(false);
      setForm({});
      setFile(null);
      fetchEmployees();
    } catch (error) {
      console.log("CREATE EMPLOYEE ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to create employee");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees(); // reload list
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data || error.message);
      alert("Failed to delete employee");
    }
  };


const handleEditOpen = (employee) => {
  setEditMode(true);
  setEditId(employee._id);
  setForm({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.role,
    status: employee.status,
  });
  setShowModal(true);
};

const handleUpdateEmployee = async () => {
  const formData = new FormData();
  formData.append("firstName", form.firstName);
  formData.append("lastName", form.lastName);
  formData.append("email", form.email);
  formData.append("role", form.role);
  formData.append("status", form.status);

  if (file) formData.append("profilePic", file);

  try {
    await API.put(`/employees/${editId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setShowModal(false);
    setEditMode(false);
    setForm({});
    setFile(null);
    fetchEmployees();

  } catch (error) {
    console.log("UPDATE ERROR:", error.response?.data || error.message);
    alert("Failed to update employee");
  }
};


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          + Add Employee
        </button>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td className="p-2 border">{emp.firstName} {emp.lastName}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.role}</td>
                {/* <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td> */}
                <td className="p-2 border text-center flex gap-2 justify-center">
  <button
    onClick={() => handleEditOpen(emp)}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(emp._id)}
    className="bg-red-600 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Employee Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 space-y-3">
              <h2 className="text-xl font-bold">Add Employee</h2>

              <input
                type="text"
                placeholder="First Name"
                className="border p-2 w-full"
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 w-full"
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <input
                type="file"
                className="border p-2 w-full"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                {/* <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleCreateEmployee}
                >
                  Save
                </button> */}
                <button
  className="px-4 py-2 bg-green-600 text-white rounded"
  onClick={editMode ? handleUpdateEmployee : handleCreateEmployee}
>
  {editMode ? "Update" : "Save"}
</button>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Employees;
