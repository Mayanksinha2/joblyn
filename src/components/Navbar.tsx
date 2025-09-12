import { Link } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
  const loggedIn = JSON.parse(
    localStorage.getItem("joblyn_loggedin") || "null"
  );

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link to="/" className="font-bold text-2xl text-joblyn-blue">
        Joblyn
      </Link>
      <div className="flex gap-6">
        {/* Other navigation links */}
        {loggedIn && loggedIn.type === "jobseeker" && (
          <Link
            to="/jobseeker-dashboard"
            className="px-4 py-2 rounded border border-joblyn-blue text-joblyn-blue bg-gray-100 hover:bg-joblyn-blue hover:text-white font-bold transition-colors"
          >
            Jobseeker Dashboard
          </Link>
        )}
        {loggedIn && loggedIn.type === "employer" && (
          <Link
            to="/employer-dashboard"
            className="px-4 py-2 rounded border border-joblyn-blue text-joblyn-blue bg-gray-100 hover:bg-joblyn-blue hover:text-white font-bold transition-colors"
          >
            Employer Dashboard
          </Link>
        )}
        {/* Login/Register buttons or user profile */}
      </div>
    </nav>
  );
};

export default Navbar;
