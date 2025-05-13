// src/components/DashboardNavbar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Markets', path: '/markets' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/logout' },
  ];

  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <nav className="bg-neutral-dark text-white shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-extrabold tracking-tight">GNF Invest</h1>
        </motion.div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        <motion.ul
          className={`md:flex md:space-x-6 absolute md:static bg-neutral-dark w-full md:w-auto left-0 top-16 md:top-0 overflow-hidden md:overflow-visible ${isOpen ? 'block' : 'hidden md:block'}`}
          variants={variants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.1, color: '#F59E0B' }} // Secondary color (gold)
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-3 md:p-0"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-secondary font-semibold'
                    : 'hover:text-secondary transition-colors'
                }
              >
                {item.name}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
};

export default DashboardNavbar;