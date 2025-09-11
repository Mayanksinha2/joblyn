import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
  });
  const [jobs, setJobs] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  // Check if employer is logged in
  useEffect(() => {
    const loggedIn = JSON.parse(
      localStorage.getItem("joblyn_loggedin") || "null"
    );
    if (!loggedIn || loggedIn.type !== "employer") {
      navigate("/"); // Redirect to home if not employer
    }
    // Load posted jobs
    const postedJobs = JSON.parse(
      localStorage.getItem("joblyn_posted_jobs") || "[]"
    );
    setJobs(postedJobs);
  }, [navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJobs = [...jobs, job];
    setJobs(newJobs);
    localStorage.setItem("joblyn_posted_jobs", JSON.stringify(newJobs));
    setMessage("Job posted successfully!");
    setJob({
      title: "",
      description: "",
      location: "",
      salary: "",
      experience: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-joblyn-blue">
        Employer Dashboard
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience Required"
          value={job.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-joblyn-blue text-black px-4 py-2 rounded font-bold border border-joblyn-blue hover:bg-blue-700 transition-colors"
        >
          Post Job
        </button>
      </form>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <h3 className="text-xl font-semibold mb-2">Your Posted Jobs</h3>
      <ul>
        {jobs.map((j, idx) => (
          <li key={idx} className="mb-3 p-3 border rounded bg-gray-50">
            <strong>{j.title}</strong> - {j.location} <br />
            <span>{j.description}</span>
            <div className="text-sm text-gray-600">
              Salary: {j.salary} | Experience: {j.experience}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployerDashboard;
