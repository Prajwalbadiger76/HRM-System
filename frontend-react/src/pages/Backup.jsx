import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Backup = () => {
  const [message, setMessage] = useState("");

  const handleBackup = async () => {
    try {
      const res = await API.post("/backup");
      setMessage(res.data.message);
      alert("Backup created successfully!");
    } catch (err) {
      console.error("BACKUP ERROR:", err.response?.data || err.message);
      alert("Backup failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Database Backup</h1>

        <div className="bg-white shadow-md p-6 rounded-xl max-w-xl">
          <p className="text-gray-700 mb-4">
            Click the button below to create a backup of the MongoDB database.
          </p>

          <button
            onClick={handleBackup}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Create Backup
          </button>

          {message && (
            <p className="mt-4 text-green-600 font-semibold">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Backup;
