import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onClick: () => void;
  isExporting?: boolean;
  label?: string;
}

export default function ExportButton({ 
  onClick, 
  isExporting = false,
  label = 'Export Report'
}: ExportButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isExporting}
      className="btn-primary flex items-center space-x-2"
    >
      <Download className="w-4 h-4" />
      <span>{isExporting ? 'Exporting...' : label}</span>
    </button>
  );
}