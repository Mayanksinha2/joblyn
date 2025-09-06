import React, { useState } from 'react';
import { Search, MapPin, TrendingUp } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const trendingSearches = [
    "React Developer", "Data Scientist", "Product Manager", 
    "Full Stack Developer", "Business Analyst", "UI/UX Designer"
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Find your dream job now
        </h1>
        <p className="text-white text-center mb-8 text-lg">5 lakh+ jobs for you to explore</p>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-2 flex flex-col lg:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 border-r border-gray-200">
              <Search className="text-gray-400 mr-3 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Enter skills / designations / companies"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full py-4 outline-none text-gray-700"
              />
            </div>
            
            <div className="flex-1 flex items-center px-4 border-r border-gray-200">
              <MapPin className="text-gray-400 mr-3 flex-shrink-0" size={20} />
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-4 outline-none text-gray-700"
              />
            </div>

            <div className="flex items-center px-4 border-r border-gray-200">
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="py-4 outline-none text-gray-700 bg-transparent cursor-pointer"
              >
                <option value="">Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            
            <button className="bg-naukri-blue text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Search
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center flex-wrap gap-2">
            <TrendingUp className="text-white" size={16} />
            <span className="text-white text-sm">Trending Searches:</span>
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                className="text-white text-sm hover:underline px-2 py-1 bg-white/10 rounded-full"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;