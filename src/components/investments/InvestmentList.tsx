import React, { useState, useEffect } from 'react';
import { Building2, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import CreateInvestmentModal from './CreateInvestmentModal';
import { createInvestment } from '../../services/investmentService';

interface Investment {
  id: string;
  companyName: string;
  sector: string;
  investmentDate: string;
  investmentAmount: number;
  valuation: number;
  ownership: number;
  status: 'Active' | 'Exited';
  kpis?: {
    revenue: number;
    ebitda: number;
  }[];
}

// Mock data
const mockInvestments: Investment[] = [
  {
    id: '1',
    companyName: 'Tech Innovators',
    sector: 'Technology',
    investmentDate: '2023-06-15',
    investmentAmount: 25000000,
    valuation: 100000000,
    ownership: 25,
    status: 'Active',
    kpis: [{ revenue: 50000000, ebitda: 10000000 }]
  },
  {
    id: '2',
    companyName: 'Healthcare Solutions',
    sector: 'Healthcare',
    investmentDate: '2023-03-01',
    investmentAmount: 35000000,
    valuation: 140000000,
    ownership: 30,
    status: 'Active',
    kpis: [{ revenue: 75000000, ebitda: 15000000 }]
  }
];

export default function InvestmentList() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setInvestments(mockInvestments);
    } catch (err) {
      setError('Error loading investments. Please try again.');
      console.error('Error loading investments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvestment = async (data: any) => {
    try {
      await createInvestment(data);
      await loadInvestments();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating investment:', error);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your portfolio companies</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Building2 className="w-4 h-4" />
          <span>New Investment</span>
        </button>
      </div>

      {investments.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No investments yet</h3>
          <p className="text-gray-500">Get started by adding your first investment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      )}

      <CreateInvestmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInvestment}
      />
    </div>
  );
}

function InvestmentCard({ investment }: { investment: Investment }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{investment.companyName}</h2>
            <p className="text-sm text-gray-500">{investment.sector}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            investment.status === 'Active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
          }`}>
            {investment.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Metric
            icon={<DollarSign className="w-5 h-5" />}
            label="Investment"
            value={`${(investment.investmentAmount / 1000000).toFixed(1)}M€`}
          />
          <Metric
            icon={<TrendingUp className="w-5 h-5" />}
            label="Valuation"
            value={`${(investment.valuation / 1000000).toFixed(1)}M€`}
          />
          <Metric
            icon={<Building2 className="w-5 h-5" />}
            label="Ownership"
            value={`${investment.ownership}%`}
          />
          <Metric
            icon={<Calendar className="w-5 h-5" />}
            label="Investment Date"
            value={new Date(investment.investmentDate).toLocaleDateString()}
          />
        </div>

        {investment.kpis && investment.kpis.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Latest KPIs</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Revenue:</span>
                <span className="ml-2 font-medium">{(investment.kpis[0].revenue / 1000000).toFixed(1)}M€</span>
              </div>
              <div>
                <span className="text-gray-500">EBITDA:</span>
                <span className="ml-2 font-medium">{(investment.kpis[0].ebitda / 1000000).toFixed(1)}M€</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-gray-400 dark:text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold dark:text-white">{value}</p>
      </div>
    </div>
  );
}