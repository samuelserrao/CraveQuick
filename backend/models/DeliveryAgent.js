import mongoose from 'mongoose';

const deliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Delivering', 'Offline'], default: 'Available' },
  vehicle: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  image: { type: String }
}, { timestamps: true });

const DeliveryAgent = mongoose.model('DeliveryAgent', deliveryAgentSchema);
export default DeliveryAgent;
