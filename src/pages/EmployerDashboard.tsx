import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CompanyProfile {
  // Basic Information (Mandatory - 40% weight)
  companyRegisteredName: string;
  companyType: string;
  establishmentYear: string;
  gstDetails: string;
  address: string;
  officialEmail: string;
  phoneNumber: string;
  founderNames: string;
  industry: string;
  coreProductService: string;
  currentTeamSize: string;
  longTermVision: string;
  
  // About the Role (Mandatory - 35% weight)
  roleTitle: string;
  coreResponsibilities: string;
  keySkillsExperience: string;
  employmentType: string;
  compensationRange: string;
  candidateLocationPreferences: string;
  
  // Additional Important Info (Optional - 25% weight)
  uniqueSellingPoint: string;
  bigWinsRecognitions: string;
  expectedTimelineToClose: string;
  dealBreakers: string;
  compensationStructure: string;
  toolsTechPlatforms: string;
  perksAndBenefits: string;
  washroomHygiene: string;
  seatingArrangement: string;
  pantryAccess: string;
  hiringForecast: string;
  ongoingPartnershipInterest: string;
  secondaryEmail: string;
  websiteUrl: string;
  socialMediaLinks: string;
  founderEducationBackground: string;
  companyOverview: string;
  startupStage: string;
  teamStructureUnderRole: string;
  keyPerformanceIndicators: string;
  teamCultureWords: string;
  companyMissionOneLine: string;
  shortTermGoals: string;
  upcomingKeyMilestones: string;
  whyJoinUsOverOthers: string;
  officePictures: string;
}

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

  // Check if employer is logged in
  useEffect(() => {
    const loggedIn = JSON.parse(
      localStorage.getItem("joblyn_loggedin") || "null"
    );
    if (!loggedIn || loggedIn.type !== "employer") {
      navigate("/");
    }
    
    // Load posted jobs
    const postedJobs = JSON.parse(
      localStorage.getItem("joblyn_posted_jobs") || "[]"
    );
    setJobs(postedJobs);
    
    // Load company profile
    const savedProfile = JSON.parse(
      localStorage.getItem("joblyn_company_profile") || "null"
    );
    if (savedProfile) {
      setCompanyProfile(savedProfile);
    }
  }, [navigate]);

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
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobWithCompany = {
      ...job,
      companyName: companyProfile.companyRegisteredName,
      companyId: Date.now(),
      postedDate: new Date().toLocaleDateString(),
    };
    
    const newJobs = [...jobs, jobWithCompany];
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
    setShowJobForm(false);
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
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded border border-blue-600 text-blue-600 bg-gray-100 hover:bg-blue-600 hover:text-white font-bold transition-colors"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold text-blue-600">
          Startup Dashboard
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Profile Strength Indicator */}
      <div className={`mb-6 p-4 rounded-lg ${getProfileStrengthBg()}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Startup Profile Strength</h3>
            <p className="text-sm text-gray-600">
              Complete your startup profile to unlock job posting features
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getProfileStrengthColor()}`}>
              {profileStrength}%
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  profileStrength >= 75 ? 'bg-green-500' : 
                  profileStrength >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${profileStrength}%` }}
              ></div>
            </div>
          </div>
        </div>
        {!canPostJobs && (
          <div className="mt-2 text-sm text-orange-600">
            <strong>Note:</strong> You need at least 75% profile completion to post jobs. Focus on completing the mandatory fields first.
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Startup Profile
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "jobs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Job Management ({jobs.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
          {message}
        </div>
      )}

      {/* Startup Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-8">
          {/* Basic Information - Mandatory */}
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-800 mb-4">
              📋 Basic Information <span className="text-sm font-normal text-red-600">(Mandatory - 40% weight)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="companyRegisteredName"
                placeholder="Company Registered Name *"
                value={companyProfile.companyRegisteredName}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              <select
                name="companyType"
                value={companyProfile.companyType}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Company Type *</option>
                <option value="Private Limited">Private Limited</option>
                <option value="LLP">LLP</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="OPC">One Person Company (OPC)</option>
              </select>
              <input
                type="number"
                name="establishmentYear"
                placeholder="Establishment Year *"
                value={companyProfile.establishmentYear}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
              <input
                type="text"
                name="gstDetails"
                placeholder="GST Number *"
                value={companyProfile.gstDetails}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                required
              />
              <input
                type="email"
                name="officialEmail"
                placeholder="Official Email Address *"
                value={companyProfile.officialEmail}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number *"
                value={companyProfile.phoneNumber}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              <input
                type="text"
                name="founderNames"
                placeholder="Name of Founder(s) *"
                value={companyProfile.founderNames}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              <select
                name="industry"
                value={companyProfile.industry}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Industry *</option>
                <option value="Technology">Technology</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech">HealthTech</option>
                <option value="EdTech">EdTech</option>
                <option value="E-commerce">E-commerce</option>
                <option value="FoodTech">FoodTech</option>
                <option value="AgriTech">AgriTech</option>
                <option value="DeepTech">DeepTech</option>
                <option value="CleanTech">CleanTech</option>
                <option value="Media & Entertainment">Media & Entertainment</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="currentTeamSize"
                value={companyProfile.currentTeamSize}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="">Current Team Size *</option>
                <option value="1-5">1-5 members</option>
                <option value="6-15">6-15 members</option>
                <option value="16-50">16-50 members</option>
                <option value="51-100">51-100 members</option>
                <option value="100+">100+ members</option>
              </select>
            </div>
            <textarea
              name="address"
              placeholder="Complete Address *"
              value={companyProfile.address}
              onChange={handleProfileChange}
              rows={3}
              className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <textarea
              name="coreProductService"
              placeholder="Core Product/Service Offering *"
              value={companyProfile.coreProductService}
              onChange={handleProfileChange}
              rows={3}
              className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <textarea
              name="longTermVision"
              placeholder="Long-Term Vision (3–5 years) *"
              value={companyProfile.longTermVision}
              onChange={handleProfileChange}
              rows={3}
              className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* About the Role - Mandatory */}
          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-xl font-semibold text-orange-800 mb-4">
              💼 About the Role <span className="text-sm font-normal text-orange-600">(Mandatory - 35% weight)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="roleTitle"
                placeholder="Role Title *"
                value={companyProfile.roleTitle}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <select
                name="employmentType"
                value={companyProfile.employmentType}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Employment Type *</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Interim">Interim</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <input
                type="text"
                name="compensationRange"
                placeholder="Compensation Range (e.g., 8-12 LPA) *"
                value={companyProfile.compensationRange}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <input
                type="text"
                name="candidateLocationPreferences"
                placeholder="Candidate Location Preferences *"
                value={companyProfile.candidateLocationPreferences}
                onChange={handleProfileChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <textarea
              name="coreResponsibilities"
              placeholder="Core Responsibilities & Scope *"
              value={companyProfile.coreResponsibilities}
              onChange={handleProfileChange}
              rows={4}
              className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <textarea
              name="keySkillsExperience"
              placeholder="Key Skills & Experience Requirements (technical + soft skills) *"
              value={companyProfile.keySkillsExperience}
              onChange={handleProfileChange}
              rows={4}
              className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Additional Requirements - Optional */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              ⭐ Additional Information <span className="text-sm font-normal text-blue-600">(Optional - 25% weight)</span>
            </h3>
            
            {/* Company Details */}
            <div className="mb-6">
              <h4 className="font-semibold text-blue-700 mb-3">Company Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="uniqueSellingPoint"
                  placeholder="What Makes Your Team/Product Unique?"
                  value={companyProfile.uniqueSellingPoint}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="bigWinsRecognitions"
                  placeholder="Big Wins/Recognitions/Awards"
                  value={companyProfile.bigWinsRecognitions}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  name="startupStage"
                  value={companyProfile.startupStage}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Startup Stage</option>
                  <option value="Idea Stage">Idea Stage</option>
                  <option value="Pre-Seed">Pre-Seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Series C+">Series C+</option>
                  <option value="Pre-IPO">Pre-IPO</option>
                  <option value="Bootstrapped">Bootstrapped</option>
                </select>
                <input
                  type="text"
                  name="teamCultureWords"
                  placeholder="Team Culture in 3 Words"
                  value={companyProfile.teamCultureWords}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="url"
                  name="websiteUrl"
                  placeholder="Website URL"
                  value={companyProfile.websiteUrl}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="socialMediaLinks"
                  placeholder="Social Media Links (LinkedIn, Twitter, etc.)"
                  value={companyProfile.socialMediaLinks}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <textarea
                name="companyOverview"
                placeholder="Brief Company Overview (one paragraph max)"
                value={companyProfile.companyOverview}
                onChange={handleProfileChange}
                rows={3}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                name="companyMissionOneLine"
                placeholder="Company Mission in One Line"
                value={companyProfile.companyMissionOneLine}
                onChange={handleProfileChange}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Role Specific Details */}
            <div className="mb-6">
              <h4 className="font-semibold text-blue-700 mb-3">Role Specific Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expectedTimelineToClose"
                  placeholder="Expected Timeline to Close Role"
                  value={companyProfile.expectedTimelineToClose}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="compensationStructure"
                  placeholder="Compensation Structure (CTC, Fixed+Variable, ESOPs)"
                  value={companyProfile.compensationStructure}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="toolsTechPlatforms"
                  placeholder="Tools/Tech/Platforms They Must Know"
                  value={companyProfile.toolsTechPlatforms}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="teamStructureUnderRole"
                  placeholder="Team Structure under this role"
                  value={companyProfile.teamStructureUnderRole}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <textarea
                name="dealBreakers"
                placeholder="Deal Breakers (e.g., no startup exposure, poor comms, unwilling to relocate)"
                value={companyProfile.dealBreakers}
                onChange={handleProfileChange}
                rows={2}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                name="perksAndBenefits"
                placeholder="Perks & Benefits Offered"
                value={companyProfile.perksAndBenefits}
                onChange={handleProfileChange}
                rows={2}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                name="keyPerformanceIndicators"
                placeholder="Key Performance Indicators (KPIs) / Metrics for Success"
                value={companyProfile.keyPerformanceIndicators}
                onChange={handleProfileChange}
                rows={2}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Employee Facilities */}
            <div className="mb-6">
              <h4 className="font-semibold text-blue-700 mb-3">Employee Facilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  name="washroomHygiene"
                  value={companyProfile.washroomHygiene}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Washroom Hygiene Standards</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Basic">Basic</option>
                </select>
                <select
                  name="seatingArrangement"
                  value={companyProfile.seatingArrangement}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seating Arrangement</option>
                  <option value="Dedicated desk + Ergonomic chair">Dedicated desk + Ergonomic chair</option>
                  <option value="Dedicated desk + Standard chair">Dedicated desk + Standard chair</option>
                  <option value="Hot desking">Hot desking</option>
                  <option value="Co-working space">Co-working space</option>
                </select>
                <select
                  name="pantryAccess"
                  value={companyProfile.pantryAccess}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pantry Access</option>
                  <option value="Full pantry with tea/coffee/snacks">Full pantry with tea/coffee/snacks</option>
                  <option value="Tea/Coffee only">Tea/Coffee only</option>
                  <option value="Basic water facility">Basic water facility</option>
                  <option value="No pantry facility">No pantry facility</option>
                </select>
              </div>
              <input
                type="text"
                name="officePictures"
                placeholder="Office Pictures (URLs separated by commas)"
                value={companyProfile.officePictures}
                onChange={handleProfileChange}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Strategic & Future Plans */}
            <div className="mb-6">
              <h4 className="font-semibold text-blue-700 mb-3">Strategic & Future Plans</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="hiringForecast"
                  placeholder="Hiring Forecast for Next 6–12 Months"
                  value={companyProfile.hiringForecast}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  name="ongoingPartnershipInterest"
                  value={companyProfile.ongoingPartnershipInterest}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Interest in Ongoing Strategic Hiring Partnership</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">Maybe - depending on results</option>
                </select>
              </div>
              <textarea
                name="shortTermGoals"
                placeholder="Short-Term Goals (Next 12–18 months)"
                value={companyProfile.shortTermGoals}
                onChange={handleProfileChange}
                rows={2}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                name="upcomingKeyMilestones"
                placeholder="Upcoming Key Milestones (Product launches, funding, expansion)"
                value={companyProfile.upcomingKeyMilestones}
                onChange={handleProfileChange}
                rows={2}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                name="whyJoinUsOverOthers"
                placeholder="Why Should a Top Leader Join You Instead of Another Startup?"
                value={companyProfile.whyJoinUsOverOthers}
                onChange={handleProfileChange}
                rows={3}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Additional Contacts */}
            <div className="mb-6">
              <h4 className="font-semibold text-blue-700 mb-3">Additional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="secondaryEmail"
                  placeholder="Secondary Email Address"
                  value={companyProfile.secondaryEmail}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <textarea
                name="founderEducationBackground"
                placeholder="Founder Education & Professional Background"
                value={companyProfile.founderEducationBackground}
                onChange={handleProfileChange}
                rows={3}
                className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Job Management Tab */}
      {activeTab === "jobs" && (
        <div className="space-y-6">
          {/* Post Job Button */}
          {canPostJobs ? (
            <div className="text-center">
              {!showJobForm ? (
                <button
                  onClick={() => setShowJobForm(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors text-lg"
                >
                  🚀 Post New Job
                </button>
              ) : (
                <button
                  onClick={() => setShowJobForm(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
                >
                  Cancel Job Posting
                </button>
              )}
            </div>
          ) : (
            <div className="text-center p-8 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">
                Complete Your Startup Profile to Post Jobs
              </h3>
              <p className="text-orange-600 mb-4">
                You need at least 75% profile completion to start posting jobs. 
                Currently at <strong>{profileStrength}%</strong>.
              </p>
              <div className="mb-4">
                <p className="text-sm text-orange-700">
                  <strong>Focus on completing:</strong> Basic Information (40% weight) and About the Role (35% weight) sections first.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("profile")}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-bold"
              >
                Complete Profile Now
              </button>
            </div>
          )}

          {/* Job Posting Form */}
          {showJobForm && canPostJobs && (
            <form onSubmit={handleJobSubmit} className="space-y-4 p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-4">🎯 Post New Job Opening</h3>
              <div className="bg-white p-4 rounded border">
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Company:</strong> {companyProfile.companyRegisteredName || "Not specified"} | 
                  <strong> Industry:</strong> {companyProfile.industry || "Not specified"} |
                  <strong> Team Size:</strong> {companyProfile.currentTeamSize || "Not specified"}
                </p>
              </div>
              <input
                type="text"
                name="title"
                placeholder="Job Title (e.g., Senior Full Stack Developer)"
                value={job.title}
                onChange={handleJobChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              <textarea
                name="description"
                placeholder="Detailed Job Description"
                value={job.description}
                onChange={handleJobChange}
                rows={6}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Job Location"
                  value={job.location}
                  onChange={handleJobChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary Range (e.g., 8-12 LPA)"
                  value={job.salary}
                  onChange={handleJobChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience Required (e.g., 2-5 years)"
                  value={job.experience}
                  onChange={handleJobChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-bold hover:bg-green-700 transition-colors text-lg"
              >
                🚀 Post Job Opening
              </button>
            </form>
          )}

          {/* Company Profile Summary (when posting jobs) */}
          {canPostJobs && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">📊 Your Startup Profile Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Company:</strong> {companyProfile.companyRegisteredName || "Not specified"}
                </div>
                <div>
                  <strong>Industry:</strong> {companyProfile.industry || "Not specified"}
                </div>
                <div>
                  <strong>Team Size:</strong> {companyProfile.currentTeamSize || "Not specified"}
                </div>
                <div>
                  <strong>Stage:</strong> {companyProfile.startupStage || "Not specified"}
                </div>
                <div className="md:col-span-2">
                  <strong>Vision:</strong> {companyProfile.longTermVision ? 
                    (companyProfile.longTermVision.length > 100 ? 
                      companyProfile.longTermVision.substring(0, 100) + "..." : 
                      companyProfile.longTermVision) : 
                    "Not specified"}
                </div>
              </div>
            </div>
          )}

          {/* Posted Jobs List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">📋 Your Posted Jobs</h3>
            {jobs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-500 text-lg">No jobs posted yet.</p>
                {canPostJobs && (
                  <p className="text-gray-400 text-sm mt-2">Click "Post New Job" to get started!</p>
                )}
              </div>
            ) : (
              <ul className="space-y-4">
                {jobs.map((j, idx) => (
                  <li key={idx} className="p-6 border rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg text-blue-600">{j.title}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-medium">
                            ACTIVE
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          <strong>{j.companyName || companyProfile.companyRegisteredName}</strong> • {j.location}
                        </p>
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{j.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            💰 {j.salary || 'Salary not specified'}
                          </span>
                          <span className="flex items-center gap-1">
                            🎯 {j.experience || 'Experience not specified'}
                          </span>
                          <span className="flex items-center gap-1">
                            📅 Posted: {j.postedDate || 'Date not available'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;