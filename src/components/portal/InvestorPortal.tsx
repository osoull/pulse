import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PortalNavbar from './PortalNavbar';
import PortalDashboard from './PortalDashboard';
import PortfolioOverview from './PortfolioOverview';
import Documents from './Documents';
import Reports from './Reports';
import CapitalCalls from './CapitalCalls';
import Notifications from './Notifications';
import PortalFooter from './PortalFooter';

export default function InvestorPortal() {
  const { user } = useAuth();

  // Verify user is an investor
  if (!user || user.role !== 'investor') {
    return <Navigate to="/portal/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PortalNavbar />
      <main className="container mx-auto px-4 py-8 pl-4 pr-4 mt-16">
        <Routes>
          <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />
          <Route path="/dashboard" element={<PortalDashboard />} />
          <Route path="/portfolio" element={<PortfolioOverview />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/capital-calls" element={<CapitalCalls />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Navigate to="/portal/dashboard" replace />} />
        </Routes>
      </main>
      <PortalFooter />
    </div>
  );
}