import Sidebar from "../components/Sidebar";
import API from "../services/api";

const Settings = () => {

  const handleBackup = async () => {
    try {
      await API.get("/db/backup");
      alert("Backup completed successfully!");
    } catch (error) {
      alert("Backup failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Database Backup & Restore</h1>

        <button
          onClick={handleBackup}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Backup Database
        </button>
      </div>
    </div>
  );
};

export default Settings;
