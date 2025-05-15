// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, 
  FaWallet, 
  FaHistory, 
  FaCog, 
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaChartBar,
  FaGlobe
} from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar when resizing to mobile
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarOpen]);

  const navItems = [
    { name: 'Dashboard', path: '/account/dashboard', icon: FaChartLine },
    { name: 'Withdrawals', path: '/account/withdrawals', icon: FaWallet },
    { name: 'Transactions', path: '/account/transactions', icon: FaHistory },
    { name: 'Settings', path: '/account/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const sidebarVariants = {
    mobile: {
      width: isSidebarOpen ? '16rem' : '0',
      opacity: isSidebarOpen ? 1 : 0,
      transition: { duration: 0.3 }
    },
    desktop: {
      width: isSidebarOpen ? '16rem' : '5rem',
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={`fixed h-screen bg-neutral-900 text-white z-40 overflow-hidden ${
        isMobile ? 'shadow-xl' : ''
      }`}
      variants={sidebarVariants}
      animate={isMobile ? 'mobile' : 'desktop'}
      initial={false}
    >
      {/* Logo and brand */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        {isSidebarOpen && (
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-xl font-extrabold tracking-tight text-secondary">
              GNF <span className="text-white">Invest</span>
            </h1>
          </motion.div>
        )}
        
        {!isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full hover:bg-neutral-800 transition-colors focus:outline-none"
          >
            {isSidebarOpen ? (
              <FaChevronLeft className="w-4 h-4" />
            ) : (
              <FaChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Nav items */}
      <div className="mt-6 overflow-y-auto h-[calc(100vh-160px)]">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-secondary text-neutral-900 font-medium shadow-md' 
                        : 'text-gray-300 hover:bg-neutral-800 hover:text-white'
                    }`
                  }
                  onClick={() => {
                    setActiveTab(item.name.toLowerCase());
                    if (isMobile) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <div className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'}`}>
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-neutral-900' : ''}`} />
                  </div>
                  
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout section */}
      <div className="absolute bottom-0 w-full p-2 border-t border-neutral-800">
        <button
          onClick={handleLogout}
          className={`flex items-center px-4 py-3 w-full rounded-lg transition-all duration-200 text-gray-300 hover:bg-red-600 hover:text-white ${
            isSidebarOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <FaSignOutAlt className="w-5 h-5" />
          
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;