import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [activeTab, setActiveTab] = useState('plans');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [txResponse, withdrawResponse] = await Promise.all([
          axios.get('https://xbxbxb.onrender.com/api/transactions', { headers }),
          axios.get('https://xbxbxb.onrender.com/api/withdrawals', { headers })
        ]);
        
        const planActivations = txResponse.data.filter(tx => tx.type === 'Plan Activation');
        setTransactions(planActivations);
        setWithdrawals(withdrawResponse.data);
      } catch (error) {
        toast.error('Failed to load transaction data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatWalletAddress = (address) => {
    if (!address) return '-';
    if (isMobile) {
      return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
    }
    return address;
  };

  const formatDate = (dateString) => {
    const options = isMobile 
      ? { month: 'short', day: 'numeric' } 
      : { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <motion.div
          className="bg-white p-4 sm:p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4 sm:mb-6">Transaction History</h2>
          
          {/* Tab Navigation */}
          <div className="flex mb-6 sm:mb-8 border-b overflow-x-auto">
            <button
              className={`pb-3 sm:pb-4 px-4 sm:px-6 font-medium text-base sm:text-lg whitespace-nowrap transition-all duration-200 
                ${activeTab === 'plans' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-indigo-400'}`}
              onClick={() => setActiveTab('plans')}
            >
              Plan Activations
            </button>
            <button
              className={`pb-3 sm:pb-4 px-4 sm:px-6 font-medium text-base sm:text-lg whitespace-nowrap transition-all duration-200 
                ${activeTab === 'withdrawals' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-indigo-400'}`}
              onClick={() => setActiveTab('withdrawals')}
            >
              Withdrawals
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12 sm:py-16">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : activeTab === 'plans' ? (
            <>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-indigo-50">
                        <th className="py-3 sm:py-4 px-3 sm:px-6 rounded-tl-lg text-sm sm:text-base">Amount</th>
                        <th className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Plan</th>
                        <th className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Status</th>
                        <th className="py-3 sm:py-4 px-3 sm:px-6 rounded-tr-lg text-sm sm:text-base">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t text-sm sm:text-base">${tx.amount.toLocaleString()}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t text-sm sm:text-base">{tx.plan?.type || '-'}</td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusClass(tx.status)}`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t text-sm sm:text-base">{formatDate(tx.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg p-6 sm:p-8 text-center">
                  <p className="text-indigo-800 text-base sm:text-lg">You haven't activated any plans yet.</p>
                </div>
              )}
            </>
          ) : (
            <>
              {withdrawals.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-indigo-50">
                        <th className="py-3 sm:py-4 px-3 sm:px-6 rounded-tl-lg text-sm sm:text-base">Amount</th>
                        {!isMobile && (
                          <th className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Crypto</th>
                        )}
                        <th className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Wallet</th>
                        <th className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Status</th>
                        <th className="py-3 sm:py-4 px-3 sm:px-6 rounded-tr-lg text-sm sm:text-base">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.map((withdrawal) => (
                        <tr key={withdrawal._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t text-sm sm:text-base">${withdrawal.amount.toLocaleString()}</td>
                          {!isMobile && (
                            <td className="py-3 sm:py-4 px-3 sm:px-6 border-t text-sm sm:text-base uppercase">
                              {withdrawal.cryptoCurrency}
                            </td>
                          )}
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t text-sm sm:text-base font-mono">
                            {formatWalletAddress(withdrawal.walletAddress)}
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusClass(withdrawal.status)}`}>
                              {withdrawal.status}
                            </span>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 border-t text-sm sm:text-base">
                            {formatDate(withdrawal.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg p-6 sm:p-8 text-center">
                  <p className="text-indigo-800 text-base sm:text-lg">You haven't made any withdrawals yet.</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Transactions;