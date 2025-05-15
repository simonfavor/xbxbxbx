import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaLock, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PublicNavbar from './components/navbar'; // Adjust path if needed
import Footer from './components/footer'; // Adjust path if needed

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    phone: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const pageTransition = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
      if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    }
    if (step === 2) {
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
      if (!formData.country) newErrors.country = 'Country is required';
    }
    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one number, and one special character';
      }
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    return newErrors;
  };

  const handleNextStep = () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setCurrentStep(currentStep + 1);
    setErrors({});
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://xbxbxb.onrender.com/api/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('UserData', response.data.user);
      toast.success('Signed up successfully!');
      navigate('/account/dashboard');
    } catch (error) {
      setErrors({ general: error.response?.data?.message || 'Signup failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'India',
    'Brazil',
    'South Africa',
    'Other',
  ];

  const progressPercentage = ((currentStep - 1) / 2) * 100;

  return (
    <>
      <PublicNavbar />
      <div className="bg-gradient-to-b from-neutral-light to-white min-h-screen py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary text-white p-8">
              <h1 className="text-3xl font-bold mb-4">Join GNF Invest</h1>
              <p className="opacity-90 mb-6">Create your account to start your investment journey with us</p>
              <div className="w-full bg-white bg-opacity-20 h-2 rounded-full mb-2">
                <motion.div
                  className="bg-white h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
              <div className="flex justify-between text-sm opacity-90">
                <span>Account Information</span>
                <span>Personal Details</span>
                <span>Security</span>
              </div>
            </div>
            <div className="p-8">
              <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
                {currentStep === 1 && (
                  <motion.div className="space-y-6" {...pageTransition} variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2 className="text-2xl font-bold text-neutral-dark mb-6 flex items-center" variants={itemVariants}>
                      <FaUser className="mr-3 text-primary" />
                      Account Information
                    </motion.h2>
                    <motion.div variants={fieldVariants}>
                      <label htmlFor="username" className="block text-neutral-dark font-semibold mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a unique username"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                          errors.username ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={fieldVariants}>
                        <label htmlFor="firstName" className="block text-neutral-dark font-semibold mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Your first name"
                          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </motion.div>
                      <motion.div variants={fieldVariants}>
                        <label htmlFor="lastName" className="block text-neutral-dark font-semibold mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Your last name"
                          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </motion.div>
                    </div>
                    <motion.div variants={fieldVariants}>
                      <label htmlFor="email" className="block text-neutral-dark font-semibold mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </motion.div>
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div className="space-y-6" {...pageTransition} variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2 className="text-2xl font-bold text-neutral-dark mb-6 flex items-center" variants={itemVariants}>
                      <FaMapMarkerAlt className="mr-3 text-primary" />
                      Personal Details
                    </motion.h2>
                    <motion.div variants={fieldVariants}>
                      <label htmlFor="dob" className="block text-neutral-dark font-semibold mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          <FaCalendarAlt />
                        </span>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.dob ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <label htmlFor="address" className="block text-neutral-dark font-semibold mb-2">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Your residential address"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      ></textarea>
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <label htmlFor="phone" className="block text-neutral-dark font-semibold mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (123) 456-7890"
                          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      <label htmlFor="country" className="block text-neutral-dark font-semibold mb-2">
                        Country
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          <FaGlobe />
                        </span>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.country ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </motion.div>
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div className="space-y-6" {...pageTransition} variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2 className="text-2xl font-bold text-neutral-dark mb-6 flex items-center" variants={itemVariants}>
                      <FaShieldAlt className="mr-3 text-primary" />
                      Security Setup
                    </motion.h2>
                    <motion.div variants={fieldVariants} className="relative">
                      <label htmlFor="password" className="block text-neutral-dark font-semibold mb-2">
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
                          placeholder="Create a strong password"
                          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      {formData.password && (
                        <div className="mt-3">
                          <div className="flex mb-1 gap-1">
                            <div
                              className={`h-1 flex-1 rounded-full ${formData.password.length > 0 ? 'bg-red-400' : 'bg-gray-200'}`}
                            ></div>
                            <div
                              className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? 'bg-orange-400' : 'bg-gray-200'}`}
                            ></div>
                            <div
                              className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-yellow-400' : 'bg-gray-200'}`}
                            ></div>
                            <div
                              className={`h-1 flex-1 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-400' : 'bg-gray-200'}`}
                            ></div>
                            <div
                              className={`h-1 flex-1 rounded-full ${/[!@#$%^&*]/.test(formData.password) ? 'bg-green-600' : 'bg-gray-200'}`}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 flex justify-between">
                            <span>Weak</span>
                            <span>Strong</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                    <motion.div variants={fieldVariants} className="relative">
                      <label htmlFor="confirmPassword" className="block text-neutral-dark font-semibold mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          <FaLock />
                        </span>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Re-enter your password"
                          className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </motion.div>
                    <motion.div variants={fieldVariants} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="font-semibold text-neutral-dark mb-2 flex items-center">
                        <FaShieldAlt className="mr-2 text-primary" />
                        Account Security
                      </h3>
                      <p className="text-sm text-gray-700">
                        At GNF Invest, we prioritize the security of your financial information. Your data is encrypted
                        with bank-level security standards and we implement strict privacy policies to protect your personal
                        details.
                      </p>
                    </motion.div>
                    <motion.div variants={fieldVariants} className="flex items-start">
                      <input
                        type="checkbox"
                        id="termsAgreement"
                        className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor="termsAgreement" className="ml-2 text-sm text-gray-700">
                        I agree to GNF Invest's <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I acknowledge that my
                        information will be processed according to these policies.
                      </label>
                    </motion.div>
                  </motion.div>
                )}
                {errors.general && <p className="text-red-500 text-sm mt-4 text-center">{errors.general}</p>}
                <div className="flex justify-between mt-10">
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  )}
                  {currentStep < 3 ? (
                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      className="ml-auto px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      className="ml-auto px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </motion.button>
                  )}
                </div>
                {currentStep === 1 && (
                  <div className="text-center mt-6 text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary hover:underline font-medium">
                      Log in
                    </a>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;