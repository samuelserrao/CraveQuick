import express from 'express';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    // Return formatted to match frontend expectation { data: [...] }
    res.json({ data: restaurants.map(r => ({ ...r.toObject(), id: r._id })) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json({ data: { ...restaurant.toObject(), id: restaurant._id } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create restaurant
router.post('/', async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json({ data: { ...newRestaurant.toObject(), id: newRestaurant._id } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update restaurant
router.put('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json({ data: { ...restaurant.toObject(), id: restaurant._id } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete restaurant
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json({ message: 'Restaurant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
