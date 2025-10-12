// src/hooks/useFormState.js
import { useState } from 'react';

/**
 * Reusable hook for form state management
 * @param {object} initialState - Initial form values
 * @returns {object} - Form state and handlers
 */
export const useFormState = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    await callback(formData, editingId);
  };

  const openForm = (data = null) => {
    if (data) {
      setFormData(data);
      setEditingId(data.id);
    } else {
      setFormData(initialState);
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setFormData(initialState);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditingId(null);
  };

  return {
    formData,
    setFormData,
    isFormOpen,
    setIsFormOpen,
    editingId,
    setEditingId,
    handleChange,
    handleSubmit,
    openForm,
    closeForm,
    resetForm,
  };
};
