import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../../services/api';
import RestaurantCard from '../restaurant/RestaurantCard';
import Skeleton from '../ui/Skeleton';
import { Link } from 'react-router-dom';

const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        const data = response?.data || [];
        setRestaurants(Array.isArray(data) ? data.filter(r => r.featured) : []);
      } catch (error) {
        console.error('Failed to fetch restaurants', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">Top restaurant chains</h2>
          <p className="text-muted-foreground mt-1">Featured restaurants around you</p>
        </div>
        <Link to="/restaurants" className="text-primary hover:underline font-medium text-sm hidden sm:block">
          See all restaurants
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-48 rounded-2xl w-full" />
              <Skeleton className="h-6 w-3/4 mt-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center sm:hidden">
        <Link to="/restaurants" className="text-primary hover:underline font-medium text-sm">
          See all restaurants
        </Link>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
