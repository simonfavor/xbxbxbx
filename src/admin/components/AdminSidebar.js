import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUsers, FaExchangeAlt,   FaChevronLeft, FaChevronRight, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen, onLogout, setActiveTab }) => {
  const navigate = useNavigate();
   const location = useLocation();

  const navItems = [
    { name: 'Users', path: '/admin/users', icon: FaUsers },
    { name: 'Transactions', path: '/admin/transactions', icon: FaExchangeAlt },
    { name: 'Crypto Wallets', path: '/admin/cryptowallets', icon: FaExchangeAlt },
    { name: 'Logout', path: '/admin/logout', icon: FaSignOutAlt },
  ];

  const variants = {
    open: { width: '250px', opacity: 1 },
    closed: { width: '60px', opacity: 0.7 },
  };

  const handleLogout = () => {
    onLogout();
    navigate('/admin/login');
  };

  return (
    <motion.div
    className={`fixed h-screen bg-neutral-900 text-white z-40 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
      initial={false}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        <motion.div
          className="flex items-center"
          animate={{ opacity: isSidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isSidebarOpen && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-extrabold tracking-tight text-secondary"
            >
              GNF <span className="text-white">Invest</span>
            </motion.h1>
          )}
        </motion.div>
        
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
                  onClick={() => setActiveTab(item.name.toLowerCase())}
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

export default AdminSidebar;