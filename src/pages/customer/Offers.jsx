import React from 'react';
import { motion } from 'framer-motion';

const Offers = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Current Offers & Discounts</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Save big on your favorite meals with our exclusive offers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-primary/10 text-primary w-fit px-3 py-1 rounded-full text-sm font-bold mb-4">
              {i * 10}% OFF
            </div>
            <h3 className="text-xl font-bold mb-2">Special Discount {i}</h3>
            <p className="text-muted-foreground mb-4">
              Get {i * 10}% off on your next order above ₹{i * 100}. Use code CRAVE{i * 10} at checkout.
            </p>
            <button className="text-primary font-medium hover:underline">
              Copy Code
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
