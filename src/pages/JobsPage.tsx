import React, { useState } from 'react';
import { Filter, Search, MapPin, X } from 'lucide-react';
import JobCard from '../components/Jobs/JobCard';
import FilterSidebar from '../components/Jobs/FilterSidebar';

const JobsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Infosys",
      location: "Bangalore, Pune",
      experience: "4-7 Years",
      salary: "₹12-18 LPA",
      postedOn: "Today",
      tags: ["React", "JavaScript", "Redux", "TypeScript", "Jest"],
      isRemote: true,
      logo: "https://img.naukimg.com/logo_images/groups/v1/1288.gif"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "TCS",
      location: "Mumbai, Delhi",
      experience: "3-5 Years",
      salary: "₹8-12 LPA",
      postedOn: "Yesterday",
      tags: ["Node.js", "React", "MongoDB", "Express", "AWS"],
      isRemote: false,
      logo: "https://img.naukimg.com/logo_images/groups/v1/599850.gif"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Wipro",
      location: "Hyderabad",
      experience: "5-8 Years",
      salary: "₹15-22 LPA",
      postedOn: "2 days ago",
      tags: ["AWS", "Docker", "Kubernetes", "Jenkins", "Python"],
      isRemote: true,
      logo: "https://img.naukimg.com/logo_images/groups/v1/419316.gif"
    },
    // Add more jobs...
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center px-4 border rounded-lg bg-gray-50">
              <Search className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search jobs by skills, role"
                className="w-full py-3 bg-transparent outline-none"
              />
            </div>
            <div className="flex-1 flex items-center px-4 border rounded-lg bg-gray-50">
              <MapPin className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="w-full py-3 bg-transparent outline-none"
              />
            </div>
            <button className="bg-naukri-blue text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-80">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-lg p-4 mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold">1,234 Jobs Found</h1>
                <p className="text-gray-600">Based on your search and filters</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-4 py-2 outline-none"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="date">Sort by Date</option>
                  <option value="salary">Sort by Salary</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 border rounded-lg px-4 py-2"
                >
                  <Filter size={20} />
                  Filters
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-naukri-blue text-white rounded-lg">1</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">3</button>
                <span className="px-2">...</span>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">10</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;