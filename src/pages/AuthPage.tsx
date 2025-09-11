import React, { useState } from "react";

interface AuthPageProps {
  initialType: "jobseeker" | "employer";
}

const AuthPage: React.FC<AuthPageProps> = ({ initialType }) => {
  const [type, setType] = useState<"jobseeker" | "employer">(initialType);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function registerUser(type: string, username: string, password: string) {
    const key = type === "jobseeker" ? "joblyn_jobseekers" : "joblyn_employers";
    const users = JSON.parse(localStorage.getItem(key) || "[]");
    if (users.find((u: any) => u.username === username)) {
      return { success: false, message: "User already exists" };
    }
    users.push({ username, password });
    localStorage.setItem(key, JSON.stringify(users));
    return { success: true, message: "Registration successful" };
  }

  function loginUser(type: string, username: string, password: string) {
    const key = type === "jobseeker" ? "joblyn_jobseekers" : "joblyn_employers";
    const users = JSON.parse(localStorage.getItem(key) || "[]");
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem(
        "joblyn_loggedin",
        JSON.stringify({ type, username })
      );
      return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid credentials" };
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      const result = registerUser(type, username, password);
      setMessage(result.message);
    } else {
      const result = loginUser(type, username, password);
      setMessage(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded shadow">
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 font-bold ${
            type === "jobseeker" ? "text-joblyn-blue" : "text-gray-500"
          }`}
          onClick={() => setType("jobseeker")}
        >
          Jobseeker
        </button>
        <button
          className={`px-4 py-2 font-bold ${
            type === "employer" ? "text-joblyn-blue" : "text-gray-500"
          }`}
          onClick={() => setType("employer")}
        >
          Employer
        </button>
      </div>
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 ${
            mode === "login" ? "font-bold underline" : ""
          }`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${
            mode === "register" ? "font-bold underline" : ""
          }`}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-joblyn-blue text-white py-2 rounded font-bold"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-red-500 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
};

export default AuthPage;
