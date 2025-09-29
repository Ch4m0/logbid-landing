'use client'
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'es' : 'en');
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className="relative bg-transparent hover:bg-gray-100 transition-colors duration-200 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
      >
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-blue-600 hover:text-blue-700 transition-colors duration-200" />
          
          <div className="flex items-center space-x-1">
            <span className={`text-sm transition-colors duration-200 ${
              currentLanguage === 'en' 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-400'
            }`}>
              EN
            </span>
            <span className="text-gray-300">|</span>
            <span className={`text-sm transition-colors duration-200 ${
              currentLanguage === 'es' 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-400'
            }`}>
              ES
            </span>
          </div>
        </div>
      </Button>
      
      {/* Tooltip más discreto */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {currentLanguage === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
      </div>
    </div>
  );
};

export default LanguageSelector; 