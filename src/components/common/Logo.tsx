import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  height?: number;
}

// Define logo URLs with fallbacks
const LOGOS = {
  dark: [
    'https://www.osoul.partners/wp-content/uploads/2024/04/basic-file-2.png',
    '/logo-dark.png',
    '/logo.png'
  ],
  light: [
    'https://www.osoul.partners/wp-content/uploads/2024/04/basic-file-2.png',
    '/logo-light.png',
    '/logo.png'
  ]
};

export default function Logo({ variant, className = '', height = 32 }: LogoProps) {
  const { isDarkMode } = useTheme();
  const [currentLogoIndex, setCurrentLogoIndex] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);

  // Determine which logo set to use
  const logoSet = React.useMemo(() => {
    if (variant) {
      return LOGOS[variant];
    }
    return isDarkMode ? LOGOS.light : LOGOS.dark;
  }, [variant, isDarkMode]);

  // Reset error state when logo set changes
  React.useEffect(() => {
    setHasError(false);
    setCurrentLogoIndex(0);
  }, [logoSet]);

  const handleError = React.useCallback(() => {
    // Try next logo in the set
    if (currentLogoIndex < logoSet.length - 1) {
      setCurrentLogoIndex(prev => prev + 1);
    } else {
      setHasError(true);
      console.warn('All logo loading attempts failed');
    }
  }, [currentLogoIndex, logoSet.length]);

  // If all logos fail, render a text fallback
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center font-display font-bold ${className}`}
        style={{ height }}
      >
        PULSE
      </div>
    );
  }

  return (
    <img
      src={logoSet[currentLogoIndex]}
      alt="Osoul Capital Partners"
      className={`transition-opacity duration-200 ${className}`}
      style={{ height }}
      onError={handleError}
      loading="eager"
      crossOrigin="anonymous"
    />
  );
}