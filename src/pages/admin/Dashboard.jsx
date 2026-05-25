import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaRupeeSign, FaShoppingCart, FaUsers } from 'react-icons/fa';

const StatCard = ({ title, value, icon, trend, isPositive }) => (
  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
        {icon}
      </div>
      <span className={`text-sm font-bold px-2 py-1 rounded-md ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="text-muted-foreground">Welcome to your admin dashboard.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₹24,562"
          icon={<FaRupeeSign />}
          trend="+12.5%"
          isPositive={true}
        />
        <StatCard
          title="Total Orders"
          value="1,245"
          icon={<FaShoppingCart />}
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          title="Restaurants"
          value="48"
          icon={<FaUtensils />}
          trend="-2.4%"
          isPositive={false}
        />
        <StatCard
          title="Active Users"
          value="8,234"
          icon={<FaUsers />}
          trend="+15.3%"
          isPositive={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold mb-2">Revenue Analytics</h3>
          <p className="text-sm text-muted-foreground mb-6">Monthly revenue overview</p>
          {/* Mock Chart with Grid Lines */}
          <div className="relative h-56 flex items-end gap-2 sm:gap-4 mt-auto pt-6 border-l border-border/50 pl-2">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none -left-6 pr-6 border-b border-border/50">
              {[100, 75, 50, 25, 0].map((tick) => (
                <div key={tick} className="flex items-center justify-between w-full">
                  <span className="text-[10px] text-muted-foreground w-6 text-right pr-2">{tick}%</span>
                  <div className="flex-1 border-t border-dashed border-border/30"></div>
                </div>
              ))}
            </div>

            {[30, 45, 25, 60, 75, 40, 65, 80, 55, 90, 70, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group z-10">
                <div
                  className="w-full max-w-[40px] bg-primary/20 group-hover:bg-primary transition-all duration-300 rounded-t-md relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded font-bold transition-opacity shadow-lg">
                    ₹{height * 100}
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { id: 1014, time: '2 mins ago', total: 24.50 },
              { id: 1013, time: '15 mins ago', total: 42.00 },
              { id: 1012, time: '1 hour ago', total: 18.75 },
              { id: 1011, time: '3 hours ago', total: 65.20 },
              { id: 1010, time: '5 hours ago', total: 32.10 }
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b border-border/40 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
                <span className="text-sm font-bold bg-muted px-2 py-1 rounded-md">₹{order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
