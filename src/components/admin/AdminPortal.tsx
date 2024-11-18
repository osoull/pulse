import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';
import Dashboard from '../Dashboard';
import FundList from '../funds/FundList';
import FundDetails from '../funds/FundDetails';
import FundConstruction from '../funds/construction/FundConstruction';
import InvestmentList from '../investments/InvestmentList';
import InvestorList from '../investors/InvestorList';
import AnalyticsDashboard from '../analytics/AnalyticsDashboard';
import InvestorAnalytics from '../analytics/InvestorAnalytics';
import PortfolioAnalytics from '../analytics/PortfolioAnalytics';
import ESGAnalytics from '../analytics/ESGAnalytics';
import DocumentCenter from '../documents/DocumentCenter';
import KYCDashboard from '../kyc/KYCDashboard';
import DueDiligenceDashboard from '../duediligence/DueDiligenceDashboard';
import CRMDashboard from '../crm/CRMDashboard';
import CRMDeals from '../crm/CRMDeals';
import CRMActivities from '../crm/CRMActivities';
import CRMLeads from '../crm/leads/CRMLeads';
import IRDashboard from '../investorRelations/IRDashboard';
import ReportsList from '../investorRelations/reports/ReportsList';
import CapitalCallsList from '../investorRelations/capitalCalls/CapitalCallsList';
import DistributionsList from '../investorRelations/distributions/DistributionsList';
import CommunicationsDashboard from '../communications/CommunicationsDashboard';
import MeetingsList from '../investorRelations/meetings/MeetingsList';
import SettingsDashboard from '../settings/SettingsDashboard';
import QuickCreate from '../common/QuickCreate';
import Footer from '../common/Footer';

export default function AdminPortal() {
  const { user } = useAuth();

  // Verify user has required permissions
  if (!user?.permissions?.dashboard) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-accent dark:bg-gray-900">
      <Navbar />
      <div className="pl-64">
        <main className="min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Fund Management */}
            {user.permissions.funds && (
              <>
                <Route path="/funds/construction" element={<FundConstruction />} />
                <Route path="/funds" element={<FundList />} />
                <Route path="/funds/:id" element={<FundDetails />} />
                <Route path="/investments" element={<InvestmentList />} />
              </>
            )}
            
            {/* Investors */}
            {user.permissions.investors && (
              <Route path="/investors" element={<InvestorList />} />
            )}

            {/* Analytics */}
            {user.permissions.analytics && (
              <>
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/analytics/portfolio" element={<PortfolioAnalytics />} />
                <Route path="/analytics/investors" element={<InvestorAnalytics />} />
                <Route path="/analytics/esg" element={<ESGAnalytics />} />
              </>
            )}

            {/* CRM */}
            {user.permissions.crm && (
              <>
                <Route path="/crm" element={<CRMDashboard />} />
                <Route path="/crm/deals" element={<CRMDeals />} />
                <Route path="/crm/activities" element={<CRMActivities />} />
                <Route path="/crm/leads" element={<CRMLeads />} />
              </>
            )}

            {/* Investor Relations */}
            {user.permissions.investors && (
              <>
                <Route path="/investor-relations" element={<IRDashboard />} />
                {user.permissions.reports && (
                  <Route path="/investor-relations/reports" element={<ReportsList />} />
                )}
                {user.permissions.capitalCalls && (
                  <Route path="/investor-relations/capital-calls" element={<CapitalCallsList />} />
                )}
                {user.permissions.distributions && (
                  <Route path="/investor-relations/distributions" element={<DistributionsList />} />
                )}
                {user.permissions.communications && (
                  <Route path="/investor-relations/mail" element={<CommunicationsDashboard />} />
                )}
                {user.permissions.meetings && (
                  <Route path="/investor-relations/meetings" element={<MeetingsList />} />
                )}
              </>
            )}

            {/* Documents & Compliance */}
            {user.permissions.documents && (
              <>
                <Route path="/documents" element={<DocumentCenter />} />
                {user.permissions.kyc && (
                  <>
                    <Route path="/kyc" element={<KYCDashboard />} />
                    <Route path="/duediligence" element={<DueDiligenceDashboard />} />
                  </>
                )}
              </>
            )}

            {/* Settings */}
            {user.permissions.settings && (
              <Route path="/settings" element={<SettingsDashboard />} />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
      <QuickCreate />
    </div>
  );
}