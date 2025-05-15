import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import emptyStateSvg from '../../assets/empty-state.svg';

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin (BTC)' },
    { id: 'eth', name: 'Ethereum (ETH)' },
    { id: 'usdt', name: 'Tether (USDT)' },
    { id: 'usdc', name: 'USD Coin (USDC)' },
    { id: 'bnb', name: 'Binance Coin (BNB)' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://xbxbxb.onrender.com/api/withdrawals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWithdrawals(response.data);
      } catch (error) {
        toast.error('Failed to load withdrawals');
      }
    };
    fetchWithdrawals();
  }, []);

  const handleWithdrawalRequest = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    setShowModal(true);
  };

  const handleCryptoSelect = (cryptoId) => {
    setSelectedCrypto(cryptoId);
  };

  const handleSubmitWithdrawal = async (e) => {
    e.preventDefault();
    
    if (!selectedCrypto) {
      toast.error('Please select a cryptocurrency');
      return;
    }
    
    if (!walletAddress) {
      toast.error('Please enter your wallet address');
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://xbxbxb.onrender.com/api/withdrawals',
        { 
          amount,
          cryptoCurrency: selectedCrypto,
          walletAddress
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setWithdrawals([...withdrawals, response.data]);
      setAmount('');
      setSelectedCrypto('');
      setWalletAddress('');
      setShowModal(false);
      
      toast.success('Withdrawal request submitted successfully! Your transaction is being processed.');
    } catch (error) {
      toast.error('Withdrawal request failed');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCrypto('');
    setWalletAddress('');
  };

  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Request Withdrawal Section */}
        <motion.div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-dark mb-3 sm:mb-4">Request Withdrawal</h2>
          <form onSubmit={handleWithdrawalRequest} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount ($)"
              className="flex-1 p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              type="submit" 
              className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Withdraw
            </button>
          </form>
        </motion.div>
        
        {/* Withdrawal History Section */}
        <motion.div
          className="bg-white p-4 sm:p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-dark mb-3 sm:mb-4">Withdrawal History</h2>
          {withdrawals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-2 px-1 sm:px-2 text-sm sm:text-base">Amount</th>
                    <th className="py-2 px-1 sm:px-2 text-sm sm:text-base">Crypto</th>
                    {!isMobile && (
                      <th className="py-2 px-2 text-sm sm:text-base">Wallet</th>
                    )}
                    <th className="py-2 px-1 sm:px-2 text-sm sm:text-base">Status</th>
                    <th className="py-2 px-1 sm:px-2 text-sm sm:text-base">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((withdrawal) => (
                    <tr key={withdrawal._id} className="border-t hover:bg-gray-50">
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-sm sm:text-base">${withdrawal.amount.toLocaleString()}</td>
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-sm sm:text-base">{withdrawal.cryptoCurrency || 'N/A'}</td>
                      {!isMobile && (
                        <td className="py-2 sm:py-3 px-2 text-sm sm:text-base">
                          {withdrawal.walletAddress 
                            ? `${withdrawal.walletAddress.substring(0, 6)}...${withdrawal.walletAddress.substring(withdrawal.walletAddress.length - 4)}`
                            : 'N/A'
                          }
                        </td>
                      )}
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-sm sm:text-base">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          withdrawal.status === 'completed' ? 'bg-green-100 text-green-800' :
                          withdrawal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-1 sm:px-2 text-sm sm:text-base whitespace-nowrap">
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <img src={emptyStateSvg} alt="Empty state" className="mx-auto mb-3 sm:mb-4 w-24 sm:w-32 h-24 sm:h-32" />
              <p className="text-gray-600 text-sm sm:text-base">No withdrawals yet. Request one above!</p>
            </div>
          )}
        </motion.div>
        
        {/* Cryptocurrency Selection Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
              <motion.div 
                className="bg-white rounded-lg shadow-xl max-w-full sm:max-w-md w-full overflow-hidden mx-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-dark">Complete Your Withdrawal</h3>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <p className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                      Amount: <span className="font-semibold">${Number(amount).toLocaleString()}</span>
                    </p>
                    <div className="h-px bg-gray-200 my-2 sm:my-4"></div>
                  </div>
                  
                  <form onSubmit={handleSubmitWithdrawal}>
                    <div className="mb-3 sm:mb-4">
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                        Select Cryptocurrency
                      </label>
                      <div className="grid grid-cols-1 gap-1 sm:gap-2">
                        {cryptoOptions.map((crypto) => (
                          <button
                            key={crypto.id}
                            type="button"
                            onClick={() => handleCryptoSelect(crypto.id)}
                            className={`flex items-center p-2 sm:p-3 border rounded-lg hover:bg-gray-50 transition text-sm sm:text-base ${
                              selectedCrypto === crypto.id 
                                ? 'border-primary bg-primary bg-opacity-10 ring-2 ring-primary' 
                                : 'border-gray-200'
                            }`}
                          >
                            {crypto.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {selectedCrypto && (
                      <motion.div 
                        className="mb-3 sm:mb-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                          Your {cryptoOptions.find(c => c.id === selectedCrypto)?.name} Wallet Address
                        </label>
                        <input
                          type="text"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          placeholder={`Enter your ${selectedCrypto.toUpperCase()} wallet address`}
                          className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                          required
                        />
                      </motion.div>
                    )}
                    
                    <div className="mt-4 sm:mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-teal-700 transition text-sm sm:text-base ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Confirm Withdrawal'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full mt-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Withdrawals;