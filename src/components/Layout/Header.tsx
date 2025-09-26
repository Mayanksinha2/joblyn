import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
// Update the import path if the file is located elsewhere, for example:
import LoginModal from "../Modals/LoginModal";
// If the file does not exist, create 'LoginModal.tsx' in 'src/components/Modals' or correct the path.

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<"jobseeker" | "employer" | "admin">(
    "jobseeker"
  );
  const navigate = useNavigate();

  const handleLogin = (type: "jobseeker" | "employer" | "admin") => {
    setLoginType(type);
    setShowLoginModal(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold text-naukri-blue">
                Joblyn
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <Link
                  to="/jobs"
                  className="flex items-center space-x-1 text-gray-700 hover:text-naukri-blue font-medium"
                >
                  <span>Jobs</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/jobs" className="block px-4 py-2 hover:bg-gray-50">
                    Search Jobs
                  </Link>
                  <Link to="/jobs" className="block px-4 py-2 hover:bg-gray-50">
                    Jobs by Location
                  </Link>
                  <Link to="/jobs" className="block px-4 py-2 hover:bg-gray-50">
                    Jobs by Skill
                  </Link>
                  <Link to="/jobs" className="block px-4 py-2 hover:bg-gray-50">
                    Jobs by Company
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <Link
                  to="/companies"
                  className="flex items-center space-x-1 text-gray-700 hover:text-naukri-blue font-medium"
                >
                  <span>Companies</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to="/companies"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Top Companies
                  </Link>
                  <Link
                    to="/companies"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    IT Companies
                  </Link>
                  <Link
                    to="/companies"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Startups
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-naukri-blue font-medium">
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                    Resume Writing
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                    Priority Applicant
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                    Career Booster
                  </a>
                </div>
              </div>

              <Link
                to="/career-guidance"
                className="text-gray-700 hover:text-naukri-blue font-medium"
              >
                Career Guidance
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                onClick={() => handleLogin("employer")}
                className="px-6 py-2 bg-naukri-orange text-white rounded hover:bg-orange-600 transition-colors font-medium"
              >
                Employer Login
              </button>

              <div className="h-8 w-px bg-gray-300"></div>

              <button
                onClick={() => handleLogin("jobseeker")}
                className="px-6 py-2 border border-naukri-blue text-naukri-blue rounded hover:bg-naukri-blue hover:text-white transition-colors font-medium"
              >
                Jobseeker Login
              </button>

              <div className="h-8 w-px bg-gray-300"></div>

              <button
                onClick={() => handleLogin("admin")}
                className="px-6 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors font-medium"
              >
                Admin Login
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <Link to="/jobs" className="block py-2 text-gray-700">
                Jobs
              </Link>
              <Link to="/companies" className="block py-2 text-gray-700">
                Companies
              </Link>
              <Link to="/services" className="block py-2 text-gray-700">
                Services
              </Link>
              <Link to="/career-guidance" className="block py-2 text-gray-700">
                Career Guidance
              </Link>
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => handleLogin("employer")}
                  className="block w-full py-2 bg-naukri-orange text-white rounded"
                >
                  Employer Login
                </button>
                <button
                  onClick={() => handleLogin("jobseeker")}
                  className="block w-full py-2 text-naukri-blue border border-naukri-blue rounded"
                >
                  Jobseeker Login
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/admin-login");
                  }}
                  className="block w-full py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors font-medium"
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          loginType={loginType}
        />
      )}
    </>
  );
};

export default Header;
