import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  deliveryTime: { type: String, default: '30-40 min' },
  cuisine: { type: String, required: true },
  priceRange: { type: String, default: '$$' },
  isVeg: { type: Boolean, default: false },
  offers: { type: String },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
