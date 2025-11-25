import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import LeaveRequests from "./pages/LeaveRequests";

import FileManager from "./pages/FileManager";
import Departments from "./pages/Departments";

import Holidays from "./pages/Holidays";
import Announcements from "./pages/Announcements";

import Payroll from "./pages/Payroll";

import Settings from "./pages/Settings";
import Backup from "./pages/Backup";


import Assets from "./pages/Assets";
import Complaints from "./pages/Complaints";
import Warnings from "./pages/Warnings";

import Resignations from "./pages/Resignations";
import Terminations from "./pages/Terminations";
import Promotions from "./pages/Promotions";
import Finance from "./pages/Finance";
import Shifts from "./pages/Shifts";
import Travel from "./pages/Travel";
import Register from "./pages/Register";



function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/leave-requests" element={<LeaveRequests />} />
      <Route path="/file-manager" element={<FileManager />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/holidays" element={<Holidays />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/warnings" element={<Warnings />} />
      <Route path="/resignations" element={<Resignations />} />
      <Route path="/terminations" element={<Terminations />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/shifts" element={<Shifts />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/backup" element={<Backup />} />



    </Routes>
  );
}

export default App;
