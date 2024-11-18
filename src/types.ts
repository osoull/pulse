export interface KYCDocument {
  id: string;
  type: KYCDocumentType;
  title: string;
  submissionDate: string;
  expiryDate?: string;
  status: 'Valid' | 'Expired' | 'Pending Review' | 'Rejected';
  url: string;
  required: boolean;
  comments?: string[];
}

export type KYCDocumentType =
  // Identity Documents
  | 'Certificate of Incorporation'
  | 'Articles of Association'
  | 'Commercial Register Extract'
  | 'Shareholder Register'
  | 'Board Resolution'
  | 'Power of Attorney'
  | 'Passport'
  | 'National ID'
  
  // Financial Documents
  | 'Financial Statements'
  | 'Bank Statements'
  | 'Source of Funds Declaration'
  | 'Bank Reference Letter'
  | 'Credit Rating Report'
  
  // Tax Documents
  | 'Tax Registration'
  | 'Tax Clearance Certificate'
  | 'W-8BEN-E Form'
  | 'W-9 Form'
  | 'CRS Form'
  | 'FATCA Declaration'
  
  // Ownership & Control
  | 'UBO Declaration'
  | 'Ownership Structure Chart'
  | 'Group Structure Chart'
  | 'Director List'
  | 'Authorized Signatories List'
  
  // Compliance Documents
  | 'AML Policy'
  | 'Compliance Policy'
  | 'Risk Assessment'
  | 'Sanctions Declaration'
  | 'PEP Declaration'
  
  // Licenses & Permits
  | 'Investment License'
  | 'Regulatory Licenses'
  | 'Professional Licenses'
  
  // Other Documents
  | 'Proof of Address'
  | 'Business Plan'
  | 'Other';

export const requiredKYCDocuments: Record<string, KYCDocumentType[]> = {
  'Individual': [
    'Passport',
    'National ID',
    'Proof of Address',
    'Source of Funds Declaration',
    'Bank Statements',
    'Tax Registration',
    'PEP Declaration'
  ],
  'Corporation': [
    'Certificate of Incorporation',
    'Articles of Association',
    'Commercial Register Extract',
    'Board Resolution',
    'Financial Statements',
    'UBO Declaration',
    'Ownership Structure Chart',
    'Director List',
    'Authorized Signatories List',
    'Tax Registration',
    'W-8BEN-E Form',
    'FATCA Declaration',
    'AML Policy',
    'Sanctions Declaration'
  ],
  'Financial Institution': [
    'Certificate of Incorporation',
    'Banking License',
    'Financial Statements',
    'AML Policy',
    'Compliance Policy',
    'Risk Assessment',
    'FATCA Declaration',
    'CRS Form',
    'Authorized Signatories List',
    'Director List',
    'Regulatory Licenses'
  ],
  'Investment Fund': [
    'Certificate of Incorporation',
    'Investment License',
    'Fund Prospectus',
    'Financial Statements',
    'UBO Declaration',
    'Board Resolution',
    'AML Policy',
    'FATCA Declaration',
    'CRS Form',
    'Director List'
  ],
  'Trust': [
    'Trust Deed',
    'Trustee Resolution',
    'UBO Declaration',
    'Source of Funds Declaration',
    'Tax Registration',
    'FATCA Declaration',
    'CRS Form',
    'Authorized Signatories List'
  ]
};