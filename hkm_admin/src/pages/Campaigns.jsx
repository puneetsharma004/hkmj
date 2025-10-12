// src/pages/Campaigns.jsx
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import { useState } from 'react';
import FileUpload from '../components/FileUpload';

export default function Campaigns() {
  // Initialize CRUD hook for campaigns table
  const {
    data: campaigns,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('campaigns', {
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
    title: '',
    description: '',
    image: '',
    target: '',
    raised: '',
    deadline: '',
    daysLeft: '',
    donors: '',
    urgent: false,
    video: '',
    icon: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating campaign...' : 'Creating campaign...');
    
    try {
      // Prepare data with proper types
      const campaignData = {
        ...formData,
        target: parseFloat(formData.target),
        raised: parseFloat(formData.raised),
        daysLeft: parseInt(formData.daysLeft),
        donors: formData.donors ? parseInt(formData.donors) : null
      };

      if (editingId) {
        const { error: updateError } = await update(editingId, campaignData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Campaign updated successfully! 🎉', { id: loadingToast });
      } else {
        const { error: createError } = await create(campaignData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Campaign created successfully! 🎯', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (campaign) => {
    setFormData({
      title: campaign.title,
      description: campaign.description,
      image: campaign.image || '',
      target: campaign.target.toString(),
      raised: campaign.raised.toString(),
      deadline: campaign.deadline,
      daysLeft: campaign.daysLeft.toString(),
      donors: campaign.donors ? campaign.donors.toString() : '',
      urgent: campaign.urgent || false,
      video: campaign.video || '',
      icon: campaign.icon || ''
    });
    setImagePreview(campaign.image || '');
    openForm(campaign);
  };

  // Handle delete with confirmation toast
  const handleDelete = (campaign) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{campaign.title}"?</p>
          <p className="text-sm text-gray-400 mt-1">
            This will permanently remove this campaign and all its data.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting campaign...');
              
              try {
                const { error: deleteError } = await deleteRecord(campaign.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Campaign deleted successfully! 🗑️', { id: loadingToast });
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

  // Calculate progress percentage
  const calculateProgress = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Sort campaigns by urgency and days left
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return a.daysLeft - b.daysLeft;
  });

  // Loading state
  if (loading && campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading campaigns...</p>
      </div>
    );
  }

  // Error state
  if (error && campaigns.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading campaigns</p>
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
          <h1 className="text-3xl font-bold text-white">Campaigns</h1>
          <p className="text-gray-400 mt-1">
            Total: {campaigns.length} {campaigns.length === 1 ? 'campaign' : 'campaigns'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Campaign
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.length === 0 ? (
          <div className="col-span-2 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-400 mb-4">No campaigns yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Create Your First Campaign
            </button>
          </div>
        ) : (
          sortedCampaigns.map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              calculateProgress={calculateProgress}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              loading={loading}
            />
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Campaign' : 'Add New Campaign'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Campaign Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Temple Renovation Fund"
                      disabled={loading}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Campaign description and goals"
                      disabled={loading}
                    />
                  </div>

                  {/* Target and Raised */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Target Amount (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.target}
                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="500000"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Raised Amount (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.raised}
                        onChange={(e) => setFormData({ ...formData, raised: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="325000"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Deadline and Days Left */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Deadline <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Days Left <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.daysLeft}
                        onChange={(e) => setFormData({ ...formData, daysLeft: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="81"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Donors and Icon */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Number of Donors
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.donors}
                        onChange={(e) => setFormData({ ...formData, donors: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="245"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Icon (Emoji)
                      </label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="🏛️"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Urgent Checkbox */}
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                      className="w-5 h-5 text-red-500 bg-gray-600 border-gray-500 rounded focus:ring-red-500"
                      disabled={loading}
                    />
                    <label htmlFor="urgent" className="text-sm text-gray-300 cursor-pointer">
                      🚨 Mark as urgent campaign (high priority)
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Campaign Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://example.com/campaign-image.jpg"
                      disabled={loading}
                    />
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Image Preview
                      </label>
                      <div className="w-full h-64 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                        <img 
                          src={imagePreview} 
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x600?text=Campaign+Image';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Video URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Video URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.video}
                      onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://www.youtube.com/watch?v=..."
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      YouTube or Vimeo link for campaign video
                    </p>
                  </div>

                  {/* // For single image */}
                  <FileUpload
                    onUploadComplete={(url) => setFormData({ ...formData, image: url }) }
                  
                    accept="image/*"
                    folder="photos" // or 'events', 'festivals', etc.
                    label="Upload Photo"
                    currentPreview={formData.image}
                  />

                  {/* // For video */}
                  <FileUpload
                    onUploadComplete={(url) => setFormData({ ...formData, video: url })}
                    accept="video/*"
                    folder="videos"
                    label="Upload Video"
                    currentPreview={formData.video}
                  />
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
                  {editingId ? 'Update Campaign' : 'Create Campaign'}
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

// Campaign Card Component
function CampaignCard({ campaign, onEdit, onDelete, calculateProgress, formatCurrency, formatDate, loading }) {
  const progress = calculateProgress(campaign.raised, campaign.target);
  
  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-md border-2 transition overflow-hidden ${
        campaign.urgent ? 'border-red-500' : 'border-gray-700 hover:border-orange-500'
      }`}
    >
      {/* Campaign Image */}
      {campaign.image && (
        <div className="relative w-full h-48 bg-gray-700 overflow-hidden">
          <img 
            src={campaign.image} 
            alt={campaign.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=Campaign+Image';
            }}
          />
          {/* Urgent Badge */}
          {campaign.urgent && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              🚨 URGENT
            </div>
          )}
          {/* Days Left Badge */}
          <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {campaign.daysLeft} days left
          </div>
        </div>
      )}
      
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-3">
          {campaign.icon && (
            <span className="text-3xl">{campaign.icon}</span>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-orange-500 line-clamp-1">{campaign.title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{campaign.description}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-orange-500 font-semibold">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Funding Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Raised</p>
            <p className="text-lg font-bold text-green-400">{formatCurrency(campaign.raised)}</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Target</p>
            <p className="text-lg font-bold text-white">{formatCurrency(campaign.target)}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700">
          {campaign.donors && (
            <span className="flex items-center gap-1">
              👥 <strong className="text-white">{campaign.donors}</strong> donors
            </span>
          )}
          <span>📅 {formatDate(campaign.deadline)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {campaign.video && (
            <button 
              onClick={() => window.open(campaign.video, '_blank')}
              className="flex-1 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition text-sm"
            >
              🎥 Video
            </button>
          )}
          <button 
            onClick={() => onEdit(campaign)}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(campaign)}
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
