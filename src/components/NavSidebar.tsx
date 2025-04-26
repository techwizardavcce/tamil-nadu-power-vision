
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  LineChart, 
  Settings, 
  PieChart,
  Zap, 
  LayoutDashboard 
} from 'lucide-react';

const NavSidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Consumption', icon: LineChart, path: '/consumption' },
    { name: 'Energy Mix', icon: PieChart, path: '/energy-mix' },
    { name: 'Optimization', icon: Zap, path: '/optimization' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div className="bg-sidebar h-screen w-64 text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <Zap size={24} className="text-power-green" />
          <h1 className="text-xl font-bold text-white">TN Power Vision</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="font-medium text-white">TN</span>
          </div>
          <div>
            <p className="text-sm font-medium">Tamil Nadu Energy</p>
            <p className="text-xs opacity-70">Admin Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
