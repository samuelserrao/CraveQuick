import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRestaurants } from '../../services/api';
import RestaurantCard from '../../components/restaurant/RestaurantCard';
import Skeleton from '../../components/ui/Skeleton';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        setRestaurants(response.data);
      } catch (error) {
        console.error('Failed to fetch restaurants', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = React.useMemo(() => {
    let result = [...restaurants];

    if (isVegOnly) {
      result = result.filter(r => r.isVeg);
    }

    if (minRating > 0) {
      result = result.filter(r => r.rating >= minRating);
    }

    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'deliveryTime') {
        return a.deliveryTime.localeCompare(b.deliveryTime);
      }
      return 0;
    });

    return result;
  }, [restaurants, isVegOnly, minRating, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">All Restaurants</h1>
          <p className="text-muted-foreground mt-2">Discover the best food around you</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
            <FaFilter className="text-muted-foreground" size={14} />
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                checked={isVegOnly}
                onChange={(e) => setIsVegOnly(e.target.checked)}
              />
              Veg Only
            </label>
          </div>

          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
            <span className="text-sm font-medium">Rating:</span>
            <select 
              className="bg-transparent text-sm focus:outline-none font-medium cursor-pointer"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              <option value="0">All</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
            <FaSortAmountDown className="text-muted-foreground" size={14} />
            <select 
              className="bg-transparent text-sm focus:outline-none font-medium cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Rating: High to Low</option>
              <option value="deliveryTime">Delivery Time</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-48 rounded-2xl w-full" />
              <Skeleton className="h-6 w-3/4 mt-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-muted-foreground">No restaurants found matching your criteria.</h3>
          <button 
            className="mt-4 text-primary hover:underline"
            onClick={() => {
              setIsVegOnly(false);
              setMinRating(0);
              setSortBy('rating');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Restaurants;
