import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaClock } from 'react-icons/fa';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 border border-border">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {restaurant.offers && (
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full p-4">
              <span className="text-white font-bold text-lg">{restaurant.offers}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg line-clamp-1">{restaurant.name}</h3>
            <div className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md text-sm font-bold">
              <FaStar size={12} />
              <span>{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-1">{restaurant.cuisine}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-3">
            <div className="flex items-center gap-1">
              <FaClock size={14} />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border"></div>
            <span>{restaurant.priceRange} for two</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
