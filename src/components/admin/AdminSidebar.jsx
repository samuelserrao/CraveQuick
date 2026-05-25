import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUtensils, FaClipboardList, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';

const AdminSidebar = () => {
  const { logout } = useAuthStore();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
    { name: 'Restaurants', path: '/admin/restaurants', icon: <FaUtensils /> },
    { name: 'Dishes', path: '/admin/dishes', icon: <FaClipboardList /> },
    { name: 'Orders', path: '/admin/orders', icon: <FaClipboardList /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Settings', path: '/admin/settings', icon: <FaCog /> },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <FaUtensils /> Admin
        </h2>
      </div>
      
      <div className="flex-1 px-4 space-y-2 mt-4">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
