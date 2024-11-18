import React from 'react';
import Logo from '../common/Logo';

export default function PortalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Logo height={32} />
            <div className="border-l border-gray-200 dark:border-gray-700 pl-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} Osoul Capital Partners
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                All rights reserved
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xl text-center md:text-right">
            <p>
              This portal is operated by Osoul Capital Partners, a private equity firm licensed and regulated by the Commission de Surveillance du Secteur Financier (CSSF) in Luxembourg. The information contained herein is for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}