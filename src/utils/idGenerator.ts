import { format } from 'date-fns';

export function generateInvestorId(name: string): string {
  // Get current year
  const year = format(new Date(), 'yy');
  
  // Clean and format name
  const cleanName = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 3);
  
  // Generate random number (4 digits)
  const random = Math.floor(1000 + Math.random() * 9000);
  
  // Combine parts: INV-YY-XXX-NNNN
  // XXX = First 3 letters of name
  // NNNN = Random 4-digit number
  return `INV-${year}-${cleanName}-${random}`;
}

// Function to validate investor ID format
export function isValidInvestorId(id: string): boolean {
  const pattern = /^INV-\d{2}-[A-Z]{3}-\d{4}$/;
  return pattern.test(id);
}