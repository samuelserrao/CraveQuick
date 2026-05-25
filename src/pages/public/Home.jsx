import React from 'react';
import Hero from '../../components/home/Hero';
import Categories from '../../components/home/Categories';
import FeaturedRestaurants from '../../components/home/FeaturedRestaurants';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Categories />
      <div className="bg-muted py-8">
        <FeaturedRestaurants />
      </div>
      
      {/* App Download Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="p-10 md:p-16 text-white md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the CraveQuick App</h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Download our mobile app to get faster delivery, personalized offers, and a seamless ordering experience.
            </p>
            <div className="flex gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 md:h-12 cursor-pointer hover:opacity-80 transition-opacity" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-10 md:h-12 cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
          </div>
          <div className="md:w-1/2 p-10 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop" 
              alt="Mobile App" 
              className="w-64 h-64 object-cover rounded-2xl shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
