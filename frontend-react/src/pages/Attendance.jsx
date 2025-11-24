import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance/me");
      setRecords(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error.response?.data || error.message);
    }
  };

  const handlePunchIn = async () => {
    setLoading(true);
    try {
      await API.post("/attendance/punch-in");
      fetchAttendance();
    }
    catch (error) {
  console.log("PUNCH IN ERROR:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Punch In failed");
}
 
     finally {
      setLoading(false);
    }
  };

  const handlePunchOut = async () => {
    setLoading(true);
    try {
      await API.post("/attendance/punch-out");
      fetchAttendance();
    } 
    catch (error) {
  console.log("PUNCH OUT ERROR:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Punch Out failed");
}

    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Attendance</h1>

        <div className="flex gap-4 mb-6">
          <button onClick={handlePunchIn} className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>
            Punch In
          </button>
          <button onClick={handlePunchOut} className="px-4 py-2 bg-red-600 text-white rounded" disabled={loading}>
            Punch Out
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Punch In</th>
              <th className="p-2 border">Punch Out</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec._id}>
                <td className="p-2 border">{new Date(rec.date).toLocaleDateString()}</td>
                <td className="p-2 border">{rec.punchIn || "-"}</td>
                <td className="p-2 border">{rec.punchOut || "-"}</td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Attendance;
