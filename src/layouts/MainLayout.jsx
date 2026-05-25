import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeStore } from '../store/themeStore';

const MainLayout = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Initial theme setup
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer 
        position="bottom-right"
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
};

export default MainLayout;
