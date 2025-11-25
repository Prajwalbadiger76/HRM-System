import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();  // redirect hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful! Redirecting to login...");
      console.log("REGISTER RESPONSE:", response.data);

      // redirect to login after register success
      navigate("/login");

    } catch (error) {
      console.log("REGISTER ERROR:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2 className="register-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="register-input"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="register-input"
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="register-bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
