import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { createOrder } from '../../services/api';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    apartment: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  // If not authenticated or empty cart, redirect (in a real app, maybe save cart and login)
  if (!isAuthenticated && !isSuccess) {
    navigate('/login');
    return null;
  }

  if (items.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.firstName || !formData.lastName || !formData.street || !formData.city || !formData.zipCode || !formData.phone) {
      alert("Please fill in all required delivery details.");
      return;
    }

    setIsSubmitting(true);
    const restaurantId = items[0]?.restaurantId;

    try {
      const orderPayload = {
        userId: user?.id || user?._id || 'mock-user-123',
        userName: user?.name || 'Jane Doe',
        items: items.map(item => ({
          dishId: item.id || item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        deliveryAddress: formData,
        restaurantId: restaurantId
      };

      const response = await createOrder(orderPayload);
      const orderId = response.data.id || response.data._id;
      
      setIsSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate(`/track/${orderId}`);
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <FaCheckCircle className="text-green-500 text-8xl mb-6" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your food is being prepared and will be with you shortly.
            </p>
            <div className="animate-pulse flex items-center gap-2 text-primary font-medium">
              Redirecting to tracking screen...
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-8">
                {/* Delivery Address */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Delivery Details</h2>
                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
                      <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
                    </div>
                    <Input name="street" value={formData.street} onChange={handleInputChange} placeholder="Street Address" required />
                    <Input name="apartment" value={formData.apartment} onChange={handleInputChange} placeholder="Apartment, suite, etc. (optional)" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
                      <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP Code" required />
                    </div>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" required type="tel" />
                  </form>
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center gap-3 transition-colors ${
                        paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted text-muted-foreground'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <FaCreditCard size={32} />
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                    <div 
                      className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center gap-3 transition-colors ${
                        paymentMethod === 'cash' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted text-muted-foreground'
                      }`}
                      onClick={() => setPaymentMethod('cash')}
                    >
                      <FaMoneyBillWave size={32} />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVC" />
                      </div>
                      <Input placeholder="Name on Card" />
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-96">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6 text-sm max-h-60 overflow-y-auto pr-2 hide-scrollbar">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-muted-foreground line-clamp-1 w-2/3">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-4 mb-6 text-sm">
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

                  <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                    Place Order - ₹{total.toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
