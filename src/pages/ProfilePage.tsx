import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit3, Upload, Plus, Building2, DollarSign, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const profileData = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    location: "Bangalore, Karnataka",
    experience: "5 Years",
    currentRole: "Senior Software Engineer",
    currentCompany: "Tech Solutions Ltd.",
    expectedSalary: "₹20-25 LPA",
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Docker"],
    resume: "John_Doe_Resume.pdf",
    profileCompletion: 85
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={48} className="text-gray-400" />
                </div>
                <button className="text-naukri-blue hover:underline text-sm">
                  Upload Photo
                </button>
              </div>

              {/* Profile Completion */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm font-bold text-naukri-blue">{profileData.profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-naukri-blue h-2 rounded-full"
                    style={{ width: `${profileData.profileCompletion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Complete your profile to increase visibility
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-semibold">245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applied Jobs</span>
                  <span className="font-semibold">38</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saved Jobs</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-3 text-center font-medium ${
                    activeTab === 'profile' 
                      ? 'text-naukri-blue border-b-2 border-naukri-blue' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`flex-1 py-3 text-center font-medium ${
                    activeTab === 'resume' 
                      ? 'text-naukri-blue border-b-2 border-naukri-blue' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Resume
                </button>
                <button
                  onClick={() => setActiveTab('applied')}
                  className={`flex-1 py-3 text-center font-medium ${
                    activeTab === 'applied' 
                      ? 'text-naukri-blue border-b-2 border-naukri-blue' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Applied Jobs
                </button>
              </div>
            </div>

            {/* Profile Tab Content */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                                        <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-naukri-blue hover:underline flex items-center gap-1"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium">{profileData.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{profileData.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{profileData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{profileData.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Professional Information</h2>
                    <button className="text-naukri-blue hover:underline flex items-center gap-1">
                      <Edit3 size={16} />
                      Edit
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Current Role</p>
                        <p className="font-medium">{profileData.currentRole}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Building2 className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Current Company</p>
                        <p className="font-medium">{profileData.currentCompany}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Total Experience</p>
                        <p className="font-medium">{profileData.experience}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <DollarSign className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Expected Salary</p>
                        <p className="font-medium">{profileData.expectedSalary}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <button className="text-naukri-blue hover:underline flex items-center gap-1">
                      <Plus size={16} />
                      Add Skill
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full flex items-center gap-2"
                      >
                        {skill}
                        <button className="text-gray-400 hover:text-red-500">
                          <X size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Resume Tab Content */}
            {activeTab === 'resume' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Resume</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {profileData.resume ? `Current: ${profileData.resume}` : 'No resume uploaded'}
                  </p>
                  <button className="bg-naukri-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                    Upload New Resume
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: PDF, DOC, DOCX (Max 2MB)
                  </p>
                </div>
              </div>
            )}

            {/* Applied Jobs Tab */}
            {activeTab === 'applied' && (
              <div className="space-y-4">
                {[1, 2, 3].map((job) => (
                  <div key={job} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Frontend Developer</h3>
                        <p className="text-gray-600 mb-2">ABC Technologies</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Applied on: 15 Jan 2024</span>
                          <span>•</span>
                          <span className="text-green-600">Application Viewed</span>
                        </div>
                      </div>
                      <button className="text-naukri-blue hover:underline">
                        View Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;