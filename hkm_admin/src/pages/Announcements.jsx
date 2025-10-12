// src/pages/Announcements.jsx
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';

export default function Announcements() {
  // Initialize CRUD hook for announcements table
  const {
    data: announcements,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('announcements', {
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
    isActive: true,
    linkText: '',
    link: '',
    icon: '',
    priority: 'medium',
    color: '#FF6B35'
  });

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating announcement...' : 'Creating announcement...');
    
    try {
      if (editingId) {
        // Update existing announcement
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Announcement updated successfully! 🎉', { id: loadingToast });
      } else {
        // Create new announcement
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Announcement created successfully! ✨', { id: loadingToast });
      }
      
      closeForm();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      isActive: announcement.isActive,
      linkText: announcement.linkText,
      link: announcement.link,
      icon: announcement.icon || '',
      priority: announcement.priority || 'medium',
      color: announcement.color
    });
    openForm(announcement);
  };

  // Handle delete with confirmation toast
  const handleDelete = (announcement) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{announcement.title}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting announcement...');
              
              try {
                const { error: deleteError } = await deleteRecord(announcement.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Announcement deleted successfully! 🗑️', { id: loadingToast });
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

  // Loading state
  if (loading && announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading announcements...</p>
      </div>
    );
  }

  // Error state
  if (error && announcements.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading announcements</p>
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
          <h1 className="text-3xl font-bold text-white">Announcements</h1>
          <p className="text-gray-400 text-sm mt-1">
            Total: {announcements.length} {announcements.length === 1 ? 'announcement' : 'announcements'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add New
        </button>
      </div>

      {/* Announcements List */}
      <div className="grid gap-4">
        {announcements.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">📢</div>
            <p className="text-gray-400 mb-4">No announcements yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Create Your First Announcement
            </button>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition"
              style={{ borderLeftWidth: '4px', borderLeftColor: announcement.color }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {announcement.icon && <span className="text-2xl">{announcement.icon}</span>}
                    <h3 className="text-xl font-semibold text-orange-500">{announcement.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Link Text:</span>
                      <p className="text-gray-300">{announcement.linkText}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Link:</span>
                      <p className="text-gray-300 truncate">{announcement.link}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Priority:</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        announcement.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        announcement.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {announcement.priority || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        announcement.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                      }`}>
                        {announcement.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Created: {new Date(announcement.created_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(announcement)}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(announcement)}
                    disabled={loading}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Announcement' : 'Add Announcement'}
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
                  placeholder="Enter announcement title"
                  disabled={loading}
                />
              </div>

              {/* Link Text */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.linkText}
                  onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Read More, View Details"
                  disabled={loading}
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="/page-url or https://example.com"
                  disabled={loading}
                />
              </div>

              {/* Icon and Priority Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 🙏 or 🎉"
                    disabled={loading}
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority (Optional)
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    required
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-12 w-20 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    required
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="#FF6B35"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                  disabled={loading}
                />
                <label htmlFor="isActive" className="text-sm text-gray-300 cursor-pointer">
                  Active (visible on website)
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
                  {editingId ? 'Update' : 'Save'}
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
