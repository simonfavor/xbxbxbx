// src/AdminUsers.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye, FaSearch, FaSort, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [editMode, setEditMode] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userWithdrawals, setUserWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('https://xbxbxb.onrender.com/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`https://xbxbxb.onrender.com/api/admin/users/${userId}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserTransactions(response.data);
    } catch (error) {
      toast.error('Failed to load user transactions');
    }
  };

  const fetchUserWithdrawals = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`https://xbxbxb.onrender.com/api/admin/users/${userId}/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserWithdrawals(response.data);
    } catch (error) {
      toast.error('Failed to load user withdrawals');
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setEditFormData({...user});
    setShowUserModal(true);
    setActiveTab('details');
    fetchUserTransactions(user._id);
    fetchUserWithdrawals(user._id);
  };

  const handleDeleteUser = async (userId) => {
    if (confirmDelete === userId) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`https://xbxbxb.onrender.com/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('User deleted successfully');
        fetchUsers();
        setConfirmDelete(null);
      } catch (error) {
        toast.error('Failed to delete user');
      }
    } else {
      setConfirmDelete(userId);
      // Clear confirmation after 3 seconds
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const handleSaveUser = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`https://xbxbxb.onrender.com/api/admin/users/${selectedUser._id}`, editFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User updated successfully');
      fetchUsers();
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort users
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div className="bg-white dark:bg-neutral-800 w-full rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">User Management</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary w-64"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-secondary" />
          </div>
        ) : currentUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-neutral-700 text-left">
                  <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('username')}
                    >
                      Username
                      {sortField === 'username' && (
                        <FaSort className="ml-1 text-xs" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('email')}
                    >
                      Email
                      {sortField === 'email' && (
                        <FaSort className="ml-1 text-xs" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('firstName')}
                    >
                      First Name
                      {sortField === 'firstName' && (
                        <FaSort className="ml-1 text-xs" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('lastName')}
                    >
                      Last Name
                      {sortField === 'lastName' && (
                        <FaSort className="ml-1 text-xs" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">
                    <button 
                      className="flex items-center"
                      onClick={() => handleSort('createdAt')}
                    >
                      Joined
                      {sortField === 'createdAt' && (
                        <FaSort className="ml-1 text-xs" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-gray-600 dark:text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="border-t border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{user.username}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{user.email}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{user.firstName}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{user.lastName}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-md"
                          title="View user details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className={`p-2 ${confirmDelete === user._id ? 'text-white bg-red-500' : 'text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30'} rounded-md`}
                          title={confirmDelete === user._id ? "Click again to confirm" : "Delete user"}
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
            <p className="text-gray-600 dark:text-gray-400">No users found. Try adjusting your search.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, sortedUsers.length)} of {sortedUsers.length} users
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
              >
                <FaChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded ${currentPage === index + 1 ? 'bg-secondary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedUser.username} - User Profile
                </h3>
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  &times;
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-neutral-700">
                <button
                  className={`px-4 py-3 ${activeTab === 'details' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-600 dark:text-gray-400'}`}
                  onClick={() => setActiveTab('details')}
                >
                  User Details
                </button>
                <button
                  className={`px-4 py-3 ${activeTab === 'transactions' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-600 dark:text-gray-400'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  Transactions
                </button>
                <button
                  className={`px-4 py-3 ${activeTab === 'withdrawals' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-600 dark:text-gray-400'}`}
                  onClick={() => setActiveTab('withdrawals')}
                >
                  Withdrawals
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                {/* User Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    {editMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                          <input
                            type="text"
                            name="username"
                            value={editFormData.username || ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email || ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={editFormData.firstName || ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={editFormData.lastName || ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={editFormData.address || ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={editFormData.phone || ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                          <input
                            type="text"
                            name="country"
                            value={editFormData.country || ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            value={editFormData.dob ? new Date(editFormData.dob).toISOString().split('T')[0] : ''}
                            onChange={handleEditFormChange}
                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">{selectedUser.username}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">{selectedUser.email}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">{selectedUser.firstName}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">{selectedUser.lastName}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">
                            {selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString() : 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">{selectedUser.address}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">{selectedUser.phone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">{selectedUser.country}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">${selectedUser.totalEarnings?.toFixed(2) || '0.00'}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">
                            {new Date(selectedUser.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Transactions Tab */}
                {activeTab === 'transactions' && (
                  <div>
                    {userTransactions.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-neutral-700 text-left">
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Type</th>
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Amount</th>
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Status</th>
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userTransactions.map((transaction) => (
                              <tr key={transaction._id} className="border-t border-gray-100 dark:border-neutral-700">
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{transaction.type}</td>
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">${transaction.amount.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                    ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {transaction.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                                  {new Date(transaction.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-600 dark:text-gray-400">No transactions found for this user.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Withdrawals Tab */}
                {activeTab === 'withdrawals' && (
                  <div>
                    {userWithdrawals.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-neutral-700 text-left">
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Amount</th>
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Status</th>
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Crypto</th>
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Wallet</th>
                              <th className="px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userWithdrawals.map((withdrawal) => (
                              <tr key={withdrawal._id} className="border-t border-gray-100 dark:border-neutral-700">
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">${withdrawal.amount.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                    ${withdrawal.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                                      withdrawal.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {withdrawal.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{withdrawal.cryptoCurrency}</td>
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                                  <span className="text-xs">{withdrawal.walletAddress}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                                  {new Date(withdrawal.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-600 dark:text-gray-400">No withdrawal records found for this user.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-neutral-700 flex justify-end space-x-2">
                {activeTab === 'details' && (
                  <>
                    {editMode ? (
                      <>
                        <button 
                          onClick={() => setEditMode(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleSaveUser}
                          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        <FaEdit className="inline mr-2" /> Edit User
                      </button>
                    )}
                  </>
                )}
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;