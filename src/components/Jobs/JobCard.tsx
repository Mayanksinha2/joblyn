import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Bookmark, Clock, Home } from 'lucide-react';

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  postedOn: string;
  tags: string[];
  isRemote?: boolean;
  logo?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  experience,
  salary,
  postedOn,
  tags,
  isRemote,
  logo
}) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {logo ? (
              <img src={logo} alt={company} className="w-12 h-12 object-contain" />
            ) : (
              <Briefcase className="text-gray-400" size={24} />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-naukri-blue transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 font-medium">{company}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className={`p-2 rounded-full transition-all ${
            isSaved ? 'bg-blue-100 text-naukri-blue' : 'hover:bg-gray-100 text-gray-400'
          }`}
        >
          <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {experience}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={14} />
            {salary}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {location}
          </span>
          {isRemote && (
            <span className="flex items-center gap-1 text-green-600">
              <Home size={14} />
              Remote
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            +{tags.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-1 text-gray-500">
          <Clock size={14} />
          {postedOn}
        </span>
        <button className="text-naukri-blue hover:underline font-medium">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;