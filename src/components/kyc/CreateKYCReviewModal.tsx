import React, { useState } from 'react';
import { X, Upload, AlertTriangle, Shield } from 'lucide-react';
import { KYCDocumentType, requiredKYCDocuments } from '../../types';
import DocumentRequirementsList from './DocumentRequirementsList';
import { format } from 'date-fns';
import RequiredLabel from '../common/RequiredLabel';
import FormError from '../common/FormError';

interface CreateKYCReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CreateKYCReviewModal({
  isOpen,
  onClose,
  onSubmit
}: CreateKYCReviewModalProps) {
  const [formData, setFormData] = useState({
    investorId: '',
    investorType: 'Individual',
    riskLevel: 'Low',
    status: 'Pending Review',
    comments: '',
    documents: [] as File[],
    nextReviewDate: format(new Date(), 'yyyy-MM-dd'),
    submissionDate: new Date().toISOString()
  });

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.investorId) {
      setError('Please select an investor');
      return;
    }
    onSubmit(formData);
  };

  const handleDocumentUpload = (files: File[], type: KYCDocumentType, metadata: any) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold dark:text-white">New KYC Review</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <RequiredLabel text="Investor" />
                <select
                  value={formData.investorId}
                  onChange={(e) => setFormData(prev => ({ ...prev, investorId: e.target.value }))}
                  className="input"
                >
                  <option value="">Select investor</option>
                  <option value="1">Global Pension Fund</option>
                  <option value="2">Family Investment Office</option>
                </select>
              </div>

              <div>
                <RequiredLabel text="Investor Type" />
                <select
                  value={formData.investorType}
                  onChange={(e) => setFormData(prev => ({ ...prev, investorType: e.target.value }))}
                  className="input"
                >
                  <option value="Individual">Individual</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Financial Institution">Financial Institution</option>
                  <option value="Investment Fund">Investment Fund</option>
                  <option value="Trust">Trust</option>
                </select>
              </div>

              <div>
                <RequiredLabel text="Risk Level" />
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, riskLevel: e.target.value }))}
                  className="input"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <RequiredLabel text="Next Review Date" />
                <input
                  type="date"
                  value={formData.nextReviewDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, nextReviewDate: e.target.value }))}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Comments
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                rows={3}
                className="mt-1 input"
                placeholder="Add any relevant notes about this review..."
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Required Documents</h3>
              <DocumentRequirementsList
                investorType={formData.investorType}
                documents={[]}
                onUpload={handleDocumentUpload}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}