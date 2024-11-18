import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { FundStructure, FundProjections } from '../../../types/funds';
import { calculateFundProjections } from '../../../utils/fundCalculations';
import { saveFundStructure } from '../../../services/fundService';
import { FundSizingResult, ValuationResult } from '../../../services/openaiService';
import FundStructureForm from './FundStructureForm';
import ProjectionsTable from './ProjectionsTable';
import FundSizingAnalysis from './FundSizingAnalysis';
import ValuationAnalysis from './ValuationAnalysis';
import ValuationResults from './ValuationResults';

export default function FundConstruction() {
  const [fundStructure, setFundStructure] = useState<FundStructure>({
    targetSize: 1000,
    managementFee: 2,
    hurdleRate: 8,
    carryRate: 20,
    investmentPeriod: 5,
    fundTerm: 10,
    catchupRate: 100,
    expectedDeployment: [20, 40, 25, 10, 5],
    expectedReturns: {
      multiple: 2.5,
      irr: 25,
    },
  });

  const [projections, setProjections] = useState<FundProjections | null>(() => {
    return calculateFundProjections(fundStructure);
  });

  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleStructureChange = (newStructure: FundStructure) => {
    setFundStructure(newStructure);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveFundStructure(fundStructure);
      const newProjections = calculateFundProjections(fundStructure);
      setProjections(newProjections);
    } catch (error) {
      console.error('Error saving fund structure:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSizingAnalysis = (result: FundSizingResult) => {
    setFundStructure(prev => ({
      ...prev,
      targetSize: result.recommendedSize,
      expectedDeployment: result.deploymentSchedule,
      expectedReturns: {
        ...prev.expectedReturns,
        multiple: parseFloat((result.recommendedSize / (prev.targetSize || 1)).toFixed(2))
      }
    }));
  };

  const handleValuationAnalysis = (result: ValuationResult) => {
    setValuationResult(result);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fund Construction</h1>
        <p className="text-sm text-gray-500 mt-1">Configure fund parameters and analyze valuations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FundSizingAnalysis onAnalysisComplete={handleSizingAnalysis} />
        <ValuationAnalysis onAnalysisComplete={handleValuationAnalysis} />
      </div>

      {valuationResult && (
        <ValuationResults result={valuationResult} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FundStructureForm
          structure={fundStructure}
          onChange={handleStructureChange}
          onSave={handleSave}
          isSaving={isSaving}
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Fund Projections</h2>
          <ProjectionsTable projections={projections} />
        </div>
      </div>
    </div>
  );
}