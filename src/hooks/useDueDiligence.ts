import { useState, useEffect } from 'react';
import { DueDiligenceItem, DueDiligenceFilters } from '../types/dueDiligence';
import {
  getDueDiligenceItems,
  createDueDiligenceItem,
  updateDueDiligenceItem,
  uploadDueDiligenceDocument,
  addDueDiligenceComment,
  updateDueDiligenceProgress
} from '../services/dueDiligenceService';

export function useDueDiligence() {
  const [items, setItems] = useState<DueDiligenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDueDiligenceItems();
      setItems(data);
    } catch (err) {
      console.error('Error loading due diligence items:', err);
      setError(err instanceof Error ? err : new Error('Failed to load items'));
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (data: Partial<DueDiligenceItem>) => {
    try {
      const newItem = await createDueDiligenceItem(data);
      await loadItems();
      return newItem;
    } catch (error) {
      console.error('Error creating due diligence item:', error);
      throw error;
    }
  };

  const updateItem = async (id: string, data: Partial<DueDiligenceItem>) => {
    try {
      const updatedItem = await updateDueDiligenceItem(id, data);
      await loadItems();
      return updatedItem;
    } catch (error) {
      console.error('Error updating due diligence item:', error);
      throw error;
    }
  };

  const uploadDocument = async (itemId: string, file: File) => {
    try {
      const newDocument = await uploadDueDiligenceDocument(itemId, file);
      await loadItems();
      return newDocument;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  };

  const addComment = async (itemId: string, comment: string, author: string) => {
    try {
      const newComment = await addDueDiligenceComment(itemId, comment, author);
      await loadItems();
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const updateProgress = async (itemId: string, progress: number) => {
    try {
      const updatedItem = await updateDueDiligenceProgress(itemId, progress);
      await loadItems();
      return updatedItem;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  };

  const filterItems = (filters: DueDiligenceFilters) => {
    return items.filter(item => {
      const matchesSearch = !filters.search || 
        item.companyName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesPriority = !filters.priority || item.priority === filters.priority;
      const matchesAssignee = !filters.assignedTo || item.assignedTo === filters.assignedTo;
      
      let matchesDateRange = true;
      if (filters.dateRange) {
        const itemDate = new Date(item.startDate);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        matchesDateRange = itemDate >= startDate && itemDate <= endDate;
      }

      return matchesSearch && matchesStatus && matchesPriority && 
             matchesAssignee && matchesDateRange;
    });
  };

  return {
    items,
    loading,
    error,
    refresh: loadItems,
    createItem,
    updateItem,
    uploadDocument,
    addComment,
    updateProgress,
    filterItems
  };
}