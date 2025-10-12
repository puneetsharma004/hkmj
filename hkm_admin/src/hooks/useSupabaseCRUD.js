// src/hooks/useSupabaseCRUD.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Reusable hook for Supabase CRUD operations
 * @param {string} tableName - Name of the Supabase table
 * @param {object} options - Optional configuration
 * @returns {object} - CRUD functions and state
 */
export const useSupabaseCRUD = (tableName, options = {}) => {
  const {
    orderBy = 'created_at',
    orderDirection = 'desc',
    autoFetch = true,
    selectQuery = '*'
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all records
  const fetchAll = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from(tableName)
        .select(selectQuery);

      // Apply filters if provided
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      // Apply ordering
      query = query.order(orderBy, { ascending: orderDirection === 'asc' });

      const { data: fetchedData, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setData(fetchedData || []);
      return { data: fetchedData, error: null };
    } catch (err) {
      console.error(`Error fetching from ${tableName}:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Fetch single record by ID
  const fetchById = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const { data: fetchedData, error: fetchError } = await supabase
        .from(tableName)
        .select(selectQuery)
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      return { data: fetchedData, error: null };
    } catch (err) {
      console.error(`Error fetching record from ${tableName}:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Create new record
  const create = async (newData) => {
    try {
      setLoading(true);
      setError(null);

      const { data: createdData, error: createError } = await supabase
        .from(tableName)
        .insert([newData])
        .select();

      if (createError) throw createError;

      // Update local state
      setData((prevData) => [createdData[0], ...prevData]);

      return { data: createdData[0], error: null };
    } catch (err) {
      console.error(`Error creating record in ${tableName}:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Update existing record
  const update = async (id, updatedData) => {
    try {
      setLoading(true);
      setError(null);

      const { data: updated, error: updateError } = await supabase
        .from(tableName)
        .update(updatedData)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;

      // Update local state
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? updated[0] : item))
      );

      return { data: updated[0], error: null };
    } catch (err) {
      console.error(`Error updating record in ${tableName}:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Delete record
  const deleteRecord = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Update local state
      setData((prevData) => prevData.filter((item) => item.id !== id));

      return { error: null };
    } catch (err) {
      console.error(`Error deleting record from ${tableName}:`, err);
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  // Bulk operations
  const bulkCreate = async (newDataArray) => {
    try {
      setLoading(true);
      setError(null);

      const { data: createdData, error: createError } = await supabase
        .from(tableName)
        .insert(newDataArray)
        .select();

      if (createError) throw createError;

      // Update local state
      setData((prevData) => [...createdData, ...prevData]);

      return { data: createdData, error: null };
    } catch (err) {
      console.error(`Error bulk creating records in ${tableName}:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  const bulkDelete = async (ids) => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .in('id', ids);

      if (deleteError) throw deleteError;

      // Update local state
      setData((prevData) => prevData.filter((item) => !ids.includes(item.id)));

      return { error: null };
    } catch (err) {
      console.error(`Error bulk deleting records from ${tableName}:`, err);
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  // Search/Filter function
  const search = async (column, value, operator = 'ilike') => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from(tableName)
        .select(selectQuery);

      if (operator === 'ilike') {
        query = query.ilike(column, `%${value}%`);
      } else {
        query = query[operator](column, value);
      }

      query = query.order(orderBy, { ascending: orderDirection === 'asc' });

      const { data: searchData, error: searchError } = await query;

      if (searchError) throw searchError;

      setData(searchData || []);
      return { data: searchData, error: null };
    } catch (err) {
      console.error(`Error searching in ${tableName}:`, err);
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchAll();
    }
  }, [tableName, autoFetch]);

  return {
    data,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    deleteRecord,
    bulkCreate,
    bulkDelete,
    search,
    setData, // Allow manual data updates if needed
  };
};
