import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Naukri</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition">Employer Home</Link></li>
              <li><Link to="#" className="hover:text-white transition">Sitemap</Link></li>
              <li><Link to="#" className="hover:text-white transition">Credits</Link></li>
              <li><Link to="#" className="hover:text-white transition">Help Center</Link></li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Job Seekers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white transition">Register Now</Link></li>
              <li><Link to="#" className="hover:text-white transition">Search Jobs</Link></li>
              <li><Link to="#" className="hover:text-white transition">Login</Link></li>
              <li><Link to="#" className="hover:text-white transition">Create Job Alert</Link></li>
              <li><Link to="#" className="hover:text-white transition">Report a Problem</Link></li>
              <li><Link to="#" className="hover:text-white transition">Mobile App</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Employers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white transition">Post Jobs</Link></li>
              <li><Link to="#" className="hover:text-white transition">Browse Candidates</Link></li>
              <li><Link to="#" className="hover:text-white transition">Employer Login</Link></li>
              <li><Link to="#" className="hover:text-white transition">Job Posting</Link></li>
              <li><Link to="#" className="hover:text-white transition">Recruiter Profiles</Link></li>
              <li><Link to="#" className="hover:text-white transition">Buy Online</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white transition">Resume Writing</Link></li>
              <li><Link to="#" className="hover:text-white transition">Priority Applicant</Link></li>
              <li><Link to="#" className="hover:text-white transition">Resume Display</Link></li>
              <li><Link to="#" className="hover:text-white transition">Jobs on Mail & SMS</Link></li>
              <li><Link to="#" className="hover:text-white transition">Career Booster</Link></li>
              <li><Link to="#" className="hover:text-white transition">Search Booster</Link></li>
            </ul>
          </div>
                    {/* Connect */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-3 mb-6">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Youtube size={20} />
              </a>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Download App</h4>
              <a href="#" className="block">
                <img src="https://static.naukimg.com/s/0/0/i/new-homepage/android-app.png" alt="Google Play" className="h-10" />
              </a>
              <a href="#" className="block">
                <img src="https://static.naukimg.com/s/0/0/i/new-homepage/ios-app.png" alt="App Store" className="h-10" />
              </a>
            </div>

            <div className="mt-6 space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <Phone size={16} /> 1800-102-5558
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> support@naukri.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Naukri.com Clone. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4 text-sm text-gray-400">
              <Link to="#" className="hover:text-white">Privacy Policy</Link>
              <Link to="#" className="hover:text-white">Terms & Conditions</Link>
              <Link to="#" className="hover:text-white">Fraud Alert</Link>
              <Link to="#" className="hover:text-white">Trust & Safety</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;