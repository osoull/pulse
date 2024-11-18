import { InvestorPortalUser } from '../types/portal';

export async function loginToPortal(email: string, password: string): Promise<InvestorPortalUser> {
  try {
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Demo credentials for testing
    if (email === 'investor@example.com' && password === 'demo123') {
      const user: InvestorPortalUser = {
        id: '1',
        email: 'investor@example.com',
        name: 'John Smith',
        investorId: '1',
        role: 'investor',
        lastLogin: new Date().toISOString()
      };
      return user;
    }

    throw new Error('Invalid email or password');
  } catch (error) {
    console.error('Portal login error:', error);
    throw error instanceof Error ? error : new Error('Authentication failed');
  }
}