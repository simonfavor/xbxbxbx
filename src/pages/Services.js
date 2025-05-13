import { motion } from 'framer-motion';
import { 
  FaChartLine, FaLock, FaRegLightbulb, FaSearchDollar, 
  FaRegChartBar, FaUserShield, FaGlobe, FaRocket, 
  FaCog, FaRegCreditCard, FaUserTie, FaMoneyBillWave
} from 'react-icons/fa';
import Navbar from './components/navbar';
import Footer from './components/footer';

const Services = () => {
  // Enhanced animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemSlideRight = {
    hidden: { opacity: 0, x: -70 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.7, 
        type: 'spring', 
        stiffness: 80 
      }
    }
  };

  const itemSlideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        type: 'spring', 
        stiffness: 70
      }
    }
  };

  const cardHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const iconAnimation = {
    rest: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.6 }
    }
  };

  // Core Services data with enhanced descriptions and icons
  const coreServices = [
    {
      title: "Portfolio Management",
      description: "Our expert team constructs and actively manages diversified portfolios tailored to your risk tolerance and financial objectives. We utilize advanced algorithmic trading and market timing strategies to maximize returns.",
      icon: <FaChartLine className="text-4xl text-primary" />,
      benefits: [
        "Personalized asset allocation strategies",
        "Continuous portfolio rebalancing",
        "Risk-adjusted performance optimization"
      ]
    },
    {
      title: "Real-Time Analytics",
      description: "Access our proprietary market analysis platform featuring real-time data visualization, predictive analytics, and trend identification. Make informed decisions based on the same tools used by institutional investors.",
      icon: <FaRegChartBar className="text-4xl text-primary" />,
      benefits: [
        "Live market data streams",
        "Customizable dashboard interface",
        "Predictive trend indicators"
      ]
    },
    {
      title: "Financial Advisory",
      description: "Receive personalized guidance from our team of certified financial experts who provide strategic advice on wealth building, tax optimization, and long-term financial planning aligned with your life goals.",
      icon: <FaUserTie className="text-4xl text-primary" />,
      benefits: [
        "One-on-one consultation sessions",
        "Comprehensive financial roadmapping",
        "Regular strategy review meetings"
      ]
    },
    {
      title: "Secure Trading",
      description: "Execute trades with confidence on our military-grade encrypted platform that ensures the highest level of security for your assets and personal information, with multi-factor authentication and 24/7 fraud monitoring.",
      icon: <FaLock className="text-4xl text-primary" />,
      benefits: [
        "End-to-end encryption",
        "Biometric verification",
        "Insured digital assets"
      ]
    },
    {
      title: "Investment Education",
      description: "Access our extensive library of educational resources including webinars, courses, and research papers designed to enhance your investment knowledge, from fundamentals to advanced trading strategies.",
      icon: <FaRegLightbulb className="text-4xl text-primary" />,
      benefits: [
        "Interactive learning modules",
        "Weekly market insight webinars",
        "Exclusive research publications"
      ]
    },
    {
      title: "Global Market Access",
      description: "Diversify your portfolio across international markets with our global investment platform that provides access to stocks, bonds, commodities, and alternative investments from over 30 countries worldwide.",
      icon: <FaGlobe className="text-4xl text-primary" />,
      benefits: [
        "Access to 80+ global exchanges",
        "Multi-currency account management",
        "International tax optimization"
      ]
    }
  ];

  // Additional specialized services
  const specializedServices = [
    {
      title: "Algorithmic Trading",
      description: "Leverage our proprietary algorithms that analyze market patterns and execute trades at optimal prices and speeds, eliminating emotional decision-making and capitalizing on microsecond opportunities.",
      icon: <FaCog className="text-4xl text-primary" />
    },
    {
      title: "Retirement Planning",
      description: "Develop a comprehensive roadmap for financial security in retirement with personalized strategies for asset accumulation, distribution planning, and legacy management.",
      icon: <FaUserShield className="text-4xl text-primary" />
    },
    {
      title: "Tax-Efficient Investing",
      description: "Optimize your investment returns through strategic tax planning that minimizes liabilities while maximizing after-tax wealth accumulation across different account types.",
      icon: <FaMoneyBillWave className="text-4xl text-primary" />
    },
    {
      title: "Alternative Investments",
      description: "Diversify beyond traditional assets with our curated selection of alternative investments including private equity, venture capital, real estate, and cryptocurrency opportunities.",
      icon: <FaSearchDollar className="text-4xl text-primary" />
    }
  ];

  // Investment plans with eye-catching weekly earnings
  const investmentPlans = [
    {
      name: "Starter",
      price: "$99",
      weekly: "$25-$75",
      monthlyReturn: "4-8%",
      features: [
        "Basic Analytics Dashboard",
        "Single Portfolio Management",
        "Weekly Market Reports",
        "Email Support (24hr response)",
        "Educational Webinars"
      ],
      benefits: "Perfect for beginners looking to start their investment journey with essential tools and steady growth.",
      color: "from-blue-400 to-teal-400"
    },
    {
      name: "Growth",
      price: "$249",
      weekly: "$100-$225",
      monthlyReturn: "8-12%",
      features: [
        "Advanced Analytics Suite",
        "3 Managed Portfolios",
        "Daily Market Insights",
        "Priority Email Support (12hr)",
        "Strategy Consultation (Monthly)",
        "Tax Optimization Tools"
      ],
      benefits: "Ideal for growing investors seeking enhanced returns with more diversification and personalized support.",
      color: "from-teal-400 to-green-500",
      highlighted: true
    },
    {
      name: "Pro",
      price: "$499",
      weekly: "$300-$550",
      monthlyReturn: "12-18%",
      features: [
        "Real-Time Data & Alerts",
        "5 Advanced Portfolios",
        "24/7 Priority Support",
        "Quarterly Strategy Reviews",
        "AI-Powered Trade Signals",
        "Alternative Investment Access"
      ],
      benefits: "Designed for serious investors requiring comprehensive tools, diverse portfolios and expert guidance.",
      color: "from-green-500 to-primary"
    },
    {
      name: "Elite",
      price: "$999",
      weekly: "$700-$1,200",
      monthlyReturn: "16-25%",
      features: [
        "Custom Investment Strategies",
        "10 Diverse Portfolios",
        "Dedicated Personal Advisor",
        "International Market Access",
        "Exclusive Investment Opportunities",
        "Algorithmic Trading Access"
      ],
      benefits: "Premium solution for high-net-worth individuals seeking sophisticated strategies and personalized service.",
      color: "from-primary to-purple-600"
    },
    {
      name: "Institutional",
      price: "$1,999",
      weekly: "$1,500-$3,000+",
      monthlyReturn: "20-35%+",
      features: [
        "Full-Service Wealth Management",
        "Unlimited Portfolio Capacity",
        "Dedicated Investment Team",
        "Proprietary Market Intelligence",
        "Private Equity Opportunities",
        "Custom Financial Solutions"
      ],
      benefits: "Comprehensive wealth management for institutions and ultra-high-net-worth clients requiring maximum customization.",
      color: "from-purple-600 to-pink-500"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-neutral-light min-h-screen">
        {/* Hero Section with enhanced animations */}
        <motion.section
          className="relative bg-gradient-to-r from-primary to-teal-700 text-white py-32 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-white opacity-10"
              style={{ top: "10%", right: "5%" }}
              animate={{ 
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-white opacity-10"
              style={{ bottom: "10%", left: "10%" }}
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.svg 
              className="absolute opacity-10" 
              style={{ bottom: "0", right: "20%", width: "300px", height: "300px" }}
              viewBox="0 0 200 200"
            >
              <motion.path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M10,90 Q95,20 180,90"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
              />
              <motion.circle
                r="5"
                fill="white"
                initial={{ cx: 10, cy: 90 }}
                animate={{ cx: 180, cy: 90 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
              />
            </motion.svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-4">
                <FaRocket className="text-4xl inline-block text-secondary" />
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-6xl font-extrabold mb-6"
                variants={fadeIn}
              >
                Premium Investment Services
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 leading-relaxed"
                variants={fadeIn}
              >
                Experience the power of institutional-grade investment solutions designed to 
                maximize your wealth potential with industry-leading returns and personalized strategy.
              </motion.p>
              <motion.div 
                className="h-1 w-40 bg-secondary mx-auto mb-10"
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-neutral-dark px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
                >
                  View Investment Plans
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg"
                >
                  Schedule a Consultation
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Core Services Section - enhanced with animations and visuals */}
        <motion.section 
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Our Core Services</h2>
              <p className="text-lg text-gray-600">
                Discover our comprehensive range of investment solutions designed to optimize your 
                financial growth and provide unparalleled security and insight.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {coreServices.map((service, index) => (
                <motion.div 
                  key={service.title}
                  className="bg-neutral-light p-8 rounded-xl shadow-md hover:shadow-xl transition-all group"
                  variants={itemSlideRight}
                  initial="rest"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <motion.div 
                    className="mb-6 text-primary"
                    variants={iconAnimation}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-neutral-dark mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Specialized Services with visual indicators */}
        <motion.section 
          className="py-20 bg-neutral-light relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-full h-full bg-primary opacity-5"
              style={{ 
                clipPath: "polygon(0 0, 100% 30%, 100% 70%, 0 100%)"
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Specialized Solutions</h2>
              <p className="text-lg text-gray-600">
                Advanced investment strategies and specialized services designed for investors 
                seeking exceptional performance and unique opportunities.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
            >
              {specializedServices.map((service, index) => (
                <motion.div 
                  key={service.title}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all flex items-start gap-6"
                  variants={itemSlideUp}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="flex-shrink-0 bg-primary bg-opacity-10 p-4 rounded-full">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Investment Plans Section with eye-catching earnings */}
        <motion.section 
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Investment Plans</h2>
              <p className="text-lg text-gray-600 mb-4">
                Select the perfect investment strategy tailored to your financial goals and risk tolerance.
              </p>
              <p className="text-sm text-gray-500 italic">
                Note: Returns shown are based on historical performance and are not guaranteed. 
                Investments may fluctuate in value.
              </p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {investmentPlans.map((plan, index) => (
                <motion.div 
                  key={plan.name}
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl w-full max-w-sm ${plan.highlighted ? 'ring-4 ring-secondary' : ''}`}
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  whileInView={{
                    opacity: [0, 1],
                    y: [50, 0],
                    transition: { duration: 0.6, delay: index * 0.1 }
                  }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className={`bg-gradient-to-r ${plan.color} text-white p-6 relative overflow-hidden`}>
                    {plan.highlighted && (
                      <div className="absolute top-0 right-0 bg-secondary text-neutral-dark text-xs font-bold px-3 py-1 transform rotate-45 translate-x-2 -translate-y-1">
                        POPULAR
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-4xl font-extrabold mb-2">{plan.price}<span className="text-sm font-normal">/mo</span></p>
                    
                    <div className="mt-4 bg-white bg-opacity-20 p-4 rounded-lg">
                      <p className="text-sm uppercase tracking-wide">Weekly Earnings Potential</p>
                      <p className="text-3xl font-extrabold">{plan.weekly}</p>
                      <p className="text-sm font-medium mt-1">{plan.monthlyReturn} Monthly Return</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 italic mb-6">{plan.benefits}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-lg font-semibold ${
                        plan.highlighted 
                          ? 'bg-secondary text-neutral-dark' 
                          : 'bg-primary text-white'
                      }`}
                    >
                      Start Investing Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section 
          className="py-20 bg-neutral-light"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Our Process</h2>
              <p className="text-lg text-gray-600">
                We follow a structured approach to ensure your investment journey is seamless and successful.
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Process timeline line */}
              <motion.div 
                className="absolute left-24 sm:left-1/2 top-0 bottom-0 w-1 bg-primary hidden sm:block"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
              
              <div className="space-y-12 relative">
                {[
                  {
                    title: "Initial Consultation",
                    description: "We begin with a thorough assessment of your financial situation, goals, and risk tolerance to understand your unique needs.",
                    icon: <FaUserTie className="text-2xl" />
                  },
                  {
                    title: "Strategy Development",
                    description: "Our experts create a personalized investment strategy aligned with your objectives, considering diversification and growth potential.",
                    icon: <FaRegLightbulb className="text-2xl" />
                  },
                  {
                    title: "Portfolio Construction",
                    description: "We build your portfolio using carefully selected assets across various markets to optimize returns while managing risk.",
                    icon: <FaChartLine className="text-2xl" />
                  },
                  {
                    title: "Active Management",
                    description: "Our team continuously monitors and adjusts your investments to respond to market changes and capitalize on opportunities.",
                    icon: <FaRegChartBar className="text-2xl" />
                  },
                  {
                    title: "Regular Review & Optimization",
                    description: "We conduct scheduled performance reviews and strategy sessions to ensure your portfolio remains aligned with your evolving goals.",
                    icon: <FaSearchDollar className="text-2xl" />
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={step.title}
                    className="flex flex-col sm:flex-row items-center gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : 'sm:order-3'}`}>
                      <h3 className="text-2xl font-bold text-neutral-dark mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg border-4 border-primary sm:order-2">
                      <motion.div 
                        className="text-primary"
                        animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
                        transition={{ duration: 2, delay: index * 0.2, repeat: Infinity, repeatDelay: 5 }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                    
                    <div className={`flex-1 ${index % 2 === 0 ? 'sm:order-3' : ''}`}>
                      {index % 2 !== 0 ? (
                        <h3 className="text-2xl font-bold text-neutral-dark mb-3 sm:hidden">{step.title}</h3>
                      ) : null}
                      {/* This div is just for layout balance */}
                      <div className="hidden sm:block"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Carousel */}
        <motion.section 
          className="py-20 bg-gradient-to-b from-white to-neutral-light"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark text-center mb-16">What Our Clients Say</h2>
            
            <motion.div 
              className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  JD
                </div>
                <div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg italic mb-4">
                    "Since joining GNF Invest's Elite plan, my portfolio has seen a consistent 22% annual return. 
                    Their personalized approach and proactive adjustments to market changes have been invaluable. 
                    I've recommended them to everyone in my network."
                  </p>
                  <p className="font-bold text-neutral-dark">Jonathan Delgado</p>
                  <p className="text-gray-500">CEO, Innovatech Solutions • Elite Plan Member for 3 years</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8 gap-2">
                {[0, 1, 2, 3, 4].map((dot, i) => (
                  <button 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-primary' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 bg-gradient-to-r from-primary to-teal-700 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Future?</h2>
              <p className="text-xl mb-8">
                Join thousands of successful investors who have already discovered the GNF advantage.
                Start your journey to financial freedom today.
              </p>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-neutral-dark px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
                >
                  Get Started Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg"
                >
                  Schedule a Free Consultation
                </motion.button>
              </motion.div>
              
              <p className="mt-8 text-sm font-light opacity-80">
                No obligation • Cancel anytime • 30-day money-back guarantee
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <Footer/>
    </>
  );
};

export default Services;