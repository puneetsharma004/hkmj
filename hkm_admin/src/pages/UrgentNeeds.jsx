// src/pages/UrgentNeeds.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';

export default function UrgentNeeds() {
  // Initialize CRUD hook for urgentNeeds table
  const {
    data: urgentNeeds,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('urgentNeeds', {
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
    amount: '',
    deadline: '',
    urgent: false,
    icon: ''
  });

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating need...' : 'Adding need...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Urgent need updated successfully! 🚨', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Urgent need added successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (need) => {
    setFormData({
      title: need.title,
      description: need.description || '',
      amount: need.amount,
      deadline: need.deadline,
      urgent: need.urgent,
      icon: need.icon || ''
    });
    openForm(need);
  };

  // Handle delete with confirmation toast
  const handleDelete = (need) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{need.title}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting need...');
              
              try {
                const { error: deleteError } = await deleteRecord(need.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Urgent need deleted successfully! 🗑️', { id: loadingToast });
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

  // Separate urgent and non-urgent needs
  const criticalNeeds = urgentNeeds.filter(n => n.urgent);
  const regularNeeds = urgentNeeds.filter(n => !n.urgent);

  // Loading state
  if (loading && urgentNeeds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading urgent needs...</p>
      </div>
    );
  }

  // Error state
  if (error && urgentNeeds.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading urgent needs</p>
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
          <h1 className="text-3xl font-bold text-white">Urgent Needs</h1>
          <p className="text-gray-400 mt-1">
            {criticalNeeds.length} critical • {regularNeeds.length} regular
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Urgent Need
        </button>
      </div>

      {/* Critical Urgent Needs */}
      {criticalNeeds.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            🚨 Critical Urgent Needs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criticalNeeds.map((need) => (
              <UrgentNeedCard 
                key={need.id} 
                need={need} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Needs */}
      <div>
        {regularNeeds.length > 0 && criticalNeeds.length > 0 && (
          <h2 className="text-xl font-bold text-white mb-4">Other Needs</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urgentNeeds.length === 0 ? (
            <div className="col-span-3 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
              <div className="text-6xl mb-4">🚨</div>
              <p className="text-gray-400 mb-4">No urgent needs yet.</p>
              <button
                onClick={() => openForm()}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Add Your First Urgent Need
              </button>
            </div>
          ) : regularNeeds.length === 0 && criticalNeeds.length > 0 ? null : (
            regularNeeds.map((need) => (
              <UrgentNeedCard 
                key={need.id} 
                need={need} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
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
              {editingId ? 'Edit Urgent Need' : 'Add Urgent Need'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Medical Emergency Fund"
                  disabled={loading}
                />
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
                  placeholder="Brief description of the urgent need"
                  disabled={loading}
                />
              </div>

              {/* Amount and Deadline Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount Needed <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., ₹50,000 or $500"
                    disabled={loading}
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 3 days, 1 week, 2 weeks"
                    disabled={loading}
                  />
                </div>
              </div>

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
                  placeholder="e.g., 🏥, 🏗️, 📚"
                  disabled={loading}
                />
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
                  🚨 Mark as urgent/critical (will be featured prominently with alerts)
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
                  {editingId ? 'Update Need' : 'Add Need'}
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

// Urgent Need Card Component
function UrgentNeedCard({ need, onEdit, onDelete, loading }) {
  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-md border-2 transition overflow-hidden ${
        need.urgent 
          ? 'border-red-500 animate-pulse' 
          : 'border-gray-700 hover:border-orange-500'
      }`}
    >
      <div className="p-6">
        {/* Urgent Badge and Icon */}
        {need.urgent && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
              🚨 URGENT
            </span>
          </div>
        )}

        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-3">
          {need.icon && (
            <div className="text-4xl">{need.icon}</div>
          )}
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-1 ${need.urgent ? 'text-red-400' : 'text-orange-500'}`}>
              {need.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        {need.description && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{need.description}</p>
        )}

        {/* Amount Needed */}
        <div className="mb-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
          <p className="text-xs text-gray-400 mb-1">Amount Needed</p>
          <p className="text-2xl font-bold text-white">{need.amount}</p>
        </div>

        {/* Deadline */}
        <div className="mb-4 flex items-center gap-2 p-3 bg-gray-700/50 rounded-lg">
          <span className="text-xl">⏰</span>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Deadline</p>
            <p className={`text-sm font-semibold ${need.urgent ? 'text-red-400' : 'text-gray-300'}`}>
              {need.deadline}
            </p>
          </div>
        </div>

        {/* Created timestamp */}
        <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
          Added: {new Date(need.created_at).toLocaleString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(need)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(need)}
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
