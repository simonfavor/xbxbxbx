// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBell, FaSearch, FaUserCircle, FaBars } from 'react-icons/fa';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  // Simulate fetching user data
  useEffect(() => {
    // Replace with actual API call to get user profile image
    // For demonstration, we'll leave it null to show the placeholder
    // setProfileImg('https://your-api.com/profile-image');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-30 bg-white dark:bg-neutral-800 shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <FaBars className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="relative mx-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification bell */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
              <FaBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary flex items-center justify-center bg-gray-200 dark:bg-neutral-700">
                {profileImg ? (
                  <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                John Doe
              </span>
            </button>

            {/* Profile dropdown menu */}
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-neutral-700"
              >
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
                  Your Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  Sign out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;