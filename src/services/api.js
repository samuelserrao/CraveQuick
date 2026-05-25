import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding auth token (for future)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Real API Methods
export const getRestaurants = async () => {
  const res = await api.get('/restaurants');
  return res.data;
};

export const getRestaurantById = async (id) => {
  const [restaurantRes, menuRes] = await Promise.all([
    api.get(`/restaurants/${id}`),
    api.get(`/dishes/restaurant/${id}`)
  ]);
  
  return { 
    data: { 
      ...restaurantRes.data.data, 
      menu: menuRes.data.data 
    } 
  };
};

export const createRestaurant = async (data) => {
  const res = await api.post('/restaurants', data);
  return res.data;
};

export const updateRestaurant = async (id, data) => {
  const res = await api.put(`/restaurants/${id}`, data);
  return res.data;
};

export const deleteRestaurant = async (id) => {
  const res = await api.delete(`/restaurants/${id}`);
  return res.data;
};

export const getDishes = async () => {
  const res = await api.get('/dishes');
  return res.data;
};

export const createDish = async (data) => {
  const res = await api.post('/dishes', data);
  return res.data;
};

export const updateDish = async (id, data) => {
  const res = await api.put(`/dishes/${id}`, data);
  return res.data;
};

export const deleteDish = async (id) => {
  const res = await api.delete(`/dishes/${id}`);
  return res.data;
};

// Keeping mock endpoints for incomplete features to avoid crashing the frontend
export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get('/orders');
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

export default api;
