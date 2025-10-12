// src/pages/SponsorshipTiers.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';

export default function SponsorshipTiers() {
  // Initialize CRUD hook for sponsorshipTiers table
  const {
    data: tiers,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('sponsorshipTiers', {
    orderBy: 'amount',
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
    amount: '',
    serves: '',
    includes: [],
    popular: false
  });

  const [newBenefit, setNewBenefit] = useState('');

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.includes.length === 0) {
      toast.error('Please add at least one benefit');
      return;
    }

    const loadingToast = toast.loading(editingId ? 'Updating tier...' : 'Creating tier...');
    
    try {
      const tierData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      if (editingId) {
        const { error: updateError } = await update(editingId, tierData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Tier updated successfully! 💎', { id: loadingToast });
      } else {
        const { error: createError } = await create(tierData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Tier created successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (tier) => {
    setFormData({
      name: tier.name,
      amount: tier.amount.toString(),
      serves: tier.serves,
      includes: [...tier.includes],
      popular: tier.popular
    });
    openForm(tier);
  };

  // Handle delete with confirmation toast
  const handleDelete = (tier) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{tier.name}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting tier...');
              
              try {
                const { error: deleteError } = await deleteRecord(tier.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Tier deleted successfully! 🗑️', { id: loadingToast });
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
    setNewBenefit('');
    closeForm();
  };

  // Add benefit to includes array
  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        includes: [...formData.includes, newBenefit.trim()]
      });
      setNewBenefit('');
      toast.success('Benefit added! ✅');
    }
  };

  // Remove benefit from includes array
  const handleRemoveBenefit = (index) => {
    setFormData({
      ...formData,
      includes: formData.includes.filter((_, i) => i !== index)
    });
    toast.success('Benefit removed');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Loading state
  if (loading && tiers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading sponsorship tiers...</p>
      </div>
    );
  }

  // Error state
  if (error && tiers.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading sponsorship tiers</p>
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
          <h1 className="text-3xl font-bold text-white">Sponsorship Tiers</h1>
          <p className="text-gray-400 mt-1">
            Total: {tiers.length} {tiers.length === 1 ? 'tier' : 'tiers'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Tier
        </button>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.length === 0 ? (
          <div className="col-span-3 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">💎</div>
            <p className="text-gray-400 mb-4">No sponsorship tiers yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Create Your First Tier
            </button>
          </div>
        ) : (
          tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`bg-gray-800 rounded-lg shadow-md border-2 transition overflow-hidden ${
                tier.popular ? 'border-orange-500 transform scale-105' : 'border-gray-700 hover:border-orange-500'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 font-semibold text-sm">
                  ⭐ MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-orange-500 mb-4 text-center">{tier.name}</h3>
                
                {/* Amount */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    {formatCurrency(tier.amount)}
                  </div>
                  <div className="text-sm text-gray-400">One-time donation</div>
                </div>

                {/* Serves */}
                <div className="text-center mb-6 p-3 bg-purple-500/20 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Serves</div>
                  <div className="text-lg font-semibold text-purple-400">🍽️ {tier.serves}</div>
                </div>

                {/* Includes/Benefits */}
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-400 mb-3">Includes:</div>
                  <ul className="space-y-2 max-h-48 overflow-y-auto">
                    {tier.includes.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-300">
                        <span className="text-green-400 mr-2 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Created timestamp */}
                <div className="text-xs text-gray-500 mb-4 text-center border-t border-gray-700 pt-3">
                  Created: {new Date(tier.created_at).toLocaleDateString()}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(tier)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(tier)}
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
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Sponsorship Tier' : 'Add Sponsorship Tier'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tier Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tier Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Gold Tier, Silver Tier, Platinum Tier"
                  disabled={loading}
                />
              </div>

              {/* Amount and Serves Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="5000"
                    disabled={loading}
                  />
                </div>

                {/* Serves */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Serves <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.serves}
                    onChange={(e) => setFormData({ ...formData, serves: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 50 people, 100 families"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Includes/Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Included Benefits <span className="text-red-500">*</span>
                </label>
                
                {/* Current benefits list */}
                {formData.includes.length > 0 && (
                  <div className="mb-3 space-y-2 max-h-60 overflow-y-auto">
                    {formData.includes.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
                        <span className="text-green-400">✓</span>
                        <span className="flex-1 text-gray-300">{benefit}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(index)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add benefit input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBenefit();
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter a benefit and click Add"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    disabled={loading}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Add benefits one by one. Press Enter or click Add button. ({formData.includes.length} added)
                </p>
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
                  ⭐ Mark as popular tier (will be highlighted and featured)
                </label>
              </div>

              {/* Validation notice */}
              {formData.includes.length === 0 && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    ⚠️ Please add at least one benefit to this tier
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || formData.includes.length === 0}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {editingId ? 'Update Tier' : 'Create Tier'}
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
