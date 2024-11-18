import { useState, useEffect } from 'react';
import { Document } from '../types';
import { getDocuments, uploadDocument } from '../services/documentService';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error('Error loading documents:', err);
      setError(err instanceof Error ? err : new Error('Failed to load documents'));
    } finally {
      setLoading(false);
    }
  };

  const upload = async (data: {
    title: string;
    type: string;
    investor: string;
    project: string;
    files: File[];
  }) => {
    try {
      await uploadDocument({
        title: data.title,
        type: data.type,
        investor_id: data.investor,
        fund_id: data.project,
        files: data.files
      });
      await loadDocuments();
    } catch (err) {
      console.error('Error uploading document:', err);
      throw err;
    }
  };

  return { documents, loading, error, refresh: loadDocuments, upload };
}