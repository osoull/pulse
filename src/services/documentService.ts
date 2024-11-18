import { Document } from '../types';
import { mockData } from '../lib/mockData';

export async function getDocuments() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.documents || [];
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

export async function uploadDocument(data: {
  title: string;
  type: string;
  investor: string;
  project: string;
  files: File[];
}) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newDocuments = data.files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      type: data.type,
      date: new Date().toISOString(),
      url: URL.createObjectURL(file),
      investor: data.investor,
      project: data.project
    }));

    mockData.documents = [...(mockData.documents || []), ...newDocuments];
    return newDocuments;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}