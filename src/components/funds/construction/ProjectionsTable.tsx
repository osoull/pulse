export default function ProjectionsTable({ projections }: ProjectionsTableProps) {
  if (!projections || !projections.yearlyProjections.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projections available. Please enter fund parameters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Capital Called
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Invested
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Management Fee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Portfolio Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Distributions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {projections.yearlyProjections.map((year, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                Year {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${(year.capitalCalled / 1000000).toFixed(1)}M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${(year.invested / 1000000).toFixed(1)}M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${(year.managementFee / 1000000).toFixed(1)}M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${(year.portfolioValue / 1000000).toFixed(1)}M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${(year.distributions / 1000000).toFixed(1)}M
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <td colSpan={6} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
              Total Management Fees: ${(projections.totalManagementFees / 1000000).toFixed(1)}M | 
              Expected Carry: ${(projections.expectedCarry / 1000000).toFixed(1)}M | 
              Fund Multiple: {projections.fundMultiple.toFixed(2)}x | 
              Net IRR: {projections.netIRR.toFixed(1)}%
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}