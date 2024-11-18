import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminLoginPage from './components/auth/AdminLoginPage';
import AdminPortal from './components/admin/AdminPortal';
import InvestorPortal from './components/portal/InvestorPortal';
import PortalLoginPage from './components/portal/PortalLoginPage';

export default function App() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Helper function to determine redirect path
  const getRedirectPath = () => {
    if (location.pathname.startsWith('/portal')) {
      return '/portal/login';
    }
    return '/admin/login';
  };

  // If not authenticated, redirect to appropriate login page
  if (!isAuthenticated && !location.pathname.includes('login')) {
    return <Navigate to={getRedirectPath()} replace />;
  }

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/*" element={<AdminPortal />} />

      {/* Portal Routes */}
      <Route path="/portal/login" element={<PortalLoginPage />} />
      <Route path="/portal/*" element={<InvestorPortal />} />

      {/* Default Redirects */}
      <Route path="/" element={
        <Navigate to={user?.role === 'investor' ? '/portal/dashboard' : '/admin/dashboard'} replace />
      } />
      <Route path="*" element={
        <Navigate to={user?.role === 'investor' ? '/portal/dashboard' : '/admin/dashboard'} replace />
      } />
    </Routes>
  );
}