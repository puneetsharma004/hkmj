// src/pages/SocialPlatforms.jsx
import React, { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter, 
  FaWhatsapp, 
  FaTelegramPlane,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
  FaDiscord,
  FaRedditAlien,
  FaSnapchatGhost
} from 'react-icons/fa';

// Icon mapping for dynamic rendering
const iconMap = {
  'FaFacebookF': FaFacebookF,
  'FaInstagram': FaInstagram,
  'FaYoutube': FaYoutube,
  'FaTwitter': FaTwitter,
  'FaWhatsapp': FaWhatsapp,
  'FaTelegramPlane': FaTelegramPlane,
  'FaLinkedinIn': FaLinkedinIn,
  'FaPinterestP': FaPinterestP,
  'FaTiktok': FaTiktok,
  'FaDiscord': FaDiscord,
  'FaRedditAlien': FaRedditAlien,
  'FaSnapchatGhost': FaSnapchatGhost
};

export default function SocialPlatforms() {
  // Initialize CRUD hook for socialPlatforms table
  const {
    data: platforms,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('socialPlatforms', {
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
    icon: '',
    color: '',
    followers: '',
    description: '',
    url: '',
    posts: ''
  });

  // Predefined platform options with their colors
  const platformPresets = [
    { name: 'Facebook', icon: 'FaFacebookF', color: 'from-blue-600 to-blue-700' },
    { name: 'Instagram', icon: 'FaInstagram', color: 'from-pink-500 to-purple-600' },
    { name: 'YouTube', icon: 'FaYoutube', color: 'from-red-500 to-red-600' },
    { name: 'Twitter', icon: 'FaTwitter', color: 'from-sky-400 to-sky-500' },
    { name: 'WhatsApp', icon: 'FaWhatsapp', color: 'from-green-500 to-green-600' },
    { name: 'Telegram', icon: 'FaTelegramPlane', color: 'from-blue-400 to-blue-500' },
    { name: 'LinkedIn', icon: 'FaLinkedinIn', color: 'from-blue-700 to-blue-800' },
    { name: 'Pinterest', icon: 'FaPinterestP', color: 'from-red-600 to-red-700' },
    { name: 'TikTok', icon: 'FaTiktok', color: 'from-gray-800 to-black' },
    { name: 'Discord', icon: 'FaDiscord', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Reddit', icon: 'FaRedditAlien', color: 'from-orange-600 to-orange-700' },
    { name: 'Snapchat', icon: 'FaSnapchatGhost', color: 'from-yellow-400 to-yellow-500' }
  ];

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating platform...' : 'Adding platform...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Platform updated successfully! 🌐', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Platform added successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (platform) => {
    setFormData({
      name: platform.name,
      icon: platform.icon || '',
      color: platform.color || '',
      followers: platform.followers || '',
      description: platform.description || '',
      url: platform.url,
      posts: platform.posts
    });
    openForm(platform);
  };

  // Handle delete with confirmation toast
  const handleDelete = (platform) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{platform.name}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting platform...');
              
              try {
                const { error: deleteError } = await deleteRecord(platform.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Platform deleted successfully! 🗑️', { id: loadingToast });
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
    closeForm();
  };

  // Auto-fill icon and color when platform is selected
  const handlePlatformSelect = (preset) => {
    setFormData({
      ...formData,
      name: preset.name,
      icon: preset.icon,
      color: preset.color
    });
    toast.success(`${preset.name} selected! Fill in the remaining details.`);
  };

  // Loading state
  if (loading && platforms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading social platforms...</p>
      </div>
    );
  }

  // Error state
  if (error && platforms.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading social platforms</p>
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
          <h1 className="text-3xl font-bold text-white">Social Media Platforms</h1>
          <p className="text-gray-400 mt-1">
            Total: {platforms.length} {platforms.length === 1 ? 'platform' : 'platforms'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Platform
        </button>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.length === 0 ? (
          <div className="col-span-3 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🌐</div>
            <p className="text-gray-400 mb-4">No social platforms yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Add Your First Platform
            </button>
          </div>
        ) : (
          platforms.map((platform) => (
            <PlatformCard 
              key={platform.id} 
              platform={platform} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              iconMap={iconMap}
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
              {editingId ? 'Edit Social Platform' : 'Add Social Platform'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Quick Select Preset */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quick Select Platform (Optional)
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {platformPresets.map((preset) => {
                    const IconComponent = iconMap[preset.icon];
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handlePlatformSelect(preset)}
                        disabled={loading}
                        className={`p-3 rounded-lg bg-gradient-to-r ${preset.color} hover:opacity-80 transition flex items-center justify-center disabled:opacity-50`}
                      >
                        {IconComponent && <IconComponent className="text-white text-xl" />}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click to auto-fill platform details
                </p>
              </div>

              {/* Platform Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Platform Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Facebook, Instagram"
                  disabled={loading}
                />
              </div>

              {/* Icon and Color Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  >
                    <option value="">Select icon</option>
                    {Object.keys(iconMap).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gradient Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., from-blue-600 to-blue-700"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://facebook.com/yourpage"
                  disabled={loading}
                />
              </div>

              {/* Followers and Posts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Followers
                  </label>
                  <input
                    type="text"
                    value={formData.followers}
                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 25K, 1.5M"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Post Frequency <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.posts}
                    onChange={(e) => setFormData({ ...formData, posts: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Daily, Weekly"
                    disabled={loading}
                  />
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
                  placeholder="Brief description of what you post on this platform"
                  disabled={loading}
                />
              </div>

              {/* Preview */}
              {formData.icon && formData.color && (
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-3">Preview:</p>
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${formData.color} flex items-center justify-center shadow-lg`}>
                    {iconMap[formData.icon] && React.createElement(iconMap[formData.icon], { className: 'text-white text-3xl' })}
                  </div>
                </div>
              )}

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
                  {editingId ? 'Update Platform' : 'Add Platform'}
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

// Platform Card Component
function PlatformCard({ platform, onEdit, onDelete, iconMap, loading }) {
  const IconComponent = iconMap[platform.icon];

  return (
    <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition overflow-hidden">
      <div className="p-6">
        {/* Icon and Name */}
        <div className="flex items-center gap-4 mb-4">
          {IconComponent && (
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg`}>
              <IconComponent className="text-white text-2xl" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{platform.name}</h3>
            {platform.followers && (
              <p className="text-sm text-gray-400">{platform.followers} followers</p>
            )}
          </div>
        </div>

        {/* Description */}
        {platform.description && (
          <p className="text-gray-300 text-sm mb-4">{platform.description}</p>
        )}

        {/* Post Frequency */}
        <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Post Frequency</p>
          <p className="text-sm text-orange-400 font-medium">📅 {platform.posts}</p>
        </div>

        {/* URL */}
        <div className="mb-4">
          <a 
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 break-all"
          >
            🔗 {platform.url}
          </a>
        </div>

        {/* Created timestamp */}
        <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
          Added: {new Date(platform.created_at).toLocaleDateString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => window.open(platform.url, '_blank')}
            className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition text-sm"
          >
            Visit
          </button>
          <button 
            onClick={() => onEdit(platform)}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(platform)}
            disabled={loading}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
