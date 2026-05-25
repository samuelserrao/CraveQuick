import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDishes, createDish, updateDish, deleteDish, getRestaurants } from '../../services/api';
import Button from '../../components/ui/Button';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from 'react-icons/fa';
import Input from '../../components/ui/Input';

const ManageDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isVeg: false,
    image: '',
    restaurantId: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dishesRes, restaurantsRes] = await Promise.all([
        getDishes(),
        getRestaurants()
      ]);
      setDishes(dishesRes.data);
      setRestaurants(restaurantsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const openModal = (dish = null) => {
    if (dish) {
      setEditingId(dish.id);
      setFormData({
        name: dish.name,
        description: dish.description || '',
        price: dish.price,
        category: dish.category,
        isVeg: dish.isVeg,
        image: dish.image || '',
        restaurantId: dish.restaurantId?._id || dish.restaurantId || ''
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: '', 
        description: '', 
        price: '', 
        category: '', 
        isVeg: false, 
        image: '', 
        restaurantId: restaurants.length > 0 ? restaurants[0].id : '' 
      });
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
        await updateDish(editingId, formData);
      } else {
        await createDish(formData);
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Error saving dish:", error);
      alert("Failed to save dish");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        await deleteDish(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting dish:", error);
        alert("Failed to delete dish");
      }
    }
  };

  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    (d.restaurantId && d.restaurantId.name && d.restaurantId.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 relative"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Dishes</h2>
          <p className="text-muted-foreground">Manage your menu items across all restaurants.</p>
        </div>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <FaPlus /> Add Dish
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
              placeholder="Search dishes..." 
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
                <th className="px-6 py-4 font-medium">Dish</th>
                <th className="px-6 py-4 font-medium">Restaurant</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">Loading dishes...</td>
                </tr>
              ) : filteredDishes.length === 0 ? (
                 <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">No dishes found.</td>
                </tr>
              ) : (
                filteredDishes.map(d => (
                  <tr key={d.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {d.image ? (
                          <img src={d.image} alt={d.name} className="w-10 h-10 rounded-md object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">?</div>
                        )}
                        <div>
                          <span className="font-medium block">{d.name}</span>
                          <span className="text-xs text-muted-foreground">{d.isVeg ? 'Veg' : 'Non-Veg'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {d.restaurantId && d.restaurantId.name ? d.restaurantId.name : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{d.category}</td>
                    <td className="px-6 py-4 font-bold">
                      ₹{typeof d.price === 'number' ? d.price.toFixed(2) : d.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openModal(d)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
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
                <h3 className="text-lg font-bold">{editingId ? 'Edit Dish' : 'Add Dish'}</h3>
                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Restaurant</label>
                  <select 
                    name="restaurantId" 
                    value={formData.restaurantId} 
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="" disabled>Select a restaurant</option>
                    {restaurants.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (₹)</label>
                    <Input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Input name="category" value={formData.category} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input name="image" value={formData.image} onChange={handleInputChange} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="isVeg" 
                    name="isVeg" 
                    checked={formData.isVeg} 
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-input"
                  />
                  <label htmlFor="isVeg" className="text-sm font-medium">Vegetarian</label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                  <Button type="submit">{editingId ? 'Save Changes' : 'Add Dish'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageDishes;
