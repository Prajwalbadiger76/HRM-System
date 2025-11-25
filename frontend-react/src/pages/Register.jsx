import "../styles/Register.css";
import { useState } from "react";
import API from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("FORM DATA:", form);
      await API.post("/auth/register", form);
      alert("Registered successfully!");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      alert(error.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center register-container">
      <div className="register-box bg-white shadow-xl">
        <h1 className="text-2xl font-bold register-title">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            className="register-input"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="register-input"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="register-input"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="register-input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white register-btn" id="register-btn"
          >
            Register
          </button>

            <p className="text-center text-sm text-gray-500 mt-2">
    Already have an account?{" "}
    <a href="/login" className="text-blue-600 font-semibold hover:underline">
      Login
    </a>
  </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
