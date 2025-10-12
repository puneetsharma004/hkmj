// src/pages/UpcomingEvents.jsx
import { useState } from 'react';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';

export default function UpcomingEvents() {
  // Initialize CRUD hook for upcomingEvents table
  const {
    data: events,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('upcomingEvents', {
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
    title: '',
    description: '',
    date: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(editingId ? 'Updating event...' : 'Creating event...');
    
    try {
      if (editingId) {
        const { error: updateError } = await update(editingId, formData);
        
        if (updateError) {
          toast.error(`Failed to update: ${updateError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Event updated successfully! 🎉', { id: loadingToast });
      } else {
        const { error: createError } = await create(formData);
        
        if (createError) {
          toast.error(`Failed to create: ${createError.message}`, { id: loadingToast });
          return;
        }
        
        toast.success('Event created successfully! 📅', { id: loadingToast });
      }
      
      handleCancel();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      toast.error('An unexpected error occurred', { id: loadingToast });
    }
  };

  // Handle edit button click
  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      image: event.image
    });
    setImagePreview(event.image);
    openForm(event);
  };

  // Handle delete with confirmation toast
  const handleDelete = (event) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-white">Delete "{event.title}"?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting event...');
              
              try {
                const { error: deleteError } = await deleteRecord(event.id);
                
                if (deleteError) {
                  toast.error(`Failed to delete: ${deleteError.message}`, { id: loadingToast });
                  return;
                }
                
                toast.success('Event deleted successfully! 🗑️', { id: loadingToast });
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
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Check if event is upcoming
  const isUpcoming = (dateStr) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Separate upcoming and past events
  const upcomingEvents = sortedEvents.filter(e => isUpcoming(e.date));
  const pastEvents = sortedEvents.filter(e => !isUpcoming(e.date));

  // Loading state
  if (loading && events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading upcoming events...</p>
      </div>
    );
  }

  // Error state
  if (error && events.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading upcoming events</p>
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
          <h1 className="text-3xl font-bold text-white">Upcoming Events</h1>
          <p className="text-gray-400 mt-1">
            {upcomingEvents.length} upcoming • {pastEvents.length} past
          </p>
        </div>
        <button
          onClick={() => openForm()}
          disabled={loading}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Event
        </button>
      </div>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
            🎉 Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                formatDate={formatDate}
                isUpcoming={true}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-400 mb-4 flex items-center gap-2">
            📋 Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                formatDate={formatDate}
                isUpcoming={false}
                loading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-gray-400 mb-4">No upcoming events yet.</p>
          <button
            onClick={() => openForm()}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
          >
            Create Your First Event
          </button>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Upcoming Event' : 'Add Upcoming Event'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Diwali Celebration 2025"
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
                  placeholder="Provide a brief description of the event"
                  disabled={loading}
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Date <span className="text-red-500">*</span>
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

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Image <span className="text-red-500">*</span>
                </label>
                
                <FileUpload
                  onUploadComplete={(url) => {
                    setFormData({ ...formData, image: url });
                    setImagePreview(url);
                  }}
                  accept="image/*"
                  folder="upcoming-events"
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
                    placeholder="https://example.com/event-image.jpg"
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
                  💡 <strong>Tip:</strong> Use high-quality images (recommended: 800x600px or higher) for better display on the website.
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
                  {editingId ? 'Update Event' : 'Create Event'}
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

// Event Card Component
function EventCard({ event, onEdit, onDelete, formatDate, isUpcoming, loading }) {
  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-md border transition overflow-hidden group ${
        isUpcoming ? 'border-gray-700 hover:border-orange-500' : 'border-gray-700/50 opacity-75'
      }`}
    >
      {/* Event Image */}
      <div className="relative w-full h-48 bg-gray-700 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Event+Image';
          }}
        />
        {/* Date Badge */}
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="text-xs font-semibold">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
          </div>
          <div className="text-2xl font-bold leading-none">
            {new Date(event.date).getDate()}
          </div>
        </div>
        {/* Status Badge */}
        {isUpcoming ? (
          <div className="absolute top-3 left-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Upcoming
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-gray-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Past Event
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-orange-500 mb-2 line-clamp-2">{event.title}</h3>
        
        {/* Date */}
        <p className="text-gray-400 text-sm mb-3">📅 {formatDate(event.date)}</p>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{event.description}</p>

        {/* Created timestamp */}
        <div className="text-xs text-gray-500 mb-4 pb-4 border-b border-gray-700">
          Added: {new Date(event.created_at).toLocaleString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(event)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(event)}
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
