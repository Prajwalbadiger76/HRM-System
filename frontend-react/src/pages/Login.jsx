import { useState } from "react";
import API from "../services/api";
import "../styles/Login.css";   // <-- add this import

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM DATA:", form);

    try {
      const res = await API.post("/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("LOGIN SUCCESS:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.employee));

      window.location.href = "/dashboard";
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="login-container flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="login-box bg-white shadow-lg p-8 rounded-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center login-title">HRM Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="login-input border p-2 w-full rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input border p-2 w-full rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" className="login-btn bg-blue-600 text-white py-2 w-full rounded-md font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
