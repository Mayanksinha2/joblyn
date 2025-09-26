import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy icons (replace with your icon library if needed)
const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block w-5 text-center mr-3">{children}</span>
);

const SIDEBAR_OPTIONS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "users", label: "User Management", icon: "👥" },
  { key: "companies", label: "Companies", icon: "🏢" },
  { key: "jobs", label: "Jobs", icon: "💼" },
  { key: "payments", label: "Payments", icon: "💳" },
  { key: "roles", label: "Roles & Permissions", icon: "🛡️" },
];

const DUMMY_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "HR Manager",
    status: "Active",
    lastLogin: "5 hours ago",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Recruiter",
    status: "Inactive",
    lastLogin: "2 days ago",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "Content Manager",
    status: "Active",
    lastLogin: "1 hour ago",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const DUMMY_COMPANIES = [
  {
    id: 1,
    name: "TechCorp Inc.",
    industry: "Technology",
    location: "San Francisco, CA",
    employees: "1000-5000",
    jobsPosted: 15,
    registered: "1/15/2024",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 2,
    name: "StartupXYZ",
    industry: "Fintech",
    location: "New York, NY",
    employees: "50-200",
    jobsPosted: 8,
    registered: "2/1/2024",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 3,
    name: "Global Solutions",
    industry: "Consulting",
    location: "Remote",
    employees: "200-1000",
    jobsPosted: 12,
    registered: "3/10/2024",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const DUMMY_JOBS = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    status: "Active",
    applicants: 24,
    posted: "2/15/2024",
    category: "Engineering",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$110k - $140k",
    type: "Full-time",
    status: "Active",
    applicants: 18,
    posted: "2/12/2024",
    category: "Product",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Global Solutions",
    location: "Remote",
    salary: "$90k - $110k",
    type: "Remote",
    status: "Active",
    applicants: 32,
    posted: "2/10/2024",
    category: "Design",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Innovation Hub",
    location: "Boston, MA",
    salary: "$130k - $160k",
    type: "Full-time",
    status: "Closed",
    applicants: 45,
    posted: "2/8/2024",
    category: "Data & Analytics",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "Digital Dynamics",
    location: "Austin, TX",
    salary: "$60k - $80k",
    type: "Full-time",
    status: "Draft",
    applicants: 0,
    posted: "2/14/2024",
    category: "Marketing",
  },
];

const DUMMY_ROLES = [
  {
    name: "Super Admin",
    description: "Full access to all system features and settings",
    users: 2,
    permissions: 12,
    color: "red",
  },
  {
    name: "HR Manager",
    description: "Manages users, companies, and job postings",
    users: 5,
    permissions: 7,
    color: "blue",
  },
  {
    name: "Recruiter",
    description: "Can manage job postings and view applications",
    users: 3,
    permissions: 5,
    color: "green",
  },
];

const DUMMY_PERMISSIONS = [
  "View Users",
  "Edit Users",
  "Delete Users",
  "View Jobs",
  "Approve Jobs",
  "Delete Jobs",
  "View Companies",
  "Approve Companies",
  "Delete Companies",
  "Manage Payments",
  "View Roles",
  "Edit Roles",
];

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Dummy stats for dashboard
  const stats = {
    companies: 1247,
    jobs: 3456,
    users: 12389,
    payments: "$45,678",
    companiesChange: "+12.5%",
    jobsChange: "+8.2%",
    usersChange: "+15.3%",
    paymentsChange: "+5.7%",
  };

  // Dummy filter state for jobs/companies/users
  const [jobStatus, setJobStatus] = useState("All Status");
  const [jobType, setJobType] = useState("All Types");
  const [companyStatus, setCompanyStatus] = useState("All Status");
  const [userRole, setUserRole] = useState("All Roles");
  const [search, setSearch] = useState("");

  // Admin login check
  useEffect(() => {
    const loggedIn = JSON.parse(
      localStorage.getItem("joblyn_loggedin") || "null"
    );
    if (!loggedIn || loggedIn.type !== "admin") navigate("/");
  }, [navigate]);

  // Filtered data
  const filteredJobs = DUMMY_JOBS.filter(
    (job) =>
      (jobStatus === "All Status" || job.status === jobStatus) &&
      (jobType === "All Types" || job.type === jobType) &&
      (search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredCompanies = DUMMY_COMPANIES.filter(
    (company) =>
      (companyStatus === "All Status" || company.status === companyStatus) &&
      (search === "" ||
        company.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredUsers = DUMMY_USERS.filter(
    (user) =>
      (userRole === "All Roles" || user.role === userRole) &&
      (search === "" ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
  );

  // Date for dashboard
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center py-8 border-b">
            <span className="text-2xl font-bold mb-1">Joblyn</span>
            <span className="text-xs text-gray-500 mb-4">Admin Dashboard</span>
          </div>
          <nav className="flex flex-col mt-4">
            {SIDEBAR_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                className={`flex items-center px-6 py-3 text-left transition-colors ${
                  activeTab === opt.key
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab(opt.key);
                  setSelectedRole(null);
                  setSearch("");
                }}
              >
                <Icon>{opt.icon}</Icon>
                {opt.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          <button
            onClick={() => {
              localStorage.removeItem("joblyn_loggedin");
              navigate("/");
            }}
            className="w-full px-4 py-2 rounded border border-gray-300 text-gray-600 bg-gray-100 hover:bg-red-500 hover:text-white font-bold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Dashboard Overview
              </h2>
              <div className="text-gray-500">{today}</div>
            </div>
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded shadow p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 p-2 rounded mr-2">
                    <Icon>🏢</Icon>
                  </span>
                  <span className="text-gray-500">Companies Registered</span>
                </div>
                <div className="text-3xl font-bold">{stats.companies}</div>
                <div className="text-green-600 text-sm">
                  {stats.companiesChange} vs last month
                </div>
              </div>
              <div className="bg-white rounded shadow p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 p-2 rounded mr-2">
                    <Icon>💼</Icon>
                  </span>
                  <span className="text-gray-500">Jobs Posted</span>
                </div>
                <div className="text-3xl font-bold">{stats.jobs}</div>
                <div className="text-green-600 text-sm">
                  {stats.jobsChange} vs last month
                </div>
              </div>
              <div className="bg-white rounded shadow p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-purple-100 p-2 rounded mr-2">
                    <Icon>👥</Icon>
                  </span>
                  <span className="text-gray-500">Total Users</span>
                </div>
                <div className="text-3xl font-bold">{stats.users}</div>
                <div className="text-green-600 text-sm">
                  {stats.usersChange} vs last month
                </div>
              </div>
              <div className="bg-white rounded shadow p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-pink-100 p-2 rounded mr-2">
                    <Icon>$</Icon>
                  </span>
                  <span className="text-gray-500">Payments Made</span>
                </div>
                <div className="text-3xl font-bold">{stats.payments}</div>
                <div className="text-green-600 text-sm">
                  {stats.paymentsChange} vs last month
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded shadow p-6">
                <div className="font-semibold mb-2">Recent Companies</div>
                {DUMMY_COMPANIES.slice(0, 3).map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <div>
                      <span className="font-medium">{company.name}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {company.registered}{" "}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        company.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {company.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded shadow p-6">
                <div className="font-semibold mb-2">Recent Jobs</div>
                {DUMMY_JOBS.slice(0, 4).map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <div>
                      <span className="font-medium">{job.title}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {job.company} • {job.posted}
                      </span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {job.applicants} applicants
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* USER MANAGEMENT */}
        {activeTab === "users" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">User Management</h2>
                <div className="text-gray-500 text-sm">
                  Manage admin users, roles, and permissions
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold">
                + Add User
              </button>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-1/3 mr-4"
              />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option>All Roles</option>
                <option>Super Admin</option>
                <option>HR Manager</option>
                <option>Recruiter</option>
                <option>Content Manager</option>
              </select>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">User</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Last Login</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2 border flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border">{user.role}</td>
                      <td className="p-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-2 border text-xs text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="p-2 border">
                        <button className="text-gray-500 hover:text-blue-600 mr-2">
                          <span role="img" aria-label="edit">
                            ✏️
                          </span>
                        </button>
                        <button className="text-gray-500 hover:text-red-600">
                          <span role="img" aria-label="delete">
                            🗑️
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* COMPANIES */}
        {activeTab === "companies" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Company Management</h2>
                <div className="text-gray-500 text-sm">
                  Manage registered companies and their job postings
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="bg-white rounded shadow px-4 py-2 flex items-center">
                  <span className="text-green-600 font-bold mr-2">
                    {
                      DUMMY_COMPANIES.filter((c) => c.status === "Active")
                        .length
                    }
                  </span>
                  <span className="text-gray-500 text-sm">
                    Active Companies
                  </span>
                </div>
                <div className="bg-white rounded shadow px-4 py-2 flex items-center">
                  <span className="text-yellow-600 font-bold mr-2">
                    {
                      DUMMY_COMPANIES.filter((c) => c.status === "Pending")
                        .length
                    }
                  </span>
                  <span className="text-gray-500 text-sm">
                    Pending Approval
                  </span>
                </div>
                <div className="bg-white rounded shadow px-4 py-2 flex items-center">
                  <span className="text-blue-600 font-bold mr-2">
                    {DUMMY_JOBS.length}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Total Jobs Posted
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-1/3 mr-4"
              />
              <select
                value={companyStatus}
                onChange={(e) => setCompanyStatus(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {filteredCompanies.length === 0 && (
                <div className="col-span-2 text-center text-gray-500 py-8">
                  No companies found.
                </div>
              )}
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded shadow p-6 flex flex-col"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={company.avatar}
                      alt={company.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold">{company.name}</div>
                      <div className="text-xs text-gray-500">
                        {company.industry}
                      </div>
                    </div>
                    <span
                      className={`ml-auto px-2 py-1 rounded text-xs ${
                        company.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {company.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {company.location} • {company.employees} employees
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {company.jobsPosted} jobs posted • Registered{" "}
                    {company.registered}
                  </div>
                  <div className="flex space-x-2 mt-auto">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                      View
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* JOBS */}
        {activeTab === "jobs" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Jobs</h2>
                <div className="text-gray-500 text-sm">
                  Manage all job postings and applicants
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <select
                  value={jobStatus}
                  onChange={(e) => setJobStatus(e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Closed</option>
                  <option>Draft</option>
                </select>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Remote</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Job Details</th>
                    <th className="p-2 border">Company</th>
                    <th className="p-2 border">Location</th>
                    <th className="p-2 border">Salary</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Applicants</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-4 text-center text-gray-500">
                        No jobs found.
                      </td>
                    </tr>
                  )}
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b">
                      <td className="p-2 border">
                        <div className="font-semibold">{job.title}</div>
                        <div className="text-xs text-gray-500">
                          {job.category}
                        </div>
                        <div className="text-xs text-gray-400">
                          Posted {job.posted}
                        </div>
                      </td>
                      <td className="p-2 border">{job.company}</td>
                      <td className="p-2 border">{job.location}</td>
                      <td className="p-2 border">{job.salary}</td>
                      <td className="p-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            job.type === "Full-time"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {job.type}
                        </span>
                      </td>
                      <td className="p-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            job.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : job.status === "Closed"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="p-2 border">
                        <span className="flex items-center">
                          <Icon>👥</Icon>
                          {job.applicants}
                        </span>
                      </td>
                      <td className="p-2 border">
                        <button className="text-gray-500 hover:text-blue-600 mr-2">
                          <span role="img" aria-label="view">
                            👁️
                          </span>
                        </button>
                        <button className="text-gray-500 hover:text-red-600 mr-2">
                          <span role="img" aria-label="delete">
                            🗑️
                          </span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-800">
                          <span role="img" aria-label="more">
                            ⋯
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* PAYMENTS */}
        {activeTab === "payments" && (
          <div className="bg-white rounded shadow p-6">
            <div className="text-gray-600">
              Payments management coming soon...
            </div>
          </div>
        )}

        {/* ROLES & PERMISSIONS */}
        {activeTab === "roles" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Roles & Permissions</h2>
                <div className="text-gray-500 text-sm">
                  Manage user roles and their permissions across the platform
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold">
                + Create Role
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded shadow p-6 flex items-center">
                <span className="bg-red-100 p-2 rounded mr-3">
                  <Icon>🛡️</Icon>
                </span>
                <div>
                  <div className="text-gray-500">Total Roles</div>
                  <div className="text-2xl font-bold">{DUMMY_ROLES.length}</div>
                </div>
              </div>
              <div className="bg-white rounded shadow p-6 flex items-center">
                <span className="bg-green-100 p-2 rounded mr-3">
                  <Icon>👥</Icon>
                </span>
                <div>
                  <div className="text-gray-500">Total Users</div>
                  <div className="text-2xl font-bold">{DUMMY_USERS.length}</div>
                </div>
              </div>
              <div className="bg-white rounded shadow p-6 flex items-center">
                <span className="bg-purple-100 p-2 rounded mr-3">
                  <Icon>⚙️</Icon>
                </span>
                <div>
                  <div className="text-gray-500">Permissions</div>
                  <div className="text-2xl font-bold">
                    {DUMMY_PERMISSIONS.length}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* System Roles */}
              <div className="col-span-1 bg-white rounded shadow p-6">
                <div className="font-semibold mb-2">System Roles</div>
                {DUMMY_ROLES.map((role) => (
                  <div
                    key={role.name}
                    className={`mb-3 p-3 rounded border cursor-pointer ${
                      selectedRole === role.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedRole(role.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={`font-bold ${
                            role.color === "red"
                              ? "text-red-600"
                              : role.color === "blue"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {role.name}
                        </span>
                        <div className="text-xs text-gray-500">
                          {role.description}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 text-right">
                        {role.users} users
                        <br />
                        {role.permissions} permissions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Role Permissions */}
              <div className="col-span-2 bg-white rounded shadow p-6">
                <div className="font-semibold mb-2">Role Permissions</div>
                {!selectedRole ? (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                    <span className="text-4xl mb-2">🛡️</span>
                    <div>No role selected</div>
                    <div className="text-xs">
                      Select a role from the list to view its permissions
                    </div>
                  </div>
                ) : (
                  <ul className="list-disc pl-6">
                    {DUMMY_PERMISSIONS.slice(
                      0,
                      Math.floor(Math.random() * DUMMY_PERMISSIONS.length) + 3
                    ).map((perm, idx) => (
                      <li key={idx} className="mb-1">
                        {perm}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
