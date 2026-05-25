import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { FaShoppingCart, FaUtensils, FaUser, FaMoon, FaSun, FaBars, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../ui/Button';

const Navbar = () => {
  const { getCartCount } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = getCartCount();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Offers', path: '/offers' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <FaUtensils className="text-primary" />
              <span>CraveQuick</span>
            </Link>
            
            {/* Location */}
            <div className="hidden md:flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full border border-border">
              <FaMapMarkerAlt className="text-primary" />
              <span className="font-medium">India</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>

            <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {user?.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">Admin</Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 cursor-pointer relative group">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" className="flex items-center gap-2">
                  <FaUser /> Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-foreground">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full left-0 top-16 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-border pt-4 mt-4 flex justify-between items-center px-3">
              <span className="font-medium">Theme</span>
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-muted text-foreground"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </div>
            {!isAuthenticated ? (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full mt-4">
                <Button className="w-full">Login / Sign up</Button>
              </Link>
            ) : (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="px-3 text-sm font-medium text-muted-foreground mb-2">Account ({user.name})</p>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-muted rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
