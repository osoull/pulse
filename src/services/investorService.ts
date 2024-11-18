import { mockData } from '../lib/mockData';

export async function getInvestors() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.investors || [];
  } catch (error) {
    console.error('Error fetching investors:', error);
    throw error;
  }
}

export async function createInvestor(investorData: any) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newInvestor = {
      id: Math.random().toString(36).substr(2, 9),
      ...investorData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      kyc_documents: []
    };

    mockData.investors = [...(mockData.investors || []), newInvestor];
    return newInvestor;
  } catch (error) {
    console.error('Error creating investor:', error);
    throw error;
  }
}

export async function updateInvestor(id: string, investorData: any) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = mockData.investors.findIndex(investor => investor.id === id);
    if (index === -1) throw new Error('Investor not found');

    mockData.investors[index] = {
      ...mockData.investors[index],
      ...investorData,
      updated_at: new Date().toISOString()
    };

    return mockData.investors[index];
  } catch (error) {
    console.error('Error updating investor:', error);
    throw error;
  }
}

export async function deleteInvestor(id: string) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = mockData.investors.findIndex(investor => investor.id === id);
    if (index === -1) throw new Error('Investor not found');

    mockData.investors.splice(index, 1);
  } catch (error) {
    console.error('Error deleting investor:', error);
    throw error;
  }
}