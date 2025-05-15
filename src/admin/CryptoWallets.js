import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

// Crypto icons mapping
const cryptoIcons = {
  BTC: 'https://www.cryptologos.cc/logos/bitcoin-btc-logo.png',
  ETH: 'https://www.cryptologos.cc/logos/ethereum-eth-logo.png',
  USDT: 'https://www.cryptologos.cc/logos/tether-usdt-logo.png',
  BNB: 'https://www.cryptologos.cc/logos/bnb-bnb-logo.png',
  USDC: 'https://www.cryptologos.cc/logos/usd-coin-usdc-logo.png',
  XRP: 'https://www.cryptologos.cc/logos/xrp-xrp-logo.png',
  ADA: 'https://www.cryptologos.cc/logos/cardano-ada-logo.png',
  DOGE: 'https://www.cryptologos.cc/logos/dogecoin-doge-logo.png',
  MATIC: 'https://www.cryptologos.cc/logos/polygon-matic-logo.png',
  SOL: 'https://www.cryptologos.cc/logos/solana-sol-logo.png',
  DOT: 'https://www.cryptologos.cc/logos/polkadot-new-dot-logo.png',
  LTC: 'https://www.cryptologos.cc/logos/litecoin-ltc-logo.png',
  SHIB: 'https://www.cryptologos.cc/logos/shiba-inu-shib-logo.png',
  AVAX: 'https://www.cryptologos.cc/logos/avalanche-avax-logo.png',
  LINK: 'https://www.cryptologos.cc/logos/chainlink-link-logo.png',
  UNI: 'https://www.cryptologos.cc/logos/uniswap-uni-logo.png',
  BCH: 'https://www.cryptologos.cc/logos/bitcoin-cash-bch-logo.png',
  XLM: 'https://www.cryptologos.cc/logos/stellar-xlm-logo.png',
  VET: 'https://www.cryptologos.cc/logos/vechain-vet-logo.png',
  // Default fallback icon
  DEFAULT: 'https://www.cryptologos.cc/logos/question-mark-white.png'
};

const popularCryptos = [
  { name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin' },
  { name: 'Ethereum', symbol: 'ETH', network: 'Ethereum' },
  { name: 'Tether USD', symbol: 'USDT', network: 'Ethereum (ERC20)' },
  { name: 'Tether USD', symbol: 'USDT', network: 'Tron (TRC20)' },
  { name: 'BNB', symbol: 'BNB', network: 'Binance Smart Chain' },
  { name: 'USD Coin', symbol: 'USDC', network: 'Ethereum' },
  { name: 'XRP', symbol: 'XRP', network: 'Ripple' },
  { name: 'Cardano', symbol: 'ADA', network: 'Cardano' },
  { name: 'Dogecoin', symbol: 'DOGE', network: 'Dogecoin' },
  { name: 'Polygon', symbol: 'MATIC', network: 'Polygon' },
  { name: 'Solana', symbol: 'SOL', network: 'Solana' },
  { name: 'Polkadot', symbol: 'DOT', network: 'Polkadot' },
  { name: 'Litecoin', symbol: 'LTC', network: 'Litecoin' },
  { name: 'Shiba Inu', symbol: 'SHIB', network: 'Ethereum' },
  { name: 'Avalanche', symbol: 'AVAX', network: 'Avalanche' },
  { name: 'Chainlink', symbol: 'LINK', network: 'Ethereum' },
  { name: 'Uniswap', symbol: 'UNI', network: 'Ethereum' },
  { name: 'Bitcoin Cash', symbol: 'BCH', network: 'Bitcoin Cash' },
  { name: 'Stellar', symbol: 'XLM', network: 'Stellar' },
  { name: 'VeChain', symbol: 'VET', network: 'VeChain' }
];

// Add icon URLs to the popular cryptos
const popularCryptosWithIcons = popularCryptos.map(crypto => ({
  ...crypto,
  iconUrl: cryptoIcons[crypto.symbol] || cryptoIcons.DEFAULT
}));

const CryptoWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    network: '',
    contractAddress: '',
    walletAddress: '',
    isActive: true,
    iconUrl: ''
  });

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('https://xbxbxb.onrender.com/api/wallets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Add default icons to wallets that don't have one
      const walletsWithIcons = response.data.map(wallet => {
        if (!wallet.iconUrl) {
          return {
            ...wallet,
            iconUrl: cryptoIcons[wallet.symbol] || cryptoIcons.DEFAULT
          };
        }
        return wallet;
      });
      
      setWallets(walletsWithIcons);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load wallets');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectCrypto = (crypto) => {
    setFormData(prev => ({
      ...prev,
      name: crypto.name,
      symbol: crypto.symbol,
      network: crypto.network,
      iconUrl: crypto.iconUrl || (cryptoIcons[crypto.symbol] || cryptoIcons.DEFAULT)
    }));
  };

  const handleAddWallet = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // If no iconUrl is provided, use the default one based on symbol
      const dataToSubmit = {
        ...formData,
        iconUrl: formData.iconUrl || (cryptoIcons[formData.symbol] || cryptoIcons.DEFAULT)
      };
      
      await axios.post('https://xbxbxb.onrender.com/api/wallets', dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Wallet added successfully');
      fetchWallets();
      setShowAddModal(false);
      setFormData({
        name: '',
        symbol: '',
        network: '',
        contractAddress: '',
        walletAddress: '',
        isActive: true,
        iconUrl: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add wallet');
    }
  };

  const handleEditWallet = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // If no iconUrl is provided, use the default one based on symbol
      const dataToSubmit = {
        ...formData,
        iconUrl: formData.iconUrl || (cryptoIcons[formData.symbol] || cryptoIcons.DEFAULT)
      };
      
      await axios.put(`https://xbxbxb.onrender.com/api/wallets/${currentWallet._id}`, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Wallet updated successfully');
      fetchWallets();
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update wallet');
    }
  };

  const handleDeleteWallet = async (id) => {
    if (window.confirm('Are you sure you want to delete this wallet?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`https://xbxbxb.onrender.com/api/wallets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Wallet deleted successfully');
        fetchWallets();
      } catch (error) {
        toast.error('Failed to delete wallet');
      }
    }
  };

  const openEditModal = (wallet) => {
    setCurrentWallet(wallet);
    setFormData({
      name: wallet.name,
      symbol: wallet.symbol,
      network: wallet.network,
      contractAddress: wallet.contractAddress || '',
      walletAddress: wallet.walletAddress,
      isActive: wallet.isActive,
      iconUrl: wallet.iconUrl || ''
    });
    setShowEditModal(true);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Crypto Wallets</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark flex items-center"
        >
          <FaPlus className="mr-2" /> Add Wallet
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-4xl text-secondary" />
        </div>
      ) : wallets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-neutral-700 text-left">
                <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Crypto</th>
                <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Name</th>
                <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Symbol</th>
                <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Network</th>
                <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Wallet Address</th>
                <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Status</th>
                <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet) => (
                <tr key={wallet._id} className="border-t border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                  <td className="px-6 py-4">
                    <img 
                      src={wallet.iconUrl || (cryptoIcons[wallet.symbol] || cryptoIcons.DEFAULT)} 
                      alt={wallet.symbol} 
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = cryptoIcons.DEFAULT;
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{wallet.name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{wallet.symbol}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{wallet.network}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                    <span className="text-xs font-mono">{wallet.walletAddress}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      wallet.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {wallet.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(wallet)}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-md"
                        title="Edit wallet"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteWallet(wallet._id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 rounded-md"
                        title="Delete wallet"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">No wallets found. Add your first wallet.</p>
        </div>
      )}

      {/* Add Wallet Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Wallet</h3>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Crypto</label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    onChange={(e) => handleSelectCrypto(popularCryptosWithIcons[e.target.value])}
                  >
                    <option value="">-- Select a cryptocurrency --</option>
                    {popularCryptosWithIcons.map((crypto, index) => (
                      <option key={index} value={index}>
                        {crypto.name} ({crypto.symbol}) - {crypto.network}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.symbol && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={formData.iconUrl || (cryptoIcons[formData.symbol] || cryptoIcons.DEFAULT)}
                      alt={formData.symbol}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = cryptoIcons.DEFAULT;
                      }}
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symbol</label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Network</label>
                  <input
                    type="text"
                    name="network"
                    value={formData.network}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contract Address (if applicable)</label>
                  <input
                    type="text"
                    name="contractAddress"
                    value={formData.contractAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    placeholder="Leave empty for native tokens"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wallet Address</label>
                  <input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom Icon URL (optional)</label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Leave empty to use the default icon for this cryptocurrency
                  </p>
                  <input
                    type="text"
                    name="iconUrl"
                    value={formData.iconUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    placeholder="https://example.com/icon.png"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Active Wallet
                  </label>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-neutral-700 flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWallet}
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                >
                  Add Wallet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Wallet Modal */}
      <AnimatePresence>
        {showEditModal && currentWallet && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Wallet</h3>
              </div>
              
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                <div className="mb-4 flex justify-center">
                  <img
                    src={formData.iconUrl || (cryptoIcons[formData.symbol] || cryptoIcons.DEFAULT)}
                    alt={formData.symbol}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = cryptoIcons.DEFAULT;
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symbol</label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Network</label>
                  <input
                    type="text"
                    name="network"
                    value={formData.network}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contract Address (if applicable)</label>
                  <input
                    type="text"
                    name="contractAddress"
                    value={formData.contractAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    placeholder="Leave empty for native tokens"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wallet Address</label>
                  <input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom Icon URL (optional)</label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Leave empty to use the default icon for this cryptocurrency
                  </p>
                  <input
                    type="text"
                    name="iconUrl"
                    value={formData.iconUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                    placeholder="https://example.com/icon.png"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="editIsActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                  />
                  <label htmlFor="editIsActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Active Wallet
                  </label>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-neutral-700 flex justify-end space-x-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditWallet}
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CryptoWallets;