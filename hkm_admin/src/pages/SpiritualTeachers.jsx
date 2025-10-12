// src/pages/SpiritualTeachers.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';

export default function SpiritualTeachers() {
  // Initialize CRUD hook for spiritualTeachers table
  const {
    data: teachers,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('spiritualTeachers', {
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
    role: '',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  // Role options
  const roleOptions = [
    'Founder-Acharya of ISKCON',
    'Temple President',
    'Senior Spiritual Guide',
  ];

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating teacher...' : 'Adding teacher...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Teacher updated successfully! 🙏', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Teacher added successfully! ✨', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (teacher) => {
    setFormData({
      name: teacher.name,
      role: teacher.role,
      description: teacher.description,
      image: teacher.image
    });
    setImagePreview(teacher.image);
    openForm(teacher);
  };

  // Handle delete with confirmation toast
  const handleDelete = (teacher) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Remove "{teacher.name}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Removing teacher...');
              
              try {
                const { error: deleteError } = await deleteRecord(teacher.id);
                
                if (deleteError) {
                  toast.error(`Failed to remove: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Teacher removed successfully! 🗑️', { id: loadingToast });
              } catch (err) {
                console.error('Error in handleDelete:', err);
                toast.error('An unexpected error occurred', { id: loadingToast });
              }
            }}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
          >
            Remove
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

  // Loading state
  if (loading && teachers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading spiritual teachers...</p>
      </div>
    );
  }

  // Error state
  if (error && teachers.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading spiritual teachers</p>
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
          <h1 className="text-3xl font-bold text-white">Spiritual Teachers</h1>
          <p className="text-gray-400 mt-1">
            Total: {teachers.length} {teachers.length === 1 ? 'teacher' : 'teachers'}
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Teacher
        </button>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.length === 0 ? (
          <div className="col-span-3 bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
            <div className="text-6xl mb-4">🧘</div>
            <p className="text-gray-400 mb-4">No spiritual teachers yet.</p>
            <button
              onClick={() => openForm()}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Add Your First Teacher
            </button>
          </div>
        ) : (
          teachers.map((teacher) => (
            <div 
              key={teacher.id} 
              className="bg-gray-800 rounded-lg shadow-md border border-gray-700 hover:border-orange-500 transition overflow-hidden group"
            >
              {/* Teacher Image */}
              <div className="w-full h-64 bg-gray-700 overflow-hidden">
                <img 
                  src={teacher.image} 
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Teacher+Photo';
                  }}
                />
              </div>
              
              <div className="p-6">
                {/* Name */}
                <h3 className="text-xl font-bold text-orange-500 mb-2">{teacher.name}</h3>
                
                {/* Role Badge */}
                <span className="inline-block px-3 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full mb-3">
                  {teacher.role}
                </span>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{teacher.description}</p>

                {/* Created timestamp */}
                <div className="text-xs text-gray-500 mb-4 pb-4 border-t border-gray-700 pt-3">
                  Added: {new Date(teacher.created_at).toLocaleDateString()}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(teacher)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(teacher)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove
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
              {editingId ? 'Edit Spiritual Teacher' : 'Add Spiritual Teacher'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Swami Vivekananda"
                  disabled={loading}
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role/Position <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={loading}
                >
                  <option value="">Select role</option>
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description/Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="5"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Brief biography and spiritual background"
                  disabled={loading}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teacher Photo <span className="text-red-500">*</span>
                </label>
                
                <FileUpload
                  onUploadComplete={(url) => {
                    setFormData({ ...formData, image: url });
                    setImagePreview(url);
                  }}
                  accept="image/*"
                  folder="teachers"
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
                    value={formData.image}
                    onChange={handleImageChange}
                    className="mt-2 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com/photo.jpg"
                    disabled={loading}
                  />
                </details>

                {/* Show current URL */}
                {formData.image && (
                  <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-xs text-green-400 mb-1">✅ Photo URL:</p>
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
                  💡 <strong>Tip:</strong> Use professional portrait photos with good lighting. Recommended size: 600x800px or similar portrait dimensions.
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
                  {editingId ? 'Update Teacher' : 'Add Teacher'}
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
