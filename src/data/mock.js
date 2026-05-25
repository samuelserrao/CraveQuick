export const categories = [
  { id: 1, name: 'Offers', image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=200&h=200&fit=crop' },
  { id: 2, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
  { id: 3, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop' },
  { id: 4, name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop' },
  { id: 5, name: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=200&h=200&fit=crop' },
  { id: 6, name: 'Dessert', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop' },
];

export const restaurants = [
  {
    id: 1,
    name: 'Burger King',
    rating: 4.2,
    deliveryTime: '20-25 min',
    cuisine: 'American, Fast Food',
    priceRange: '₹₹',
    isVeg: false,
    offers: '50% off up to ₹5',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 2,
    name: 'Pizza Hut',
    rating: 4.0,
    deliveryTime: '30-40 min',
    cuisine: 'Italian, Pizza',
    priceRange: '₹₹',
    isVeg: false,
    offers: 'Free Garlic Bread on ₹10',
    image: 'https://images.unsplash.com/photo-1604381756096-c1fdb114971c?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 3,
    name: 'Green Bowl',
    rating: 4.8,
    deliveryTime: '15-20 min',
    cuisine: 'Healthy, Salads',
    priceRange: '₹₹₹',
    isVeg: true,
    offers: '20% off',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 4,
    name: 'Sweet Treats',
    rating: 4.5,
    deliveryTime: '25-30 min',
    cuisine: 'Desserts, Bakery',
    priceRange: '₹',
    isVeg: true,
    offers: 'Buy 1 Get 1 Free',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: 5,
    name: 'Spice Route Biryani',
    rating: 4.6,
    deliveryTime: '35-45 min',
    cuisine: 'Indian, Mughlai',
    priceRange: '₹₹',
    isVeg: false,
    offers: '10% off',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: 6,
    name: 'Sushi Master',
    rating: 4.9,
    deliveryTime: '40-50 min',
    cuisine: 'Japanese, Sushi',
    priceRange: '₹₹₹₹',
    isVeg: false,
    offers: null,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop',
    featured: true,
  }
];

export const foodItems = [
  {
    id: 101,
    restaurantId: 1,
    name: 'Whopper',
    description: 'A signature flame-grilled beef patty topped with tomatoes, fresh cut lettuce, mayo, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    price: 6.99,
    category: 'Main Course',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
  },
  {
    id: 102,
    restaurantId: 1,
    name: 'French Fries',
    description: 'More delicious than ever, our signature piping hot, thick cut Salted French Fries are golden on the outside and fluffy on the inside.',
    price: 2.99,
    category: 'Starters',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&h=300&fit=crop'
  },
  {
    id: 103,
    restaurantId: 1,
    name: 'Chocolate Shake',
    description: 'Cool down with our creamy Hand Spun Shake. Velvety vanilla soft serve and chocolate sauce are blended to perfection.',
    price: 3.49,
    category: 'Drinks',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop'
  },
  {
    id: 201,
    restaurantId: 2,
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza with mozzarella cheese and tomato sauce.',
    price: 12.99,
    category: 'Main Course',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1604381756096-c1fdb114971c?w=400&h=300&fit=crop'
  },
  {
    id: 202,
    restaurantId: 2,
    name: 'Garlic Bread',
    description: 'Freshly baked garlic bread with cheese.',
    price: 4.99,
    category: 'Starters',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop'
  }
];

export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer'
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  }
];

export const orders = [
  {
    id: 'ORD-001',
    userId: 1,
    restaurantId: 1,
    status: 'Delivered',
    total: 10.48,
    date: '2026-05-08T10:00:00Z',
    items: [
      { foodId: 101, quantity: 1, price: 6.99 },
      { foodId: 103, quantity: 1, price: 3.49 }
    ]
  }
];
