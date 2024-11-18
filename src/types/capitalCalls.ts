import { z } from 'zod';

export interface CapitalCall {
  id: string;
  fundId: string;
  callNumber: number;
  amount: number;
  dueDate: string;
  purpose: string;
  status: 'Draft' | 'Sent' | 'Pending' | 'Paid' | 'Partially Paid' | 'Overdue';
  totalCommitment: number;
  percentageCalled: number;
  recipients: string[];
  documents: string[];
  payments?: CapitalCallPayment[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CapitalCallPayment {
  id: string;
  capitalCallId: string;
  investorId: string;
  amount: number;
  paymentDate: string;
  status: 'Pending' | 'Completed' | 'Failed';
  transactionRef?: string;
  notes?: string;
}

export const capitalCallSchema = z.object({
  fundId: z.string().min(1, "Fund is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  dueDate: z.string().min(1, "Due date is required"),
  purpose: z.string().min(1, "Purpose is required"),
  recipients: z.array(z.string()).min(1, "At least one recipient is required"),
  notes: z.string().optional()
});