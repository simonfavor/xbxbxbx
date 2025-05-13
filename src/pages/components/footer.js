// src/components/Footer.jsx
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
  ];

  return (
    <motion.footer
      className="bg-neutral-dark text-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
     
        <div>
          <h3 className="text-xl font-semibold mb-4"> GNF Invest </h3>
          <p className="text-gray-300">
            GNF Invest is your trusted partner in wealth creation. With cutting-edge tools and
            personalized insights, we empower you to navigate the financial markets with confidence
            and achieve your investment goals.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {['Home', 'About', 'Services', 'Contact'].map((link) => (
              <li key={link}>
                <motion.a
                  href={`/${link.toLowerCase()}`}
                  className="text-gray-300 hover:text-secondary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {link}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact and Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-2">123 Wealth Street, Finance City, FC 12345</p>
          <p className="text-gray-300 mb-2">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-300 mb-4">Email: support@gnfinvest.com</p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary text-2xl"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        © 2025 GNF Invest. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;