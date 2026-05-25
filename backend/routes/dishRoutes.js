import express from 'express';
import Dish from '../models/Dish.js';

const router = express.Router();

// Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find().populate('restaurantId');
    res.json({ data: dishes.map(d => ({ ...d.toObject(), id: d._id })) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dishes by restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const dishes = await Dish.find({ restaurantId: req.params.restaurantId });
    res.json({ data: dishes.map(d => ({ ...d.toObject(), id: d._id })) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create dish
router.post('/', async (req, res) => {
  const dish = new Dish(req.body);
  try {
    const newDish = await dish.save();
    res.status(201).json({ data: { ...newDish.toObject(), id: newDish._id } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update dish
router.put('/:id', async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ data: { ...dish.toObject(), id: dish._id } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete dish
router.delete('/:id', async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ message: 'Dish deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
