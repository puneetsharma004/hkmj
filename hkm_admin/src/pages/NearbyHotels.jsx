// src/pages/NearbyHotels.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';

export default function NearbyHotels() {
  // Initialize CRUD hook for nearbyHotels table
  const {
    data: hotels,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('nearbyHotels', {
    orderBy: 'created_at',
    orderDirection: 'desc'
  });

  // Initialize form state hook
  const {
    formData,
    setFormData,
    isFormOpen,
    editingId,
    openForm,
    closeForm,
  } = useFormState({
    name: '',
    category: '',
    distance: '',
    price: '',
    rating: '',
    amenities: [],
    contact: ''
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newAmenity, setNewAmenity] = useState('');

  // Category options
  const categoryOptions = [
    'Luxury',
    'Mid-Range',
    'Budget',
    'Boutique',
    'Business',
    'Resort'
  ];

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating hotel...' : 'Adding hotel...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Hotel updated successfully! 🏨', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Hotel added successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (hotel) => {
    setFormData({
      name: hotel.name,
      category: hotel.category,
      distance: hotel.distance,
      price: hotel.price || '',
      rating: hotel.rating || '',
      amenities: [...(hotel.amenities || [])],
      contact: hotel.contact || ''
    });
    openForm(hotel);
  };

  // Handle delete with confirmation toast
  const handleDelete = (hotel) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{hotel.name}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting hotel...');
              
              try {
                const { error: deleteError } = await deleteRecord(hotel.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Hotel deleted successfully! 🗑️', { id: loadingToast });
              } catch (err) {
                console.error('Error in handleDelete:', err);
                toast.error('An unexpected error occurred', { id: loadingToast });
              }
            }}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: '#1f2937',
        border: '2px solid #ef4444',
        minWidth: '300px',
      },
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    setNewAmenity('');
    closeForm();
  };

  // Add amenity to list
  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()]
      });
      setNewAmenity('');
      toast.success('Amenity added! ✅');
    }
  };

  // Remove amenity from list
  const handleRemoveAmenity = (index) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index)
    });
    toast.success('Amenity removed');
  };

  // Filter hotels by category
  const filteredHotels = selectedCategory === 'All' 
    ? hotels 
    : hotels.filter(hotel => hotel.category === selectedCategory);

  // Get unique categories
  const activeCategories = ['All', ...new Set(hotels.map(h => h.category))];

  // Sort hotels by rating (highest first)
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    const ratingA = parseFloat(a.rating) || 0;
    const ratingB = parseFloat(b.rating) || 0;
    return ratingB - ratingA;
  });

  // Loading state
  if (loading && hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading hotels...</p>
      </div>
    );
  }

  // Error state
  if (error && hotels.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading hotels</p>
        <p className="text-gray-400 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Nearby Hotels</h1>
          <p className="text-gray-400 mt-1">
            Total: {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Hotel
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {activeCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {category}
            {category !== 'All' && (
              <span className="ml-2 text-xs opacity-75">
                ({hotels.filter(h => h.category === category).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedHotels.length === 0 ? (
          <div className="col-span-3 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-gray-400 mb-4">
              {selectedCategory === 'All' 
                ? 'No hotels yet.' 
                : `No hotels in "${selectedCategory}" category.`}
            </p>
            {selectedCategory === 'All' && (
              <button
                onClick={() => openForm()}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Add Your First Hotel
              </button>
            )}
          </div>
        ) : (
          sortedHotels.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              hotel={hotel} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              loading={loading}
            />
          ))
        )}
      </div>

      {/* Stats */}
      {hotels.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Total Hotels: <strong className="text-white">{hotels.length}</strong></span>
            <span>Showing: <strong className="text-white">{sortedHotels.length}</strong></span>
            <span>Categories: <strong className="text-white">{new Set(hotels.map(h => h.category)).size}</strong></span>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Hotel' : 'Add Nearby Hotel'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Hotel Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hotel Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Grand Palace Hotel"
                  disabled={loading}
                />
              </div>

              {/* Category and Distance Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Distance from Temple <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 500m from temple"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Price, Rating, Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="₹1,500/night"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <input
                    type="text"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="4.5"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+91 98765 43210"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amenities
                </label>
                
                {/* Current amenities list */}
                {formData.amenities.length > 0 && (
                  <div className="mb-3 space-y-2 max-h-48 overflow-y-auto">
                    {formData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
                        <span className="text-green-400">✓</span>
                        <span className="flex-1 text-gray-300">{amenity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(index)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add amenity input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddAmenity();
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter amenity and click Add"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    disabled={loading}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Add amenities one by one. Press Enter or click Add button. ({formData.amenities.length} added)
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {editingId ? 'Update Hotel' : 'Add Hotel'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Hotel Card Component
function HotelCard({ hotel, onEdit, onDelete, loading }) {
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Luxury': return 'bg-purple-500/20 text-purple-400';
      case 'Mid-Range': return 'bg-blue-500/20 text-blue-400';
      case 'Budget': return 'bg-green-500/20 text-green-400';
      case 'Boutique': return 'bg-pink-500/20 text-pink-400';
      case 'Business': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < fullStars ? 'text-yellow-400' : 'text-gray-600'}>
            {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '⯨' : '☆')}
          </span>
        ))}
        <span className="text-sm text-gray-400 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition overflow-hidden">
      <div className="p-6">
        {/* Hotel Name and Category */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-orange-500 mb-2">{hotel.name}</h3>
          <span className={`inline-block px-3 py-1 text-xs rounded-full ${getCategoryColor(hotel.category)}`}>
            {hotel.category}
          </span>
        </div>

        {/* Rating */}
        {hotel.rating && (
          <div className="mb-4">
            {renderStars(hotel.rating)}
          </div>
        )}

        {/* Distance */}
        <div className="mb-4 flex items-center gap-2 p-3 bg-gray-700/50 rounded-lg">
          <span className="text-xl">📍</span>
          <span className="text-sm text-gray-300">{hotel.distance}</span>
        </div>

        {/* Price */}
        {hotel.price && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Starting from</p>
            <p className="text-lg font-bold text-green-400">{hotel.price}</p>
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Amenities:</p>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                <span key={idx} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                  ✓ {amenity}
                </span>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded">
                  +{hotel.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact */}
        {hotel.contact && (
          <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Contact</p>
            <p className="text-sm text-white font-medium">📞 {hotel.contact}</p>
          </div>
        )}

        {/* Created timestamp */}
        <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
          Added: {new Date(hotel.created_at).toLocaleDateString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(hotel)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(hotel)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
