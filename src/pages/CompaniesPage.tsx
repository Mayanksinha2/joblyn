import React, { useState } from 'react';
import { Search, Star, Users, MapPin, TrendingUp } from 'lucide-react';

const CompaniesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "https://img.naukimg.com/logo_images/groups/v1/1063546.gif",
      industry: "Technology",
      rating: 4.5,
      reviews: "5.2K",
      employees: "10K+",
      location: "Bangalore, Mumbai, Hyderabad",
      openJobs: 156,
      description: "World's leading search engine and technology company"
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://img.naukimg.com/logo_images/groups/v1/240936.gif",
      industry: "Technology",
      rating: 4.3,
      reviews: "4.8K",
      employees: "5K+",
      location: "Bangalore, Hyderabad, Noida",
      openJobs: 234,
      description: "Leading software and cloud computing company"
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://img.naukimg.com/logo_images/groups/v1/1574056.gif",
      industry: "E-commerce",
      rating: 4.1,
      reviews: "6.5K",
      employees: "20K+",
      location: "Bangalore, Mumbai, Delhi NCR",
      openJobs: 342,
      description: "Global e-commerce and cloud computing giant"
    },
    // Add more companies...
  ];

  const industries = [
    "All Industries",
    "Technology",
    "E-commerce",
    "Banking & Finance",
    "Healthcare",
    "Manufacturing",
    "Consulting"
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Explore Top Companies
          </h1>
          <p className="text-white text-center mb-8">
            Discover great places to work and build your career
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-2 flex items-center">
              <Search className="text-gray-400 mx-3" size={20} />
              <input
                type="text"
                placeholder="Search companies by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 py-3 outline-none"
              />
              <button className="bg-naukri-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium">Filter by Industry:</span>
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry === 'All Industries' ? 'all' : industry)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  (industry === 'All Industries' && selectedIndustry === 'all') || 
                  industry === selectedIndustry
                    ? 'bg-naukri-blue text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{company.name}</h3>
                    <p className="text-gray-600 text-sm">{company.industry}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{company.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{company.rating}</span>
                      <span className="text-gray-500">({company.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users size={16} />
                      <span>{company.employees}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{company.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp size={16} />
                    <span>{company.openJobs} Active Jobs</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-naukri-blue text-white rounded hover:bg-blue-700 transition-colors">
                    View Jobs
                  </button>
                  <button className="flex-1 py-2 border border-naukri-blue text-naukri-blue rounded hover:bg-gray-50 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;