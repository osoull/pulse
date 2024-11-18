import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white/80 text-sm py-6 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <img 
              src="http://www.osoul.partners/wp-content/uploads/2024/04/basic-file-2.png" 
              alt="Osoul Capital Partners" 
              className="h-8 w-auto"
            />
            <div className="border-l border-white/20 pl-3">
              <p>© {currentYear} Osoul Capital Partners</p>
              <p className="text-xs text-white/60">All rights reserved</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs leading-relaxed text-white/60">
            <p>
              This platform is operated by Osoul Capital Partners, a private equity firm licensed and regulated by the Commission de Surveillance du Secteur Financier (CSSF) in Luxembourg. The information contained herein is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any security or investment product.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}