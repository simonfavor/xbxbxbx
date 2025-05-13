import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaAward, FaChartLine, FaHandshake, FaShieldAlt, FaHistory, FaGlobe } from 'react-icons/fa';
import Navbar from './components/navbar';
import Footer from './components/footer';

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
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
        delayChildren: 0.2
      }
    }
  };

  const teamItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7, 
        type: 'spring', 
        stiffness: 80 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const lineVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "80%", 
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      } 
    }
  };

  // Company data
  const companyValues = [
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Integrity",
      description: "We uphold the highest ethical standards in every investment decision and client interaction."
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: "Innovation",
      description: "We continuously evolve our methods and technology to deliver superior investment outcomes."
    },
    {
      icon: <FaHandshake className="text-4xl text-primary" />,
      title: "Client-Focused",
      description: "Your financial success is our ultimate measure of achievement and guides all our actions."
    },
    {
      icon: <FaGlobe className="text-4xl text-primary" />,
      title: "Global Perspective",
      description: "Our worldwide market insights provide comprehensive investment opportunities and risk awareness."
    }
  ];

  const milestones = [
    { year: "2010", event: "GNF Invest founded with a vision to democratize intelligent investing" },
    { year: "2013", event: "Launched our revolutionary portfolio management platform" },
    { year: "2015", event: "Expanded services to international markets across Europe and Asia" },
    { year: "2018", event: "Achieved $1 billion in assets under management" },
    { year: "2020", event: "Introduced AI-powered investment analytics tools" },
    { year: "2023", event: "Named 'Investment Firm of the Year' by Financial Times" },
    { year: "2025", event: "Celebrating 15 years of creating wealth for our clients globally" }
  ];

  // Team members - ordered by hierarchy
  const leadership = [
    {
      name: "James Carter",
      role: "Chief Executive Officer",
      bio: "With over 25 years of experience in investment banking, James has led GNF Invest from startup to industry leader.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Linda Nguyen",
      role: "Chief Financial Officer",
      bio: "Linda brings 20 years of financial expertise from Goldman Sachs and ensures our company's financial health and growth.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const seniorManagement = [
    {
      name: "Michael Patel",
      role: "Chief Investment Officer",
      bio: "Michael's investment strategies have consistently outperformed market benchmarks by an average of 12% annually.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Sarah Thompson",
      role: "VP of Portfolio Management",
      bio: "Sarah specializes in emerging markets and has pioneered our sustainable investment division.",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "David Kim",
      role: "Director of Investment Strategy",
      bio: "David's predictive market models have become an industry standard for risk assessment and opportunity identification.",
      image: "https://images.unsplash.com/photo-1506794778202-6d8d17e378b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const departmentHeads = [
    {
      name: "Emily Rivera",
      role: "Head of Client Success",
      bio: "Emily ensures our clients receive personalized attention and exceptional service throughout their investment journey.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Robert Evans",
      role: "Head of Data Science",
      bio: "Robert leads our team of data scientists in developing cutting-edge predictive models and investment algorithms.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Aisha Khan",
      role: "Head of Global Markets",
      bio: "Aisha's expertise in international markets helps our clients capitalize on worldwide investment opportunities.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const TeamMemberCard = ({ member, delay = 0 }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all"
      variants={teamItemVariants}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="relative group">
        <img 
          src={member.image} 
          alt={`${member.role}`} 
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3 justify-center">
          <motion.button 
            whileHover={{ scale: 1.2 }} 
            whileTap={{ scale: 0.9 }}
            className="bg-white p-2 rounded-full text-primary"
          >
            <FaLinkedin />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.2 }} 
            whileTap={{ scale: 0.9 }}
            className="bg-white p-2 rounded-full text-primary"
          >
            <FaTwitter />
          </motion.button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-dark">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 text-sm">{member.bio}</p>
      </div>
    </motion.div>
  );

  const TeamSection = ({ title, members }) => (
    <div className="mb-16">
      <motion.h3 
        className="text-2xl font-bold mb-8 text-neutral-dark"
        variants={fadeIn}
      >
        {title}
      </motion.h3>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
      >
        {members.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </motion.div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-neutral-light min-h-screen">
        {/* Hero Section */}
        <motion.section
          className="relative bg-gradient-to-r from-primary to-teal-700 text-white py-28 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute rounded-full w-96 h-96 bg-white opacity-10"
              style={{ top: "-10%", right: "-5%" }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute rounded-full w-64 h-64 bg-white opacity-10"
              style={{ bottom: "-10%", left: "10%" }}
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-extrabold mb-6"
                variants={fadeIn}
              >
                Our Story
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 leading-relaxed"
                variants={fadeIn}
              >
                At GNF Invest, we're not just financial advisors – we're architects of prosperity, 
                dedicated to building wealth and security for our clients through innovative investment strategies
                and unwavering commitment to excellence.
              </motion.p>
              <motion.div 
                className="h-1 w-40 bg-secondary mx-auto mb-8"
                variants={lineVariants}
              />
              <motion.div
                variants={fadeIn}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-neutral-dark px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
                >
                  Our Investment Philosophy
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Vision Section */}
        <motion.section 
          className="py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  To empower individuals and organizations to achieve financial freedom through transparent, 
                  innovative, and personalized investment solutions that consistently outperform market expectations.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We believe that financial prosperity should be accessible to all, not just the privileged few. 
                  Our team works tirelessly to democratize sophisticated investment strategies that were 
                  traditionally available only to the ultra-wealthy.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary h-16 w-16 rounded-full flex items-center justify-center">
                    <FaAward className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-dark">Award-Winning Strategies</h3>
                    <p className="text-gray-600">Recognized excellence in wealth management</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-neutral-light p-8 rounded-xl shadow-xl relative overflow-hidden"
                variants={cardVariants}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary opacity-10 rounded-full -mt-10 -mr-10"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  To become the most trusted investment partner globally, known for consistently delivering 
                  superior returns while maintaining the highest standards of integrity and client care.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-gray-700">$12+ billion in assets under management</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-gray-700">25,000+ satisfied clients worldwide</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-gray-700">18% average annual client returns</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-gray-700">Offices in 12 countries across 4 continents</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Company Values */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Our Core Values</h2>
              <p className="text-lg text-gray-600">
                These principles guide every decision we make and every strategy we develop for our clients.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              {companyValues.map((value, index) => (
                <motion.div 
                  key={value.title}
                  className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow"
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className="flex justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* History Timeline */}
        <motion.section 
          className="py-20 bg-white relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-full h-full bg-primary opacity-5"
              style={{ 
                clipPath: "polygon(0 0, 100% 20%, 100% 80%, 0 100%)"
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              variants={fadeIn}
            >
              <div className="inline-block p-2 bg-primary bg-opacity-10 rounded-full mb-4">
                <FaHistory className="text-2xl text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Our Journey</h2>
              <p className="text-lg text-gray-600">
                From humble beginnings to industry leadership, our history reflects a commitment to 
                innovation and client success.
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary bg-opacity-20 z-0"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={milestone.year}
                    className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:flex-row`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                  >
                    <div className="hidden md:block md:w-1/2 px-4">
                      {index % 2 === 0 ? (
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ml-auto mr-0 max-w-xs">
                          <h3 className="text-2xl font-bold text-primary mb-2">{milestone.year}</h3>
                          <p className="text-gray-600">{milestone.event}</p>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-primary mx-auto"></div>
                      )}
                    </div>
                    
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border-4 border-primary z-10 mx-4 md:mx-0">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-primary"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    
                    <div className="md:w-1/2 px-4">
                      {index % 2 === 1 || window.innerWidth < 768 ? (
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow max-w-xs">
                          <h3 className="text-2xl font-bold text-primary mb-2">{milestone.year}</h3>
                          <p className="text-gray-600">{milestone.event}</p>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-primary mx-auto hidden md:block"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="py-20 bg-neutral-light"
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
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">Leadership Team</h2>
              <p className="text-lg text-gray-600">
                Meet the visionaries and experts who guide our company's strategy and ensure 
                we deliver exceptional value to our clients.
              </p>
              <motion.div 
                className="h-1 w-40 bg-primary mx-auto mt-8"
                variants={lineVariants}
              />
            </motion.div>
            
            <div className="space-y-20">
              <TeamSection title="Executive Leadership" members={leadership} />
              <TeamSection title="Senior Management" members={seniorManagement} />
              <TeamSection title="Department Heads" members={departmentHeads} />
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your Wealth?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of successful investors who have trusted GNF Invest to secure their financial future.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
              >
                Schedule a Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg"
              >
                Explore Investment Plans
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
      <Footer/>
    </>
  );
};

export default About;