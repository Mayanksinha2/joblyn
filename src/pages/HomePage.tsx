import React, { useState, useEffect } from "react";
import AuthPage from "./AuthPage";
import SearchBar from "../components/Search/SearchBar";
import JobCard from "../components/Jobs/JobCard";
import CompanyCard from "../components/Companies/CompanyCard";
import {
  TrendingUp,
  Users,
  Building2,
  Award,
  ChevronRight,
  Sparkles,
  Target,
  BookOpen,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompanyProfile {
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
  roleTitle: string;
  coreResponsibilities: string;
  keySkillsExperience: string;
  employmentType: string;
  compensationRange: string;
  candidateLocationPreferences: string;
  // ... other optional fields
  [key: string]: string;
}

const HomePage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<"jobseeker" | "employer">(
    "jobseeker"
  );
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("joblyn_loggedin") || "null")
  );
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [profileStrength, setProfileStrength] = useState(0);

  // Calculate profile strength
  const calculateProfileStrength = (profile: CompanyProfile): number => {
    const mandatoryFields = [
      'companyRegisteredName', 'companyType', 'establishmentYear', 'gstDetails',
      'address', 'officialEmail', 'phoneNumber', 'founderNames', 'industry',
      'coreProductService', 'currentTeamSize', 'longTermVision',
      'roleTitle', 'coreResponsibilities', 'keySkillsExperience',
      'employmentType', 'compensationRange', 'candidateLocationPreferences'
    ];
    
    const optionalFields = Object.keys(profile).filter(
      key => !mandatoryFields.includes(key)
    );
    
    const filledMandatory = mandatoryFields.filter(field => {
      const value = profile[field];
      return value != null && value.toString().trim() !== "";
    }).length;
    
    const filledOptional = optionalFields.filter(field => {
      const value = profile[field];
      return value != null && value.toString().trim() !== "";
    }).length;
    
    // Weighted calculation: 75% for mandatory, 25% for optional
    const mandatoryScore = (filledMandatory / mandatoryFields.length) * 75;
    const optionalScore = optionalFields.length > 0 ? (filledOptional / optionalFields.length) * 25 : 0;
    
    return Math.round(mandatoryScore + optionalScore);
  };

  // Listen for login/logout changes and load company profile
  useEffect(() => {
    const handleStorage = () => {
      const loginData = JSON.parse(localStorage.getItem("joblyn_loggedin") || "null");
      setLoggedIn(loginData);
      
      // Load company profile if employer is logged in
      if (loginData?.type === "employer") {
        const savedProfile = JSON.parse(localStorage.getItem("joblyn_company_profile") || "null");
        if (savedProfile) {
          setCompanyProfile(savedProfile);
          setProfileStrength(calculateProfileStrength(savedProfile));
        } else {
          setCompanyProfile(null);
          setProfileStrength(0);
        }
      } else {
        setCompanyProfile(null);
        setProfileStrength(0);
      }
    };
    
    // Initial load
    handleStorage();
    
    // Listen for storage changes
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Mahindra",
      location: "Bangalore, Mumbai",
      experience: "5-8 Years",
      salary: "₹15-25 LPA",
      postedOn: "2 days ago",
      tags: ["React", "TypeScript", "Node.js", "AWS"],
      isRemote: true,
      logo: "https://img.naukimg.com/logo_images/groups/v1/599850.gif",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Amazon",
      location: "Gurgaon, Hyderabad",
      experience: "6-10 Years",
      salary: "₹30-45 LPA",
      postedOn: "1 day ago",
      tags: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      isRemote: false,
      logo: "https://img.naukimg.com/logo_images/groups/v1/1063546.gif",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Flipkart",
      location: "Bangalore",
      experience: "3-5 Years",
      salary: "₹20-30 LPA",
      postedOn: "3 days ago",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      isRemote: true,
      logo: "https://img.naukimg.com/logo_images/groups/v1/604850.gif",
    },
  ];

  const topCompanies = [
    {
      id: 1,
      name: "TCS",
      logo: "https://img.naukimg.com/logo_images/groups/v1/599850.gif",
      rating: 4.2,
      reviews: "23K+",
      openings: "1.5K+",
    },
    {
      id: 2,
      name: "Wipro",
      logo: "https://img.naukimg.com/logo_images/groups/v1/419316.gif",
      rating: 4.0,
      reviews: "18K+",
      openings: "980+",
    },
    {
      id: 3,
      name: "Infosys",
      logo: "https://img.naukimg.com/logo_images/groups/v1/1288.gif",
      rating: 4.1,
      reviews: "21K+",
      openings: "1.2K+",
    },
    {
      id: 4,
      name: "Cognizant",
      logo: "https://img.naukimg.com/logo_images/groups/v1/18850.gif",
      rating: 3.9,
      reviews: "15K+",
      openings: "850+",
    },
  ];

  const jobCategories = [
    { name: "IT Software", count: "2.5L+", icon: "💻" },
    { name: "Sales", count: "1.2L+", icon: "📈" },
    { name: "Marketing", count: "80K+", icon: "📱" },
    { name: "Finance", count: "95K+", icon: "💰" },
    { name: "HR", count: "65K+", icon: "👥" },
    { name: "Healthcare", count: "45K+", icon: "🏥" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      {loggedIn && (
        <aside
          className="w-80 fixed left-0 top-16 bg-white shadow-lg flex flex-col justify-between overflow-y-auto"
          style={{ height: "calc(100vh - 4rem)", zIndex: 20 }}
        >
          <div className="p-6">
            {/* User Profile Header */}
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {loggedIn.type === "employer" ? "Employer" : "Job Seeker"}
                </h3>
                <p className="text-sm text-gray-600">{loggedIn.email}</p>
              </div>
            </div>

            {/* Jobseeker Dashboard */}
            {loggedIn.type === "jobseeker" && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-blue-600 mb-4">My Profile</h2>
                <a
                  href="/jobseeker-dashboard"
                  className="w-full px-4 py-3 rounded-lg border border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white font-semibold transition-colors flex items-center justify-between"
                >
                  <span>Jobseeker Dashboard</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            )}

            {/* Employer Dashboard with Profile Status */}
            {loggedIn.type === "employer" && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-blue-600 mb-4">Startup Dashboard</h2>
                
                {/* Profile Completion Status */}
                <div className={`p-4 rounded-lg ${getProfileStrengthBg()} border`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">Profile Completion</h3>
                    <span className={`text-lg font-bold ${getProfileStrengthColor()}`}>
                      {profileStrength}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        profileStrength >= 75 ? 'bg-green-500' : 
                        profileStrength >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${profileStrength}%` }}
                    ></div>
                  </div>
                  
                  {/* Status Message */}
                  {profileStrength >= 75 ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle size={14} className="mr-1" />
                      Profile Complete - Ready to post jobs!
                    </div>
                  ) : (
                    <div className="flex items-center text-orange-600 text-sm">
                      <AlertCircle size={14} className="mr-1" />
                      Complete profile to unlock job posting
                    </div>
                  )}
                </div>

                {/* Company Details (if profile exists) */}
                {companyProfile && companyProfile.companyRegisteredName && (
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Building2 size={16} className="mr-2" />
                      Company Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Name:</span>
                        <p className="text-gray-800">{companyProfile.companyRegisteredName}</p>
                      </div>
                      {companyProfile.industry && (
                        <div>
                          <span className="font-medium text-gray-600">Industry:</span>
                          <p className="text-gray-800">{companyProfile.industry}</p>
                        </div>
                      )}
                      {companyProfile.currentTeamSize && (
                        <div>
                          <span className="font-medium text-gray-600">Team Size:</span>
                          <p className="text-gray-800">{companyProfile.currentTeamSize}</p>
                        </div>
                      )}
                      {companyProfile.founderNames && (
                        <div>
                          <span className="font-medium text-gray-600">Founder(s):</span>
                          <p className="text-gray-800">{companyProfile.founderNames}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <a
                    href="/employer-dashboard"
                    className="w-full px-4 py-3 rounded-lg border border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white font-semibold transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Settings size={16} className="mr-2" />
                      {profileStrength >= 75 ? 'Employer Dashboard' : 'Complete Profile'}
                    </div>
                    <ChevronRight size={16} />
                  </a>
                  
                  {profileStrength >= 75 && (
                    <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center text-green-700 text-sm font-medium mb-1">
                        <CheckCircle size={14} className="mr-1" />
                        Job Posting Enabled
                      </div>
                      <p className="text-xs text-green-600">
                        Your profile is complete! You can now post job openings and attract top talent.
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Stats (if profile is complete) */}
                {profileStrength >= 75 && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-white rounded">
                        <div className="font-bold text-blue-600">
                          {JSON.parse(localStorage.getItem("joblyn_posted_jobs") || "[]").length}
                        </div>
                        <div className="text-gray-600">Jobs Posted</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="font-bold text-green-600">{profileStrength}%</div>
                        <div className="text-gray-600">Profile Score</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={() => {
                localStorage.removeItem("joblyn_loggedin");
                localStorage.removeItem("joblyn_company_profile");
                setLoggedIn(null);
                setCompanyProfile(null);
                setProfileStrength(0);
                navigate("/");
              }}
              className="w-full px-4 py-2 rounded-lg border border-red-400 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${loggedIn ? "ml-80" : ""}`}>
        {/* Login/Register buttons (only show if not logged in) */}
        {!loggedIn && (
          <div className="flex justify-end p-4 bg-white">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => {
                setAuthType("jobseeker");
                setShowAuth(true);
              }}
            >
              Jobseeker Login/Register
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => {
                setAuthType("employer");
                setShowAuth(true);
              }}
            >
              Employer Login/Register
            </button>
          </div>
        )}

        {/* Show AuthPage modal */}
        {showAuth && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
                onClick={() => setShowAuth(false)}
              >
                ×
              </button>
              <AuthPage initialType={authType} />
            </div>
          </div>
        )}

        <SearchBar />

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">15L+</h3>
                <p className="text-gray-600">Active Jobs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">10Cr+</h3>
                <p className="text-gray-600">Job Seekers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">21K+</h3>
                <p className="text-gray-600">Companies</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">5Cr+</h3>
                <p className="text-gray-600">Success Stories</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Featured Jobs
                </h2>
                <p className="text-gray-600">
                  Hand-picked opportunities from top companies
                </p>
              </div>
              <a
                href="/jobs"
                className="text-blue-600 hover:underline flex items-center font-medium"
              >
                View All <ChevronRight size={20} />
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </section>

        {/* Job Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Explore Jobs by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {jobCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {category.count} Jobs
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Companies */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Top Companies Hiring
                </h2>
                <p className="text-gray-600">
                  Join India's leading organizations
                </p>
              </div>
              <a
                href="/companies"
                className="text-blue-600 hover:underline flex items-center font-medium"
              >
                View All <ChevronRight size={20} />
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topCompanies.map((company) => (
                <CompanyCard key={company.id} {...company} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Accelerate Your Career
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resume Writing</h3>
                <p className="text-gray-600 mb-4">
                  Get a professionally written resume that stands out
                </p>
                <button className="text-blue-600 hover:underline font-medium">
                  Learn More →
                </button>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Priority Applicant
                </h3>
                <p className="text-gray-600 mb-4">
                  Be a priority applicant & increase your chance of selection
                </p>
                <button className="text-blue-600 hover:underline font-medium">
                  Learn More →
                </button>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized career guidance from industry experts
                </p>
                <button className="text-blue-600 hover:underline font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;