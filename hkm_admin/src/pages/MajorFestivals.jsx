// src/pages/MajorFestivals.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';

export default function MajorFestivals() {
  // Initialize CRUD hook for majorFestivals table
  const {
    data: festivals,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('majorFestivals', {
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
    name: '',
    date: '',
    description: '',
    significance: '',
    specialPrograms: '',
    image: '',
    color: '#FF6B35',
    duration: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  // Duration presets
  const durationOptions = [
    '1 day',
    '2 days',
    '3 days',
    '5 days',
    '1 week',
    '10 days',
    'Custom'
  ];

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating festival...' : 'Creating festival...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Festival updated successfully! 🎊', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Festival created successfully! 🎉', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (festival) => {
    setFormData({
      name: festival.name || '',
      date: festival.date || '',
      description: festival.description || '',
      significance: festival.significance || '',
      specialPrograms: festival.specialPrograms || '',
      image: festival.image || '',
      color: festival.color || '#FF6B35',
      duration: festival.duration || ''
    });
    setImagePreview(festival.image || '');
    openForm(festival);
  };

  // Handle delete with confirmation toast
  const handleDelete = (festival) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{festival.name}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting festival...');
              
              try {
                const { error: deleteError } = await deleteRecord(festival.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Festival deleted successfully! 🗑️', { id: loadingToast });
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
    setImagePreview('');
    closeForm();
  };

  // Handle image URL change
  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date not set';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (loading && festivals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading festivals...</p>
      </div>
    );
  }

  // Error state
  if (error && festivals.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading festivals</p>
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
          <h1 className="text-3xl font-bold text-white">Major Festivals</h1>
          <p className="text-gray-400 mt-1">
            Total: {festivals.length} {festivals.length === 1 ? 'festival' : 'festivals'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Festival
        </button>
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {festivals.length === 0 ? (
          <div className="col-span-2 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🎊</div>
            <p className="text-gray-400 mb-4">No festivals yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Add Your First Festival
            </button>
          </div>
        ) : (
          festivals.map((festival) => (
            <div 
              key={festival.id} 
              className="bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition overflow-hidden"
              style={{ borderTopWidth: '4px', borderTopColor: festival.color }}
            >
              {/* Festival Image */}
              {festival.image && (
                <div className="w-full h-48 bg-gray-700 overflow-hidden">
                  <img 
                    src={festival.image} 
                    alt={festival.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Festival+Image';
                    }}
                  />
                </div>
              )}
              
              <div className="p-6">
                {/* Title and Duration */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-orange-500">{festival.name}</h3>
                  {festival.duration && (
                    <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                      ⏱️ {festival.duration}
                    </span>
                  )}
                </div>

                {/* Date */}
                {festival.date && (
                  <p className="text-gray-400 text-sm mb-3">📅 {formatDate(festival.date)}</p>
                )}

                {/* Description */}
                {festival.description && (
                  <p className="text-gray-300 mb-4">{festival.description}</p>
                )}

                {/* Significance */}
                {festival.significance && (
                  <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Significance</p>
                    <p className="text-gray-300 text-sm">{festival.significance}</p>
                  </div>
                )}

                {/* Special Programs */}
                {festival.specialPrograms && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Special Programs</p>
                    <div className="flex flex-wrap gap-2">
                      {festival.specialPrograms.split(',').map((program, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                          {program.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Created timestamp */}
                <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
                  Created: {new Date(festival.created_at).toLocaleString()}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(festival)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(festival)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Festival' : 'Add New Festival'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Festival Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Festival Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Diwali, Holi, Navratri"
                      disabled={loading}
                    />
                  </div>

                  {/* Date and Duration */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={loading}
                      >
                        <option value="">Select duration</option>
                        {durationOptions.map(duration => (
                          <option key={duration} value={duration}>{duration}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Brief description of the festival"
                      disabled={loading}
                    />
                  </div>

                  {/* Significance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Significance
                    </label>
                    <textarea
                      rows="3"
                      value={formData.significance}
                      onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Religious or cultural significance"
                      disabled={loading}
                    />
                  </div>

                  {/* Special Programs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Special Programs
                    </label>
                    <textarea
                      rows="3"
                      value={formData.specialPrograms}
                      onChange={(e) => setFormData({ ...formData, specialPrograms: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Comma-separated list of programs (e.g., Puja, Cultural Show, Feast)"
                      disabled={loading}
                    />
                  </div>

                  {/* Color Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Theme Color
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="h-12 w-20 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                        disabled={loading}
                      />
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="#FF6B35"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Festival Image
                    </label>
                    
                    <FileUpload
                      onUploadComplete={(url) => {
                        setFormData({ ...formData, image: url });
                        setImagePreview(url);
                      }}
                      accept="image/*"
                      folder="festivals"
                      label="Upload Image"
                      currentPreview={imagePreview}
                      showPreview={true}
                    />
                    
                    {/* Manual URL Input (Optional) */}
                    <details className="mt-3">
                      <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                        Or paste image URL manually
                      </summary>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={handleImageChange}
                        className="mt-2 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="https://example.com/image.jpg"
                        disabled={loading}
                      />
                    </details>

                    {/* Show current URL */}
                    {formData.image && (
                      <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-xs text-green-400 mb-1">✅ Image URL:</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={formData.image}
                            readOnly
                            className="flex-1 px-3 py-2 bg-gray-700 text-white text-xs rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(formData.image);
                              toast.success('URL copied!');
                            }}
                            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                          >
                            📋
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-blue-400">
                      💡 <strong>Tip:</strong> Upload high-quality images representing the festival. 
                      Special programs should be comma-separated for proper display.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {editingId ? 'Update Festival' : 'Create Festival'}
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
