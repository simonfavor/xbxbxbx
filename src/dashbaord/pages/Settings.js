import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaImage } from 'react-icons/fa';

const Settings = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://xbxbxb.onrender.com/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          profilePicture: response.data.profilePicture,
        });
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', profile.username);
    formData.append('email', profile.email);
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('https://xbxbxb.onrender.com/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setProfile({ ...profile, profilePicture: response.data.user.profilePicture });
      setFile(null);
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Profile update failed');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://xbxbxb.onrender.com/api/users/password',
        { currentPassword: password.currentPassword, newPassword: password.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password update failed');
    }
  };

  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-neutral-dark mb-4 flex items-center">
            <FaUser className="mr-2 text-primary" />
            Update Profile
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            {profile.profilePicture && (
              <img
                src={`https://xbxbxb.onrender.com${profile.profilePicture}`}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            )}
            <div>
              <label htmlFor="profilePicture" className="block text-neutral-dark font-semibold mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-neutral-dark font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-neutral-dark font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-neutral-dark font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-neutral-dark font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-teal-700">
              Update Profile
            </button>
          </form>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-neutral-dark mb-4 flex items-center">
            <FaLock className="mr-2 text-primary" />
            Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-neutral-dark font-semibold mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-neutral-dark font-semibold mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-neutral-dark font-semibold mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-teal-700">
              Update Password
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;