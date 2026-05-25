import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRestaurantById } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import Skeleton from '../../components/ui/Skeleton';
import Button from '../../components/ui/Button';
import { FaStar, FaClock, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const FoodCard = ({ item }) => {
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem(item);
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full sm:w-32 h-32 flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-4 h-4 border ${item.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center rounded-sm`}>
              <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
            </span>
            <h3 className="font-bold text-lg">{item.name}</h3>
          </div>
          <p className="font-semibold mb-2">₹{item.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={handleAdd}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { getCartCount, getCartTotal } = useCartStore();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getRestaurantById(id);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Failed to fetch restaurant', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-64 w-full rounded-3xl mb-8" />
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-12" />
        <div className="flex gap-4 mb-8">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!restaurant) return <div className="text-center py-20 text-xl">Restaurant not found.</div>;

  const categories = ['All', ...new Set(restaurant.menu.map(item => item.category))];
  const filteredMenu = activeCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Banner */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8 shadow-md">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{restaurant.name}</h1>
          <p className="text-white/90 text-lg mb-4">{restaurant.cuisine}</p>
          <div className="flex items-center gap-6 text-white text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded-md font-bold">
                <FaStar size={12} />
                <span>{restaurant.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaClock size={16} />
              <span className="font-medium">{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaInfoCircle size={16} />
              <span className="font-medium">{restaurant.priceRange} for two</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Menu Search and Categories */}
          <div className="sticky top-16 bg-background/95 backdrop-blur z-10 pt-4 pb-4 border-b border-border">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                    activeCategory === category 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">{activeCategory}</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredMenu.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Cart Sidebar summary (Optional/Sticky) */}
        <div className="hidden lg:block w-80">
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
            {getCartCount() === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Your cart is empty.</p>
                <p className="text-sm mt-2">Add items to get started!</p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">{getCartCount()} items</span>
                  <span className="font-bold text-lg">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={() => window.location.href='/cart'}>
                  Proceed to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantDetail;
