// src/pages/Photos.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';

export default function Photos() {
  // Initialize CRUD hook for photos table
  const {
    data: photos,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('photos', {
    orderBy: 'date',
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
    src: '',
    category: '',
    title: '',
    description: '',
    date: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Category options
  const categoryOptions = [
    'Festival',
    'Temple',
    'Community',
    'Rituals',
    'Cultural',
    'Events',
    'Architecture',
    'Other'
  ];

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating photo...' : 'Adding photo...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Photo updated successfully! 📸', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Photo added successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (photo) => {
    setFormData({
      src: photo.src,
      category: photo.category,
      title: photo.title,
      description: photo.description,
      date: photo.date
    });
    setImagePreview(photo.src);
    openForm(photo);
  };

  // Handle delete with confirmation toast
  const handleDelete = (photo) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{photo.title}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting photo...');
              
              try {
                const { error: deleteError } = await deleteRecord(photo.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Photo deleted successfully! 🗑️', { id: loadingToast });
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
    setFormData({ ...formData, src: url });
    setImagePreview(url);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date not set';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Filter photos by category
  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  // Get unique categories from photos
  const activeCategories = ['All', ...new Set(photos.map(p => p.category))];

  // Sort photos by date (newest first)
  const sortedPhotos = [...filteredPhotos].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Loading state
  if (loading && photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading photos...</p>
      </div>
    );
  }

  // Error state
  if (error && photos.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading photos</p>
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
          <h1 className="text-3xl font-bold text-white">Photo Gallery</h1>
          <p className="text-gray-400 mt-1">
            Total: {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Photo
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
                ({photos.filter(p => p.category === category).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPhotos.length === 0 ? (
          <div className="col-span-full bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-400 mb-4">
              {selectedCategory === 'All' 
                ? 'No photos yet.' 
                : `No photos in "${selectedCategory}" category.`}
            </p>
            {selectedCategory === 'All' && (
              <button
                onClick={() => openForm()}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Upload Your First Photo
              </button>
            )}
          </div>
        ) : (
          sortedPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition overflow-hidden group"
            >
              {/* Photo Image */}
              <div className="relative w-full h-64 bg-gray-700 overflow-hidden">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=Photo';
                  }}
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {photo.category}
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <p className="text-sm line-clamp-3">{photo.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-orange-500 mb-2 line-clamp-1">{photo.title}</h3>
                
                {/* Date */}
                <p className="text-gray-400 text-xs mb-3">📅 {formatDate(photo.date)}</p>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{photo.description}</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(photo)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(photo)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {photos.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Total Photos: <strong className="text-white">{photos.length}</strong></span>
            <span>Showing: <strong className="text-white">{sortedPhotos.length}</strong></span>
            <span>Categories: <strong className="text-white">{new Set(photos.map(p => p.category)).size}</strong></span>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Photo' : 'Add New Photo'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photo Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Diwali Celebration 2024"
                  disabled={loading}
                />
              </div>

              {/* Category and Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
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

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Photo Date <span className="text-red-500">*</span>
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
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Brief description of the photo"
                  disabled={loading}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photo Image <span className="text-red-500">*</span>
                </label>
                
                <FileUpload
                  onUploadComplete={(url) => {
                    setFormData({ ...formData, src: url });
                    setImagePreview(url);
                  }}
                  accept="image/*"
                  folder="photos"
                  label="Upload Photo"
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
                    value={formData.src}
                    onChange={handleImageChange}
                    className="mt-2 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com/photo.jpg"
                    disabled={loading}
                  />
                </details>

                {/* Show current URL */}
                {formData.src && (
                  <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-xs text-green-400 mb-1">✅ Image URL:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.src}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-700 text-white text-xs rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(formData.src);
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
                  💡 <strong>Tip:</strong> For best results, use square or landscape images (recommended: 800x800px or 1200x800px).
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
                  {editingId ? 'Update Photo' : 'Add Photo'}
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
