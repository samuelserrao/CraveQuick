import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { FaBell, FaBars } from 'react-icons/fa';
import { useThemeStore } from '../../store/themeStore';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';

const AdminHeader = () => {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-muted-foreground hover:text-foreground">
          <FaBars size={20} />
        </button>
        <h1 className="text-xl font-bold hidden sm:block">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors">
          {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        <button className="text-muted-foreground hover:text-foreground relative p-2 rounded-full hover:bg-muted transition-colors">
          <FaBell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-card"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shadow-inner">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <button 
            onClick={logout} 
            className="ml-2 text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
