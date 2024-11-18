import React from 'react';
import { useThemeStore } from '../../../stores/themeStore';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function AppearanceSettings() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-semibold mb-6">Appearance</h2>
        <p className="text-sm text-gray-500 mb-6">
          Customize the look and feel of your interface
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <ThemeCard
          icon={<Sun className="w-6 h-6" />}
          title="Light"
          description="Classic light theme"
          active={theme === 'light'}
          onClick={() => setTheme('light')}
        />
        <ThemeCard
          icon={<Moon className="w-6 h-6" />}
          title="Dark"
          description="Easier on the eyes"
          active={theme === 'dark'}
          onClick={() => setTheme('dark')}
        />
        <ThemeCard
          icon={<Monitor className="w-6 h-6" />}
          title="System"
          description="Follow system theme"
          active={theme === 'system'}
          onClick={() => setTheme('system')}
        />
      </div>

      <div className="mt-8 p-4 bg-primary/5 rounded-lg">
        <h3 className="font-medium text-primary mb-2">Theme Preview</h3>
        <p className="text-sm text-gray-600">
          Changes are applied immediately across all screens
        </p>
      </div>
    </div>
  );
}

function ThemeCard({ 
  icon, 
  title, 
  description, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200 ${
        active 
          ? 'border-primary bg-primary/5 shadow-osoul' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className={`p-3 rounded-full mb-4 ${
        active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
      }`}>
        {icon}
      </div>
      <h3 className={`font-medium mb-1 ${
        active ? 'text-primary' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <p className="text-sm text-gray-500">{description}</p>
    </button>
  );
}