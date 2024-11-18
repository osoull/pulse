import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Upload, Database, AlertTriangle } from 'lucide-react';
import Papa from 'papaparse';
import { z } from 'zod';

const csvSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional()
});

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (leads: any[]) => void;
}

export default function ImportLeadsModal({
  isOpen,
  onClose,
  onImport
}: ImportLeadsModalProps) {
  const [importMethod, setImportMethod] = useState<'csv' | 'crunchbase'>('csv');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [crunchbaseQuery, setCrunchbaseQuery] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleCSVImport = async () => {
    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const text = await file.text();
      Papa.parse(text, {
        header: true,
        complete: (results) => {
          try {
            const validLeads = results.data.map(lead => {
              const validatedLead = csvSchema.parse(lead);
              return {
                ...validatedLead,
                status: 'new'
              };
            });
            onImport(validLeads);
            onClose();
          } catch (err) {
            setError('Invalid CSV format. Please check the template and try again.');
          }
        },
        error: (error) => {
          setError(`Error parsing CSV: ${error.message}`);
        }
      });
    } catch (err) {
      setError('Error processing file');
    } finally {
      setLoading(false);
    }
  };

  const handleCrunchbaseImport = async () => {
    try {
      setLoading(true);
      setError(null);

      // Note: In a real implementation, you would use the Crunchbase API here
      // This is just a mock implementation
      const mockCrunchbaseData = [
        {
          company: "Tech Startup Inc",
          contactName: "John Smith",
          email: "john@techstartup.com",
          source: "Crunchbase",
          notes: "Series A startup in fintech space"
        }
      ];

      onImport(mockCrunchbaseData);
      onClose();
    } catch (err) {
      setError('Error fetching data from Crunchbase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg max-w-xl w-full">
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold dark:text-white">
                Import Leads
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">
                Import leads from CSV or Crunchbase
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setImportMethod('csv')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                  importMethod === 'csv'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Upload className="w-5 h-5" />
                <span>Import from CSV</span>
              </button>
              <button
                onClick={() => setImportMethod('crunchbase')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                  importMethod === 'crunchbase'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Database className="w-5 h-5" />
                <span>Import from Crunchbase</span>
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {importMethod === 'csv' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload CSV File
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept=".csv"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        CSV file up to 10MB
                      </p>
                    </div>
                  </div>
                  {file && (
                    <p className="mt-2 text-sm text-gray-500">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CSV Template Format
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <code className="text-sm">
                      company,contactName,email,phone,source,notes
                    </code>
                  </div>
                </div>

                <button
                  onClick={handleCSVImport}
                  disabled={!file || loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Importing...' : 'Import Leads'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Query
                  </label>
                  <input
                    type="text"
                    value={crunchbaseQuery}
                    onChange={(e) => setCrunchbaseQuery(e.target.value)}
                    className="mt-1 input"
                    placeholder="e.g., fintech startups in Series A"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Filters
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">
                        Industry
                      </label>
                      <select className="mt-1 input">
                        <option value="">All Industries</option>
                        <option value="fintech">Fintech</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">
                        Funding Stage
                      </label>
                      <select className="mt-1 input">
                        <option value="">All Stages</option>
                        <option value="seed">Seed</option>
                        <option value="seriesA">Series A</option>
                        <option value="seriesB">Series B</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCrunchbaseImport}
                  disabled={!crunchbaseQuery || loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Searching...' : 'Search & Import'}
                </button>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}