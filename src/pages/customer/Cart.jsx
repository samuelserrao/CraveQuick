import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import Button from '../../components/ui/Button';
import { FaTrash, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-64 h-64 mx-auto mb-8 bg-muted rounded-full flex items-center justify-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
            alt="Empty Cart" 
            className="w-32 h-32 opacity-50"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">You can go to home page to view more restaurants.</p>
        <Link to="/restaurants">
          <Button size="lg">See Restaurants</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Items</h2>
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 border-b border-border last:border-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-1">{item.description}</p>
                        </div>
                        <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                          <button 
                            className="w-8 h-8 flex items-center justify-center bg-card rounded-md shadow-sm hover:text-primary transition-colors"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-4 text-center font-medium">{item.quantity}</span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center bg-card rounded-md shadow-sm hover:text-primary transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-600 p-2 transition-colors flex items-center gap-2 text-sm font-medium"
                          onClick={() => removeItem(item.id)}
                        >
                          <FaTrash size={14} /> <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span className="font-medium">₹{taxes.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full group" onClick={() => navigate('/checkout')}>
              Proceed to Checkout 
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
