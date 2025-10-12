// src/pages/Events.jsx
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { useFormState } from '../hooks/useFormState';
import toast from 'react-hot-toast';
import FileUpload from '../components/FileUpload';
import { useState } from 'react';

export default function Events() {
  const [imagePreview, setImagePreview] = useState('');
  // Initialize CRUD hook for events table
  const {
    data: events,
    loading,
    error,
    create,
    update,
    deleteRecord,
  } = useSupabaseCRUD('events', {
    orderBy: 'date',
    orderDirection: 'asc' // Show upcoming events first
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
    time: '',
    type: '',
    location: '',
    image: '',
    registration: false,
    featured: false
  });

  // Event type options
  const eventTypes = [
    'Festival',
    'Religious',
    'Cultural',
    'Educational',
    'Charity',
    'Community',
    'Other'
  ];

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
      time: event.time,
      type: event.type,
      location: event.location,
      registration: event.registration,
      featured: event.featured
    });
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
    closeForm();
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time for display
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Check if event is upcoming
  const isUpcoming = (dateStr) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  // Separate upcoming and past events
  const upcomingEvents = events.filter(e => isUpcoming(e.date));
  const pastEvents = events.filter(e => !isUpcoming(e.date));

  // Loading state
  if (loading && events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-400">Loading events...</p>
      </div>
    );
  }

  // Error state
  if (error && events.length === 0) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-2">⚠️ Error loading events</p>
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
          <h1 className="text-3xl font-bold text-white">Events</h1>
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

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
            📅 Upcoming Events
          </h2>
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                formatDate={formatDate}
                formatTime={formatTime}
                loading={loading}
                isUpcoming={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-400 mb-4 flex items-center gap-2">
            📋 Past Events
          </h2>
          <div className="grid gap-4">
            {pastEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                formatDate={formatDate}
                formatTime={formatTime}
                loading={loading}
                isUpcoming={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-400 mb-4">No events yet.</p>
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
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {editingId ? 'Edit Event' : 'Add New Event'}
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
                  placeholder="Enter event title"
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
                  placeholder="Enter event description"
                  disabled={loading}
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date <span className="text-red-500">*</span>
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

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Type and Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                  >
                    <option value="">Select type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Main Temple Hall"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Registration and Featured Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
                  <input
                    type="checkbox"
                    id="registration"
                    checked={formData.registration}
                    onChange={(e) => setFormData({ ...formData, registration: e.target.checked })}
                    className="w-5 h-5 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                    disabled={loading}
                  />
                  <label htmlFor="registration" className="text-sm text-gray-300 cursor-pointer">
                    Require registration for this event
                  </label>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-orange-500 bg-gray-600 border-gray-500 rounded focus:ring-orange-500"
                    disabled={loading}
                  />
                  <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
                    Feature this event (show prominently on website)
                  </label>
                </div>
              </div>

     
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image <span className="text-red-500">*</span>
                </label>

                {/* File Upload with Preview */}
                <FileUpload
                  onUploadComplete={(url) => {
                    setFormData({ ...formData, image: url });
                    setImagePreview(url);
                  }}
                  accept="image/*"
                  folder="events"
                  label="Upload Event Image"
                  currentPreview={imagePreview}
                  showPreview={true}
                />

                {/* Manual URL Input */}
                <details className="mt-3">
                  <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                    Or paste image URL manually
                  </summary>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => {
                      const url = e.target.value;
                      setFormData({ ...formData, image: url });
                      setImagePreview(url);
                    }}
                    className="mt-2 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com/image.jpg"
                    disabled={loading}
                  />
                </details>

                {/* Live Preview for Manual URL */}
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Event Preview"
                      className="rounded-lg w-full max-h-64 object-cover border border-gray-600"
                    />
                  </div>
                )}

                {/* Show URL with Copy Button */}
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
function EventCard({ event, onEdit, onDelete, formatDate, formatTime, loading, isUpcoming }) {
  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-md border overflow-hidden transition ${
        isUpcoming ? 'border-gray-700 hover:border-orange-500' : 'border-gray-700/50 opacity-75'
      }`}
    >
      {/* Featured Image */}
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover border-b border-gray-700"
        />
      ) : (
        <div className="w-full h-56 bg-gray-700 flex items-center justify-center text-gray-400 text-sm border-b border-gray-700">
          No Image Available
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between">
        <div>
          {/* Title and Badges */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h3 className="text-xl font-semibold text-orange-500">{event.title}</h3>
            {event.featured && (
              <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                ⭐ Featured
              </span>
            )}
            {event.registration && (
              <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                📝 Registration Required
              </span>
            )}
            {!isUpcoming && (
              <span className="px-2 py-1 text-xs bg-gray-600/20 text-gray-500 rounded-full">
                Past Event
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-4 line-clamp-3">{event.description}</p>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500 block mb-1">📅 Date</span>
              <p className="text-gray-300 font-medium">{formatDate(event.date)}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">🕐 Time</span>
              <p className="text-gray-300 font-medium">{formatTime(event.time)}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">📍 Location</span>
              <p className="text-gray-300 font-medium">{event.location}</p>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">🏷️ Type</span>
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                {event.type}
              </span>
            </div>
          </div>

          {/* Created timestamp */}
          <div className="mt-4 text-xs text-gray-500">
            Created: {new Date(event.created_at).toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => onEdit(event)}
            disabled={loading}
            className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event)}
            disabled={loading}
            className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

