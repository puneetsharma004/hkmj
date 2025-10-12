// src/pages/SevaOptions.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';

export default function SevaOptions() {
  // Initialize CRUD hook for sevaOptions table
  const {
    data: sevaOptions,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('sevaOptions', {
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
    icon: '',
    color: '#FF6B35',
    suggestedAmount: '',
    impact: '',
    popular: false
  });

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating seva...' : 'Creating seva...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Seva updated successfully! 🙏', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Seva created successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (seva) => {
    setFormData({
      title: seva.title || '',
      description: seva.description || '',
      icon: seva.icon || '',
      color: seva.color || '#FF6B35',
      suggestedAmount: seva.suggestedAmount || '',
      impact: seva.impact || '',
      popular: seva.popular || false
    });
    openForm(seva);
  };

  // Handle delete with confirmation toast
  const handleDelete = (seva) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{seva.title}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting seva...');
              
              try {
                const { error: deleteError } = await deleteRecord(seva.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Seva deleted successfully! 🗑️', { id: loadingToast });
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

  // Separate popular and regular sevas
  const popularSevas = sevaOptions.filter(s => s.popular);
  const regularSevas = sevaOptions.filter(s => !s.popular);

  // Loading state
  if (loading && sevaOptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading seva options...</p>
      </div>
    );
  }

  // Error state
  if (error && sevaOptions.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading seva options</p>
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
          <h1 className="text-3xl font-bold text-white">Seva Options</h1>
          <p className="text-gray-400 mt-1">
            Total: {sevaOptions.length} seva {sevaOptions.length === 1 ? 'option' : 'options'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Seva Option
        </button>
      </div>

      {/* Popular Seva Options */}
      {popularSevas.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center gap-2">
            ⭐ Popular Seva Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularSevas.map((seva) => (
              <SevaCard 
                key={seva.id} 
                seva={seva} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                isPopular={true}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Seva Options */}
      <div>
        {regularSevas.length > 0 && popularSevas.length > 0 && (
          <h2 className="text-xl font-bold text-white mb-4">Other Seva Options</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sevaOptions.length === 0 ? (
            <div className="col-span-3 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
              <div className="text-6xl mb-4">🙏</div>
              <p className="text-gray-400 mb-4">No seva options yet.</p>
              <button
                onClick={() => openForm()}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Create Your First Seva Option
              </button>
            </div>
          ) : regularSevas.length === 0 && popularSevas.length > 0 ? null : (
            regularSevas.map((seva) => (
              <SevaCard 
                key={seva.id} 
                seva={seva} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                isPopular={false}
                loading={loading}
              />
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Seva Option' : 'Add Seva Option'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seva Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Annadanam, Temple Maintenance"
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
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Brief description of the seva opportunity"
                  disabled={loading}
                />
              </div>

              {/* Icon and Color Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 🍽️, 🏛️, 📚"
                    disabled={loading}
                  />
                </div>

                {/* Color */}
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

              {/* Suggested Amount and Impact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Suggested Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Suggested Amount
                  </label>
                  <input
                    type="text"
                    value={formData.suggestedAmount}
                    onChange={(e) => setFormData({ ...formData, suggestedAmount: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., ₹1,000, $50"
                    disabled={loading}
                  />
                </div>

                {/* Impact */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Impact
                  </label>
                  <input
                    type="text"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Feeds 50 devotees"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-5 h-5 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                  disabled={loading}
                />
                <label htmlFor="popular" className="text-sm text-gray-300 cursor-pointer">
                  ⭐ Mark as popular seva (will be featured prominently)
                </label>
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
                  {editingId ? 'Update Seva' : 'Add Seva'}
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

// Seva Card Component
function SevaCard({ seva, onEdit, onDelete, isPopular, loading }) {
  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-md border-2 transition overflow-hidden ${
        isPopular ? 'border-orange-500' : 'border-gray-700 hover:border-orange-500'
      }`}
      style={{ borderTopWidth: '4px', borderTopColor: seva.color }}
    >
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-4">
          {seva.icon && (
            <div className="text-4xl">{seva.icon}</div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-orange-500 mb-1">{seva.title}</h3>
            {isPopular && (
              <span className="inline-block px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full">
                ⭐ Popular
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {seva.description && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{seva.description}</p>
        )}

        {/* Suggested Amount */}
        {seva.suggestedAmount && (
          <div className="mb-3 p-3 bg-gray-700/50 rounded-lg text-center">
            <p className="text-xs text-gray-400 mb-1">Suggested Amount</p>
            <p className="text-2xl font-bold text-white">{seva.suggestedAmount}</p>
          </div>
        )}

        {/* Impact */}
        {seva.impact && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Impact</p>
            <p className="text-sm text-green-400 font-medium">✓ {seva.impact}</p>
          </div>
        )}

        {/* Created timestamp */}
        <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
          Created: {new Date(seva.created_at).toLocaleDateString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(seva)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(seva)}
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
