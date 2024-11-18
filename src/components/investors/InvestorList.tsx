import React, { useState } from 'react';
import { Users, Building2, DollarSign, MapPin } from 'lucide-react';
import CreateInvestorModal from './CreateInvestorModal';
import InvestorDetails from './InvestorDetails';
import { getInvestors, createInvestor } from '../../services/investorService';

interface Investor {
  id: string;
  name: string;
  type: string;
  address: string;
  investmentCapacity: number;
  kyc_documents?: any[];
}

export default function InvestorList() {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  React.useEffect(() => {
    loadInvestors();
  }, []);

  const loadInvestors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInvestors();
      setInvestors(data || []);
    } catch (err) {
      console.error('Error loading investors:', err);
      setError('Failed to load investors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvestor = async (data: any) => {
    try {
      await createInvestor(data);
      await loadInvestors();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating investor:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investors</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your investor relationships</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Users className="w-4 h-4" />
          <span>New Investor</span>
        </button>
      </div>

      {investors.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No investors yet</h3>
          <p className="text-gray-500">Get started by adding your first investor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {investors.map((investor) => (
            <div
              key={investor.id}
              onClick={() => setSelectedInvestor(investor)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">{investor.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mt-2">
                    {investor.type}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  {investor.address}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Investment Capacity: ${(investor.investmentCapacity / 1000000).toFixed(1)}M
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Building2 className="w-4 h-4 mr-2" />
                  {investor.kyc_documents?.length || 0} Documents
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateInvestorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInvestor}
      />

      {selectedInvestor && (
        <InvestorDetails
          investor={selectedInvestor}
          isOpen={!!selectedInvestor}
          onClose={() => setSelectedInvestor(null)}
        />
      )}
    </div>
  );
}