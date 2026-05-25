import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative bg-background pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              🚀 <span className="hidden sm:inline">Super Fast Delivery within</span> 30 Minutes
            </div>
            
            <h1 className="text-5xl tracking-tight font-extrabold text-foreground sm:text-6xl lg:text-5xl xl:text-7xl leading-[1.1]">
              <span className="block mb-2">Cravings satisfied,</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">
                delivered instantly.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-lg sm:mx-auto lg:mx-0">
              Discover the best local restaurants, fast-food chains, and hidden gems around you. Hot, fresh, and on time.
            </p>
            
            {/* Search Bar inside Hero */}
            <div className="mt-10 sm:max-w-xl sm:mx-auto lg:mx-0 bg-card p-2 rounded-full shadow-xl border border-border flex items-center">
              <div className="hidden sm:flex items-center pl-4 pr-2 text-muted-foreground border-r border-border gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-sm font-medium whitespace-nowrap">India</span>
              </div>
              <div className="flex-1 flex items-center pl-4 gap-2">
                <FaSearch className="text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for restaurants or dishes..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm py-2"
                />
              </div>
              <Button className="rounded-full px-6 whitespace-nowrap">Find Food</Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground font-medium">
              <span>Popular:</span>
              <span className="px-3 py-1 rounded-full bg-muted cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">Pizza</span>
              <span className="px-3 py-1 rounded-full bg-muted cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">Sushi</span>
              <span className="px-3 py-1 rounded-full bg-muted cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">Burgers</span>
            </div>
          </motion.div>
          
          {/* Image/Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6"
          >
            <div className="relative mx-auto w-full max-w-[500px]">
              {/* Main Bowl Image */}
              <img
                className="w-full object-contain relative z-10 drop-shadow-2xl animate-spin-slow"
                style={{ animation: 'spin 60s linear infinite' }}
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                alt="Delicious healthy bowl"
              />
              
              {/* Floating Review Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-10 bg-card p-4 rounded-2xl shadow-xl border border-border z-20 hidden md:flex items-center gap-3 backdrop-blur-md bg-opacity-90"
              >
                <div className="text-3xl">⭐</div>
                <div>
                  <p className="font-bold text-sm">4.9/5 Rating</p>
                  <p className="text-xs text-muted-foreground">From 2k+ reviews</p>
                </div>
              </motion.div>
              
              {/* Floating Delivery Card */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -right-10 bg-card p-4 rounded-2xl shadow-xl border border-border z-20 hidden md:flex items-center gap-3 backdrop-blur-md bg-opacity-90"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
                  🛵
                </div>
                <div>
                  <p className="font-bold text-sm">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">On your first order</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
