import React, { useState } from 'react';
import { FileText, Download, Calendar, Tag, Search, Upload, X } from 'lucide-react';
import { useDocuments } from '../../hooks/useDocuments';
import { Document } from '../../types';

interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function CreateDocumentModal({ isOpen, onClose, onSubmit }: CreateDocumentModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [project, setProject] = useState('');
  const [investor, setInvestor] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      type,
      project,
      investor,
      files
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold dark:text-white">Upload New Document</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 input"
                placeholder="Enter document title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 input"
                required
              >
                <option value="">Select type</option>
                <option value="Legal">Legal</option>
                <option value="Financial">Financial</option>
                <option value="KYC">KYC</option>
                <option value="Report">Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Related Project
              </label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="mt-1 input"
                placeholder="Enter related project"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Related Investor
              </label>
              <input
                type="text"
                value={investor}
                onChange={(e) => setInvestor(e.target.value)}
                className="mt-1 input"
                placeholder="Enter related investor"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Files
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                      <span>Upload files</span>
                      <input
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 10MB each
                  </p>
                </div>
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
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
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DocumentCenter() {
  const { documents, loading, error, upload } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading documents. Please try again later.
      </div>
    );
  }

  // Get unique values for filters
  const investors = [...new Set(documents?.map(doc => doc.investor) || [])];
  const projects = [...new Set(documents?.map(doc => doc.project) || [])];
  const types = [...new Set(documents?.map(doc => doc.type) || [])];

  // Filter documents
  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    const matchesInvestor = !selectedInvestor || doc.investor === selectedInvestor;
    const matchesProject = !selectedProject || doc.project === selectedProject;
    return matchesSearch && matchesType && matchesInvestor && matchesProject;
  }) || [];

  const handleUpload = async (data: any) => {
    try {
      await upload(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Center</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and organize your documents</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>New Document</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input"
              />
            </div>
            
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select 
              value={selectedInvestor}
              onChange={(e) => setSelectedInvestor(e.target.value)}
              className="input"
            >
              <option value="">All Investors</option>
              {investors.map(investor => (
                <option key={investor} value={investor}>{investor}</option>
              ))}
            </select>

            <select 
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="input"
            >
              <option value="">All Projects</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <DocumentRow key={doc.id} document={doc} />
            ))}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No documents found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateDocumentModal
          isOpen={true}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleUpload}
        />
      )}
    </div>
  );
}

function DocumentRow({ document }: { document: Document }) {
  const typeColors = {
    'Legal': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Financial': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'KYC': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Report': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <FileText className="w-6 h-6 text-gray-400" />
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{document.title}</h3>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(document.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm">
              <Tag className="w-4 h-4 mr-1" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[document.type] || typeColors['Report']}`}>
                {document.type}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {document.investor} • {document.project}
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href={document.url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
      >
        <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </a>
    </div>
  );
}