import React from 'react';
import { Users, FileText, Calendar, MessageCircle } from 'lucide-react';
import ReportsList from './reports/ReportsList';
import CapitalCallsList from './capitalCalls/CapitalCallsList';
import DistributionsList from './distributions/DistributionsList';
import MeetingsList from './meetings/MeetingsList';
import LPACMembers from './lpac/LPACMembers';
import InvestorQueries from './queries/InvestorQueries';

export default function IRDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investor Relations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage investor communications and reporting</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          icon={<FileText className="w-6 h-6" />}
          title="Reports"
          description="Manage investor reports and communications"
          link="/investor-relations/reports"
        />
        <QuickAction
          icon={<Calendar className="w-6 h-6" />}
          title="Meetings"
          description="Schedule and manage investor meetings"
          link="/investor-relations/meetings"
        />
        <QuickAction
          icon={<MessageCircle className="w-6 h-6" />}
          title="Queries"
          description="Handle investor inquiries and requests"
          link="/investor-relations/queries"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ReportsList limit={5} />
          <CapitalCallsList limit={5} />
          <DistributionsList limit={5} />
        </div>
        <div className="space-y-6">
          <MeetingsList limit={5} />
          <LPACMembers limit={5} />
          <InvestorQueries limit={5} />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ 
  icon, 
  title, 
  description, 
  link 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a 
      href={link}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </a>
  );
}