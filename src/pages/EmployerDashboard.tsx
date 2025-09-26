import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define all fields for completion tracking
const fields = [
  // Basic Information
  "companyName",
  "companyType",
  "establishmentYear",
  "gstDetails",
  "address",
  "officialEmail",
  "phoneNumber",
  "founderNames",
  "industry",
  "teamSize",
  "vision",
  "uniqueFactor",
  "bigWins",
  "timeline",
  // About the Role
  "roleTitle",
  "responsibilities",
  "skills",
  "dealBreakers",
  "employmentType",
  "compensation",
  "tools",
  "candidateLocation",
  "perks",
  "washroom",
  "seating",
  "pantry",
  "hiringForecast",
  "strategicPartnership",
  // Additional Requirements
  "secondaryEmail",
  "website",
  "founderBackground",
  "companyOverview",
  "startupStage",
  "teamStructure",
  "kpi",
  "culture",
  "mission",
  "shortTermGoals",
  "milestones",
  "whyJoin",
  "officePics",
];

const initialForm: Record<string, string> = fields.reduce(
  (acc, f) => ({ ...acc, [f]: "" }),
  {}
);

const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>(initialForm);
  const [completion, setCompletion] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedIn = JSON.parse(
      localStorage.getItem("joblyn_loggedin") || "null"
    );
    if (!loggedIn || loggedIn.type !== "employer") navigate("/");
    // Load form data
    const saved = JSON.parse(
      localStorage.getItem("joblyn_employer_form") || "null"
    );
    if (saved) setForm(saved);
  }, [navigate]);

  useEffect(() => {
    // Calculate completion %
    const filled = fields.filter(
      (f) => form[f] && form[f].trim() !== ""
    ).length;
    setCompletion(Math.round((filled / fields.length) * 100));
  }, [form]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("joblyn_employer_form", JSON.stringify(form));
    setMessage("Information saved successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("joblyn_loggedin");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded border border-joblyn-blue text-joblyn-blue bg-gray-100 hover:bg-joblyn-blue hover:text-white font-bold transition-colors"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold text-joblyn-blue">
          Employer Dashboard
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded border border-red-500 text-red-500 bg-gray-100 hover:bg-red-500 hover:text-white font-bold transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="font-semibold text-joblyn-blue mr-2">
            Profile Completion:
          </span>
          <span className="font-bold">{completion}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded h-4">
          <div
            className="bg-joblyn-blue h-4 rounded"
            style={{ width: `${completion}%`, transition: "width 0.5s" }}
          />
        </div>
      </div>
      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Information */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Registered Name"
              className="p-2 border rounded"
              required
            />
            <input
              name="companyType"
              value={form.companyType}
              onChange={handleChange}
              placeholder="Company Type (Pvt Ltd, LLP, etc.)"
              className="p-2 border rounded"
              required
            />
            <input
              name="establishmentYear"
              value={form.establishmentYear}
              onChange={handleChange}
              placeholder="Establishment Year"
              className="p-2 border rounded"
            />
            <input
              name="gstDetails"
              value={form.gstDetails}
              onChange={handleChange}
              placeholder="GST Details"
              className="p-2 border rounded"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 border rounded"
              required
            />
            <input
              name="officialEmail"
              value={form.officialEmail}
              onChange={handleChange}
              placeholder="Official Email Address"
              className="p-2 border rounded"
              required
            />
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border rounded"
              required
            />
            <input
              name="founderNames"
              value={form.founderNames}
              onChange={handleChange}
              placeholder="Name of the Founder(s)"
              className="p-2 border rounded"
            />
            <input
              name="industry"
              value={form.industry}
              onChange={handleChange}
              placeholder="Industry & Core Product/Service"
              className="p-2 border rounded"
            />
            <input
              name="teamSize"
              value={form.teamSize}
              onChange={handleChange}
              placeholder="Current Team Size"
              className="p-2 border rounded"
            />
            <input
              name="vision"
              value={form.vision}
              onChange={handleChange}
              placeholder="Long-Term Vision (3–5 years)"
              className="p-2 border rounded"
            />
            <input
              name="uniqueFactor"
              value={form.uniqueFactor}
              onChange={handleChange}
              placeholder="What Makes Your Team/Product Unique?"
              className="p-2 border rounded"
            />
            <input
              name="bigWins"
              value={form.bigWins}
              onChange={handleChange}
              placeholder="Big Wins or Recognitions"
              className="p-2 border rounded"
            />
            <input
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              placeholder="Expected Timeline to Close Role"
              className="p-2 border rounded"
            />
          </div>
        </section>
        {/* About the Role */}
        <section>
          <h3 className="text-xl font-semibold mb-4">About the Role</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="roleTitle"
              value={form.roleTitle}
              onChange={handleChange}
              placeholder="Role Title"
              className="p-2 border rounded"
              required
            />
            <textarea
              name="responsibilities"
              value={form.responsibilities}
              onChange={handleChange}
              placeholder="Core Responsibilities & Scope"
              className="p-2 border rounded"
            />
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="Key Skills & Experience Requirements"
              className="p-2 border rounded"
            />
            <input
              name="dealBreakers"
              value={form.dealBreakers}
              onChange={handleChange}
              placeholder="Deal Breakers"
              className="p-2 border rounded"
            />
            <input
              name="employmentType"
              value={form.employmentType}
              onChange={handleChange}
              placeholder="Employment Type"
              className="p-2 border rounded"
            />
            <input
              name="compensation"
              value={form.compensation}
              onChange={handleChange}
              placeholder="Compensation Range & Structure"
              className="p-2 border rounded"
            />
            <input
              name="tools"
              value={form.tools}
              onChange={handleChange}
              placeholder="Tools, Tech, or Platforms"
              className="p-2 border rounded"
            />
            <input
              name="candidateLocation"
              value={form.candidateLocation}
              onChange={handleChange}
              placeholder="Candidate Location Preferences"
              className="p-2 border rounded"
            />
            <input
              name="perks"
              value={form.perks}
              onChange={handleChange}
              placeholder="Perks & Benefits Offered"
              className="p-2 border rounded"
            />
            <input
              name="washroom"
              value={form.washroom}
              onChange={handleChange}
              placeholder="Washroom availability & hygiene"
              className="p-2 border rounded"
            />
            <input
              name="seating"
              value={form.seating}
              onChange={handleChange}
              placeholder="Seating arrangement"
              className="p-2 border rounded"
            />
            <input
              name="pantry"
              value={form.pantry}
              onChange={handleChange}
              placeholder="Pantry access"
              className="p-2 border rounded"
            />
            <input
              name="hiringForecast"
              value={form.hiringForecast}
              onChange={handleChange}
              placeholder="Hiring Forecast (6–12 Months)"
              className="p-2 border rounded"
            />
            <input
              name="strategicPartnership"
              value={form.strategicPartnership}
              onChange={handleChange}
              placeholder="Strategic Hiring Partnership with Joblyn (Y/N)"
              className="p-2 border rounded"
            />
          </div>
        </section>
        {/* Additional Requirements */}
        <section>
          <h3 className="text-xl font-semibold mb-4">
            Additional Requirements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="secondaryEmail"
              value={form.secondaryEmail}
              onChange={handleChange}
              placeholder="Secondary Email Address"
              className="p-2 border rounded"
            />
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Website & Social Media Links"
              className="p-2 border rounded"
            />
            <textarea
              name="founderBackground"
              value={form.founderBackground}
              onChange={handleChange}
              placeholder="Founder Education & Background"
              className="p-2 border rounded"
            />
            <textarea
              name="companyOverview"
              value={form.companyOverview}
              onChange={handleChange}
              placeholder="Brief Company Overview"
              className="p-2 border rounded"
            />
            <input
              name="startupStage"
              value={form.startupStage}
              onChange={handleChange}
              placeholder="Startup Stage"
              className="p-2 border rounded"
            />
            <input
              name="teamStructure"
              value={form.teamStructure}
              onChange={handleChange}
              placeholder="Team Structure under this role"
              className="p-2 border rounded"
            />
            <input
              name="kpi"
              value={form.kpi}
              onChange={handleChange}
              placeholder="KPIs / Metrics for Success"
              className="p-2 border rounded"
            />
            <input
              name="culture"
              value={form.culture}
              onChange={handleChange}
              placeholder="Team Culture in 3 Words"
              className="p-2 border rounded"
            />
            <input
              name="mission"
              value={form.mission}
              onChange={handleChange}
              placeholder="Company Mission in One Line"
              className="p-2 border rounded"
            />
            <input
              name="shortTermGoals"
              value={form.shortTermGoals}
              onChange={handleChange}
              placeholder="Short-Term Goals (12–18 months)"
              className="p-2 border rounded"
            />
            <input
              name="milestones"
              value={form.milestones}
              onChange={handleChange}
              placeholder="Upcoming Key Milestones"
              className="p-2 border rounded"
            />
            <textarea
              name="whyJoin"
              value={form.whyJoin}
              onChange={handleChange}
              placeholder="Why Should a Top Leader Join You?"
              className="p-2 border rounded"
            />
            <input
              name="officePics"
              value={form.officePics}
              onChange={handleChange}
              placeholder="Pictures of your Office (URL)"
              className="p-2 border rounded"
            />
          </div>
        </section>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-joblyn-blue text-black px-6 py-2 rounded font-bold border border-joblyn-blue hover:bg-blue-700 transition-colors"
          >
            Save Information
          </button>
          <button
            type="button"
            disabled={completion < 10}
            onClick={() => navigate("/post-job")}
            className={`px-6 py-2 rounded font-bold border ${
              completion >= 10
                ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
            } transition-colors`}
            title={
              completion < 10
                ? "Fill at least 10% of your company profile to post a job"
                : "Post a Job"
            }
          >
            Post a Job
          </button>
        </div>
      </form>
      {message && <div className="mt-4 text-green-600">{message}</div>}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <div className="bg-gray-50 p-4 rounded border">
          {fields.map((f) => (
            <div key={f} className="mb-2">
              <span className="font-semibold">
                {f.replace(/([A-Z])/g, " $1")}:{" "}
              </span>
              <span>
                {form[f] || <span className="text-gray-400">Not filled</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
