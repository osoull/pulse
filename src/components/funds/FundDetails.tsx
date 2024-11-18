import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Calendar, DollarSign, Target, 
  Briefcase, BarChart2, Clock, Percent, ArrowLeft,
  Building2, PieChart
} from 'lucide-react';
import { format } from 'date-fns';
import { getFundById } from '../../services/fundService';

export default function FundDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fund, setFund] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadFund();
  }, [id]);

  const loadFund = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFundById(id!);
      setFund(data);
    } catch (err) {
      console.error('Error loading fund:', err);
      setError('Failed to load fund details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !fund) {
    return (
      <div className="p-6 text-center text-red-600">
        {error || 'Fund not found'}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => navigate('/funds')}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Funds
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{fund.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{fund.description}</p>
        </div>
        <StatusBadge status={fund.status} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Assets Under Management"
          value={`$${(fund.aum / 1000000).toFixed(0)}M`}
          icon={<Briefcase className="w-5 h-5" />}
        />
        <MetricCard
          title="IRR"
          value={`${fund.irr.toFixed(1)}%`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Multiple"
          value={`${fund.multiple.toFixed(1)}x`}
          icon={<BarChart2 className="w-5 h-5" />}
        />
        <MetricCard
          title="Vintage"
          value={fund.vintage}
          icon={<Calendar className="w-5 h-5" />}
        />
      </div>

      {/* Fund Terms */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Fund Terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem
            icon={<Target className="w-5 h-5" />}
            label="Target Size"
            value={fund.targetSize ? `$${(fund.targetSize / 1000000).toFixed(0)}M` : '-'}
          />
          <DetailItem
            icon={<DollarSign className="w-5 h-5" />}
            label="Hard Cap"
            value={fund.hardCap ? `$${(fund.hardCap / 1000000).toFixed(0)}M` : '-'}
          />
          <DetailItem
            icon={<Clock className="w-5 h-5" />}
            label="Investment Period"
            value={fund.investmentPeriod ? `${fund.investmentPeriod} years` : '-'}
          />
          <DetailItem
            icon={<Calendar className="w-5 h-5" />}
            label="Fund Term"
            value={fund.fundTerm ? `${fund.fundTerm} years` : '-'}
          />
          <DetailItem
            icon={<Percent className="w-5 h-5" />}
            label="Management Fee"
            value={fund.managementFee ? `${fund.managementFee}%` : '-'}
          />
          <DetailItem
            icon={<Percent className="w-5 h-5" />}
            label="Performance Fee"
            value={fund.performanceFee ? `${fund.performanceFee}%` : '-'}
          />
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Allocation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Sector Allocation</h2>
          <div className="space-y-4">
            {fund.sectors.map((sector: any) => (
              <div key={sector.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{sector.name}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${sector.allocation}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{sector.allocation}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Companies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Portfolio Companies</h2>
          <div className="space-y-4">
            {fund.portfolio.map((company: any) => (
              <div key={company.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.sector}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(company.investment / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-gray-500">{company.ownership}% ownership</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Team */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Investment Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fund.team.map((member: any) => (
            <div key={member.email} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.title}</p>
              <a href={`mailto:${member.email}`} className="text-sm text-primary hover:text-primary-dark mt-1 block">
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'Fully Invested': 'bg-blue-100 text-blue-800',
    'Harvesting': 'bg-yellow-100 text-yellow-800',
    'Closed': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] || colors['Closed']}`}>
      {status}
    </span>
  );
}