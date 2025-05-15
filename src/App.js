// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import About from '../src/pages/about';
import Services from './pages/Services';
import Contact from './pages/contact';

import SignUp from './pages/SignUp';
import Login from './pages/Login';



import ProtectedRoute from './dashbaord/protected';
import Dashboard from './dashbaord/pages/Dashboard';
import Withdrawals from './dashbaord/pages/Withdrawals';
import Transactions from './dashbaord/pages/Transactions';
import Settings from './dashbaord/pages/Settings';

import AdminLogin from './admin/AdminLogin';
import AdminUsers from './admin/AdminUsers';
import AdminTransactions from './admin/AdminTransactions';
import CryptoWallets from './admin/CryptoWallets';

import Adminroute from "./admin/protected"


function App() {

  // useEffect(() => {
  //   const disableDevTools = (e) => {
  //     if (e.ctrlKey && e.shiftKey && e.key === 'I') {
  //       e.preventDefault();
  //       return false;
  //     }
  //     if (e.ctrlKey && e.shiftKey && e.key === 'J') {
  //       e.preventDefault();
  //       return false;
  //     }
  //     if (e.ctrlKey && e.key === 'U') {
  //       e.preventDefault();
  //       return false;
  //     }
  //   };
  
  //   document.addEventListener('contextmenu', (e) => e.preventDefault());
  //   document.addEventListener('keydown', disableDevTools);
    
  //   return () => {
  //     document.removeEventListener('contextmenu', (e) => e.preventDefault());
  //     document.removeEventListener('keydown', disableDevTools);
  //   };
  // }, []);
  return (

      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />


               {/* Admin Routes with Nested Layout */}
          <Route path="account" element={ <ProtectedRoute/>}>
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="withdrawals" element={ <Withdrawals/>} />
              <Route path="transactions" element={<Transactions /> } />
              <Route path="settings" element={ <Settings />} />
          </Route>

          <Route path="/admin/login"  element={<AdminLogin /> } />
             

          <Route path="admin" element={ <Adminroute/>}>
          <Route path="users" element={ <AdminUsers /> } />
          <Route path="transactions" element={<AdminTransactions /> } />
          <Route path="cryptowallets" element={<CryptoWallets /> } />
            
          </Route>
          </Routes>
  );
}

export default App;