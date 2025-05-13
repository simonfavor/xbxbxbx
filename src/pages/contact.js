import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      } 
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      } 
    },
  };

  const contactItems = [
    {
      icon: <FaPhone className="text-primary" size={24} />,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri: 8am-8pm"
    },
    {
      icon: <FaEnvelope className="text-primary" size={24} />,
      title: "Email Us",
      info: "support@gnfinvest.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="text-primary" size={24} />,
      title: "Visit Us",
      info: "123 Finance Ave, New York",
      description: "Schedule an appointment"
    }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-neutral-100 to-white min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.section
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6 relative inline-block"
              variants={itemVariants}
            >
              <span className="relative z-10">Contact GNF Invest</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-primary opacity-20 -z-10 transform -rotate-1"></span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Our team of investment specialists is ready to guide you on your financial journey. 
              Whether you have questions about our services or need personalized investment advice, 
              we're here to help you build a secure financial future.
            </motion.p>
          </motion.section>

          {/* Contact Info Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary bg-opacity-10 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">{item.title}</h3>
                <p className="text-primary font-semibold mb-1">{item.info}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
            {/* Illustration */}
            <motion.div 
              className="lg:w-2/5 flex items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-md">
                <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  {/* Background shape */}
                  <path d="M50,250 Q150,50 300,150 Q450,250 550,200 Q450,350 300,350 Q150,450 50,250" 
                        fill="#f0f9ff" stroke="none" />
                  
                  {/* Person */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {/* Body */}
                    <rect x="250" y="200" width="100" height="150" rx="20" fill="#4f46e5" />
                    {/* Head */}
                    <circle cx="300" cy="170" r="40" fill="#f8fafc" />
                    {/* Arms */}
                    <rect x="200" y="220" width="80" height="30" rx="15" fill="#4f46e5" />
                    <rect x="320" y="220" width="80" height="30" rx="15" fill="#4f46e5" />
                  </motion.g>
                  
                  {/* Computer/Device */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <rect x="260" y="250" width="80" height="60" rx="5" fill="#f8fafc" />
                    <rect x="265" y="255" width="70" height="45" rx="3" fill="#cbd5e1" />
                  </motion.g>
                  
                  {/* Message bubbles */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <circle cx="370" cy="150" r="30" fill="#4f46e5" />
                    <circle cx="400" cy="120" r="20" fill="#4f46e5" />
                    <circle cx="420" cy="100" r="10" fill="#4f46e5" />
                  </motion.g>
                  
                  {/* Financial symbols */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                  >
                    <text x="380" y="155" fontSize="24" fill="white">$</text>
                    <text x="170" y="200" fontSize="24" fill="#4f46e5">%</text>
                    <text x="420" y="240" fontSize="24" fill="#4f46e5">₿</text>
                  </motion.g>
                </svg>
              </div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.section
              className="lg:w-3/5 bg-white p-8 rounded-xl shadow-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaPaperPlane className="text-primary text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">Send Us a Message</h2>
                  
                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="name" className="block text-neutral-dark font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </motion.div>

                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="email" className="block text-neutral-dark font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </motion.div>

                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="subject" className="block text-neutral-dark font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Investment Inquiry"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </motion.div>

                  <motion.div variants={formFieldVariants}>
                    <label htmlFor="message" className="block text-neutral-dark font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="I'm interested in learning more about your investment opportunities..."
                      rows="5"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </motion.div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.section>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;