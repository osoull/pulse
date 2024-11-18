export type UserRole = 'admin' | 'manager' | 'analyst' | 'viewer' | 'investor';

export interface UserPermissions {
  dashboard?: boolean;
  funds?: boolean;
  investors?: boolean;
  analytics?: boolean;
  crm?: boolean;
  documents?: boolean;
  kyc?: boolean;
  settings?: boolean;
  users?: boolean;
  reports?: boolean;
  capitalCalls?: boolean;
  distributions?: boolean;
  meetings?: boolean;
  communications?: boolean;
  portal?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  title?: string;
  department?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  created_at: string;
  investorId?: string; // Reference to investor profile if role is 'investor'
  permissions: UserPermissions;
}

export interface CreateUserInput {
  email: string;
  name: string;
  role: UserRole;
  title?: string;
  department?: string;
  investorId?: string;
}

export const USER_ROLES: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Investment Manager',
  analyst: 'Investment Analyst',
  viewer: 'Viewer',
  investor: 'Investor'
};