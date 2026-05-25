/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';

// Public/Customer Pages
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Signup from '../pages/public/Signup';
import Restaurants from '../pages/customer/Restaurants';
import RestaurantDetail from '../pages/customer/RestaurantDetail';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import Offers from '../pages/customer/Offers';
import TrackOrder from '../pages/customer/TrackOrder';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import ManageRestaurants from '../pages/admin/ManageRestaurants';
import ManageDishes from '../pages/admin/ManageDishes';
import ManageOrders from '../pages/admin/ManageOrders';

// Placeholder for Users/Settings
const Placeholder = ({ title }) => <div className="p-8 text-xl text-muted-foreground">{title} - Coming Soon</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'restaurants', element: <Restaurants /> },
      { path: 'restaurant/:id', element: <RestaurantDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'offers', element: <Offers /> },
      { path: 'track/:id', element: <TrackOrder /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'restaurants', element: <ManageRestaurants /> },
      { path: 'dishes', element: <ManageDishes /> },
      { path: 'orders', element: <ManageOrders /> },
      { path: 'users', element: <Placeholder title="Manage Users" /> },
      { path: 'settings', element: <Placeholder title="Settings" /> },
    ],
  },
]);
