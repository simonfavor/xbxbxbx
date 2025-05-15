// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaSearch, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-close sidebar when switching to mobile view
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen, setIsSidebarOpen]);

  // Toggle sidebar with different behavior for mobile/desktop
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <div className="sticky top-0 z-30 bg-white dark:bg-neutral-800 shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left section - Sidebar toggle and search */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen && isMobile ? (
              <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          {/* Search bar - hidden on mobile */}
          {!isMobile && (
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary w-64"
              />
            </div>
          )}
        </div>

        {/* Right section - Notifications and profile */}
        <div className="flex items-center space-x-4">
          {/* Notification bell */}
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors relative"
              aria-label="Notifications"
            >
              <FaBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* Profile dropdown */}
          <div className="relative profile-menu-container">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="User profile"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary flex items-center justify-center bg-gray-200 dark:bg-neutral-700">
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
              </div>
              {!isMobile && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  John Doe
                </span>
              )}
            </button>

            {/* Profile dropdown menu */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-neutral-700"
                >
                  <a 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Your Profile
                  </a>
                  <a 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile search bar - appears below main navbar when needed */}
      {isMobile && (
        <div className="px-4 pb-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;