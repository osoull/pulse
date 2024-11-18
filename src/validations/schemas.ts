import { z } from 'zod';

export const fundSchema = z.object({
  name: z.string().min(1, "Fund name is required"),
  strategy: z.string().min(1, "Strategy is required"),
  target_size: z.number().min(1, "Target size is required"),
  hard_cap: z.number().min(1, "Hard cap is required"),
  vintage: z.number().min(1900).max(new Date().getFullYear() + 5),
  investment_period: z.number().min(1, "Investment period is required"),
  fund_term: z.number().min(1, "Fund term is required"),
  management_fee: z.number().min(0, "Management fee is required"),
  performance_fee: z.number().min(0, "Performance fee is required"),
  hurdle_rate: z.number().optional(),
  catch_up: z.number().optional(),
  min_investment: z.number().min(0, "Minimum investment is required"),
  max_investment: z.number().min(0, "Maximum investment is required"),
  target_return: z.number().optional(),
  max_ownership: z.number().optional()
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  isPrimary: z.boolean()
});

export const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  address: z.string().min(1, "Address is required"),
  investmentCapacity: z.number().min(1, "Investment capacity is required"),
  contacts: z.array(contactSchema).min(1, "At least one contact is required")
});

export const dueDiligenceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  type: z.string().min(1, "Type is required"),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  assignedTo: z.string().min(1, "Assignment is required"),
  priority: z.string().min(1, "Priority is required"),
  comments: z.string().min(1, "Comments are required"),
  documents: z.array(z.any()).optional()
});

export const kycSchema = z.object({
  riskLevel: z.string().min(1, "Risk level is required"),
  status: z.string().min(1, "Status is required"),
  nextReviewDate: z.string().min(1, "Next review date is required"),
  comments: z.string().min(1, "Comments are required"),
  documents: z.array(z.any()).min(1, "At least one document is required")
});