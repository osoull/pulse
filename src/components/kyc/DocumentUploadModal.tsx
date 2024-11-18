import React, { useState } from 'react';
import { X, Upload, FileText, AlertTriangle } from 'lucide-react';
import { KYCDocumentType } from '../../types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], type: KYCDocumentType, metadata: DocumentMetadata) => void;
  documentType: KYCDocumentType;
}

interface DocumentMetadata {
  expiryDate?: string;
  description?: string;
  confidentiality: 'Public' | 'Private' | 'Restricted';
}

export default function DocumentUploadModal({
  isOpen,
  onClose,
  onUpload,
  documentType
}: DocumentUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [metadata, setMetadata] = useState<DocumentMetadata>({
    expiryDate: '',
    description: '',
    confidentiality: 'Private'
  });
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/')
    );
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload(files, documentType, metadata);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Upload Document</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Document Type
              </label>
              <p className="mt-1 text-sm text-gray-600">{documentType}</p>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
              }`}
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-primary hover:text-primary-dark">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileInput}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    PDF or images up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Selected Files
                </h3>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                value={metadata.expiryDate}
                onChange={(e) => setMetadata(prev => ({
                  ...prev,
                  expiryDate: e.target.value
                }))}
                className="mt-1 input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={metadata.description}
                onChange={(e) => setMetadata(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                rows={3}
                className="mt-1 input"
                placeholder="Add any relevant notes about this document..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confidentiality Level
              </label>
              <select
                value={metadata.confidentiality}
                onChange={(e) => setMetadata(prev => ({
                  ...prev,
                  confidentiality: e.target.value as 'Public' | 'Private' | 'Restricted'
                }))}
                className="mt-1 input"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Restricted">Restricted</option>
              </select>
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
              disabled={files.length === 0}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}