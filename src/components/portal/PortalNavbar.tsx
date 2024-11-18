import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  PieChart, 
  FileText,
  Bell,
  LogOut,
  User,
  DollarSign,
  FileBarChart
} from 'lucide-react';
import Logo from '../common/Logo';

export default function PortalNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/portal/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, text: 'Dashboard' },
    { to: '/portal/portfolio', icon: <PieChart className="w-5 h-5" />, text: 'Portfolio' },
    { to: '/portal/documents', icon: <FileText className="w-5 h-5" />, text: 'Documents' },
    { to: '/portal/reports', icon: <FileBarChart className="w-5 h-5" />, text: 'Reports' },
    { to: '/portal/capital-calls', icon: <DollarSign className="w-5 h-5" />, text: 'Capital Calls' },
    { to: '/portal/notifications', icon: <Bell className="w-5 h-5" />, text: 'Notifications' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo height={32} className="mr-8" />
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.to
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}