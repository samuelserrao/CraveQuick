import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import restaurantRoutes from './routes/restaurantRoutes.js';
import dishRoutes from './routes/dishRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import deliveryAgentRoutes from './routes/deliveryAgentRoutes.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery-agents', deliveryAgentRoutes);

// Mock endpoints for things not implemented yet to keep frontend working
app.get('/api/categories', (req, res) => {
  res.json({ data: [
    { id: 1, name: 'Biryani', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&h=300&fit=crop' },
    { id: 2, name: 'North Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop' },
    { id: 3, name: 'South Indian', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=300&h=300&fit=crop' },
    { id: 4, name: 'Street Food', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop' },
    { id: 5, name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop' },
    { id: 6, name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop' },
    { id: 7, name: 'Beverages', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop' }
  ] });
});

// Database connection & Server start
const startServer = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    // Use memory server if no real URI is provided
    if (!mongoUri) {
      console.log('No MONGODB_URI found. Starting in-memory MongoDB...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    // Seed database automatically
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

startServer();
