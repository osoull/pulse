import { mockData } from '../lib/mockData';

export async function createInvestment(data: any) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newInvestment = {
      id: Math.random().toString(36).substr(2, 9),
      companyName: data.company_name,
      sector: data.sector,
      investmentDate: data.investment_date,
      investmentAmount: data.amount,
      valuation: data.valuation,
      ownership: data.ownership_percentage,
      status: 'Active',
      kpis: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mockData.investments = [...(mockData.investments || []), newInvestment];

    // Upload documents if any
    if (data.files?.length > 0) {
      const documentPromises = data.files.map((file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `investments/${newInvestment.id}/${fileName}`;
        
        // In a real implementation, this would upload to a storage service
        const url = URL.createObjectURL(file);
        
        return {
          investment_id: newInvestment.id,
          name: file.name,
          url: url,
          created_at: new Date().toISOString()
        };
      });

      mockData.investment_documents = [
        ...(mockData.investment_documents || []),
        ...documentPromises
      ];
    }

    return newInvestment;
  } catch (error) {
    console.error('Error creating investment:', error);
    throw error;
  }
}