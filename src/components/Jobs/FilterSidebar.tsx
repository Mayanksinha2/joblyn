import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['experience', 'salary', 'location']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Experience Filter */}
      <div className="border-b">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
        >
          <h3 className="font-semibold">Experience</h3>
          {expandedSections.includes('experience') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.includes('experience') && (
          <div className="px-6 pb-4 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>0-2 years</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>2-5 years</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>5-10 years</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>10+ years</span>
            </label>
          </div>
        )}
      </div>

      {/* Salary Filter */}
      <div className="border-b">
        <button
          onClick={() => toggleSection('salary')}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
        >
          <h3 className="font-semibold">Salary</h3>
          {expandedSections.includes('salary') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.includes('salary') && (
          <div className="px-6 pb-4 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>0-3 Lakhs</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>3-6 Lakhs</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>6-10 Lakhs</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>10-15 Lakhs</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>15+ Lakhs</span>
            </label>
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="border-b">
        <button
          onClick={() => toggleSection('location')}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
        >
          <h3 className="font-semibold">Location</h3>
          {expandedSections.includes('location') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.includes('location') && (
          <div className="px-6 pb-4">
            <input
              type="text"
              placeholder="Search location"
              className="w-full p-2 border rounded mb-3"
            />
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Bangalore</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Mumbai</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Delhi NCR</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Hyderabad</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Chennai</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Company Type */}
      <div className="border-b">
        <button
          onClick={() => toggleSection('companyType')}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
        >
          <h3 className="font-semibold">Company Type</h3>
          {expandedSections.includes('companyType') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.includes('companyType') && (
          <div className="px-6 pb-4 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>MNC</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Startup</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Indian MNC</span>
            </label>
                       <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Corporate</span>
            </label>
          </div>
        )}
      </div>

      {/* Work Mode */}
      <div className="border-b">
        <button
          onClick={() => toggleSection('workMode')}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
        >
          <h3 className="font-semibold">Work Mode</h3>
          {expandedSections.includes('workMode') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.includes('workMode') && (
          <div className="px-6 pb-4 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Work from Office</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Remote</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Hybrid</span>
            </label>
          </div>
        )}
      </div>

      {/* Clear All Button */}
      <div className="p-4">
        <button className="w-full py-2 border border-naukri-blue text-naukri-blue rounded hover:bg-naukri-blue hover:text-white transition-colors">
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;