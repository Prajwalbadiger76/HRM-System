import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <p className="heading">HRM System</p>

      <nav className="flex flex-col space-y-2">

        <Link to="/dashboard" className="p-2 hover:bg-gray-700 rounded">Dashboard</Link>
        <Link to="/employees" className="p-2 hover:bg-gray-700 rounded">Employees</Link>
        <Link to="/attendance" className="p-2 hover:bg-gray-700 rounded">Attendance</Link>
        <Link to="/leaves" className="p-2 hover:bg-gray-700 rounded">Leaves</Link>
        <Link to="/payroll" className="p-2 hover:bg-gray-700 rounded">Payroll</Link>

        <Link to="/leave-requests" className="p-2 hover:bg-gray-700 rounded text-yellow-300 font-semibold">
          Leave Requests
        </Link>

        <Link to="/file-manager" className="p-2 hover:bg-gray-700 rounded">File Manager</Link>
        <Link to="/departments" className="p-2 hover:bg-gray-700 rounded">Departments</Link>
        <Link to="/holidays" className="p-2 hover:bg-gray-700 rounded">Holidays</Link>
        <Link to="/announcements" className="p-2 hover:bg-gray-700 rounded">Announcements</Link>

        <Link to="/settings" className="p-2 hover:bg-gray-700 rounded">Backup</Link>

        <Link to="/assets" className="p-2 hover:bg-gray-700 rounded">Assets</Link>
        <Link to="/complaints" className="p-2 hover:bg-gray-700 rounded">Complaints</Link>
        <Link to="/warnings" className="p-2 hover:bg-gray-700 rounded">Warnings</Link>
        <Link to="/resignations" className="p-2 hover:bg-gray-700 rounded">Resignations</Link>
        <Link to="/terminations" className="p-2 hover:bg-gray-700 rounded">Terminations</Link>
        <Link to="/promotions" className="p-2 hover:bg-gray-700 rounded">Promotions</Link>
        <Link to="/finance" className="p-2 hover:bg-gray-700 rounded">Finance</Link>
        <Link to="/shifts" className="p-2 hover:bg-gray-700 rounded">Shifts</Link>
        <Link to="/travel" className="p-2 hover:bg-gray-700 rounded">Travel</Link>

      </nav>
    </div>
  );
};

export default Sidebar;
