import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/service' },
    { name: 'Contact', path: '/contact' },
  ];

  const authItems = [
    { name: 'Sign Up', path: '/signup' },
    { name: 'Login', path: '/login' },
  ];

  const mobileVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.1,
        duration: 0.3
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3
      } 
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary/95 backdrop-blur-md shadow-lg' 
          : 'bg-primary'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <NavLink to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">GNF</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  <span className="text-secondary">GNF</span> Invest
                </h1>
              </NavLink>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex space-x-1 mr-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                        isActive 
                          ? 'text-secondary' 
                          : 'text-white hover:text-secondary'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        {isActive && (
                          <motion.div 
                            className="absolute bottom-0 left-0 h-0.5 bg-secondary w-full" 
                            layoutId="navbar-underline"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 pl-2 border-l border-white/20">
              {authItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        index === 0 
                          ? (isActive ? 'bg-secondary/20 text-secondary' : 'text-secondary hover:bg-secondary/10') 
                          : (isActive ? 'bg-secondary text-primary font-semibold' : 'bg-secondary hover:bg-secondary/90 text-primary font-semibold')
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden flex items-center"
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary focus:outline-none"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 relative">
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform transition-all duration-300 rounded-full"
                  animate={{ 
                    top: isOpen ? "50%" : "30%", 
                    rotate: isOpen ? "45deg" : "0deg",
                    translateY: isOpen ? "-50%" : "0"
                  }}
                />
                <motion.span
                  className="absolute h-0.5 bg-current transform transition-all duration-300 rounded-full left-0"
                  style={{ top: "50%", translateY: "-50%" }}
                  animate={{ 
                    width: isOpen ? "0" : "1.5rem", 
                    opacity: isOpen ? 0 : 1
                  }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform transition-all duration-300 rounded-full"
                  animate={{ 
                    top: isOpen ? "50%" : "70%", 
                    rotate: isOpen ? "-45deg" : "0deg",
                    translateY: isOpen ? "-50%" : "0"
                  }}
                />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileVariants}
            className="md:hidden bg-primary-dark border-t border-white/10 backdrop-blur-md"
          >
            <motion.div 
              className="px-4 py-3 space-y-2 sm:px-3 divide-y divide-white/10"
            >
              <div className="py-2 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-secondary bg-primary-light/20'
                            : 'text-white hover:text-secondary hover:bg-primary-light/10'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              
              <div className="py-2 space-y-2 pt-4">
                {authItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-md text-base font-medium text-center transition-all duration-200 ${
                          index === 0
                            ? (isActive ? 'text-secondary border border-secondary' : 'text-secondary border border-secondary/70 hover:border-secondary')
                            : (isActive ? 'bg-secondary text-primary' : 'bg-secondary/90 text-primary hover:bg-secondary')
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default PublicNavbar;