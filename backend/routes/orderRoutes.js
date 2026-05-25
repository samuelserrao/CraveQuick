import express from 'express';
import Order from '../models/Order.js';
import DeliveryAgent from '../models/DeliveryAgent.js';

const router = express.Router();

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('deliveryAgentId');
    // Map with 'date' field to support existing admin dashboard compatibility
    res.json({ data: orders.map(o => ({ ...o.toObject(), id: o._id, date: o.createdAt })) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order & Assign available delivery agent
router.post('/', async (req, res) => {
  try {
    const { userId, userName, items, total, deliveryAddress, restaurantId } = req.body;
    
    // Find an available delivery agent
    let agent = await DeliveryAgent.findOne({ status: 'Available' });
    if (!agent) {
      // Fallback: get any agent
      agent = await DeliveryAgent.findOne({});
    }

    if (agent) {
      agent.status = 'Delivering';
      await agent.save();
    }

    const order = new Order({
      userId,
      userName,
      items,
      total,
      deliveryAddress,
      restaurantId,
      deliveryAgentId: agent ? agent._id : null,
      status: 'Preparing'
    });

    const savedOrder = await order.save();
    res.status(201).json({ data: { ...savedOrder.toObject(), id: savedOrder._id } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single order with dynamic delivery simulation
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('deliveryAgentId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Calculate dynamic delivery status based on time elapsed since order creation
    const elapsed = Date.now() - new Date(order.createdAt).getTime();
    
    let currentStatus = order.status;
    let agentLocation = { lat: 12.9716, lng: 77.5946 }; // Default: Restaurant location
    let statusDescription = 'Your order is being prepared.';

    const resLat = 12.9716, resLng = 77.5946;
    const custLat = 12.9916, custLng = 77.6146;

    if (order.status !== 'Delivered') {
      if (elapsed < 15000) {
        currentStatus = 'Preparing';
        statusDescription = 'Chef is preparing your delicious meal.';
        agentLocation = { lat: resLat, lng: resLng };
      } else if (elapsed < 30000) {
        currentStatus = 'Picked Up';
        statusDescription = 'Delivery partner has picked up your food and is arriving soon.';
        // Interpolate first half (ratio from 0 to 1 over 15s)
        const p = (elapsed - 15000) / 15000;
        agentLocation = {
          lat: resLat + p * 0.5 * (custLat - resLat),
          lng: resLng + p * 0.5 * (custLng - resLng)
        };
      } else if (elapsed < 45000) {
        currentStatus = 'Out for Delivery';
        statusDescription = 'Delivery partner is nearby your location.';
        // Interpolate second half
        const p = (elapsed - 30000) / 15000;
        agentLocation = {
          lat: (resLat + 0.5 * (custLat - resLat)) + p * 0.5 * (custLat - resLat),
          lng: (resLng + 0.5 * (custLng - resLng)) + p * 0.5 * (custLng - resLng)
        };
      } else {
        currentStatus = 'Delivered';
        statusDescription = 'Order delivered successfully. Bon appétit!';
        agentLocation = { lat: custLat, lng: custLng };

        // Save status in DB so it remains Delivered
        order.status = 'Delivered';
        await order.save();

        // Release the agent back to Available status
        if (order.deliveryAgentId) {
          await DeliveryAgent.findByIdAndUpdate(order.deliveryAgentId._id, { status: 'Available' });
        }
      }
    } else {
      statusDescription = 'Order delivered successfully. Bon appétit!';
      agentLocation = { lat: custLat, lng: custLng };
    }

    res.json({
      data: {
        ...order.toObject(),
        id: order._id,
        simulatedStatus: currentStatus,
        statusDescription,
        agentLocation,
        elapsedSeconds: Math.floor(elapsed / 1000)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status manually
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ data: { ...order.toObject(), id: order._id } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
