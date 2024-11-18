import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePortalAuth } from '../../context/PortalAuthContext';
import PortalNavbar from './PortalNavbar';
import PortalFooter from './PortalFooter';

export default function PortalLayout() {
  const { isAuthenticated } = usePortalAuth();

  if (!isAuthenticated) {
    return <Navigate to="/portal/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PortalNavbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <PortalFooter />
    </div>
  );
}