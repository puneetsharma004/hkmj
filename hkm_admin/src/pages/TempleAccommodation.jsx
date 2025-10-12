// src/pages/TempleAccommodation.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';

export default function TempleAccommodation() {
  // Initialize CRUD hook for templeAccommodation table
  const {
    data: accommodations,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('templeAccommodation', {
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
    type: '',
    capacity: '',
    price: '',
    amenities: [],
    availability: '',
    booking: '',
    icon: ''
  });

  const [newAmenity, setNewAmenity] = useState('');

  // Availability options
  const availabilityOptions = [
    'Available',
    'Limited',
    'Fully Booked',
    'Under Maintenance',
    'Coming Soon'
  ];

  // Booking method options
  const bookingOptions = [
    'Online/Phone',
    'Walk-in/Phone',
    'Walk-in only',
    'Phone only',
    'Online only',
    'Advance booking required'
  ];

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.amenities.length === 0) {
      toast.error('Please add at least one amenity');
      return;
    }

    const loadingToast = toast.loading(editingId ? 'Updating accommodation...' : 'Adding accommodation...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Accommodation updated successfully! 🏨', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Accommodation added successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (acc) => {
    setFormData({
      type: acc.type,
      capacity: acc.capacity || '',
      price: acc.price,
      amenities: [...(acc.amenities || [])],
      availability: acc.availability,
      booking: acc.booking,
      icon: acc.icon || ''
    });
    openForm(acc);
  };

  // Handle delete with confirmation toast
  const handleDelete = (acc) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{acc.type}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting accommodation...');
              
              try {
                const { error: deleteError } = await deleteRecord(acc.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Accommodation deleted successfully! 🗑️', { id: loadingToast });
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

  // Loading state
  if (loading && accommodations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading accommodations...</p>
      </div>
    );
  }

  // Error state
  if (error && accommodations.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading accommodations</p>
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
          <h1 className="text-3xl font-bold text-white">Temple Accommodation</h1>
          <p className="text-gray-400 mt-1">
            Total: {accommodations.length} {accommodations.length === 1 ? 'option' : 'options'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Accommodation
        </button>
      </div>

      {/* Accommodations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodations.length === 0 ? (
          <div className="col-span-3 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-gray-400 mb-4">No accommodations yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Add Your First Accommodation
            </button>
          </div>
        ) : (
          accommodations.map((acc) => (
            <AccommodationCard 
              key={acc.id} 
              accommodation={acc} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              loading={loading}
            />
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Accommodation' : 'Add Accommodation'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Accommodation Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Deluxe Room, Standard Room, Dormitory"
                  disabled={loading}
                />
              </div>

              {/* Capacity, Price, Icon Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Capacity
                  </label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 2-4 persons"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., ₹1,500/night"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="🏨"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Availability and Booking Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Availability <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  >
                    <option value="">Select availability</option>
                    {availabilityOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Booking Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.booking}
                    onChange={(e) => setFormData({ ...formData, booking: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  >
                    <option value="">Select method</option>
                    {bookingOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amenities <span className="text-red-500">*</span>
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

              {/* Validation notice */}
              {formData.amenities.length === 0 && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    ⚠️ Please add at least one amenity
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || formData.amenities.length === 0}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {editingId ? 'Update Accommodation' : 'Add Accommodation'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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

// Accommodation Card Component
function AccommodationCard({ accommodation, onEdit, onDelete, loading }) {
  const getAvailabilityColor = (availability) => {
    switch(availability) {
      case 'Available': return 'bg-green-500/20 text-green-400';
      case 'Limited': return 'bg-yellow-500/20 text-yellow-400';
      case 'Fully Booked': return 'bg-red-500/20 text-red-400';
      case 'Under Maintenance': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition overflow-hidden">
      <div className="p-6">
        {/* Icon and Type */}
        <div className="flex items-start gap-3 mb-4">
          {accommodation.icon && (
            <span className="text-4xl">{accommodation.icon}</span>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-orange-500 mb-2">{accommodation.type}</h3>
            {/* Availability Badge */}
            <span className={`inline-block px-3 py-1 text-xs rounded-full ${getAvailabilityColor(accommodation.availability)}`}>
              {accommodation.availability}
            </span>
          </div>
        </div>

        {/* Capacity and Price */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {accommodation.capacity && (
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Capacity</p>
              <p className="text-sm font-semibold text-white">👥 {accommodation.capacity}</p>
            </div>
          )}
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Price</p>
            <p className="text-sm font-semibold text-green-400">{accommodation.price}</p>
          </div>
        </div>

        {/* Amenities */}
        {accommodation.amenities && accommodation.amenities.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Amenities:</p>
            <div className="flex flex-wrap gap-2">
              {accommodation.amenities.slice(0, 4).map((amenity, idx) => (
                <span key={idx} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                  ✓ {amenity}
                </span>
              ))}
              {accommodation.amenities.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded">
                  +{accommodation.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Booking Method */}
        <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Booking Method</p>
          <p className="text-sm text-purple-400 font-medium">📞 {accommodation.booking}</p>
        </div>

        {/* Created timestamp */}
        <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
          Added: {new Date(accommodation.created_at).toLocaleDateString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(accommodation)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(accommodation)}
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
