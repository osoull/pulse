import { mockData } from '../lib/mockData';
import { DueDiligenceItem } from '../types/dueDiligence';

export async function getDueDiligenceItems() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.dueDiligence || [];
  } catch (error) {
    console.error('Error fetching due diligence items:', error);
    throw error;
  }
}

export async function createDueDiligenceItem(data: Partial<DueDiligenceItem>) {
  try {
    const newItem: DueDiligenceItem = {
      id: Math.random().toString(36).substr(2, 9),
      companyName: data.companyName || '',
      type: data.type || '',
      startDate: data.startDate || new Date().toISOString(),
      dueDate: data.dueDate || '',
      status: data.status || 'Not Started',
      priority: data.priority || 'Medium',
      assignedTo: data.assignedTo || '',
      progress: 0,
      documents: [],
      comments: []
    };

    mockData.dueDiligence = [...(mockData.dueDiligence || []), newItem];
    return newItem;
  } catch (error) {
    console.error('Error creating due diligence item:', error);
    throw error;
  }
}

export async function updateDueDiligenceItem(id: string, data: Partial<DueDiligenceItem>) {
  try {
    const index = mockData.dueDiligence.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Item not found');

    mockData.dueDiligence[index] = {
      ...mockData.dueDiligence[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    return mockData.dueDiligence[index];
  } catch (error) {
    console.error('Error updating due diligence item:', error);
    throw error;
  }
}

export async function uploadDueDiligenceDocument(itemId: string, file: File) {
  try {
    const item = mockData.dueDiligence.find(i => i.id === itemId);
    if (!item) throw new Error('Item not found');

    const newDocument = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString()
    };

    item.documents = [...item.documents, newDocument];
    return newDocument;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function addDueDiligenceComment(itemId: string, comment: string, author: string) {
  try {
    const item = mockData.dueDiligence.find(i => i.id === itemId);
    if (!item) throw new Error('Item not found');

    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      text: comment,
      author,
      createdAt: new Date().toISOString()
    };

    item.comments = [...item.comments, newComment];
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function updateDueDiligenceProgress(itemId: string, progress: number) {
  try {
    const item = mockData.dueDiligence.find(i => i.id === itemId);
    if (!item) throw new Error('Item not found');

    item.progress = Math.min(100, Math.max(0, progress));
    return item;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
}