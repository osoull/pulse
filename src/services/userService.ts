import { User, CreateUserInput } from '../types/user';
import { mockData } from '../lib/mockData';
import { generateInvestorId } from '../utils/idGenerator';

export async function getUsers() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData.users;
}

export async function createUser(input: CreateUserInput) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate investor ID if role is investor and ID not provided
  const investorId = input.role === 'investor' 
    ? (input.investorId || generateInvestorId(input.name))
    : undefined;

  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: input.email,
    name: input.name,
    role: input.role,
    title: input.title,
    department: input.department,
    status: 'active',
    investorId,
    created_at: new Date().toISOString()
  };

  mockData.users.push(newUser);
  return newUser;
}

export async function updateUser(id: string, data: Partial<User>) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockData.users.findIndex(user => user.id === id);
  if (index === -1) throw new Error('User not found');

  // Prevent modification of investorId if already set
  if (data.investorId && mockData.users[index].investorId) {
    delete data.investorId;
  }

  mockData.users[index] = {
    ...mockData.users[index],
    ...data
  };

  return mockData.users[index];
}

export async function updateUserStatus(id: string, status: 'active' | 'inactive') {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockData.users.findIndex(user => user.id === id);
  if (index === -1) throw new Error('User not found');

  mockData.users[index].status = status;
  return true;
}

export async function updateUserProfile(userId: string, data: {
  name: string;
  email: string;
  title?: string;
  phone?: string;
  bio?: string;
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockData.users.findIndex(user => user.id === userId);
  if (index === -1) throw new Error('User not found');

  mockData.users[index] = {
    ...mockData.users[index],
    ...data
  };

  return true;
}