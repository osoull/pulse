import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { KYCDocument, KYCDocumentType, requiredKYCDocuments } from '../../types';
import DocumentUploadModal from './DocumentUploadModal';

interface DocumentRequirementsListProps {
  investorType: string;
  documents: KYCDocument[];
  onUpload: (files: File[], type: KYCDocumentType, metadata: any) => void;
}

export default function DocumentRequirementsList({
  investorType,
  documents,
  onUpload
}: DocumentRequirementsListProps) {
  const [selectedDocType, setSelectedDocType] = useState<KYCDocumentType | null>(null);
  const requiredDocs = requiredKYCDocuments[investorType] || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Required Documents</h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            {documents.filter(d => d.status === 'Valid').length} Valid
          </span>
          <span className="flex items-center text-yellow-600">
            <Clock className="w-4 h-4 mr-1" />
            {documents.filter(d => d.status === 'Pending Review').length} Pending
          </span>
          <span className="flex items-center text-red-600">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {documents.filter(d => d.status === 'Expired' || d.status === 'Rejected').length} Action Required
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requiredDocs.map((docType) => {
          const existingDoc = documents.find(d => d.type === docType);
          return (
            <DocumentRequirementCard
              key={docType}
              type={docType}
              document={existingDoc}
              onUpload={() => setSelectedDocType(docType)}
            />
          );
        })}
      </div>

      {selectedDocType && (
        <DocumentUploadModal
          isOpen={true}
          onClose={() => setSelectedDocType(null)}
          onUpload={(files, type, metadata) => {
            onUpload(files, type, metadata);
            setSelectedDocType(null);
          }}
          documentType={selectedDocType}
        />
      )}
    </div>
  );
}

function DocumentRequirementCard({
  type,
  document,
  onUpload
}: {
  type: KYCDocumentType;
  document?: KYCDocument;
  onUpload: () => void;
}) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Valid':
        return 'text-green-600 bg-green-50';
      case 'Expired':
        return 'text-red-600 bg-red-50';
      case 'Pending Review':
        return 'text-yellow-600 bg-yellow-50';
      case 'Rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FileText className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{type}</h4>
            {document && (
              <p className="text-sm text-gray-500">
                Last updated: {new Date(document.submissionDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        {document && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
            {document.status}
          </span>
        )}
      </div>

      {!document && (
        <div className="mt-4">
          <button
            onClick={onUpload}
            className="btn-secondary w-full text-sm"
          >
            Upload Document
          </button>
        </div>
      )}

      {document?.status === 'Expired' && (
        <div className="mt-2 p-2 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Document expired on {new Date(document.expiryDate!).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}