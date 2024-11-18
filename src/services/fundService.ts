import { mockData } from '../lib/mockData';
import { FundStructure } from '../types/funds';

const STORAGE_KEY = 'fund_structure';

export async function getFunds() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.funds;
  } catch (error) {
    console.error('Error fetching funds:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch funds');
  }
}

export async function getFundById(id: string) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const fund = mockData.funds.find(f => f.id === id);
    if (!fund) throw new Error('Fund not found');
    return fund;
  } catch (error) {
    console.error('Error fetching fund:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch fund details');
  }
}

export async function saveFundStructure(structure: FundStructure): Promise<void> {
  try {
    // Validate structure
    if (!structure.targetSize || structure.targetSize <= 0) {
      throw new Error('Invalid target size');
    }

    // In a real app, this would be an API call
    // For now, we'll save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...structure,
      lastUpdated: new Date().toISOString()
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.error('Error saving fund structure:', error);
    throw error instanceof Error ? error : new Error('Failed to save fund structure');
  }
}

export async function loadFundStructure(): Promise<FundStructure | null> {
  try {
    // In a real app, this would be an API call
    // For now, we'll load from localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return JSON.parse(savedData);
  } catch (error) {
    console.error('Error loading fund structure:', error);
    throw error instanceof Error ? error : new Error('Failed to load fund structure');
  }
}

export async function createFund(fundData: any) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const newFund = {
      id: Math.random().toString(36).substr(2, 9),
      ...fundData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sectors: [],
      portfolio: [],
      team: []
    };
    mockData.funds.push(newFund);
    return newFund;
  } catch (error) {
    console.error('Error creating fund:', error);
    throw error instanceof Error ? error : new Error('Failed to create fund');
  }
}

export async function updateFund(id: string, fundData: any) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockData.funds.findIndex(fund => fund.id === id);
    if (index === -1) throw new Error('Fund not found');
    
    mockData.funds[index] = {
      ...mockData.funds[index],
      ...fundData,
      updated_at: new Date().toISOString()
    };
    return mockData.funds[index];
  } catch (error) {
    console.error('Error updating fund:', error);
    throw error instanceof Error ? error : new Error('Failed to update fund');
  }
}

export async function deleteFund(id: string) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockData.funds.findIndex(fund => fund.id === id);
    if (index === -1) throw new Error('Fund not found');
    mockData.funds.splice(index, 1);
  } catch (error) {
    console.error('Error deleting fund:', error);
    throw error instanceof Error ? error : new Error('Failed to delete fund');
  }
}