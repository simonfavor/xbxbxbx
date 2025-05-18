import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaLock, FaUser, FaFingerprint } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PublicNavbar from './components/navbar'; // Adjust path if needed
import Footer from './components/footer'; // Adjust path if needed

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 9,
      },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrUsername.trim()) newErrors.emailOrUsername = 'Email or Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://xbxbxb.onrender.com/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      toast.success('Logged in successfully!');
      navigate('/account/dashboard');
    } catch (error) {
      setErrors({ general: error.response?.data?.message || 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className="bg-gradient-to-b from-neutral-light to-white min-h-screen py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <motion.div
              className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Welcome Back to GNF Invest</h2>
              <p className="mb-8 opacity-90">Access your portfolio, track your investments, and continue building your financial future.</p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <FaFingerprint className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Access</h3>
                    <p className="text-sm opacity-80">Your financial data is protected with bank-level security</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Real-time Updates</h3>
                    <p className="text-sm opacity-80">Track your investments with instant market updates</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10">
                <svg width="300" height="300" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="300" cy="300" r="250" stroke="white" strokeWidth="10" />
                  <path d="M300 50L300 550" stroke="white" strokeWidth="10" />
                  <path d="M50 300L550 300" stroke="white" strokeWidth="10" />
                  <circle cx="300" cy="300" r="50" fill="white" />
                  <path d="M300 150C381.797 150 450 218.203 450 300C450 381.797 381.797 450 300 450" stroke="white" strokeWidth="10" />
                </svg>
              </div>
            </motion.div>
            <motion.div className="md:w-1/2 p-12" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-dark mb-2">Sign In</h1>
                <p className="text-gray-600">Enter your credentials to access your account</p>
              </motion.div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div className="space-y-1" variants={fieldVariants}>
                  <label htmlFor="emailOrUsername" className="block text-neutral-dark font-semibold text-sm">
                    Email or Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      id="emailOrUsername"
                      name="emailOrUsername"
                      value={formData.emailOrUsername}
                      onChange={handleChange}
                      placeholder="Enter your email or username"
                      className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                        errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.emailOrUsername && <p className="text-red-500 text-sm mt-1">{errors.emailOrUsername}</p>}
                </motion.div>
                <motion.div className="space-y-1" variants={fieldVariants} transition={{ delay: 0.1 }}>
                  <label htmlFor="password" className="block text-neutral-dark font-semibold text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </motion.div>
                <motion.div className="flex items-center justify-between" variants={fieldVariants} transition={{ delay: 0.2 }}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:text-teal-700 transition-colors">
                  </a>
                </motion.div>
                {errors.general && <p className="text-red-500 text-sm mt-4 text-center">{errors.general}</p>}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-all duration-300"
                  variants={fieldVariants}
                  transition={{ delay: 0.3 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </motion.button>
                <motion.div className="text-center text-sm text-gray-600" variants={fieldVariants} transition={{ delay: 0.4 }}>
                  Don't have an account?{' '}
                  <a href="/signin" className="text-primary hover:text-teal-700 font-semibold transition-colors">
                    Sign up
                  </a>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;