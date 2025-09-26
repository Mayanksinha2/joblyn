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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<"jobseeker" | "employer">(
    "jobseeker"
  );
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("joblyn_loggedin") || "null")
  );

  // Listen for login/logout changes
  React.useEffect(() => {
    const handleStorage = () => {
      setLoggedIn(
        JSON.parse(localStorage.getItem("joblyn_loggedin") || "null")
      );
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Add profile photo state
  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("joblyn_profile_photo") || ""
  );
  const [editingPhoto, setEditingPhoto] = useState(false);

  // Listen for profile photo changes
  React.useEffect(() => {
    const handleStorage = () => {
      setProfilePhoto(localStorage.getItem("joblyn_profile_photo") || "");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("joblyn_profile_photo", reader.result as string);
        setProfilePhoto(reader.result as string);
        setEditingPhoto(false);
      };
      reader.readAsDataURL(file);
    }
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
          className="w-64 fixed left-0 top-16 bg-white shadow-lg flex flex-col justify-between"
          style={{ height: "calc(100vh - 4rem)", zIndex: 20 }}
        >
          <div className="p-6 flex flex-col items-center">
            {/* Profile Photo Circle */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-joblyn-blue">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-4xl">👤</span>
                )}
              </div>
              <button
                className="absolute bottom-0 right-0 bg-joblyn-blue text-white rounded-full p-1 border border-white shadow hover:bg-blue-700 transition-colors"
                style={{ fontSize: "0.9rem" }}
                onClick={() => setEditingPhoto(true)}
                title={profilePhoto ? "Edit/Replace Photo" : "Upload Photo"}
              >
                ✎
              </button>
              {editingPhoto && (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ zIndex: 10 }}
                  onChange={handlePhotoChange}
                  onBlur={() => setEditingPhoto(false)}
                  autoFocus
                />
              )}
            </div>
            {/* Admin/Employer/Jobseeker Info */}
            <div className="mb-2 text-center">
              <div className="font-bold">
                {loggedIn.type === "admin"
                  ? "Admin"
                  : loggedIn.name || "User"}
              </div>
              <div className="text-xs text-gray-500">
                {loggedIn.email}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                ID: {loggedIn.id || "N/A"}
              </div>
            </div>
            {/* My Profile Button */}
            <button
              onClick={() =>
                navigate(
                  loggedIn.type === "admin"
                    ? "/admin-panel"
                    : loggedIn.type === "employer"
                    ? "/employer-dashboard"
                    : "/jobseeker-dashboard"
                )
              }
              className="mb-4 px-4 py-2 rounded border border-joblyn-blue text-joblyn-blue bg-gray-100 hover:bg-joblyn-blue hover:text-white font-bold transition-colors block w-full text-center"
            >
              My Profile
            </button>
          </div>
          <div className="p-6">
            <button
              onClick={() => {
                localStorage.removeItem("joblyn_loggedin");
                setLoggedIn(null);
                navigate("/");
              }}
              className="w-full px-4 py-2 rounded border border-red-400 text-red-500 bg-gray-100 hover:bg-red-500 hover:text-white font-bold transition-colors"
            >
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${loggedIn ? "ml-64" : ""}`}>
        {/* Remove Admin Login button from here */}
        <div className="w-full bg-white shadow">
          <div className="container mx-auto flex justify-end items-center py-4 px-4">
            <button
              className="bg-joblyn-blue text-white px-4 py-2 rounded mr-2 font-bold"
              onClick={() => {
                setAuthType("employer");
                setShowAuth(true);
              }}
            >
              Employer Login/Register
            </button>
            <button
              className="bg-joblyn-blue text-white px-4 py-2 rounded font-bold"
              onClick={() => {
                setAuthType("jobseeker");
                setShowAuth(true);
              }}
            >
              Jobseeker Login/Register
            </button>
          </div>
        </div>

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
                  <TrendingUp className="w-8 h-8 text-joblyn-blue" />
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
                className="text-joblyn-blue hover:underline flex items-center font-medium"
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
                className="text-joblyn-blue hover:underline flex items-center font-medium"
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
                  <Sparkles className="w-10 h-10 text-joblyn-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resume Writing</h3>
                <p className="text-gray-600 mb-4">
                  Get a professionally written resume that stands out
                </p>
                <button className="text-joblyn-blue hover:underline font-medium">
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
                <button className="text-joblyn-blue hover:underline font-medium">
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
                <button className="text-joblyn-blue hover:underline font-medium">
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
