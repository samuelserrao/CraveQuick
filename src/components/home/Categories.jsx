import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCategories } from '../../services/api';
import Skeleton from '../ui/Skeleton';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('Categories API response:', response);
        setCategories(response?.data || []);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">What's on your mind?</h2>
      
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="w-16 h-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {Array.isArray(categories) && categories.map((category, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              key={category.id}
              className="flex-shrink-0 snap-center cursor-pointer group flex flex-col items-center gap-2"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src={category.image || 'https://via.placeholder.com/150'} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-medium text-sm text-foreground">{category.name}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
