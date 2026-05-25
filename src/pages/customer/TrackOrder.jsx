import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrderById } from '../../services/api';
import Button from '../../components/ui/Button';
import { 
  FaMotorcycle, 
  FaBuilding, 
  FaHome, 
  FaStar, 
  FaPhone, 
  FaRegPaperPlane, 
  FaSpinner 
} from 'react-icons/fa';

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Poll order status every 3 seconds
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tracking data.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
        <p className="text-muted-foreground font-medium">Connecting to tracking system...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Tracking Offline</h2>
        <p className="text-muted-foreground mb-6">{error || 'Order could not be found.'}</p>
        <Button onClick={() => navigate('/')}>Return to Homepage</Button>
      </div>
    );
  }

  // Calculate delivery stage details
  const status = order.simulatedStatus || order.status;
  const elapsed = order.elapsedSeconds || 0;
  
  // Progress ratio (0 to 1) based on a 45 second total delivery run
  const progressRatio = Math.min(elapsed / 45, 1);
  const progressPercentage = progressRatio * 100;

  // Build notifications logs
  const getLogs = () => {
    const creationTime = new Date(order.createdAt);
    const formatTime = (offsetSec) => {
      const d = new Date(creationTime.getTime() + offsetSec * 1000);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const logs = [
      { id: 1, text: 'Order received and confirmed', time: formatTime(0), active: true }
    ];

    if (elapsed >= 5) {
      logs.push({ id: 2, text: 'Chef is preparing your delicious meal', time: formatTime(5), active: true });
    }
    if (elapsed >= 15) {
      logs.push({ 
        id: 3, 
        text: `${order.deliveryAgentId?.name || 'Delivery Agent'} accepted order & arrived at restaurant`, 
        time: formatTime(15), 
        active: true 
      });
    }
    if (elapsed >= 25) {
      logs.push({ id: 4, text: 'Food picked up and out for delivery', time: formatTime(25), active: true });
    }
    if (elapsed >= 35) {
      logs.push({ id: 5, text: 'Delivery agent is nearby your location', time: formatTime(35), active: true });
    }
    if (status === 'Delivered') {
      logs.push({ id: 6, text: 'Order successfully delivered! Bon appétit!', time: formatTime(45), active: true });
    }

    return logs.reverse(); // Show latest updates on top
  };

  const logs = getLogs();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Order Reference</span>
            <span className="font-semibold text-foreground">#{order.id.slice(-8).toUpperCase()}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Track Your Food</h1>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
          Estimated Arrival: {status === 'Delivered' ? 'Delivered' : '15-20 mins'}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Pane: Map & Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Animated Map Path Panel */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden relative">
            <h3 className="text-lg font-bold mb-6">Live Route Tracking</h3>
            
            {/* Visual Dotted Line with Moving Rider */}
            <div className="relative py-12 px-6">
              
              {/* The Path */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-muted rounded-full">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Dotted path styling overlays */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 border-t-2 border-dashed border-card pointer-events-none" />

              {/* Start Node: Restaurant */}
              <div className="absolute z-10 flex flex-col items-center" style={{ left: '24px', top: '50%', transform: 'translateY(-50%)' }}>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border border-background">
                  <FaBuilding size={16} />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground mt-2 absolute top-10 whitespace-nowrap">Restaurant</span>
              </div>

              {/* End Node: Customer House */}
              <div className="absolute z-10 flex flex-col items-center" style={{ right: '24px', top: '50%', transform: 'translateY(-50%)' }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-background transition-colors ${
                  status === 'Delivered' ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <FaHome size={16} />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground mt-2 absolute top-10 whitespace-nowrap">Your Home</span>
              </div>

              {/* Moving Delivery Agent */}
              <div 
                className="absolute z-20 flex flex-col items-center"
                style={{ 
                  left: `calc(24px + ${progressRatio} * (100% - 48px))`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.div 
                  animate={status !== 'Delivered' ? { y: [0, -3, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white scale-110"
                >
                  <FaMotorcycle size={20} />
                </motion.div>
                <div className="bg-black/85 dark:bg-card border border-border text-[9px] font-bold text-white dark:text-foreground px-2 py-0.5 rounded shadow mt-2 absolute top-12 whitespace-nowrap">
                  {status}
                </div>
              </div>
            </div>

            {/* Description Status Alert */}
            <div className="mt-6 bg-muted/40 border border-border/80 rounded-2xl p-4 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 flex-shrink-0 mt-0.5 animate-pulse">
                <FaMotorcycle size={14} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">{order.statusDescription || 'Your order is on the way.'}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Agent location is simulated relative to preparation and transit phases.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Agent Card */}
          {order.deliveryAgentId ? (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="w-16 h-16 bg-muted rounded-full overflow-hidden border border-border shadow-inner flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {order.deliveryAgentId.image ? (
                    <img src={order.deliveryAgentId.image} alt={order.deliveryAgentId.name} className="w-full h-full object-cover" />
                  ) : (
                    order.deliveryAgentId.name.charAt(0)
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="font-bold text-lg">{order.deliveryAgentId.name}</h3>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-semibold">
                      {order.deliveryAgentId.vehicle}
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <FaStar size={12} /> {order.deliveryAgentId.rating || '4.5'}
                    </span>
                    <span>•</span>
                    <span>{order.deliveryAgentId.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <a 
                  href={`tel:${order.deliveryAgentId.phone}`}
                  className="flex items-center gap-2 border border-border hover:bg-muted font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                >
                  <FaPhone size={12} /> Call Agent
                </a>
                <button 
                  onClick={() => alert("Message feature is active. Direct chats are coming soon.")}
                  className="flex items-center gap-2 bg-primary text-white hover:bg-primary/95 font-semibold text-sm px-4 py-2.5 rounded-xl shadow-md transition-colors"
                >
                  <FaRegPaperPlane size={12} /> Chat
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm text-center text-muted-foreground">
              Rider assignment in progress...
            </div>
          )}
        </div>

        {/* Right Pane: Live Log & Notifications */}
        <div className="space-y-6">
          
          {/* Notification Alerts logs */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Delivery Timeline</h3>
            
            <div className="relative pl-6 border-l-2 border-border space-y-6">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    {/* Node Dot marker */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{log.text}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{log.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Status update dispatched</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Details list */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h3 className="text-md font-bold mb-4">Items Summary</h3>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex justify-between items-center text-sm font-bold">
              <span>Total Price Paid</span>
              <span className="text-primary text-base">₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackOrder;
