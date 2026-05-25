import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  isVeg: { type: Boolean, default: false },
  image: { type: String }
}, { timestamps: true });

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
