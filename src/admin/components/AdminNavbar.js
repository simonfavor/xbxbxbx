// src/components/AdminNavbar.jsx
import { useState, useEffect } from 'react';
import { FaBars, FaBell, FaUser, FaMoon, FaSun, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ isSidebarOpen, setIsSidebarOpen, onLogout }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch notifications (mock data for now)
  useEffect(() => {
    // Sample notifications
    setNotifications([
      { id: 1, message: 'New user registered', time: '5 min ago' },
      { id: 2, message: 'New withdrawal request', time: '10 min ago' },
      { id: 3, message: 'Transaction completed', time: '1 hour ago' }
    ]);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/admin/login');
  };

  return (
    <motion.nav 
      className="bg-white dark:bg-neutral-800 shadow-md h-16 z-10 sticky top-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side - Toggle and search */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 mr-2 lg:hidden"
          >
            <FaBars className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
            </form>
          </div>
        </div>

        {/* Right side - Notifications, Theme Toggle, User */}
        <div className="flex items-center space-x-4">
          {/* Search icon for mobile */}
          <button className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700">
            <FaSearch className="w-5 h-5" />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 relative"
            >
              <FaBell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* Dropdown for notifications */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-neutral-700">
                <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-neutral-700">
                  Notifications
                </div>
                {notifications.length > 0 ? (
                  <>
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-neutral-700 border-b border-gray-100 dark:border-neutral-700">
                        <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <a href="#" className="block text-center text-sm text-secondary py-2">
                      View all notifications
                    </a>
                  </>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    No new notifications
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>

          {/* User profile */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white">
                <FaUser className="w-4 h-4" />
              </div>
              <span className="hidden md:inline text-sm font-medium">Admin</span>
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-neutral-700">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700">
                  Settings
                </a>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar;