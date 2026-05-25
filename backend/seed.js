import { faker } from '@faker-js/faker';
import Restaurant from './models/Restaurant.js';
import Dish from './models/Dish.js';
import DeliveryAgent from './models/DeliveryAgent.js';

const CUISINES = ['North Indian', 'South Indian', 'Mughlai', 'Street Food', 'Chinese', 'Fast Food', 'Desserts', 'Beverages'];
const CATEGORIES = ['Starters', 'Main Course', 'Breads', 'Desserts', 'Beverages', 'Sides'];

const INDIAN_RESTAURANTS = [
  'Spice Route', 'Biryani Blues', 'Punjabi Dhaba', 'South Indian Cafe', 
  'Mughlai Darbar', 'Chaat Corner', 'The Curry House', 'Tandoori Tales', 
  'Dosa Plaza', 'Bombay Bites', 'Delhi Belly', 'Royal Kitchen'
];

const INDIAN_DISHES = [
  { name: 'Chicken Biryani', desc: 'Aromatic basmati rice cooked with tender chicken and spices' },
  { name: 'Paneer Butter Masala', desc: 'Cottage cheese cubes in a rich tomato gravy' },
  { name: 'Masala Dosa', desc: 'Crispy rice crepe filled with spiced potato mixture' },
  { name: 'Chole Bhature', desc: 'Spicy chickpea curry served with fried bread' },
  { name: 'Samosa', desc: 'Crispy pastry filled with spiced potatoes and peas' },
  { name: 'Gulab Jamun', desc: 'Deep-fried milk dumplings soaked in sugar syrup' },
  { name: 'Butter Chicken', desc: 'Tender chicken cooked in a creamy tomato sauce' },
  { name: 'Dal Makhani', desc: 'Slow-cooked black lentils with butter and cream' },
  { name: 'Garlic Naan', desc: 'Soft flatbread topped with garlic and cilantro' },
  { name: 'Palak Paneer', desc: 'Cottage cheese cubes in a creamy spinach gravy' },
  { name: 'Vada Pav', desc: 'Spicy potato fritter inside a soft bread bun' },
  { name: 'Pani Puri', desc: 'Crispy hollow puris filled with spicy tangy water' }
];

// Realistic food images from Unsplash
const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop', // Salad
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop', // Burger
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop', // Pizza
  'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=600&h=400&fit=crop', // Biryani
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop', // Sushi
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop', // BBQ
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop', // Pizza slice
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop', // Dessert
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop', // Pepperoni
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop', // Pasta
];

const RESTAURANT_IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop',
];

export const seedDatabase = async () => {
  try {
    const existingRestaurants = await Restaurant.countDocuments();
    if (existingRestaurants > 0) {
      console.log(`Database already has ${existingRestaurants} restaurants. Skipping seed.`);
      return;
    }

    console.log('🌱 Seeding database with restaurants and dishes...');

    const createdRestaurants = [];

    // Create 12 unique featured Restaurants
    for (let i = 0; i < INDIAN_RESTAURANTS.length; i++) {
      const isVeg = faker.datatype.boolean();
      const baseName = INDIAN_RESTAURANTS[i];
      const suffix = ['Kitchen', 'Bistro', 'Diner', 'Eats', 'Grill', 'Point'][i % 6];
      const restaurantName = `${baseName} ${suffix}`;

      const restaurant = new Restaurant({
        name: restaurantName,
        rating: faker.number.float({ min: 3.8, max: 5.0, fractionDigits: 1 }),
        deliveryTime: `${faker.number.int({ min: 15, max: 45 })} min`,
        cuisine: faker.helpers.arrayElement(CUISINES),
        priceRange: faker.helpers.arrayElement(['₹', '₹₹', '₹₹₹', '₹₹₹₹']),
        isVeg,
        offers: faker.datatype.boolean() ? `${faker.helpers.arrayElement([10, 20, 30, 50])}% off up to ₹150` : null,
        image: RESTAURANT_IMAGES[i % RESTAURANT_IMAGES.length],
        featured: true
      });

      const savedRestaurant = await restaurant.save();
      createdRestaurants.push(savedRestaurant);

      // Create 10 to 15 dishes per restaurant
      const numDishes = faker.number.int({ min: 10, max: 15 });
      const dishesToInsert = [];

      for (let j = 0; j < numDishes; j++) {
        const randomDish = faker.helpers.arrayElement(INDIAN_DISHES);
        dishesToInsert.push({
          restaurantId: savedRestaurant._id,
          name: randomDish.name,
          description: randomDish.desc,
          price: faker.number.float({ min: 100, max: 800, fractionDigits: 0 }),
          category: faker.helpers.arrayElement(CATEGORIES),
          isVeg: isVeg ? true : faker.datatype.boolean(),
          image: faker.helpers.arrayElement(FOOD_IMAGES)
        });
      }

      await Dish.insertMany(dishesToInsert);
    }

    console.log(`✅ Successfully seeded 12 unique featured restaurants and their dishes.`);

    // Seed Delivery Agents
    const existingAgents = await DeliveryAgent.countDocuments();
    if (existingAgents === 0) {
      console.log('🌱 Seeding delivery agents...');
      const agents = [
        { name: 'Rajesh Kumar', phone: '+91 98765 43210', status: 'Available', vehicle: 'Electric Scooter', rating: 4.8, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' },
        { name: 'Amit Sharma', phone: '+91 87654 32109', status: 'Available', vehicle: 'Motorcycle', rating: 4.6, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
        { name: 'Priya Patel', phone: '+91 76543 21098', status: 'Available', vehicle: 'Electric Bicycle', rating: 4.9, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
        { name: 'Sanjay Singh', phone: '+91 65432 10987', status: 'Available', vehicle: 'Motorcycle', rating: 4.5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
        { name: 'Deepak Rao', phone: '+91 54321 09876', status: 'Available', vehicle: 'Electric Scooter', rating: 4.7, image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop' }
      ];
      await DeliveryAgent.insertMany(agents);
      console.log('✅ Successfully seeded 5 delivery agents.');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};
