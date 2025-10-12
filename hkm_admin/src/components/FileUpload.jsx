// src/components/FileUpload.jsx
import { useRef } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';

export default function FileUpload({ 
  onUploadComplete, 
  accept = "image/*,video/*", 
  folder = '', 
  label = "Upload File",
  currentPreview = null,
  showPreview = true 
}) {
  const fileInputRef = useRef(null);
  const { uploadFile, uploading, uploadProgress } = useFileUpload();

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload file
    const { url, error } = await uploadFile(file, folder);

    if (url && !error) {
      onUploadComplete(url);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  const isVideo = (url) => {
    return /\.(mp4|webm)$/i.test(url);
  };

  return (
    <div className="space-y-3">
      {/* Upload Button */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={uploading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Uploading...
            </>
          ) : (
            <>
              📤 {label}
            </>
          )}
        </button>
        
        {currentPreview && (
          <button
            type="button"
            onClick={() => onUploadComplete('')}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            🗑️ Remove
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {/* Upload Progress */}
      {uploading && (
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {/* Preview */}
      {showPreview && currentPreview && (
        <div className="mt-3">
          <p className="text-sm text-gray-400 mb-2">Current File:</p>
          <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
            {isImage(currentPreview) ? (
              <img 
                src={currentPreview} 
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
            ) : isVideo(currentPreview) ? (
              <video 
                src={currentPreview} 
                controls
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                📄 File uploaded
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Supported: Images (JPG, PNG, GIF, WEBP), Videos (MP4, WEBM). Max size: 10MB
      </p>
    </div>
  );
}
