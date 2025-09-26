import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@joblyn.com";
const ADMIN_PASSWORD = "admin123"; // Change to a secure password in production

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(
        "joblyn_loggedin",
        JSON.stringify({ type: "admin", name: "Admin", email })
      );
      navigate("/admin-panel");
    } else {
      setError("Invalid admin credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-joblyn-blue">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-joblyn-blue text-black px-6 py-2 rounded font-bold border border-joblyn-blue hover:bg-blue-700 transition-colors w-full"
        >
          Login
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;
