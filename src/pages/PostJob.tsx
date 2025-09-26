import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    jobTitle: "",
    jobDescription: "",
    keySkills: "",
    experience: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    perks: "",
    applicationEmail: "",
    deadline: "",
  });

  useEffect(() => {
    // Try to get company name from employer profile
    const employerForm = JSON.parse(
      localStorage.getItem("joblyn_employer_form") || "null"
    );
    if (employerForm && employerForm.companyName) {
      setCompanyName(employerForm.companyName);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!form.jobTitle || !form.jobDescription || !form.applicationEmail) {
      setMessage("Please fill all required fields.");
      return;
    }
    // Save job post to localStorage
    const jobs = JSON.parse(localStorage.getItem("joblyn_jobs") || "[]");
    jobs.push({ ...form, companyName });
    localStorage.setItem("joblyn_jobs", JSON.stringify(jobs));
    setMessage("Job posted successfully!");
    setTimeout(() => {
      navigate("/employer-dashboard");
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-joblyn-blue">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="p-2 border rounded w-full"
          required
        />
        <textarea
          name="jobDescription"
          value={form.jobDescription}
          onChange={handleChange}
          placeholder="Job Description"
          className="p-2 border rounded w-full"
          required
        />
        <input
          name="keySkills"
          value={form.keySkills}
          onChange={handleChange}
          placeholder="Key Skills (comma separated)"
          className="p-2 border rounded w-full"
        />
        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experience Required"
          className="p-2 border rounded w-full"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded w-full"
        />
        <select
          name="employmentType"
          value={form.employmentType}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="">Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input
          name="salaryRange"
          value={form.salaryRange}
          onChange={handleChange}
          placeholder="Salary Range"
          className="p-2 border rounded w-full"
        />
        <input
          name="perks"
          value={form.perks}
          onChange={handleChange}
          placeholder="Perks & Benefits"
          className="p-2 border rounded w-full"
        />
        <input
          name="applicationEmail"
          value={form.applicationEmail}
          onChange={handleChange}
          placeholder="Application Email"
          className="p-2 border rounded w-full"
          required
        />
        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <div className="text-gray-600 text-sm mb-2">
          Company:{" "}
          <span className="font-semibold">{companyName || "Not set"}</span>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-joblyn-blue text-black px-6 py-2 rounded font-bold border border-joblyn-blue hover:bg-blue-700 transition-colors"
          >
            Post Job
          </button>
          <button
            type="button"
            onClick={() => navigate("/employer-dashboard")}
            className="px-6 py-2 rounded border border-joblyn-blue text-joblyn-blue bg-gray-100 hover:bg-joblyn-blue hover:text-white font-bold transition-colors"
          >
            Cancel
          </button>
        </div>
        {message && <div className="mt-4 text-green-600">{message}</div>}
      </form>
    </div>
  );
};

export default PostJob;
