// src/hooks/useFileUpload.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export const useFileUpload = (bucketName = 'temple-media') => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  /**
   * Upload a file to Supabase Storage
   * @param {File} file - The file to upload
   * @param {string} folder - Optional folder path (e.g., 'campaigns', 'announcements')
   * @returns {Promise<{url: string, error: null} | {url: null, error: Error}>}
   */
  const uploadFile = async (file, folder = '') => {
    if (!file) {
      return { url: null, error: new Error('No file provided') };
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return { url: null, error: new Error('File too large') };
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('File type not supported. Use JPG, PNG, GIF, WEBP, or MP4');
      return { url: null, error: new Error('Invalid file type') };
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload file
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      setUploadProgress(100);
      toast.success('File uploaded successfully! ✨');

      return { url: publicUrl, error: null };
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(`Upload failed: ${error.message}`);
      return { url: null, error };
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  /**
   * Delete a file from Supabase Storage
   * @param {string} fileUrl - The public URL of the file to delete
   * @returns {Promise<{success: boolean, error: Error | null}>}
   */
  const deleteFile = async (fileUrl) => {
    try {
      // Extract file path from URL
      const urlParts = fileUrl.split(`${bucketName}/`);
      if (urlParts.length < 2) {
        throw new Error('Invalid file URL');
      }
      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) throw error;

      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting file:', error);
      return { success: false, error };
    }
  };

  return {
    uploadFile,
    deleteFile,
    uploading,
    uploadProgress
  };
};
