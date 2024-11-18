import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  PieChart, 
  Settings, 
  LogOut, 
  Users, 
  Shield, 
  UserCircle,
  FileText,
  ClipboardCheck,
  Calendar,
  MessageCircle,
  BarChart2,
  Calculator,
  DollarSign,
  Leaf,
  ChevronRight,
  ChevronDown,
  Banknote,
  Target,
  CreditCard,
  Mail
} from 'lucide-react';

interface NavModule {
  id: string;
  title: string;
  items: NavItem[];
  requiredPermission?: keyof User['permissions'];
}

interface NavItem {
  to: string;
  icon: React.ReactNode;
  text: string;
  requiredPermission?: keyof User['permissions'];
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  compact?: boolean;
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const modules: NavModule[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      items: [
        { to: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, text: 'Dashboard', requiredPermission: 'dashboard' }
      ]
    },
    {
      id: 'funds',
      title: 'Fund Management',
      items: [
        { to: '/admin/funds/construction', icon: <Calculator className="w-5 h-5" />, text: 'Fund Construction', requiredPermission: 'funds' },
        { to: '/admin/funds', icon: <Briefcase className="w-5 h-5" />, text: 'Funds', requiredPermission: 'funds' },
        { to: '/admin/investments', icon: <Building2 className="w-5 h-5" />, text: 'Portfolio', requiredPermission: 'funds' }
      ],
      requiredPermission: 'funds'
    },
    {
      id: 'investor-relations',
      title: 'Investor Relations',
      items: [
        { to: '/admin/investor-relations', icon: <UserCircle className="w-5 h-5" />, text: 'Overview', requiredPermission: 'investors' },
        { to: '/admin/investors', icon: <Users className="w-5 h-5" />, text: 'Investors', requiredPermission: 'investors' },
        { to: '/admin/investor-relations/reports', icon: <FileText className="w-5 h-5" />, text: 'Reports', requiredPermission: 'reports' },
        { to: '/admin/investor-relations/capital-calls', icon: <CreditCard className="w-5 h-5" />, text: 'Capital Calls', requiredPermission: 'capitalCalls' },
        { to: '/admin/investor-relations/distributions', icon: <Banknote className="w-5 h-5" />, text: 'Distributions', requiredPermission: 'distributions' },
        { to: '/admin/investor-relations/mail', icon: <Mail className="w-5 h-5" />, text: 'Mail', requiredPermission: 'communications' },
        { to: '/admin/investor-relations/meetings', icon: <Calendar className="w-5 h-5" />, text: 'Meetings', requiredPermission: 'meetings' }
      ],
      requiredPermission: 'investors'
    },
    {
      id: 'crm',
      title: 'CRM',
      items: [
        { to: '/admin/crm', icon: <Users className="w-5 h-5" />, text: 'Contacts', requiredPermission: 'crm' },
        { to: '/admin/crm/deals', icon: <Briefcase className="w-5 h-5" />, text: 'Deals', requiredPermission: 'crm' },
        { to: '/admin/crm/activities', icon: <Calendar className="w-5 h-5" />, text: 'Activities', requiredPermission: 'crm' },
        { to: '/admin/crm/leads', icon: <Target className="w-5 h-5" />, text: 'Leads', requiredPermission: 'crm' }
      ],
      requiredPermission: 'crm'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      items: [
        { to: '/admin/analytics', icon: <PieChart className="w-5 h-5" />, text: 'Performance', requiredPermission: 'analytics' },
        { to: '/admin/analytics/portfolio', icon: <BarChart2 className="w-5 h-5" />, text: 'Portfolio Analytics', requiredPermission: 'analytics' },
        { to: '/admin/analytics/investors', icon: <Users className="w-5 h-5" />, text: 'Investor Analytics', requiredPermission: 'analytics' },
        { to: '/admin/analytics/esg', icon: <Leaf className="w-5 h-5" />, text: 'ESG Analytics', requiredPermission: 'analytics' }
      ],
      requiredPermission: 'analytics'
    },
    {
      id: 'compliance',
      title: 'Compliance & Documents',
      items: [
        { to: '/admin/documents', icon: <FileText className="w-5 h-5" />, text: 'Documents', requiredPermission: 'documents' },
        { to: '/admin/kyc', icon: <Shield className="w-5 h-5" />, text: 'KYC', requiredPermission: 'kyc' },
        { to: '/admin/duediligence', icon: <ClipboardCheck className="w-5 h-5" />, text: 'Due Diligence', requiredPermission: 'kyc' }
      ],
      requiredPermission: 'documents'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const isModuleActive = (items: NavItem[]) => {
    return items.some(item => location.pathname === item.to);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const hasPermission = (permission?: keyof User['permissions']) => {
    if (!permission || !user?.permissions) return true;
    return user.permissions[permission];
  };

  const filteredModules = modules.filter(module => 
    hasPermission(module.requiredPermission) &&
    module.items.some(item => hasPermission(item.requiredPermission))
  );

  return (
    <div className="h-screen w-64 bg-gradient-brand text-white fixed left-0 top-0 shadow-xl flex flex-col">
      <div className="p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4 mb-6">
          {/* Logo */}
          <img 
            src="http://www.osoul.partners/wp-content/uploads/2024/04/basic-file-2.png" 
            alt="Osoul Capital Partners" 
            className="h-8 w-auto"
          />
          
          {/* Text */}
          <div className="text-center">
            <div className="uppercase tracking-[0.2em] text-sm font-medium text-gold">
              Private Equity
            </div>
            <div className="h-px w-16 bg-gold/30 mx-auto my-2" />
            <div className="uppercase tracking-[0.2em] text-sm font-medium text-gold">
              Management
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 px-3 overflow-y-auto">
        {/* Dashboard - Always visible */}
        <NavItem
          to="/admin/dashboard"
          icon={<LayoutDashboard className="w-5 h-5" />}
          text="Dashboard"
          active={isActive('/admin/dashboard')}
        />

        {/* Other modules */}
        {filteredModules.slice(1).map((module) => (
          <div key={module.id} className="mb-2">
            <button
              onClick={() => toggleModule(module.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-200 ${
                isModuleActive(module.items)
                  ? 'bg-gold/20 text-gold'
                  : 'text-gold/60 hover:bg-gold/10 hover:text-gold'
              }`}
            >
              <span className="text-sm font-medium">{module.title}</span>
              {expandedModule === module.id ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {expandedModule === module.id && (
              <div className="mt-1 ml-2 space-y-1">
                {module.items
                  .filter(item => hasPermission(item.requiredPermission))
                  .map((item) => (
                    <NavItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      text={item.text}
                      active={isActive(item.to)}
                    />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-primary-dark/50 border-t border-gold/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gold">{user?.email}</p>
          </div>
          <NavItem
            to="/admin/settings"
            icon={<Settings className="w-6 h-6" />}
            text=""
            active={isActive('/admin/settings')}
            compact
          />
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gold hover:text-gold-light w-full transition-colors duration-200 text-sm group"
        >
          <LogOut className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

function NavItem({ to, icon, text, active = false, compact = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`
        flex items-center space-x-3 w-full rounded-lg transition-all duration-200
        ${compact ? 'p-2' : 'px-3 py-2'}
        ${active 
          ? 'bg-gold/20 text-gold font-medium shadow-lg backdrop-blur-sm border-r-2 border-gold' 
          : 'text-gold/60 hover:bg-gold/10 hover:text-gold'
        }
      `}
    >
      <div className="w-5 h-5">{icon}</div>
      {!compact && <span className="text-sm">{text}</span>}
    </Link>
  );
}