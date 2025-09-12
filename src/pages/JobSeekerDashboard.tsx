import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const JobSeekerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    mobile: string;
    address: string;
    education: string;
    experience: string;
    projects: string;
    activities: string;
    certificates: (File | string)[];
    resume: File | string | null;
  }>({
    name: "",
    email: "",
    mobile: "",
    address: "",
    education: "",
    experience: "",
    projects: "",
    activities: "",
    certificates: [],
    resume: null,
  });
  const [message, setMessage] = useState("");

  // Only allow logged-in jobseekers
  useEffect(() => {
    const loggedIn = JSON.parse(
      localStorage.getItem("joblyn_loggedin") || "null"
    );
    if (!loggedIn || loggedIn.type !== "jobseeker") {
      navigate("/"); // Redirect to home if not jobseeker
    } else {
      // Load profile if exists
      const savedProfile = JSON.parse(
        localStorage.getItem(`joblyn_profile_${loggedIn.email}`) || "null"
      );
      if (savedProfile) setProfile(savedProfile);
    }
  }, [navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "resume" && e.target.files && e.target.files[0]) {
      setProfile({ ...profile, resume: e.target.files[0] });
    }
    if (e.target.name === "certificates" && e.target.files) {
      setProfile({ ...profile, certificates: Array.from(e.target.files) });
    }
  };

  // Save profile to localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedIn = JSON.parse(
      localStorage.getItem("joblyn_loggedin") || "null"
    );
    if (loggedIn) {
      // Save profile (excluding file objects, just names for demo)
      const profileToSave = {
        ...profile,
        resume: profile.resume
          ? typeof profile.resume === "string"
            ? profile.resume
            : profile.resume.name
          : null,
        certificates: profile.certificates
          ? profile.certificates.map((f: any) => f.name)
          : [],
      };
      localStorage.setItem(
        `joblyn_profile_${loggedIn.email}`,
        JSON.stringify(profileToSave)
      );
      setMessage("Profile saved successfully!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded border border-joblyn-blue text-joblyn-blue bg-gray-100 hover:bg-joblyn-blue hover:text-white font-bold transition-colors"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold text-joblyn-blue">
          Jobseeker Dashboard
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={profile.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="education"
          placeholder="Education Background"
          value={profile.education}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
        <textarea
          name="experience"
          placeholder="Work Experience"
          value={profile.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
        <textarea
          name="projects"
          placeholder="Projects"
          value={profile.projects}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
        <textarea
          name="activities"
          placeholder="Other Activities (Sports, Clubs, etc.)"
          value={profile.activities}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={2}
        />
        <div>
          <label className="block mb-1 font-medium">
            Upload Resume (PDF/DOC):
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full"
          />
          {profile.resume && (
            <div className="text-sm text-gray-600 mt-1">
              Selected:{" "}
              {typeof profile.resume === "string"
                ? profile.resume
                : profile.resume.name}
            </div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload Certificates:</label>
          <input
            type="file"
            name="certificates"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full"
          />
          {profile.certificates && profile.certificates.length > 0 && (
            <div className="text-sm text-gray-600 mt-1">
              Selected:{" "}
              {profile.certificates
                .map((f: any) => (typeof f === "string" ? f : f.name))
                .join(", ")}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-200 text-joblyn-blue px-4 py-2 rounded font-bold border border-joblyn-blue hover:bg-joblyn-blue hover:text-white transition-colors"
        >
          Save Profile
        </button>
      </form>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <h3 className="text-xl font-semibold mb-2">Your Profile Preview</h3>
      <div className="p-3 border rounded bg-gray-50">
        <strong>Name:</strong> {profile.name} <br />
        <strong>Email:</strong> {profile.email} <br />
        <strong>Mobile:</strong> {profile.mobile} <br />
        <strong>Address:</strong> {profile.address} <br />
        <strong>Education:</strong> {profile.education} <br />
        <strong>Experience:</strong> {profile.experience} <br />
        <strong>Projects:</strong> {profile.projects} <br />
        <strong>Activities:</strong> {profile.activities} <br />
        <strong>Resume:</strong>{" "}
        {profile.resume
          ? typeof profile.resume === "string"
            ? profile.resume
            : profile.resume.name
          : "Not uploaded"}{" "}
        <br />
        <strong>Certificates:</strong>{" "}
        {profile.certificates && profile.certificates.length > 0
          ? profile.certificates
              .map((f: any) => (typeof f === "string" ? f : f.name))
              .join(", ")
          : "None"}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
