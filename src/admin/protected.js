// src/ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

const ProtectedRoute = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("user");
  const location = useLocation();

  
  // Set active tab based on current path
  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'user';
    setActiveTab(path);
  }, [location]);

  // Responsive sidebar behavior - close on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
  };

  // Simulated authentication check
  const jwt = localStorage.getItem("adminToken");
  if (!jwt) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        onLogout={handleLogout}
        setActiveTab={setActiveTab}
      />

      {/* Main content */}
      <div 
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <AdminNavbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onLogout={handleLogout}
        />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;