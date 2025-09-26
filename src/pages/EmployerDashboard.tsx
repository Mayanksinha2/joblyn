import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>(initialForm);
  const [completion, setCompletion] = useState(0);
  const [message, setMessage] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "jobs">("profile");
  
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    // Basic Information (Mandatory)
    companyRegisteredName: "",
    companyType: "",
    establishmentYear: "",
    gstDetails: "",
    address: "",
    officialEmail: "",
    phoneNumber: "",
    founderNames: "",
    industry: "",
    coreProductService: "",
    currentTeamSize: "",
    longTermVision: "",
    
    // About the Role (Mandatory)
    roleTitle: "",
    coreResponsibilities: "",
    keySkillsExperience: "",
    employmentType: "",
    compensationRange: "",
    candidateLocationPreferences: "",
    
    // Additional Information (Optional)
    uniqueSellingPoint: "",
    bigWinsRecognitions: "",
    expectedTimelineToClose: "",
    dealBreakers: "",
    compensationStructure: "",
    toolsTechPlatforms: "",
    perksAndBenefits: "",
    washroomHygiene: "",
    seatingArrangement: "",
    pantryAccess: "",
    hiringForecast: "",
    ongoingPartnershipInterest: "",
    secondaryEmail: "",
    websiteUrl: "",
    socialMediaLinks: "",
    founderEducationBackground: "",
    companyOverview: "",
    startupStage: "",
    teamStructureUnderRole: "",
    keyPerformanceIndicators: "",
    teamCultureWords: "",
    companyMissionOneLine: "",
    shortTermGoals: "",
    upcomingKeyMilestones: "",
    whyJoinUsOverOthers: "",
    officePictures: "",
  });

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
    // Calculate completion %
    const filled = fields.filter(
      (f) => form[f] && form[f].trim() !== ""
    ).length;
    setCompletion(Math.round((filled / fields.length) * 100));
  }, [form]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Calculate profile strength based on mandatory and optional fields
  const calculateProfileStrength = (): number => {
    const mandatoryFields = [
      'companyRegisteredName', 'companyType', 'establishmentYear', 'gstDetails',
      'address', 'officialEmail', 'phoneNumber', 'founderNames', 'industry',
      'coreProductService', 'currentTeamSize', 'longTermVision',
      'roleTitle', 'coreResponsibilities', 'keySkillsExperience',
      'employmentType', 'compensationRange', 'candidateLocationPreferences'
    ];
    
    const optionalFields = Object.keys(companyProfile).filter(
      key => !mandatoryFields.includes(key)
    );
    
    const filledMandatory = mandatoryFields.filter(field => {
      const value = companyProfile[field as keyof CompanyProfile];
      return value != null && value.toString().trim() !== "";
    }).length;
    
    const filledOptional = optionalFields.filter(field => {
      const value = companyProfile[field as keyof CompanyProfile];
      return value != null && value.toString().trim() !== "";
    }).length;
    
    // Weighted calculation: 75% for mandatory, 25% for optional
    const mandatoryScore = (filledMandatory / mandatoryFields.length) * 75;
    const optionalScore = optionalFields.length > 0 ? (filledOptional / optionalFields.length) * 25 : 0;
    
    return Math.round(mandatoryScore + optionalScore);
  };

  const profileStrength = calculateProfileStrength();
  const canPostJobs = profileStrength >= 75;

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedProfile = { ...companyProfile, [name]: value };
    setCompanyProfile(updatedProfile);
    localStorage.setItem("joblyn_company_profile", JSON.stringify(updatedProfile));
  };

  const handleJobChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleLogout = () => {
    localStorage.removeItem("joblyn_loggedin");
    navigate("/");
  };

  const getProfileStrengthColor = () => {
    if (profileStrength >= 75) return "text-green-600";
    if (profileStrength >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getProfileStrengthBg = () => {
    if (profileStrength >= 75) return "bg-green-100";
    if (profileStrength >= 50) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded border border-blue-600 text-blue-600 bg-gray-100 hover:bg-blue-600 hover:text-white font-bold transition-colors"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold text-blue-600">
          Startup Dashboard
        </h2>
      </div>
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