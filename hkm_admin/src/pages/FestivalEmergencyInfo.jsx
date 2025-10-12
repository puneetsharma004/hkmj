// src/pages/FestivalEmergencyInfo.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';

export default function FestivalEmergencyInfo() {
  // Initialize CRUD hook for festivalEmergencyInfo table
  const {
    data: festivalInfo,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('festivalEmergencyInfo', {
    orderBy: 'date',
    orderDirection: 'asc'
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
    nextBigEvent: '',
    date: '',
    expectedVisitors: '',
    specialArrangements: []
  });

  const [newArrangement, setNewArrangement] = useState('');

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.specialArrangements.length === 0) {
      toast.error('Please add at least one special arrangement');
      return;
    }

    const loadingToast = toast.loading(editingId ? 'Updating festival info...' : 'Creating festival info...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Festival info updated successfully! 🎉', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Festival info created successfully! 🚨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (info) => {
    setFormData({
      nextBigEvent: info.nextBigEvent,
      date: info.date,
      expectedVisitors: info.expectedVisitors || '',
      specialArrangements: [...(info.specialArrangements || [])]
    });
    openForm(info);
  };

  // Handle delete with confirmation toast
  const handleDelete = (info) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{info.nextBigEvent}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting festival info...');
              
              try {
                const { error: deleteError } = await deleteRecord(info.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Festival info deleted successfully! 🗑️', { id: loadingToast });
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
    setNewArrangement('');
    closeForm();
  };

  // Add arrangement to list
  const handleAddArrangement = () => {
    if (newArrangement.trim()) {
      setFormData({
        ...formData,
        specialArrangements: [...formData.specialArrangements, newArrangement.trim()]
      });
      setNewArrangement('');
      toast.success('Arrangement added! ✅');
    }
  };

  // Remove arrangement from list
  const handleRemoveArrangement = (index) => {
    setFormData({
      ...formData,
      specialArrangements: formData.specialArrangements.filter((_, i) => i !== index)
    });
    toast.success('Arrangement removed');
  };

  // Calculate days until event
  const getDaysUntil = (dateStr) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Sort by date (upcoming first)
  const sortedInfo = [...festivalInfo].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Loading state
  if (loading && festivalInfo.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading festival information...</p>
      </div>
    );
  }

  // Error state
  if (error && festivalInfo.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading festival information</p>
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
          <h1 className="text-3xl font-bold text-white">Festival Emergency Info</h1>
          <p className="text-gray-400 mt-1">
            Total: {festivalInfo.length} {festivalInfo.length === 1 ? 'festival' : 'festivals'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Festival Info
        </button>
      </div>

      {/* Festival Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {festivalInfo.length === 0 ? (
          <div className="col-span-2 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🚨</div>
            <p className="text-gray-400 mb-4">No festival information yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Add First Festival Info
            </button>
          </div>
        ) : (
          sortedInfo.map((info) => (
            <FestivalInfoCard 
              key={info.id} 
              info={info} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              getDaysUntil={getDaysUntil}
              formatDate={formatDate}
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
              {editingId ? 'Edit Festival Information' : 'Add Festival Information'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Next Big Event <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nextBigEvent}
                  onChange={(e) => setFormData({ ...formData, nextBigEvent: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Diwali Mahautsav 2025"
                  disabled={loading}
                />
              </div>

              {/* Date and Expected Visitors Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expected Visitors
                  </label>
                  <input
                    type="text"
                    value={formData.expectedVisitors}
                    onChange={(e) => setFormData({ ...formData, expectedVisitors: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 50,000+, 10K-20K"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Special Arrangements */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Special Arrangements <span className="text-red-500">*</span>
                </label>
                
                {/* Current arrangements list */}
                {formData.specialArrangements.length > 0 && (
                  <div className="mb-3 space-y-2 max-h-60 overflow-y-auto">
                    {formData.specialArrangements.map((arrangement, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
                        <span className="text-green-400">✓</span>
                        <span className="flex-1 text-gray-300">{arrangement}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArrangement(index)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add arrangement input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newArrangement}
                    onChange={(e) => setNewArrangement(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddArrangement();
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter special arrangement and click Add"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleAddArrangement}
                    disabled={loading}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Add arrangements one by one. Press Enter or click Add button. ({formData.specialArrangements.length} added)
                </p>
              </div>

              {/* Validation notice */}
              {formData.specialArrangements.length === 0 && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    ⚠️ Please add at least one special arrangement
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || formData.specialArrangements.length === 0}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {editingId ? 'Update Info' : 'Add Info'}
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

// Festival Info Card Component
function FestivalInfoCard({ info, onEdit, onDelete, getDaysUntil, formatDate, loading }) {
  const daysUntil = getDaysUntil(info.date);
  const isUpcoming = daysUntil > 0;
  const isPast = daysUntil < 0;

  return (
    <div className={`bg-gray-800 rounded-lg shadow-md border-2 transition overflow-hidden ${
      isUpcoming && daysUntil <= 7 ? 'border-red-500 animate-pulse' : 
      isUpcoming ? 'border-orange-500' : 
      'border-gray-700'
    }`}>
      <div className="p-6">
        {/* Alert Badge for Urgent Events */}
        {isUpcoming && daysUntil <= 7 && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
              🚨 URGENT - {daysUntil} {daysUntil === 1 ? 'day' : 'days'} left!
            </span>
          </div>
        )}

        {/* Event Name */}
        <h3 className="text-2xl font-bold text-orange-500 mb-3">{info.nextBigEvent}</h3>

        {/* Date Display */}
        <div className="mb-4 p-4 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-lg border border-orange-500/30">
          <p className="text-xs text-gray-400 mb-1">Event Date</p>
          <p className="text-lg font-bold text-white">📅 {formatDate(info.date)}</p>
          {isUpcoming && (
            <p className="text-sm text-orange-400 mt-2">
              {daysUntil} {daysUntil === 1 ? 'day' : 'days'} to go
            </p>
          )}
          {isPast && (
            <p className="text-sm text-gray-500 mt-2">
              Event passed {Math.abs(daysUntil)} {Math.abs(daysUntil) === 1 ? 'day' : 'days'} ago
            </p>
          )}
        </div>

        {/* Expected Visitors */}
        {info.expectedVisitors && (
          <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Expected Visitors</p>
            <p className="text-lg font-semibold text-green-400">👥 {info.expectedVisitors}</p>
          </div>
        )}

        {/* Special Arrangements */}
        {info.specialArrangements && info.specialArrangements.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-300 mb-3">
              Special Arrangements ({info.specialArrangements.length}):
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {info.specialArrangements.map((arrangement, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{arrangement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Created timestamp */}
        <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
          Added: {new Date(info.created_at).toLocaleString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(info)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(info)}
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
