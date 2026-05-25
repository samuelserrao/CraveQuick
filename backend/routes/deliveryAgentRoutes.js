import express from 'express';
import DeliveryAgent from '../models/DeliveryAgent.js';

const router = express.Router();

// Get all agents
router.get('/', async (req, res) => {
  try {
    const agents = await DeliveryAgent.find();
    res.json({ data: agents.map(a => ({ ...a.toObject(), id: a._id })) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create agent
router.post('/', async (req, res) => {
  const agent = new DeliveryAgent(req.body);
  try {
    const newAgent = await agent.save();
    res.status(201).json({ data: { ...newAgent.toObject(), id: newAgent._id } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
