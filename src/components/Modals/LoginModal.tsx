import React, { useState } from "react";
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginType: "jobseeker" | "employer" | "admin";
}

const ADMIN_EMAIL = "admin@joblyn.com";
const ADMIN_PASSWORD = "admin123"; // Change for production

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  loginType: initialType,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<
    "jobseeker" | "employer" | "admin"
  >(initialType);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
    rememberMe: false,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Utility functions for local storage
  const getStorageKey = () =>
    loginType === "jobseeker"
      ? "joblyn_jobseekers"
      : loginType === "employer"
      ? "joblyn_employers"
      : "joblyn_admins";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginType === "admin") {
      // Admin login logic (hardcoded for demo)
      if (
        formData.email === ADMIN_EMAIL &&
        formData.password === ADMIN_PASSWORD
      ) {
        localStorage.setItem(
          "joblyn_loggedin",
          JSON.stringify({
            type: "admin",
            email: formData.email,
            name: "Admin",
          })
        );
        setMessage("Admin login successful!");
        setTimeout(() => {
          setMessage("");
          onClose();
          navigate("/admin-panel");
        }, 1000);
      } else {
        setMessage("Invalid admin credentials.");
      }
      return;
    }

    const key = getStorageKey();
    const users = JSON.parse(localStorage.getItem(key) || "[]");

    if (isLogin) {
      // Login logic
      const user = users.find(
        (u: any) =>
          u.email === formData.email && u.password === formData.password
      );
      if (user) {
        localStorage.setItem(
          "joblyn_loggedin",
          JSON.stringify({
            type: loginType,
            email: formData.email,
            name: user.name,
            id: user.id,
          })
        );
        setMessage("Login successful!");
        setTimeout(() => {
          setMessage("");
          onClose();
          if (loginType === "employer") {
            navigate("/employer-dashboard");
          } else if (loginType === "jobseeker") {
            navigate("/jobseeker-dashboard");
          }
        }, 1000);
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    } else {
      // Registration logic (not for admin)
      if (users.find((u: any) => u.email === formData.email)) {
        setMessage("User already exists with this email.");
        return;
      }
      const newUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        mobile: formData.mobile,
        id: Date.now(),
      };
      users.push(newUser);
      localStorage.setItem(key, JSON.stringify(users));
      setMessage("Registration successful! You can now login.");
      setIsLogin(true);
      setFormData({
        email: "",
        password: "",
        name: "",
        mobile: "",
        rememberMe: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {isLogin ? "Login" : "Create your account"}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {loginType === "jobseeker"
                ? "Find your dream job"
                : loginType === "employer"
                ? "Hire top talent"
                : "Admin access"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Login type tabs */}
        <div className="flex justify-center mb-6 space-x-2">
          <button
            onClick={() => {
              setLoginType("employer");
              setIsLogin(true);
              setMessage("");
            }}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              loginType === "employer"
                ? "bg-joblyn-blue text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Employer
          </button>
          <button
            onClick={() => {
              setLoginType("jobseeker");
              setIsLogin(true);
              setMessage("");
            }}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              loginType === "jobseeker"
                ? "bg-joblyn-blue text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Jobseeker
          </button>
          <button
            onClick={() => {
              setLoginType("admin");
              setIsLogin(true);
              setMessage("");
            }}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              loginType === "admin"
                ? "bg-joblyn-blue text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Shield className="inline-block mr-1" size={18} />
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Registration fields (not for admin) */}
          {!isLogin && loginType !== "admin" && (
            <>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-joblyn-blue"
                  required
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-joblyn-blue"
                  required
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-joblyn-blue"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:border-joblyn-blue"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember me and forgot password (not for admin) */}
          {isLogin && loginType !== "admin" && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-joblyn-blue hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-colors font-medium"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-red-500 font-semibold">
            {message}
          </div>
        )}

        {/* Social login (not for admin) */}
        {loginType !== "admin" && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                />
                Facebook
              </button>
            </div>
          </div>
        )}

        {/* Switch between login/register (not for admin) */}
        {loginType !== "admin" && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
                className="text-joblyn-blue hover:underline font-medium"
              >
                {isLogin ? "Register now" : "Login"}
              </button>
            </p>
          </div>
        )}

        {!isLogin && loginType !== "admin" && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            By registering, you agree to our{" "}
            <a href="#" className="text-joblyn-blue hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-joblyn-blue hover:underline">
              Privacy Policy
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
