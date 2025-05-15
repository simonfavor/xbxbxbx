import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeMainTab, setActiveMainTab] = useState('pending');
  const [activeSubTab, setActiveSubTab] = useState('plans');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [activeMainTab, activeSubTab]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://xbxbxb.onrender.com/api/admin/transactions', {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: activeMainTab, type: activeSubTab }
      });
      setTransactions(response.data);
    } catch (error) {
      toast.error('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, type) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://xbxbxb.onrender.com/api/admin/transactions/${id}`,
        { 
          status,
          transactionType: type // Send the transaction type
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state
      setTransactions(
        transactions.map((tx) =>
          tx._id === id ? { ...tx, status } : tx
        )
      );
      
      toast.success(`Transaction ${status === 'Completed' ? 'approved' : 'rejected'}`);
      fetchTransactions(); // Refresh data
    } catch (error) {
      toast.error('Failed to update transaction');
    }
  };

  // Filter transactions based on active tabs
  const filteredTransactions = transactions.filter(tx => {
    if (activeMainTab === 'pending' && tx.status === 'Pending') {
      return activeSubTab === 'plans' ? tx.type === 'Plan Activation' : tx.type === 'Withdrawal';
    } else if (activeMainTab === 'completed' && tx.status === 'Completed') {
      return activeSubTab === 'plans' ? tx.type === 'Plan Activation' : tx.type === 'Withdrawal';
    } else if (activeMainTab === 'rejected' && tx.status === 'Failed') {
      return activeSubTab === 'plans' ? tx.type === 'Plan Activation' : tx.type === 'Withdrawal';
    }
    return false;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Transaction Management</h2>
          
          {/* Main Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm ${activeMainTab === 'pending' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setActiveMainTab('pending'); setActiveSubTab('plans'); }}
            >
              Pending Transactions
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeMainTab === 'completed' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setActiveMainTab('completed'); setActiveSubTab('plans'); }}
            >
              Approved Transactions
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeMainTab === 'rejected' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setActiveMainTab('rejected'); setActiveSubTab('plans'); }}
            >
              Rejected Transactions
            </button>
          </div>
          
          {/* Sub Tabs */}
          <div className="flex mb-6">
            <button
              className={`mr-4 py-1 px-3 rounded-full text-sm ${activeSubTab === 'plans' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              onClick={() => setActiveSubTab('plans')}
            >
              Investment Plans
            </button>
            <button
              className={`py-1 px-3 rounded-full text-sm ${activeSubTab === 'withdrawals' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              onClick={() => setActiveSubTab('withdrawals')}
            >
              Withdrawals
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    {activeMainTab === 'pending' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    )}
                     {activeSubTab === 'withdrawals' && (
                    <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crypto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                    </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{tx.user?.username || tx.user?.email || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tx.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${tx.amount?.toLocaleString() || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tx.plan?.type || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</div>
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                          {tx.status}
                        </span>
                      </td>

                      {activeSubTab === 'withdrawals' && (
                        <>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{tx.cryptoCurrency?.toUpperCase() || '-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                {tx.walletAddress ? 
                                `${tx.walletAddress.substring(0, 6)}...${tx.walletAddress.substring(tx.walletAddress.length - 4)}` 
                                : '-'}
                            </div>
                            </td>
                        </>
                        )}
                      {activeMainTab === 'pending' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                         <button
                            onClick={() => handleUpdateStatus(tx._id, 'Completed', tx.type)}
                            className="text-green-600 hover:text-green-900 mr-3"
                            >
                            Approve
                            </button>
                            <button
                            onClick={() => handleUpdateStatus(tx._id, 'Failed', tx.type)}
                            className="text-red-600 hover:text-red-900"
                            >
                            Reject
                        </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="mt-2 text-sm text-gray-500">No {activeSubTab} transactions found with status: {activeMainTab}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminTransactions;