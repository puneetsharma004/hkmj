// src/pages/Videos.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';

export default function Videos() {
  // Initialize CRUD hook for videos table
  const {
    data: videos,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('videos', {
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
    title: '',
    description: '',
    thumbnail: '',
    videoUrl: '',
    duration: '',
    category: '',
    views: '',
    date: ''
  });

  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Category options
  const categoryOptions = [
    'festivals',
    'kirtans',
    'teachings',
    'community',
  ];

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating video...' : 'Adding video...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Video updated successfully! 🎬', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Video added successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (video) => {
    setFormData({
      title: video.title,
      description: video.description || '',
      thumbnail: video.thumbnail || '',
      videoUrl: video.videoUrl,
      duration: video.duration || '',
      category: video.category || '',
      views: video.views || '',
      date: video.date || ''
    });
    setThumbnailPreview(video.thumbnail || '');
    openForm(video);
  };

  // Handle delete with confirmation toast
  const handleDelete = (video) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{video.title}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting video...');
              
              try {
                const { error: deleteError } = await deleteRecord(video.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Video deleted successfully! 🗑️', { id: loadingToast });
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
    setThumbnailPreview('');
    closeForm();
  };

  // Handle thumbnail URL change
  const handleThumbnailChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, thumbnail: url });
    setThumbnailPreview(url);
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

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Filter videos by category
  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  // Get unique categories
  const activeCategories = ['All', ...new Set(videos.map(v => v.category).filter(Boolean))];

  // Sort videos by date (newest first)
  const sortedVideos = [...filteredVideos].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Loading state
  if (loading && videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading videos...</p>
      </div>
    );
  }

  // Error state
  if (error && videos.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading videos</p>
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
          <h1 className="text-3xl font-bold text-white">Video Gallery</h1>
          <p className="text-gray-400 mt-1">
            Total: {videos.length} {videos.length === 1 ? 'video' : 'videos'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Video
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
                ({videos.filter(v => v.category === category).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedVideos.length === 0 ? (
          <div className="col-span-full bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-400 mb-4">
              {selectedCategory === 'All' 
                ? 'No videos yet.' 
                : `No videos in "${selectedCategory}" category.`}
            </p>
            {selectedCategory === 'All' && (
              <button
                onClick={() => openForm()}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Add Your First Video
              </button>
            )}
          </div>
        ) : (
          sortedVideos.map((video) => (
            <div 
              key={video.id} 
              className="bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition overflow-hidden group"
            >
              {/* Video Thumbnail */}
              <div className="relative w-full h-48 bg-gray-700 overflow-hidden">
                <img 
                  src={video.thumbnail || `https://img.youtube.com/vi/${getYouTubeId(video.videoUrl)}/maxresdefault.jpg`} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/640x360?text=Video+Thumbnail';
                  }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">
                  <div className="w-16 h-16 rounded-full bg-orange-500/90 flex items-center justify-center group-hover:scale-110 transition">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                    {video.duration}
                  </div>
                )}
                {/* Category Badge */}
                {video.category && (
                  <div className="absolute top-3 left-3 bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {video.category}
                  </div>
                )}
              </div>
              
              <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-orange-500 mb-2 line-clamp-2">{video.title}</h3>
                
                {/* Description */}
                {video.description && (
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{video.description}</p>
                )}

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  {video.views && (
                    <span className="flex items-center gap-1">
                      👁️ {video.views}
                    </span>
                  )}
                  {video.date && (
                    <span className="flex items-center gap-1">
                      📅 {formatDate(video.date)}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.open(video.videoUrl, '_blank')}
                    className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
                  >
                    Watch
                  </button>
                  <button 
                    onClick={() => handleEdit(video)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(video)}
                    disabled={loading}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {videos.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Total Videos: <strong className="text-white">{videos.length}</strong></span>
            <span>Showing: <strong className="text-white">{sortedVideos.length}</strong></span>
            <span>Categories: <strong className="text-white">{new Set(videos.map(v => v.category).filter(Boolean)).size}</strong></span>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Video' : 'Add New Video'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Video Title <span className="text-red-500">*</span>
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

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Brief description of the video content"
                      disabled={loading}
                    />
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Video URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://www.youtube.com/watch?v=..."
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      YouTube, Vimeo, or direct video URL
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
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

                  {/* Duration and Views Row */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g., 5:30"
                        disabled={loading}
                      />
                    </div>

                    {/* Views */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Views
                      </label>
                      <input
                        type="text"
                        value={formData.views}
                        onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g., 1.2K"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upload/Recording Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom Thumbnail (Optional)
                    </label>
                    
                    <FileUpload
                      onUploadComplete={(url) => {
                        setFormData({ ...formData, thumbnail: url });
                        setThumbnailPreview(url);
                      }}
                      accept="image/*"
                      folder="video-thumbnails"
                      label="Upload Thumbnail"
                      currentPreview={thumbnailPreview || (formData.videoUrl && getYouTubeId(formData.videoUrl) ? `https://img.youtube.com/vi/${getYouTubeId(formData.videoUrl)}/maxresdefault.jpg` : '')}
                      showPreview={false}
                    />
                    
                    {/* Manual URL Input (Optional) */}
                    <details className="mt-3">
                      <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                        Or paste thumbnail URL manually
                      </summary>
                      <input
                        type="url"
                        value={formData.thumbnail}
                        onChange={handleThumbnailChange}
                        className="mt-2 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="https://example.com/thumbnail.jpg"
                        disabled={loading}
                      />
                    </details>

                    <p className="text-xs text-gray-500 mt-2">
                      Leave empty to auto-generate from YouTube
                    </p>
                  </div>

                  {/* Thumbnail Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Thumbnail Preview
                    </label>
                    <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden border border-gray-600 relative">
                      <img 
                        src={thumbnailPreview || (formData.videoUrl && getYouTubeId(formData.videoUrl) ? `https://img.youtube.com/vi/${getYouTubeId(formData.videoUrl)}/maxresdefault.jpg` : 'https://via.placeholder.com/640x360?text=Video+Thumbnail')} 
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/640x360?text=Invalid+Image';
                        }}
                      />
                      {/* Play icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-orange-500/80 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400">
                  💡 <strong>Tip:</strong> For YouTube videos, the thumbnail will be auto-generated if you don't provide one. For other platforms, upload a custom thumbnail.
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
                  {editingId ? 'Update Video' : 'Add Video'}
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
