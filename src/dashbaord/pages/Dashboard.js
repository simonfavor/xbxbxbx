import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { cryptoColors, cryptoBorderColors, cryptoTextColors, getCryptoIcon } from './cryptoUtils';
import {
  FaDollarSign,
  FaChartLine,
  FaBitcoin,
  FaRegNewspaper,
  FaWallet,
  FaRegBell,
  FaUserCircle,
  FaRegQuestionCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaArrowUp,
  FaRegCopy,
  FaCheck,
  FaSpinner
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const investmentPackages = [
  { type: 'Stocks', amount: 15000, roi: 40, withdrawalPeriod: 'Quarterly', description: 'Diversified blue-chip stocks portfolio', icon: '📈', riskLevel: 'Medium' },
  { type: 'Bonds', amount: 1000, roi: 30, withdrawalPeriod: 'Quarterly', description: 'Government and corporate bonds', icon: '🔒', riskLevel: 'Low' },
  { type: 'Crypto', amount: 500, roi: 30, withdrawalPeriod: '10 Days', description: 'Top 10 cryptocurrency allocation', icon: '₿', riskLevel: 'High' },
  { type: 'Crypto Compounding', amount: 500, roi: 70, withdrawalPeriod: '45 Days', description: 'Compound interest crypto strategy', icon: '🚀', riskLevel: 'Very High' },
  { type: 'Agriculture', amount: 1000, roi: 30, withdrawalPeriod: 'Quarterly', description: 'Farmland and commodities investment', icon: '🌾', riskLevel: 'Medium' },
  { type: 'Real Estate', amount: 3000, roi: 30, withdrawalPeriod: 'Quarterly', description: 'Commercial real estate trust', icon: '🏢', riskLevel: 'Medium-Low' },
];

const cryptoWallets = {
  Bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  Ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  USDT: '0x3c3d...f47e',
};

const marketNews = [
  { id: 1, title: 'Fed signals interest rate cut', date: '2025-05-12', category: 'Economy' },
  { id: 2, title: 'Tech stocks rally continues', date: '2025-05-11', category: 'Stocks' },
  { id: 3, title: 'Bitcoin reaches new all-time high', date: '2025-05-10', category: 'Crypto' },
  { id: 4, title: 'Real estate market shows signs of recovery', date: '2025-05-09', category: 'Real Estate' }
];

const upcomingEvents = [
  { id: 1, title: 'Quarterly Earnings Call', date: '2025-05-20', time: '14:00 EST' },
  { id: 2, title: 'Investment Strategy Webinar', date: '2025-05-25', time: '10:00 EST' },
  { id: 3, title: 'Dividend Distribution', date: '2025-06-01', time: 'All Day' }
];

const Dashboard = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [countdown, setCountdown] = useState(1800);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [planId, setPlanId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('Bitcoin');
  const [copied, setCopied] = useState(false);
  const [yearlyGrowth, setYearlyGrowth] = useState([]);
  const [portfolioAllocation, setPortfolioAllocation] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activePackageTab, setActivePackageTab] = useState('featured');

  const [wallets, setWallets] = useState([]);
const [isLoadingWallets, setIsLoadingWallets] = useState(false);
const [walletError, setWalletError] = useState(null);


// Add this useEffect to fetch wallets when modal opens
useEffect(() => {
    const fetchWallets = async () => {
      if (isModalOpen && modalStep === 2) {
        setIsLoadingWallets(true);
        setWalletError(null);
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('https://xbxbxb.onrender.com/api/wallets', { 
            headers: { Authorization: `Bearer ${token}` } 
          });
          setWallets(response.data);
          // Set the first wallet as selected by default
          if (response.data.length > 0) {
            setSelectedCrypto(response.data[0].symbol);
          }
        } catch (error) {
          setWalletError('Failed to load payment options. Please try again later.');
          toast.error('Failed to load payment options');
        } finally {
          setIsLoadingWallets(false);
        }
      }
    };
  
    fetchWallets();
  }, [isModalOpen, modalStep]);
  
  
  
const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [plansResponse, transactionsResponse] = await Promise.all([
          axios.get('https://xbxbxb.onrender.com/api/plans', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://xbxbxb.onrender.com/api/transactions', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const activePlan = plansResponse.data.find((plan) => plan.status === 'Active');
        setSelectedPlan(activePlan || null);
        setTransactions(transactionsResponse.data);
        setTotalEarnings(5000);
        setTotalInvested(20000);
        setYearlyGrowth([
          { month: 'Jan', value: 2500 },
          { month: 'Feb', value: 3200 },
          { month: 'Mar', value: 3100 },
          { month: 'Apr', value: 3600 },
          { month: 'May', value: 5000 }
        ]);
        setPortfolioAllocation([
          { name: 'Stocks', value: 45 },
          { name: 'Bonds', value: 20 },
          { name: 'Crypto', value: 15 },
          { name: 'Real Estate', value: 12 },
          { name: 'Cash', value: 8 }
        ]);
      } catch (error) {
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (isModalOpen && modalStep === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsModalOpen(false);
            setModalStep(1);
            setSelectedPackage(null);
            toast.error('Payment window expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isModalOpen, modalStep, countdown]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const openModal = (pkg) => {
    console.log('Opening modal with package', pkg);
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    setModalStep(1);
    setCountdown(1800);
  };

  const handlePlanSelection = async () => {
    console.log('handlePlanSelection triggered', { selectedPackage });
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      if (!token) {
        toast.error('Please log in again');
        navigate('/login');
        return;
      }
      const response = await axios.post(
        'https://xbxbxb.onrender.com/api/plans',
        selectedPackage,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Response:', response.data);
      setPlanId(response.data._id || response.data.plan._id);
      setModalStep(2);
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to select plan');
    }
  };

  const handlePaymentConfirmation = async () => {
    setIsPaymentLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://xbxbxb.onrender.com/api/plans/confirm-payment/${planId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowSuccessModal(true);
      
      // Auto-dismiss the success modal after 30 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 30000);
      setIsPaymentLoading(false);
      setIsModalOpen(false);
      setModalStep(1);
      setSelectedPackage(null);
      
    } catch (error) {
      setIsPaymentLoading(false);
      toast.error('Payment confirmation failed');
    }
  };

  const handleWithdrawClick = () => {
    if (totalEarnings <= 0) {
      toast.error('No funds available to withdraw');
    } else {
      navigate('/account/withdrawals');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Address copied to clipboard!');
    });
  };

  const chartData = {
    labels: yearlyGrowth.map((item) => item.month),
    datasets: [
      {
        label: 'Earnings ($)',
        data: yearlyGrowth.map((item) => item.value),
        borderColor: '#0D9488',
        backgroundColor: 'rgba(13, 148, 136, 0.2)',
        fill: true,
        tension: 0.4
      },
    ],
  };

  const portfolioData = {
    labels: portfolioAllocation.map((item) => item.name),
    datasets: [
      {
        data: portfolioAllocation.map((item) => item.value),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Earnings Growth',
        color: '#334155',
        font: {
          size: 16,
          weight: 'bold',
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Portfolio Allocation',
        color: '#334155',
        font: {
          size: 16,
          weight: 'bold',
        }
      },
    },
    cutout: '70%'
  };

  const filteredPackages = activePackageTab === 'featured'
    ? investmentPackages.slice(0, 3)
    : investmentPackages;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <motion.div
          className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl shadow-lg mb-8 overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 md:p-8 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-white font-bold text-2xl md:text-3xl mb-2">Welcome back, John!</h1>
              <p className="text-teal-100 mb-4">
                Balance: <span className="font-bold text-white">${totalEarnings.toLocaleString()}</span>
              </p>
              <button
                onClick={handleWithdrawClick}
                className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors shadow-sm"
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 md:opacity-20">
            <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#ffffff"
                d="M37.5,-48.7C49.3,-38.5,60.1,-28.1,64.3,-15.3C68.5,-2.5,66.2,12.7,59.4,25.9C52.6,39.1,41.3,50.2,27.2,59.5C13.1,68.8,-3.7,76.3,-18.5,72.6C-33.3,68.9,-46.1,54.1,-54.1,38.9C-62.1,23.7,-65.3,8.1,-62.7,-5.7C-60.1,-19.5,-51.7,-31.4,-40.8,-41.9C-29.9,-52.3,-15,-61.2,-1.2,-59.7C12.6,-58.2,25.7,-58.9,37.5,-48.7Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </motion.div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Earnings</h2>
              <div className="bg-teal-100 p-2 rounded-lg">
                <FaDollarSign className="text-teal-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">${totalEarnings.toLocaleString()}</p>
            <div className="flex items-center mt-2 text-sm">
              <FaArrowUp className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Invested</h2>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaWallet className="text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">${totalInvested.toLocaleString()}</p>
            <div className="flex items-center mt-2 text-sm">
              <FaArrowUp className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5.3%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">ROI</h2>
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaChartLine className="text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">25%</p>
            <div className="flex items-center mt-2 text-sm">
              <FaArrowUp className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+2.1%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Active Plans</h2>
              <div className="bg-amber-100 p-2 rounded-lg">
                <FaRegNewspaper className="text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{selectedPlan ? 1 : 0}</p>
            <div className="mt-2 text-sm text-gray-500">
              {selectedPlan ? selectedPlan.type : 'No active plans'}
            </div>
          </motion.div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Growth Chart */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Portfolio Growth</h2>
                <p className="text-gray-500 text-sm">Track your earnings over time</p>
              </div>
              <div className="h-80">
                <Line data={chartData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Investment Packages */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Investment Packages</h2>
                  <p className="text-gray-500 text-sm">Choose a package that meets your goals</p>
                </div>
                <div className="flex p-1 bg-gray-100 rounded-lg">
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${activePackageTab === 'featured' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-600'}`}
                    onClick={() => setActivePackageTab('featured')}
                  >
                    Featured
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md text-sm ${activePackageTab === 'all' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-600'}`}
                    onClick={() => setActivePackageTab('all')}
                  >
                    All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPackages.map((pkg) => (
                  <div key={pkg.type} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl" aria-hidden="true">{pkg.icon}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          pkg.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                          pkg.riskLevel === 'Medium' ? 'bg-blue-100 text-blue-800' :
                          pkg.riskLevel === 'Medium-Low' ? 'bg-cyan-100 text-cyan-800' :
                          pkg.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {pkg.riskLevel} Risk
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{pkg.type}</h3>
                    <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Investment:</span>
                        <span className="font-medium">${pkg.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ROI:</span>
                        <span className="font-medium text-green-600">{pkg.roi}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Withdrawal:</span>
                        <span className="font-medium">{pkg.withdrawalPeriod}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => openModal(pkg)}
                      className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>

              {activePackageTab === 'featured' && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setActivePackageTab('all')}
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center mx-auto"
                  >
                    View All Packages
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
                <p className="text-gray-500 text-sm">Track your recent investment activities</p>
              </div>

              <div className="overflow-x-auto">
                {transactions.length > 0 ? (
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((tx) => (
                        <tr key={tx._id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-800">{tx.type}</td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800">${tx.amount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-800">{tx.plan?.type || '-'}</td>
                          <td className="py-3 px-4 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tx.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-gray-500 mb-1">No transactions yet</p>
                    <p className="text-sm text-gray-400">Your transaction history will appear here</p>
                  </div>
                )}
              </div>

              {transactions.length > 0 && (
                <div className="mt-4 text-right">
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                    View All Transactions
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-8">
            {/* Portfolio Allocation */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Portfolio Allocation</h2>
                <p className="text-gray-500 text-sm">Your investment distribution</p>
              </div>
              <div className="aspect-square p-4">
                <Doughnut data={portfolioData} options={doughnutOptions} />
              </div>
            </motion.div>

            {/* Active Plan Card */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Plan</h2>
              {selectedPlan ? (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl" aria-hidden="true">
                      {investmentPackages.find((p) => p.type === selectedPlan.type)?.icon || '📈'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">{selectedPlan.type}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Investment:</span>
                      <span className="font-medium">${selectedPlan.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-medium text-green-600">{selectedPlan.roi}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Withdrawal:</span>
                      <span className="font-medium">{selectedPlan.withdrawalPeriod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Next Payout:</span>
                      <span className="font-medium">Jun 15, 2025</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Current progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Start: May 1</span>
                      <span>45%</span>
                      <span>End: Jul 31</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                  <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-1">No active investment plan</p>
                  <p className="text-sm text-gray-400 mb-4">Choose a plan to start earning</p>
                  <button
                    onClick={() => setActivePackageTab('all')}
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    Browse Investment Plans
                  </button>
                </div>
              )}
            </motion.div>

            {/* Market News */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Market News</h2>
                  <p className="text-gray-500 text-sm">Latest financial updates</p>
                </div>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {marketNews.map((news) => (
                  <div key={news.id} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-start">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-800 hover:text-teal-600 cursor-pointer">
                          {news.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500">{news.date}</span>
                          <span className="mx-1 text-gray-500">•</span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                            {news.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                    <div className="mr-4 flex flex-col items-center justify-center">
                      <div className="text-xs font-medium text-gray-500">{event.date.split('-')[1]}/{event.date.split('-')[2]}</div>
                      <div className="text-sm font-bold text-gray-700">{event.date.split('-')[0]}</div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">{event.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  View Calendar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Plan Selection Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            {modalStep === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4">
                  Confirm Plan Selection
                </Dialog.Title>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2" aria-hidden="true">
                      {investmentPackages.find((p) => p.type === selectedPackage?.type)?.icon || '📈'}
                    </span>
                    <h3 className="text-lg font-medium text-gray-800">{selectedPackage?.type}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {investmentPackages.find((p) => p.type === selectedPackage?.type)?.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Investment Amount:</span>
                      <span className="font-medium">${selectedPackage?.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected ROI:</span>
                      <span className="font-medium text-green-600">{selectedPackage?.roi}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Withdrawal Period:</span>
                      <span className="font-medium">{selectedPackage?.withdrawalPeriod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Risk Level:</span>
                      <span
                        className={`font-medium ${
                          investmentPackages.find((p) => p.type === selectedPackage?.type)?.riskLevel === 'Low' ? 'text-green-600' :
                          investmentPackages.find((p) => p.type === selectedPackage?.type)?.riskLevel === 'Medium' ? 'text-blue-600' :
                          investmentPackages.find((p) => p.type === selectedPackage?.type)?.riskLevel === 'Medium-Low' ? 'text-cyan-600' :
                          investmentPackages.find((p) => p.type === selectedPackage?.type)?.riskLevel === 'High' ? 'text-orange-600' :
                          'text-red-600'
                        }`}
                      >
                        {investmentPackages.find((p) => p.type === selectedPackage?.type)?.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  By confirming, you agree to our terms and conditions regarding investment plans.
                </p>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlanSelection}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Confirm Plan
                  </button>
                </div>
              </motion.div>
            )}

{modalStep === 2 && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      <FaBitcoin className="mr-2 text-amber-500" />
      Make Payment
    </Dialog.Title>

    <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
      <div className="flex items-center text-blue-700 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">Payment Required</span>
      </div>
      <p className="text-sm text-blue-700">
        Please send <span className="font-bold">${selectedPackage?.amount.toLocaleString()}</span> to one of our crypto wallets to activate your plan.
      </p>
    </div>

    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-800">Select Payment Method</h3>
      </div>

      {isLoadingWallets ? (
        <div className="flex justify-center items-center py-8">
          <FaSpinner className="animate-spin text-teal-500 text-2xl" />
        </div>
      ) : walletError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {walletError}
        </div>
      ) : wallets.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          No payment options available at the moment.
        </div>
      ) : (
        <div className="space-y-3">
            {wallets.map((wallet) => (
            <div
                key={wallet._id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedCrypto === wallet.symbol 
                    ? `${cryptoBorderColors[wallet.symbol] || 'border-teal-500'} bg-${cryptoColors[wallet.symbol] || 'bg-teal-50'} bg-opacity-20`
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCrypto(wallet.symbol)}
            >
                <div className="flex items-center">
                <div className={`mr-3 ${cryptoTextColors[wallet.symbol] || 'text-teal-500'}`}>
                    {wallet.iconUrl ? (
                    <img 
                        src={wallet.iconUrl} 
                        alt={wallet.name} 
                        className="h-6 w-6 object-contain"
                        onError={(e) => {
                        // Fallback to default icon if image fails to load
                        e.target.onerror = null;
                        e.target.src = 'https://www.cryptologos.cc/logos/question-mark-white.png';
                        }}
                    />
                    ) : (
                    getCryptoIcon(wallet.symbol)
                    )}
                </div>
                <div>
                    <p className="font-medium text-gray-800">{wallet.name}</p>
                    <p className="text-sm text-gray-500">
                    {wallet.symbol} ({wallet.network})
                    </p>
                </div>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>

    {!isLoadingWallets && !walletError && wallets.length > 0 && (
      <>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Send to this address:</h3>
          <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex-1 font-mono text-sm text-gray-800 mr-2 break-all">
              {wallets.find(w => w.symbol === selectedCrypto)?.walletAddress || 'Loading...'}
            </div>
            <button
              onClick={() => copyToClipboard(wallets.find(w => w.symbol === selectedCrypto)?.walletAddress || '')}
              className="flex-shrink-0 text-teal-600 hover:text-teal-700"
              disabled={!selectedCrypto}
            >
              {copied ? <FaCheck /> : <FaRegCopy />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-center text-yellow-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Time Remaining:</span>
          </div>
          <div className="text-yellow-700 font-mono">
            {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </>
    )}

    <div className="flex justify-end space-x-3">
      <button
        onClick={() => setIsModalOpen(false)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handlePaymentConfirmation}
        className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center min-w-[100px]"
        disabled={isPaymentLoading || isLoadingWallets || walletError || wallets.length === 0}
      >
        {isPaymentLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Verifying...
          </>
        ) : (
          "I've Paid"
        )}
      </button>
    </div>
  </motion.div>
)}
          </Dialog.Panel>
        </div>
      </Dialog>

      {showSuccessModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <motion.div 
      className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Plan Submitted Successfully!</h3>
        <p className="text-sm text-gray-500 mb-4">
          Your investment plan has been submitted and is pending approval. Once confirmed, your plan will be activated.
        </p>
        <button
          onClick={() => setShowSuccessModal(false)}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Got it
        </button>
      </div>
    </motion.div>
  </div>
)}
    </div>
  );
};

export default Dashboard;