import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';

const Home = () => {
  // Animation variants for staggered effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Plans data
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      features: ['Basic Analytics', '1 Portfolio', 'Email Support'],
    },
    {
      name: 'Growth',
      price: '$249',
      features: ['Advanced Analytics', '3 Portfolios', 'Priority Email Support'],
    },
    {
      name: 'Pro',
      price: '$499',
      features: ['Real-Time Data', '5 Portfolios', '24/7 Support'],
    },
    {
      name: 'Elite',
      price: '$999',
      features: ['Custom Strategies', '10 Portfolios', 'Dedicated Advisor'],
    },
    {
      name: 'Premium',
      price: '$1,999',
      features: ['Full Access', 'Unlimited Portfolios', 'Personal Wealth Manager'],
    },
  ];

  // Expanded testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      quote: 'GNF Invest transformed my financial journey with their intuitive platform and expert insights!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'Tech Entrepreneur',
      quote: 'The real-time analytics and secure trading features make GNF my go-to investment platform.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Emily Davis',
      role: 'Freelance Designer',
      quote: 'With GNF Invest, I feel confident managing my portfolio. Their support team is exceptional!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'David Wilson',
      role: 'Retired Teacher',
      quote: 'I never thought investing could be this straightforward. GNF made it possible for me to secure my retirement.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Healthcare Professional',
      quote: 'The educational resources and personalized guidance have helped me build wealth while working full time.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    },
    {
      name: 'James Taylor',
      role: 'Marketing Director',
      quote: 'GNF`s portfolio diversification strategies helped me navigate market volatility with confidence.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    }
  ];

  // State for testimonial carousel
  const [testimonialPosition, setTestimonialPosition] = useState(0);
  
  // Stats data
  const stats = [
    { value: '18.7%', label: 'Average ROI' },
    { value: '250K+', label: 'Active Investors' },
    { value: '$1.2B', label: 'Assets Managed' },
    { value: '99.9%', label: 'Uptime' },
  ];

  // Custom hook for scroll animation
  const useScrollAnimation = () => {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true });
    
    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);
    
    return { ref, controls, variants: containerVariants };
  };

  // References for sections
  const featuresAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const plansAnimation = useScrollAnimation();
  const whyChooseAnimation = useScrollAnimation();
  const faqAnimation = useScrollAnimation();
  const appAnimation = useScrollAnimation();

  // Testimonial carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialPosition((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Features data
  const features = [
    {
      title: "Smart Portfolio Management",
      description: "Automated rebalancing and diversification strategies to optimize your investments.",
      illustration: (
        <svg className="w-full h-48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="60" width="120" height="80" rx="8" fill="#e0f2fe" />
          <rect x="50" y="75" width="40" height="50" rx="4" fill="#0369a1" />
          <rect x="100" y="90" width="25" height="35" rx="4" fill="#0ea5e9" />
          <rect x="135" y="80" width="15" height="45" rx="4" fill="#7dd3fc" />
          <path d="M40 135 L160 135" stroke="#334155" strokeWidth="2" />
          <path d="M50 160 L150 160" stroke="#334155" strokeWidth="2" />
          <circle cx="50" cy="150" r="5" fill="#0369a1" />
          <circle cx="70" cy="150" r="5" fill="#0369a1" />
          <circle cx="90" cy="150" r="5" fill="#0369a1" />
          <path d="M40 50 C 80 30, 120 70, 160 50" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <circle cx="40" cy="50" r="3" fill="#0369a1" />
          <circle cx="80" cy="30" r="3" fill="#0369a1" />
          <circle cx="120" cy="70" r="3" fill="#0369a1" />
          <circle cx="160" cy="50" r="3" fill="#0369a1" />
        </svg>
      )
    },
    {
      title: "AI-Powered Market Analysis",
      description: "Leverage cutting-edge algorithms to predict market trends and identify opportunities.",
      illustration: (
        <svg className="w-full h-48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="60" fill="#f0fdfa" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#0d9488" strokeWidth="1" />
          <path d="M100 50 L100 150" stroke="#0d9488" strokeWidth="1" />
          <path d="M50 100 L150 100" stroke="#0d9488" strokeWidth="1" />
          <path d="M65 65 L135 135" stroke="#0d9488" strokeWidth="1" />
          <path d="M65 135 L135 65" stroke="#0d9488" strokeWidth="1" />
          <circle cx="100" cy="70" r="8" fill="#14b8a6" />
          <circle cx="130" cy="100" r="8" fill="#14b8a6" />
          <circle cx="100" cy="130" r="8" fill="#14b8a6" />
          <circle cx="70" cy="100" r="8" fill="#14b8a6" />
          <path d="M70 60 C 90 40, 110 40, 130 60" stroke="#0f766e" strokeWidth="2" fill="none" />
          <path d="M140 70 C 160 90, 160 110, 140 130" stroke="#0f766e" strokeWidth="2" fill="none" />
          <path d="M130 140 C 110 160, 90 160, 70 140" stroke="#0f766e" strokeWidth="2" fill="none" />
          <path d="M60 130 C 40 110, 40 90, 60 70" stroke="#0f766e" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="10" fill="#5eead4" />
        </svg>
      )
    },
    {
      title: "Real-Time Portfolio Tracking",
      description: "Monitor your investments 24/7 with instant notifications and performance metrics.",
      illustration: (
        <svg className="w-full h-48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="40" width="140" height="90" rx="5" fill="#f1f5f9" />
          <rect x="40" y="50" width="120" height="70" rx="3" fill="#e2e8f0" />
          <path d="M50 90 L70 75 L90 85 L110 60 L130 70" stroke="#0f766e" strokeWidth="3" fill="none" />
          <circle cx="50" cy="90" r="4" fill="#14b8a6" />
          <circle cx="70" cy="75" r="4" fill="#14b8a6" />
          <circle cx="90" cy="85" r="4" fill="#14b8a6" />
          <circle cx="110" cy="60" r="4" fill="#14b8a6" />
          <circle cx="130" cy="70" r="4" fill="#14b8a6" />
          <rect x="60" y="140" width="80" height="25" rx="8" fill="#0f766e" />
          <rect x="70" y="130" width="60" height="20" rx="5" fill="#5eead4" />
          <path d="M90 130 L90 105" stroke="#5eead4" strokeWidth="2" />
          <path d="M110 130 L110 105" stroke="#5eead4" strokeWidth="2" />
          <circle cx="90" cy="105" r="3" fill="#5eead4" />
          <circle cx="110" cy="105" r="3" fill="#5eead4" />
        </svg>
      )
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I get started with GNF Invest?",
      answer: "Sign up for an account on our platform, complete your financial profile, and choose an investment plan that aligns with your goals. Our intuitive dashboard will guide you through the process."
    },
    {
      question: "What are the minimum investment requirements?",
      answer: "Our Starter plan begins at just $100, making investing accessible to everyone. As you grow more comfortable, you can increase your investment amount or upgrade to more comprehensive plans."
    },
    {
      question: "How is my data protected?",
      answer: "We employ bank-level encryption, two-factor authentication, and regular security audits to ensure your financial and personal information remains secure at all times."
    },
    {
      question: "Can I withdraw my investments at any time?",
      answer: "Yes, most of our investment options allow for flexible withdrawals. Some specialized portfolios may have specific terms regarding withdrawal periods to maximize returns."
    },
  ];

  return (
   <>
   <Navbar />
   <div className="bg-neutral-light min-h-screen overflow-hidden">
      {/* Hero Section with animated elements */}
      <motion.section
        className="bg-gradient-to-r from-primary to-teal-700 text-white py-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Build Your Future with GNF Invest
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 max-w-3xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of investors achieving financial freedom with our secure, 
              intuitive platform and AI-powered market insights.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-neutral-dark px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                Start Investing Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Interactive illustration */}
            <svg className="w-full h-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Background elements */}
              <rect x="100" y="50" width="300" height="200" rx="20" fill="#fff" fillOpacity="0.1" />
              <path d="M50 300 Q 150 100 250 200 T 450 150" stroke="#fff" strokeWidth="3" fill="none" strokeOpacity="0.2" />
              
              {/* Main graph */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <rect x="150" y="100" width="200" height="150" rx="10" fill="#fff" fillOpacity="0.2" />
                <motion.path 
                  d="M150 200 L180 190 L210 220 L240 150 L270 170 L300 130 L330 180 L350 200" 
                  stroke="#5eead4" 
                  strokeWidth="4" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
                  filter="url(#glow)"
                />
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
                >
                  <circle cx="180" cy="190" r="5" fill="#5eead4" />
                  <circle cx="210" cy="220" r="5" fill="#5eead4" />
                  <circle cx="240" cy="150" r="5" fill="#5eead4" />
                  <circle cx="270" cy="170" r="5" fill="#5eead4" />
                  <circle cx="300" cy="130" r="5" fill="#5eead4" />
                  <circle cx="330" cy="180" r="5" fill="#5eead4" />
                </motion.g>
              </motion.g>
              
              {/* Animated coins */}
              <motion.g
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <motion.circle 
                  cx="400" 
                  cy="120" 
                  r="20" 
                  fill="#fcd34d" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <path d="M400 115 L400 125 M395 120 L405 120" stroke="#f59e0b" strokeWidth="2" />
              </motion.g>
              
              <motion.g
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
              >
                <motion.circle 
                  cx="370" 
                  cy="160" 
                  r="15" 
                  fill="#fcd34d" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                />
                <path d="M370 156 L370 164 M367 160 L373 160" stroke="#f59e0b" strokeWidth="2" />
              </motion.g>
              
              <motion.g
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
              >
                <motion.circle 
                  cx="420" 
                  cy="170" 
                  r="18" 
                  fill="#fcd34d" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.6 }}
                />
                <path d="M420 165 L420 175 M415 170 L425 170" stroke="#f59e0b" strokeWidth="2" />
              </motion.g>
              
              {/* Mobile device */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                <rect x="100" y="150" width="80" height="130" rx="10" fill="#334155" />
                <rect x="105" y="155" width="70" height="120" rx="5" fill="#0f172a" />
                <rect x="115" y="175" width="50" height="10" rx="2" fill="#5eead4" />
                <rect x="115" y="195" width="30" height="5" rx="1" fill="#94a3b8" />
                <rect x="115" y="205" width="50" height="5" rx="1" fill="#94a3b8" />
                <rect x="115" y="215" width="40" height="5" rx="1" fill="#94a3b8" />
                <circle cx="140" cy="240" r="10" fill="#5eead4" />
              </motion.g>
            </svg>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary to-transparent opacity-30"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64"
          initial={{ opacity: 0, scale: 0.5, x: 100, y: -100 }}
          animate={{ opacity: 0.1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 2 }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#fff" />
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96"
          initial={{ opacity: 0, scale: 0.5, x: -100, y: 100 }}
          animate={{ opacity: 0.1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 2 }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="10" fill="#fff" />
          </svg>
        </motion.div>
      </motion.section>

      {/* Stats Section with animated counters */}
      <motion.section 
        className="py-12 bg-white"
        {...statsAnimation}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="p-6 rounded-lg bg-neutral-light"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-primary mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-neutral-dark font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section with illustrations */}
      <motion.section 
        className="py-16 bg-neutral-light"
        {...featuresAnimation}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              variants={itemVariants}
            >
              Innovative Features
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Discover how our cutting-edge platform transforms the way you invest and grow your wealth.
            </motion.p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">
                  {feature.illustration}
                </div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How Investing Works Section with animated illustrations */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-neutral-dark text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            How Investing Works with GNF
          </motion.h2>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary to-teal-500 transform -translate-y-1/2 hidden md:block"></div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: 'Create Your Account',
                  desc: 'Sign up in minutes and personalize your investor profile based on your goals.',
                  illustration: (
                    <svg className="w-full h-48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <rect x="50" y="40" width="100" height="130" rx="10" fill="#f0fdfa" />
                      <rect x="60" y="55" width="80" height="100" rx="5" fill="#fff" stroke="#0d9488" strokeWidth="2" />
                      <circle cx="100" cy="85" r="15" fill="#5eead4" />
                      <path d="M80 115 H120" stroke="#0d9488" strokeWidth="2" />
                      <path d="M70 130 H130" stroke="#0d9488" strokeWidth="2" />
                      <path d="M80 145 H120" stroke="#0d9488" strokeWidth="2" />
                      <motion.circle 
                        cx="100" 
                        cy="85" 
                        r="20" 
                        fill="none" 
                        stroke="#0d9488" 
                        strokeWidth="2" 
                        strokeDasharray="126"
                        initial={{ strokeDashoffset: 126 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                      />
                    </svg>
                  )
                },
                {
                  title: 'Choose Your Strategy',
                  desc: 'Select investment plans tailored to your risk tolerance and financial objectives.',
                  illustration: (
                    <svg className="w-full h-48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <rect x="40" y="60" width="120" height="80" rx="8" fill="#e0f2fe" />
                      <motion.rect 
                        x="50" 
                        y="75" 
                        width="30" 
                        height="50" 
                        rx="4" 
                        fill="#0369a1"
                        initial={{ height: 0, y: 125 }}
                        animate={{ height: 50, y: 75 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                      />
                      <motion.rect 
                        x="90" 
                        y="90" 
                        width="30" 
                        height="35" 
                        rx="4" 
                        fill="#0ea5e9"
                        initial={{ height: 0, y: 125 }}
                        animate={{ height: 35, y: 90 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2, delay: 0.2 }}
                      />
                      <motion.rect 
                        x="130" 
                        y="65" 
                        width="20" 
                        height="60" 
                        rx="4" 
                        fill="#7dd3fc"
                        initial={{ height: 0, y: 125 }}
                        animate={{ height: 60, y: 65 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2, delay: 0.4 }}
                      />
                      <path d="M40 135 L160 135" stroke="#334155" strokeWidth="2" />
                    </svg>
                  )
                },
                {
                  title: 'Grow Your Wealth',
                  desc: 'Watch your investments flourish while our AI-powered tools optimize for maximum returns.',
                  illustration: (
                    <svg className="w-full h-48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <motion.path 
                        d="M40 140 C 70 140, 70 100, 100 100 S 130 60, 160 60" 
                        stroke="#0d9488" 
                        strokeWidth="3" 
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                      />
                      <motion.circle 
                        cx="160" 
                        cy="60" 
                        r="10" 
                        fill="#5eead4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 2.5 }}
                      />
                      <motion.g
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
                      >
                        <circle cx="80" cy="110" r="15" fill="#fcd34d" />
                        <path d="M80 105 L80 115 M75 110 L85 110" stroke="#78350f" strokeWidth="2" />
                      </motion.g>
                      <motion.g
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
                      >
                        <circle cx="120" cy="85" r="15" fill="#fcd34d" />
                        <path d="M120 80 L120 90 M115 85 L125 85" stroke="#78350f" strokeWidth="2" />
                      </motion.g>
                      <motion.g
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
                      >
                        <circle cx="150" cy="70" r="15" fill="#fcd34d" />
                        <path d="M150 65 L150 75 M145 70 L155 70" stroke="#78350f" strokeWidth="2" />
                      </motion.g>
                    </svg>
                  )
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-xl text-center relative z-10"
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="bg-teal-50 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold text-primary mx-auto mb-6">
                    {index + 1}
                  </div>
                  <div className="mb-6">{step.illustration}</div>
                  <h3 className="text-2xl font-semibold text-neutral-dark mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile App Showcase Section */}
      <motion.section
        className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white overflow-hidden"
        {...appAnimation}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="w-full md:w-1/2 text-center md:text-left"
              variants={containerVariants}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                variants={itemVariants}
              >
                Invest On The Go
              </motion.h2>
              <motion.p
                className="text-lg mb-8"
                variants={itemVariants}
              >
                Download our powerful mobile app and manage your investments anytime, anywhere. 
                Receive real-time notifications, track performance, and make informed decisions 
                with just a few taps.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
                variants={itemVariants}
              >
                <button className="bg-white text-teal-800 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-teal-50 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0006 21.9997C16.4247 21.9985 15.8662 21.8044 15.4006 21.4497L12.0006 18.9997L8.60062 21.4497C8.12774 21.8084 7.55838 22.0041 6.97538 22.0099C6.39238 22.0158 5.81836 21.8316 5.33635 21.4815C4.85434 21.1314 4.49364 20.6356 4.30998 20.0623C4.12632 19.489 4.13081 18.8726 4.32312 18.3023L5.67062 14.1197L2.14312 11.5397C1.63364 11.1462 1.27263 10.5958 1.13337 9.97723C0.994121 9.35868 1.08856 8.71245 1.39812 8.16469C1.70998 7.62036 2.21187 7.20799 2.80337 7.00469C3.38312 6.80469 4.01062 6.82369 4.58062 7.05469L8.95812 8.60969L10.0756 4.26969C10.2631 3.70724 10.6414 3.22544 11.1506 2.90369C11.6597 2.58195 12.2645 2.44336 12.8647 2.51255C13.4648 2.58174 14.0232 2.85425 14.4506 3.28566C14.8779 3.71708 15.1501 4.28162 15.2181 4.88219L16.3381 9.17219L20.7331 10.7272C21.3031 10.9582 21.7756 11.3872 22.0506 11.9397C22.3213 12.4863 22.3798 13.1138 22.2156 13.7022C22.0514 14.2907 21.6764 14.7962 21.1631 15.1272L17.6156 17.6972L19.0006 21.8922C19.0831 22.1782 19.0656 22.4722 19.0481 22.6497C19.0295 22.8356 18.9666 23.0151 18.8639 23.1753C18.7612 23.3354 18.6213 23.4723 18.4539 23.5761C18.2865 23.6799 18.096 23.7478 17.9006 23.7747" fill="#0d9488"/>
                    <path d="M17.0587 21.6175L16.9987 21.4375L11.9987 17.9975L6.99875 21.4375C6.70375 21.6575 6.35375 21.7175 5.99875 21.6175C5.65375 21.5375 5.37375 21.3175 5.19875 20.9975C5.01875 20.6775 4.99875 20.3175 5.09875 19.9775L7.19875 13.9975L2.19875 10.4375C1.87375 10.1975 1.69875 9.85753 1.69875 9.45753C1.69875 9.09753 1.87375 8.73753 2.19875 8.51753C2.49875 8.27753 2.85875 8.19753 3.19875 8.27753L9.19875 9.97753L11.1987 3.97753C11.2987 3.63753 11.5787 3.33753 11.9387 3.21753C12.2987 3.09753 12.6587 3.15753 12.9587 3.39753C13.2587 3.63753 13.4387 3.97753 13.4387 4.35753L13.7987 10.5775L19.7987 12.2775C20.1387 12.3575 20.4187 12.5975 20.5587 12.9175C20.7187 13.2375 20.6987 13.5975 20.5587 13.9175C20.3987 14.2375 20.1387 14.4775 19.7987 14.5975L13.7987 17.9975L15.7987 23.9975" stroke="#0d9488" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  App Store
                </button>
                <button className="bg-white text-teal-800 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-teal-50 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9991 11.9999L5.99914 19.9999C5.49914 19.4999 4.90014 18.9999 4.90014 17.9999V5.99988C4.90014 4.99988 5.49914 4.49988 5.99914 3.99988L12.9991 11.9999Z" fill="#0d9488"/>
                    <path d="M19.0001 11.9999C19.0001 12.5499 18.5501 13.2499 18.0001 13.4999L15.5001 14.9999L13.0001 11.9999L15.5001 8.99988L18.0001 10.4999C18.5501 10.7499 19.0001 11.4499 19.0001 11.9999Z" fill="#0d9488"/>
                    <path d="M15.5007 8.99988L13.0007 11.9999L5.99072 3.99988C6.29072 3.69988 6.69072 3.49988 6.99072 3.49988H17.0007C17.0007 3.49988 18.0007 3.59988 18.0007 4.49988C18.0007 5.29988 16.5007 8.19988 15.5007 8.99988Z" fill="#0d9488"/>
                    <path d="M15.5007 14.9999L13.0007 11.9999L5.99072 19.9999C6.29072 20.2999 6.69072 20.4999 6.99072 20.4999H17.0007C17.0007 20.4999 18.0007 20.3999 18.0007 19.4999C18.0007 18.6999 16.5007 15.7999 15.5007 14.9999Z" fill="#0d9488"/>
                  </svg>
                  Google Play
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 flex justify-center"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-4 -left-4 w-full h-full bg-teal-900 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 1 }}
                ></motion.div>
                
                <motion.div
                  className="relative bg-neutral-dark rounded-3xl overflow-hidden border-8 border-neutral-dark shadow-2xl"
                  style={{ width: '280px', height: '560px' }}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="bg-primary h-full w-full overflow-hidden">
                    <div className="h-12 bg-teal-800 flex items-center justify-between px-4">
                      <span className="text-white">9:41</span>
                      <div className="flex gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.5 9.5L12 17L4.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 10H6L12 16L18 10Z" fill="white"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="6" y="8" width="12" height="8" rx="1" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-teal-700">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-teal-50 text-xs">Welcome back</span>
                          <h3 className="text-white font-bold">Alex Morgan</h3>
                        </div>
                        <div className="bg-teal-800 rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="text-white font-bold">AM</span>
                        </div>
                      </div>
                      
                      <div className="bg-teal-800 rounded-xl p-3 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-teal-50 text-xs">Portfolio Balance</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="text-white font-bold text-2xl">$127,892.65</div>
                        <div className="text-teal-200 text-xs">+$4,523.23 (3.5%) today</div>
                      </div>
                    </div>
                    
                    <div className="bg-white flex-1 rounded-t-3xl p-4 relative -mt-2">
                      <div className="mb-4">
                        <h4 className="font-semibold text-neutral-dark mb-2">Performance</h4>
                        <div className="h-24 bg-neutral-50 rounded-lg p-2">
                          <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                            <path d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 30 L60 35 L70 25 L80 20 L90 15 L100 10" stroke="#0d9488" strokeWidth="2" fill="none" />
                          </svg>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-neutral-dark mb-2">Your Assets</h4>
                      <div className="space-y-3">
                        <div className="bg-neutral-50 p-3 rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">S</span>
                            </div>
                            <div>
                              <div className="font-semibold">Tech Stocks</div>
                              <div className="text-xs text-gray-500">+5.3%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">$45,230</div>
                            <div className="text-xs text-gray-500">35%</div>
                          </div>
                        </div>
                        
                        <div className="bg-neutral-50 p-3 rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="text-green-600 font-bold">B</span>
                            </div>
                            <div>
                              <div className="font-semibold">Green Energy</div>
                              <div className="text-xs text-gray-500">+2.8%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">$38,650</div>
                            <div className="text-xs text-gray-500">30%</div>
                          </div>
                        </div>
                        
                        <div className="bg-neutral-50 p-3 rounded-lg flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="text-amber-600 font-bold">G</span>
                            </div>
                            <div>
                              <div className="font-semibold">Gold Reserves</div>
                              <div className="text-xs text-gray-500">+1.2%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">$24,890</div>
                            <div className="text-xs text-gray-500">20%</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around">
                        <div className="text-center px-3 py-2 text-primary">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-xs">Home</span>
                        </div>
                        <div className="text-center px-3 py-2 text-gray-400">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                            <path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-xs">Portfolio</span>
                        </div>
                        <div className="text-center px-3 py-2 text-gray-400">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8V12" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16H12.01" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-xs">Insights</span>
                        </div>
                        <div className="text-center px-3 py-2 text-gray-400">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                            <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-xs">Account</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Plans Section with animated hover effects */}
      <motion.section 
        className="py-16 bg-neutral-light"
        {...plansAnimation}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              variants={itemVariants}
            >
              Investment Plans
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Choose the perfect plan to match your investment goals and risk tolerance.
            </motion.p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={containerVariants}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 ${index === 2 ? 'border-secondary md:scale-105 z-10' : 'border-primary'}`}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-semibold text-neutral-dark mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-primary mb-4">{plan.price}<span className="text-base font-normal text-gray-500">/mo</span></p>
                  <ul className="text-gray-600 mb-6 space-y-3 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <svg className="w-5 h-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-semibold ${index === 2 ? 'bg-secondary text-white' : 'bg-primary text-white'}`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose GNF Section with animated SVG illustrations */}
      <motion.section 
        className="py-16 bg-white"
        {...whyChooseAnimation}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              variants={itemVariants}
            >
              Why Choose GNF Invest?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Our platform combines cutting-edge technology with financial expertise to deliver exceptional results.
            </motion.p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                title: 'Bank-Level Security',
                desc: 'Your investments are protected with advanced encryption and multi-factor authentication.',
                illustration: (
                  <svg className="w-24 h-24 mx-auto mb-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M50 15 L85 30 L85 45 C85 65 70 80 50 90 C30 80 15 65 15 45 L15 30 L50 15Z" 
                      fill="#e0f2fe" 
                      stroke="#0369a1" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2 }}
                    />
                    <motion.path 
                      d="M50 25 L75 35 L75 45 C75 60 65 72 50 80 C35 72 25 60 25 45 L25 35 L50 25Z" 
                      fill="#f0f9ff" 
                      stroke="#0284c7" 
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.3 }}
                    />
                    <motion.path 
                      d="M40 50 L45 55 L60 40" 
                      fill="none" 
                      stroke="#0284c7" 
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </svg>
                )
              },
              {
                title: '24/7 Expert Support',
                desc: 'Our team of financial advisors is available anytime to assist with your investment needs.',
                illustration: (
                  <svg className="w-24 h-24 mx-auto mb-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <motion.circle 
                      cx="50" 
                      cy="35" 
                      r="15" 
                      fill="#f0fdfa"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.path 
                      d="M25 85 C25 65 35 55 50 55 C65 55 75 65 75 85" 
                      fill="#f0fdfa"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    <motion.circle 
                      cx="50" 
                      cy="35" 
                      r="15" 
                      fill="none" 
                      stroke="#0d9488" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.path 
                      d="M25 85 C25 65 35 55 50 55 C65 55 75 65 75 85" 
                      fill="none" 
                      stroke="#0d9488" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="30" 
                      fill="none" 
                      stroke="#14b8a6" 
                      strokeWidth="2" 
                      strokeDasharray="3 3"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.1 }}
                    />
                    <motion.circle 
                      cx="80" 
                      cy="75" 
                      r="12" 
                      fill="#5eead4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    />
                    <motion.path 
                      d="M75 75 L78 70 L83 70 L80 75 L83 80 L78 80 L75 75Z" 
                      fill="#0d9488"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    />
                  </svg>
                )
              },
              {
                title: 'AI-Powered Analytics',
                desc: 'Make informed decisions with real-time market insights and predictive algorithms.',
                illustration: (
                  <svg className="w-24 h-24 mx-auto mb-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="30" 
                      fill="#f1f5f9"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.path 
                      d="M35 65 L45 55 L60 70 L80 40" 
                      fill="none" 
                      stroke="#0284c7" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.circle 
                      cx="35" 
                      cy="65" 
                      r="3" 
                      fill="#0284c7"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1 }}
                    />
                    <motion.circle 
                      cx="45" 
                      cy="55" 
                      r="3" 
                      fill="#0284c7"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.1 }}
                    />
                    <motion.circle 
                      cx="60" 
                      cy="70" 
                      r="3" 
                      fill="#0284c7"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 }}
                    />
                    <motion.circle 
                      cx="80" 
                      cy="40" 
                      r="3" 
                      fill="#0284c7"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.3 }}
                    />
                    <motion.path 
                      d="M20 50 L20 80 L90 80" 
                      fill="none" 
                      stroke="#334155" 
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                    />
                    <motion.path 
                      d="M25 75 L25 65 L35 65 L35 75 Z M45 75 L45 50 L55 50 L55 75 Z M65 75 L65 60 L75 60 L75 75 Z M85 75 L85 35 L95 35 L95 75 Z" 
                      fill="#7dd3fc"
                      stroke="#0284c7" 
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2 }}
                    />
                    <motion.path 
                      d="M30 30 C35 25, 45 25, 50 30 S60 35, 70 30" 
                      fill="none" 
                      stroke="#0ea5e9" 
                      strokeWidth="2" 
                      strokeDasharray="3 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 2.2 }}
                    />
                  </svg>
                )
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-neutral-light p-8 rounded-xl shadow-lg text-center"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                {benefit.illustration}
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section with infinite scroll */}
      <section className="py-16 bg-neutral-light overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-neutral-dark text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            What Our Investors Say
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of satisfied investors who have transformed their financial future with GNF Invest.
          </motion.p>
          
          <div className="relative">
            <motion.div
              className="flex gap-6 py-4"
              animate={{
                x: [`0%`, `-${100 / testimonials.length * testimonialPosition}%`]
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg min-w-[300px] md:min-w-[400px] flex-shrink-0"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-neutral-dark">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex justify-end">
                    <svg width="50" height="30" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 30C7.5 30 5.3 29.1 3.4 27.2C1.5 25.3 0.5 23.1 0.5 20.5C0.5 18.6 0.9 16.7 1.7 14.8C2.5 12.9 3.5 11.1 4.8 9.3C6.1 7.5 7.5 5.9 9.1 4.4C10.7 2.9 12.4 1.5 14.2 0.5L15.9 2.8C14.5 3.8 13.1 4.9 11.9 6.1C10.7 7.3 9.8 8.4 9.1 9.3C8.4 10.2 7.9 11.1 7.5 12C7.1 12.9 6.9 13.7 7.1 14.3C9.4 14.1 11.4 14.7 12.9 16.2C14.4 17.7 15.2 19.6 15.2 21.8C15.2 23.2 14.8 24.6 14 25.8C13.2 27 12.1 28 10.7 28.7C10.4 28.9 10.2 29 10 30ZM35 30C32.5 30 30.3 29.1 28.4 27.2C26.5 25.3 25.5 23.1 25.5 20.5C25.5 18.6 25.9 16.7 26.7 14.8C27.5 12.9 28.5 11.1 29.8 9.3C31.1 7.5 32.5 5.9 34.1 4.4C35.7 2.9 37.4 1.5 39.2 0.5L40.9 2.8C39.5 3.8 38.1 4.9 36.9 6.1C35.7 7.3 34.8 8.4 34.1 9.3C33.4 10.2 32.9 11.1 32.5 12C32.1 12.9 31.9 13.7 32.1 14.3C34.4 14.1 36.4 14.7 37.9 16.2C39.4 17.7 40.2 19.6 40.2 21.8C40.2 23.2 39.8 24.6 39 25.8C38.2 27 37.1 28 35.7 28.7C35.4 28.9 35.2 29 35 30Z" fill="#E5E7EB"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialPosition(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${testimonialPosition === index ? 'bg-primary' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with accordion */}
      <motion.section 
        className="py-16 bg-white"
        {...faqAnimation}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              variants={itemVariants}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Get answers to common questions about GNF Invest and our investment strategies.
            </motion.p>
          </div>
          
          <motion.div
            className="max-w-3xl mx-auto divide-y divide-gray-200"
            variants={containerVariants}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="py-6"
                variants={itemVariants}
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-semibold text-lg text-neutral-dark cursor-pointer list-none">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <motion.p 
                    className="text-gray-600 mt-4 group-open:animate-fadeIn"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                </details>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <p className="text-gray-600 mb-6">Still have questions? We're here to help!</p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              Contact Support
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Start Building Your Financial Future Today
            </motion.h2>
            <motion.p
              className="text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join thousands of investors who trust GNF Invest with their financial goals.
              Get started with as little as $100 and watch your investments grow.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-50 transition-colors"
              >
                Create Your Account
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Schedule a Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
   <Footer/>
   </>
  );
};

export default Home;