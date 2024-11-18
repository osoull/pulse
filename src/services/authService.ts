import { User } from '../types/user';
import { mockData } from '../lib/mockData';

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Default admin credentials
    if (email === 'admin@osoul.partners' && password === 'admin123') {
      const user = mockData.users.find(u => u.email === email);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Update last login
      user.lastLogin = new Date().toISOString();
      
      return user;
    }

    // Investment Manager credentials
    if (email === 'manager@osoul.partners' && password === 'manager123') {
      const user = mockData.users.find(u => u.email === email);
      if (!user) {
        throw new Error('User not found');
      }
      
      user.lastLogin = new Date().toISOString();
      return user;
    }

    // Demo investor credentials
    if (email === 'investor@example.com' && password === 'demo123') {
      return {
        id: 'inv1',
        email: 'investor@example.com',
        name: 'John Smith',
        role: 'investor',
        investorId: 'INV-24-JSM-1234',
        status: 'active',
        permissions: {
          portal: true,
          documents: true,
          reports: true,
          capitalCalls: true,
          distributions: true,
          meetings: true
        },
        created_at: '2024-01-01T00:00:00Z',
        lastLogin: new Date().toISOString()
      };
    }

    throw new Error('Invalid email or password');
  } catch (error) {
    console.error('Login error:', error);
    throw error instanceof Error ? error : new Error('Authentication failed');
  }
}