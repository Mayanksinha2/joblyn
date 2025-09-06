import React from 'react';
import { Star, Briefcase } from 'lucide-react';

interface CompanyCardProps {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: string;
  openings: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, logo, rating, reviews, openings }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <img src={logo} alt={name} className="w-14 h-14 object-contain" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-sm text-gray-500">({reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase size={16} />
          <span>{openings} Active Jobs</span>
        </div>
      </div>

      <button className="w-full mt-4 py-2 border border-naukri-blue text-naukri-blue rounded hover:bg-naukri-blue hover:text-white transition-colors font-medium">
        View Jobs
      </button>
    </div>
  );
};

export default CompanyCard;