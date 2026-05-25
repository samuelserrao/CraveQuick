import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../../services/api';
import Button from '../../components/ui/Button';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';
import Input from '../../components/ui/Input';

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    rating: 0,
    deliveryTime: '',
    priceRange: '₹₹',
    image: '',
  });

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await getRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (restaurant = null) => {
    if (restaurant) {
      setEditingId(restaurant.id);
      setFormData({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        deliveryTime: restaurant.deliveryTime,
        priceRange: restaurant.priceRange,
        image: restaurant.image,
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', cuisine: '', rating: 0, deliveryTime: '', priceRange: '₹₹', image: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRestaurant(editingId, formData);
      } else {
        await createRestaurant(formData);
      }
      closeModal();
      fetchRestaurants();
    } catch (error) {
      console.error("Error saving restaurant:", error);
      alert("Failed to save restaurant");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await deleteRestaurant(id);
        fetchRestaurants();
      } catch (error) {
        console.error("Error deleting restaurant:", error);
        alert("Failed to delete restaurant");
      }
    }
  };

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 relative"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Restaurants</h2>
          <p className="text-muted-foreground">Manage your restaurant partners.</p>
        </div>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <FaPlus /> Add Restaurant
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <FaSearch size={14} />
            </div>
            <Input 
              type="text" 
              placeholder="Search restaurants..." 
              className="pl-9 h-9" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Restaurant</th>
                <th className="px-6 py-4 font-medium">Cuisine</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">Loading restaurants...</td>
                </tr>
              ) : filteredRestaurants.length === 0 ? (
                 <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">No restaurants found.</td>
                </tr>
              ) : (
                filteredRestaurants.map(r => (
                  <tr key={r.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {r.image && <img src={r.image} alt={r.name} className="w-10 h-10 rounded-md object-cover" />}
                        <span className="font-medium">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{r.cuisine}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                        {r.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openModal(r)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(r.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-lg rounded-xl shadow-lg border border-border overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h3 className="text-lg font-bold">{editingId ? 'Edit Restaurant' : 'Add Restaurant'}</h3>
                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cuisine</label>
                  <Input name="cuisine" value={formData.cuisine} onChange={handleInputChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <Input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price Range</label>
                    <select 
                      name="priceRange" 
                      value={formData.priceRange} 
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="₹">₹</option>
                      <option value="₹₹">₹₹</option>
                      <option value="₹₹₹">₹₹₹</option>
                      <option value="₹₹₹₹">₹₹₹₹</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Time</label>
                  <Input name="deliveryTime" placeholder="e.g. 30-40 min" value={formData.deliveryTime} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input name="image" value={formData.image} onChange={handleInputChange} required />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                  <Button type="submit">{editingId ? 'Save Changes' : 'Add Restaurant'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageRestaurants;
